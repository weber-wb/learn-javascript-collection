// 引入koa, 和koa 1.x 不同, 在koa2中，我们导入的是一个class，因此用大写的 Koa 表示：
const Koa = require('koa');

const controller = require('./controller');     // 取得一组路由 router.routes();
console.log(controller);

const bodyParser = require('koa-bodyparser');   // 处理post请求

// 创建一个Koa对象表示web app 本身
const app = new Koa();

app.use(bodyParser());  // 处理post请求

// add router middleware 
app.use(controller('controllers'));     // 如果不传参数默认扫描目录为 'controllers'


// 在端口 3001 监听
app.listen(3001);
console.log(`app started at port 3001`);