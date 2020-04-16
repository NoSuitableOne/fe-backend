const ApiError = require('../error/ApiError');
const apiErrorNames = require('../error/ApiErrorNames');

module.exports = {
  generate: (params) => {
    let result = true;
    const { tasks } = params;
    if (!tasks || !Array.isArray(tasks)) {
      result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
      result.setMessage('任务参数tasks必须是数组');
      return result;
    }
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].id) {
        result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
        result.setMessage('每一个task必须有id');
        return result;
      }
      if (!tasks[i].option) {
        result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
        result.setMessage(`task<${tasks[i].id}>必须有option`);
        return result;
      }
      if (!tasks[i].option.type) {
        result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
        result.setMessage(`task<${tasks[i].id}>必须有合法type`);
        return result;
      }
      if (!tasks[i].option.xData || !Array.isArray(tasks[i].option.xData)) {
        result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
        result.setMessage(`task<${tasks[i].id}>必须有合法xData`);
        return result;
      }
      if (!tasks[i].option.yData || !Array.isArray(tasks[i].option.yData)) {
        result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
        result.setMessage(`task<${tasks[i].id}>必须有合法yData`);
        return result;
      }
      if (tasks[i].option.label) {
        let label = tasks[i].option.label;
        if (label && (!Array.isArray(label) && (!label.data || !Array.isArray(label.data)))) {
          result = new ApiError(apiErrorNames.INVALIDATE_PARAMS);
          result.setMessage(`task<${tasks[i].id}>必须有合法label(label: [] || label: {data: [], ...})`);
          return result;
        }
      }
    }
    return result;
  }
};