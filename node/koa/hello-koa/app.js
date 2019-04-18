// 引入koa, 和koa 1.x 不同, 在koa2中，我们导入的是一个class，因此用大写的 Koa 表示：
const Koa = require('koa');

// 创建一个Koa对象表示web app 本身
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use( async (ctx, next) => {
    console.log('middleware 第一1');
    await next();
    if(ctx.request.path === '/'){
        ctx.response.type = 'text/html';
        ctx.response.body = '<h1>Hello, Koa2!</h1>'
        console.log('middleware 第一2');
    }
});

app.use( async (ctx, next) => {
    console.log('middleware 第二1');
    await next();
    console.log('middleware 第二2 ');
});

app.use( async (ctx, next) => {
    console.log('middleware 第三1');
    await next();
    console.log('middleware 第三2');
});

// 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
// koa 把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用 await next() 来调用下一个 async函数。
// 我们把每个 async 函数称为 middleware，这些middleware可以组合起来，完成很多有用的功能。
// middleware的顺序很重要，也就是调用 app.use() 的顺序决定了 middleware 顺序，此外如果一个middleware没有调用 await next(), 后续的middleware将不再执行：
// app.use( async (ctx, next) => {
//     console.log('middleware 第四1')
// })


// 正常情况下我们应该对不同的URL，调用不同的处理函数，这样才能返回不同的结果，例如：
app.use( async (ctx, next) => {
    if(ctx.request.path === '/index'){
        ctx.response.body = '<h1>Index page</h1>';
    }else{
        await next();        // 若没调用 await next() 后续的middleware将不再执行
    }
});
app.use( async (ctx, next) => {
    if(ctx.request.path === '/test'){
        ctx.response.body = '<h1>Text page</h1>';
    }else{
        await next();
    }
});
// 应该写一个集中处理 URL 的 middleware ， 它根据不同的 URL 调用不同的处理函数
// 为了处理 URL，我们需要引用 koa-router 这个 middleware ，让它负责处理 URL 映射
// 看 url-koa 文件夹



// 在端口 3000 监听
app.listen(3000);
console.log(`app started at port 3000`);