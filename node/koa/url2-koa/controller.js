// 先导入fs模块，然后用readdirSync列出文件
const fs = require('fs');

function addMapping(router, mapping){       // 处理每个js文件，绑定路由
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else if(url.startsWith('PUT ')){
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        }else if(url.startsWith('DELETE ')){
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
};

function addControllers(router, dir){
    var files = fs.readdirSync(__dirname + '/' + dir);      // readdirSync 列出该目录下所有文件+文件夹 ，不包含文件夹里的子文件+文件夹
    console.log(files);
    var js_files = files.filter( (f) => {
        return f.endsWith('.js');
    });
    for(var f of js_files){
        let mapping = require(__dirname + '/'+ dir +'/' + f);
        addMapping(router, mapping);
    };

    // 或
    // fs.readdirSync(__dirname + '/' + dir).filter( (f) => {
    //     return f.endsWith('.js');
    // }).forEach( (f) => {
    //     let mapping = require(__dirname + '/'+ dir +'/' + f);
    //     addMapping(router, mapping);
    // });
};

module.exports = function(dir){
    let controllers_dir = dir || 'controllers',     // 如果不传参数，默认扫描的目录为 'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};