const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const staticServer = require('koa-static');
const { systemLogger, errorLogger, accessLogger } = require('./config/logConfig');
const config = require('./config/index');
const responseFormatter = require('./middlewares/responseFormatter');

const router = new Router();
const index = require('./routes/index');
const api = require('./routes/api');

const home = staticServer(path.join(__dirname)+'/public/');

const app = new Koa();

app.use(accessLogger());

// 允许跨域
app.use(cors());

// 参数写入body
app.use(KoaBody());

// 静态服务器
app.use(home);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  try {
    await next();
  } catch (error) {
    const ms = new Date() - start;
    systemLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    errorLogger.error('server error', error);
  }
  const ms = new Date() - start;
  systemLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// 响应格式化
app.use(responseFormatter('^/api'));

// 服务测试路由
router.use('/', index.routes(), index.allowedMethods());
// api地址
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods({
  throw: true
}));

app.on('error', (err, ctx) => {
  errorLogger.error('server error', err);
  console.log('error:', err);
});

app.listen(config, () => {
  console.log(`the server is listening on:${config.port} port`);
});
