const Koa = require('koa');
const config = require('./config');
// const { accessLogger, print, logger } = require('./middlewares/logger');


const app = new Koa();

// app.use(accessLogger());

app.use(async ctx => {
  ctx.body = 'hello koa'
});

app.listen(config, () => {
  console.log(`the server is on:${config.port} port`);
  // print.info(`the server is on:${config.port} port`);
});