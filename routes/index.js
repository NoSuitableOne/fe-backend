const Router = require('@koa/router');

const index = new Router();

index.get('/', async (ctx, next) => {
  ctx.body = 'server is on'; 
});

module.exports = index;
