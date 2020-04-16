const ApiError = require('../app/error/ApiError');

/**
 * 在app.use(router)之前调用
 */
const responseFormatter = (ctx) => {
  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      success: true,
      message: ctx.body.message,
      data: ctx.body.data
    }
  } else {
    ctx.body = {
      success: true,
      message: 'success'
    }
  }
}

const urlFilter = (pattern) => {
  return async (ctx, next) => {
    const reg = new RegExp(pattern);
    try {
      //先去执行路由
      await next();
    } catch (error) {  
      //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
      if(error instanceof ApiError && reg.test(ctx.originalUrl)) {
        ctx.status = 200;
        ctx.body = {
          data: {
            code: error.code,
          },
          message: error.message
        }
      }
      // if (error.name === "unknowError") {
        if(reg.test(ctx.originalUrl)){
          responseFormatter(ctx);
        }
        // 继续抛，让外层中间件处理日志
        ctx.throw(500, error.message, ctx.body);
      // }
    }
    // 返回响应体
    if(reg.test(ctx.originalUrl)){
      responseFormatter(ctx);
    }
  }
}

module.exports = urlFilter;
