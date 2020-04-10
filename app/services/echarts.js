const path = require('path');
const fs = require('fs');
const echarts = require('node-echarts-canvas');
const echartsConfig = require('../../store/echarts');

const imagePath = path.join('./public/images');

const types = {
  "bars": "bar",
  "lines": "line"
};

exports.generate = ({ id: filename, option}) => {
  const { type, xData, yData, xName, yName } = option;
  let echartsOption = echartsConfig[type];
  if (type === 'bars' || type === 'lines') {
    echartsOption.xAxis.data = xData;
    echartsOption.xAxis.name = xName;
    echartsOption.yAxis.name = yName;
    yData.map(ele => {
      echartsOption.series.push({
        type: types[type],
        data: ele
      });
    });
  }
  if (type === 'bar' || type === 'line') {
    echartsOption.xAxis.data = xData;
    echartsOption.xAxis.name = xName;
    echartsOption.yAxis.name = yName;
    echartsOption.series.push({
      type: type,
      data: yData
    });
  }
  config = {
    width: 800,
    height: 400,
    option: echartsOption,
    path: `${imagePath}/${filename}.png`, // Path is filepath of the image which will be created.
    enableAutoDispose: true  // Enable auto-dispose echarts after the image is created.
  };
  // console.log(JSON.stringify(config));
  echarts(config);
}
