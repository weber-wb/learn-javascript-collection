// 引入koa, 和koa 1.x 不同, 在koa2中，我们导入的是一个class，因此用大写的 Koa 表示：
const Koa = require('koa');

// 注意require('koa-router')返回的是函数,使用 koa-router 来处理 URL
const router = require('koa-router')();     // 导入"koa-router", 并且调用函数

const bodyParser = require('koa-bodyparser');   // 处理post请求

// 创建一个Koa对象表示web app 本身
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use( async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
    await next();
});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}! ...</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Hello, Index Page! ...</h1>`;
});


/*
    处理post请求：
        用 router.get('/paht', async fn); 处理的是 GET 请求
        用 router.post('/path', async fn); 处理的是 POST 请求 ， 处理post请求处理 url 会遇到一个问题，post请求经常会发送一个表单，或者JSON, 它作为request的body发送
            但无论是Node.js提供的原始request对象，还是 koa 提供的request对象，都不提供解析request的body功能
            所以我们需要引入另一个middleware来解析request请求，解析后的参数绑定到 ctx.request.body 中。
            "koa-bodyparser"就是用来干这个事情的，在package.json文件中 "dependencies" 添加依赖： "koa-bodyparser":"3.2.0"
            由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
        写一个简单的登录表单：
*/
router.get('/login', async (ctx, next) => {
    ctx.response.body = `<h1>登录</h1>
        <form action="/signin" method="post">
            <p>Name：<input type="text" name="name" value="weber"></p>
            <p>Password：<input type="password" name="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
});
router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';

    console.log(`signin with name: ${name} , password: ${password}`);
    
    if(name === 'weber' && password === '123456'){
        ctx.response.body = `<h1>Welcome, ${name}! ...</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed. <a href="/login">Try again</a></h1>`
    }
});


app.use(bodyParser());  // 处理post请求

// add router middleware  路由中有三个基本的概念： route, routes, router
// route：它是一条路由。
// routes：它是一组路由。
// router：它是一个机制。
app.use(router.routes());

// 在端口 3000 监听
app.listen(3000);
console.log(`app started at port 3000`);