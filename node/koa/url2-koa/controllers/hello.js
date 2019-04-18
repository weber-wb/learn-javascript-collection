var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Hello, IndexPage!</h1>`;
};

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

// 通过module.exports把 URL 处理函数暴露出来
module.exports = {
    'GET /': fn_index,
    'GET /hello/:name': fn_hello
}