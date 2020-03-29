const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const echartsService = require('../services/echarts');

//获取二进制文件
exports.getFileBinary = async (ctx, next) => {
  const { id } = ctx.request.body;
  if (!id) {
    throw new ApiError(ApiErrorNames.TASK_ID_MISSED);
  }
  const { status } =  await echartsService.generate(id);
  if (status > 0) {
    ctx.body = {
      status: status,
      id: id
    }
  } else {
    ctx.body = {
      status: status,
      file: 'ab e1 c0 82',
      id: id
    }
  }
}
