var fn_login = async (ctx, next) => {
    ctx.response.body = `<h1>登录</h1>
        <form action="/signin" method="post">
            <p>Name：<input type="text" name="name" value="weber"></p>
            <p>Password：<input type="password" name="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
};

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';

    console.log(`signin with name: ${name} , password: ${password}`);
    
    if(name === 'weber' && password === '123456'){
        ctx.response.body = `<h1>Welcome, ${name}! ...</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed. <a href="/login.html">Try again</a></h1>`
    }
};

// 通过module.exports把两个 URL 处理函数暴露出来
module.exports = {
    'GET /login.html': fn_login,
    'POST /signin': fn_signin
}