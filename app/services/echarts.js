const path = require('path');
const echarts = require('node-echarts-canvas');
const echartsConfig = require('../../store/echarts');

const imagePath = path.join('./public/images');

const types = {
  "bars": "bar",
  "lines": "line"
};

exports.generate = ({ id: filename, option}) => {
  const { type, xData, yData, xName, yName, title, label, custom = {} } = option;
  const { averageLine, showXValue, showMinMax } = custom;
  const echartsOption = Object.assign({}, {}, echartsConfig[type]);
  if (type === 'bars' || type === 'lines') {
    echartsOption.xAxis.data = xData;
    echartsOption.series = [];
    yData.map((ele, index) => {
      echartsOption.series.push({
        name: label? label[index] : `${index}`,
        type: types[type],
        data: ele
      });
      if (type === 'bars') {
        echartsOption.series[echartsOption.series.length - 1].barWidth = '10px';
        echartsOption.series[echartsOption.series.length - 1].barGap ='100%';
        if (showXValue) {
          echartsOption.series[echartsOption.series.length - 1].label = {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            distance: 12,
            verticalAlign: 'middle',
            textStyle: { // 数值样式
              color: 'black',
              fontSize: 12
            }
          };
        }
      }
    });
  }
  if (type === 'bar' || type === 'line') {
    echartsOption.xAxis.data = xData;
    echartsOption.series = [];
    echartsOption.series.push({
      type: type,
      data: yData
    });
    if (type === 'bar') {
      echartsOption.series[echartsOption.series.length - 1].barWidth = '10px';
      if (showMinMax) {
        let max = yData.reduce((num1, num2) => {
          return num1 > num2 ? num1 : num2}
        );
        let min = yData.reduce((num1, num2) => {
          return num1 < num2 ? num1 : num2}
        );
        echartsOption.series[echartsOption.series.length - 1].label = {
          show: true, // 开启显示
          position: 'top', // 在上方显示
          formatter: (params) => {
            if (params.value === max || params.value === min) {
              return params.value;    
            } else {
              return ''; 
            }
          },
          distance: 12,
          verticalAlign: 'middle',
          textStyle: { // 数值样式
            color: 'black',
            fontSize: 12
          }
        };
      }
    }
    if (averageLine) {
      echartsOption.series[echartsOption.series.length - 1].markLine = {
        symbol: "none",
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: params => {
                return `${params.name}: ${params.value}`;
              }
            }
          }
        },
        data: [
          {
            type: 'average',
            name: '平均值'
          }
        ]
      }
    }
    if (showMinMax) {

    }
  }
  // 标题
  if (title && title.length) {
    echartsOption.title.show = true;
    echartsOption.title.text = null;
    echartsOption.title.text = title;
  }
  // x轴名字
  if (xName) {
    echartsOption.xAxis.name = xName;
  }
  // y轴名字
  if (yName) {
    echartsOption.yAxis.name = yName;
    echartsOption.yAxis.nameLocation = 'middle';
    echartsOption.yAxis.nameGap = 40;
  }
  // 图例
  if (label && Array.isArray(label) && label.length) {
    echartsOption.legend.show = true;
    echartsOption.legend.data = label;
  }
  config = {
    width: 800,
    height: 400,
    option: echartsOption,
    path: `${imagePath}/${filename}.png`, // Path is filepath of the image which will be created.
    enableAutoDispose: true  // Enable auto-dispose echarts after the image is created.
  };

  console.log(JSON.stringify(config));
  echarts(config);
}
