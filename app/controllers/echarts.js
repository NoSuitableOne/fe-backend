const echartsService = require('../services/echarts');
const echartsValidator = require('../validators/echarts');

//获取二进制文件
exports.generate = async (ctx, next) => {
  let validated = echartsValidator.generate(ctx.request.body);
  const { tasks } = ctx.request.body;
  if (validated === true) {
    tasks.map(task => {
      echartsService.generate({
        id: task.id,
        option: task.option
      });
    });
  } else {
    throw validated;
  }
  await next();
}
