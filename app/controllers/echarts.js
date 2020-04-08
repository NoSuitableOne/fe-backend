const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const echartsService = require('../services/echarts');

//获取二进制文件
exports.generate = async (ctx, next) => {
  const { id, option } = ctx.request.body;
  if (!id) {
    throw new ApiError(ApiErrorNames.TASK_ID_MISSED);
  }
  if (!option || !option.type) {
    throw new ApiError(ApiErrorNames.INVALIDATE_PARAMS);
  }
  echartsService.generate({id, option});
  await next();
}
