
const Router = require('@koa/router');
const echartsController = require('../../app/controllers/echarts');

const router = new Router();

router.post('/generate', echartsController.generate);

module.exports = router;