const Router = require('@koa/router');
const echartsRouter = require('./echartsRouter');

const api = new Router();
api.use('/echarts', echartsRouter.routes(), echartsRouter.allowedMethods());

module.exports = api;
