const Koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const config = require('./config');
const responseFormatter = require('./middlewares/responseFormatter');

const router = new Router();
const index = require('./routes/index');
const api = require('./routes/api');

const app = new Koa();

// app.use(accessLogger());

// 允许跨域
app.use(cors());

// 响应格式化
app.use(responseFormatter('^/api'));

// 参数写入body
app.use(KoaBody());

// 服务测试地址
router.use('/', index.routes(), index.allowedMethods());
// api地址
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods({
  throw: true
}));

app.on('error', (err, ctx) => {
  // logger.error('server error', err, ctx);
  console.log(err);
});

app.listen(config, () => {
  console.log(`the server is listening on:${config.port} port`);
  // print.info(`the server is on:${config.port} port`);
});
