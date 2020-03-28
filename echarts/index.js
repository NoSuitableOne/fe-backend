// const getRawBody = require('raw-body');
const node_echarts = require('node-echarts');

module.exports.handler = function(req, resp, context) {
  getRawBody(req, function(err, body) {
    获取post传递的参数,参数格式见:https://github.com/hellosean1025/node-echarts
    const bodyStr = JSON.parse(body.toString('utf-8'))

    生成echarts图表
    const pngBuffer = node_echarts(bodyStr)

    将Buffer转换为base64
    resp.send(pngBuffer.toString('base64'))
  });
}
