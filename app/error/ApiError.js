const ApiErrorNames = require('./ApiErrorNames');
/**
 * 自定义Api异常
 */
class ApiError extends Error {
  //构造方法
  constructor (errorName) {
    super();
    const errorInfo = ApiErrorNames.getErrorInfo(errorName);
    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }

  // 自定义message
  setMessage (msg) {
    this.message = `${this.message}: ${msg}`;
  }
}

module.exports = ApiError;
