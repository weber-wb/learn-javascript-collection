// 引入koa, 和koa 1.x 不同, 在koa2中，我们导入的是一个class，因此用大写的 Koa 表示：
const Koa = require('koa');

// 注意require('koa-router')返回的是函数,使用 koa-router 来处理 URL
const router = require('koa-router')();     // 导入"koa-router", 并且调用函数

const bodyParser = require('koa-bodyparser');   // 处理post请求


// 创建一个Koa对象表示web app 本身
const app = new Koa();

// 先导入fs模块，然后用readdirSync列出文件
const fs = require('fs');
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter( (f) => {
    return f.endsWith('.js');
});
// console.log(js_files);

// 处理每个.js文件
for(var f of js_files){
    console.log(`process controller: ${f} ... ${__dirname} `);      // __dirname 根目录

    let mapping = require(__dirname + '/controllers/' + f);     // 引入对应文件暴露出来的函数，返回的是个{}
    for(var url in mapping){            // for...in 遍历
        if(url.startsWith('GET ')){            // 判断key值是否以 'GET ' 开头， 截取路径，异步函数，绑定到路由
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
}

app.use(bodyParser());  // 处理post请求

// add router middleware  路由中有三个基本的概念： route, routes, router
// route：它是一条路由。
// routes：它是一组路由。
// router：它是一个机制。
app.use(router.routes());

// 在端口 3000 监听
app.listen(3000);
console.log(`app started at port 3000`);