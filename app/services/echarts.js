const path = require('path');
const fs = require('fs');
const echarts = require('node-echarts-canvas');
const echartsConfig = require('../../store/echarts');

const imagePath = path.join('./public/images');

exports.generate = ({ id: filename, option}) => {
  const { type, xData, yData, xName } = option;
  let echartsOption = echartsConfig[type];
  if (type === 'line') {
    echartsOption.xAxis.data = xData;
    echartsOption.xAxis.name = xName;
    yData.map(ele => {
      echartsOption.series.push({
        type: 'line',
        data: ele
      });
    });
  }
  if (type === 'bar') {
    echartsOption.xAxis.data = xData;
    yData.map(ele => {
      echartsOption.series.push({
        type: 'bar',
        data: ele
      });
    });
  }
  if (type === 'multiBar') {
    echartsOption.xAxis.data = xData;
    yData.map(ele => {
      echartsOption.series.push({
        type: 'bar',
        data: ele
      });
    });
  }
  config = {
    width: 2000,
    height: 2000,
    option: echartsOption,
    path: `${imagePath}/${filename}.png`, // Path is filepath of the image which will be created.
    enableAutoDispose: true  // Enable auto-dispose echarts after the image is created.
  };
  echarts(config);
}
