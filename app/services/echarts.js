const path = require('path');
const echarts = require('node-echarts-canvas');
const echartsConfig = require('../../store/echarts');

const imagePath = path.join('./public/images');

const types = {
  "bars": "bar",
  "lines": "line"
};

const lineItemStyle = {
  normal: {
    label: {
      show: true
    }
  }
};

function formatter (value) {
  let ret = "";
  let maxLength = 5;
  let shortValue = value && value.length ? value.substring(0, 20) : "";
  let rowNum = value ? Math.ceil(shortValue.length / maxLength) : 1;
  if (rowNum > 1) {
    for (let i = 0; i < rowNum; i++) {
      let temp = "";
      let start = i * maxLength;
      let end = start + maxLength;
      temp =
        i !== rowNum - 1
          ? shortValue.substring(start, end) + "\n"
          : shortValue.substring(start, end);
      ret += temp;
    }
    if (value.length > 20) {
      ret += "...";
    }
    return ret;
  } else {
    return value;
  }
};

exports.generate = ({ id: filename, option}) => {
  const { type, xData, yData, xName, yName, title, label, custom = {} } = option;
  const { averageLine, showXValue, showMinMax } = custom;
  const echartsOption = Object.assign({}, {}, echartsConfig[type]);
  let xDataMaxString = xData.reduce((last, ele) => ele.length > last? ele.length : last  , 0);
  if (type === 'bars' || type === 'lines') {
    echartsOption.xAxis.data = xData;
    echartsOption.series = [];
    yData.map((ele, index) => {
      echartsOption.series.push({
        name: label? 
          (Array.isArray(label)? label[index] : label.data[index])
          : `${index}`,
        type: types[type],
        data: ele
      });
      if (type === 'bars') {
        echartsOption.series[echartsOption.series.length - 1].barWidth = '14px';
        echartsOption.series[echartsOption.series.length - 1].barGap ='120%';
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
      if (type === 'lines') {
        if (showXValue) {
          echartsOption.series[echartsOption.series.length - 1].itemStyle = lineItemStyle;
        } else {
          echartsOption.series[echartsOption.series.length - 1].itemStyle = false;
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
      echartsOption.series[echartsOption.series.length - 1].barWidth = '14px';
      if (showMinMax && yData.length) {
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
    if (type === 'line') {
      if (showXValue) {
        echartsOption.series[echartsOption.series.length - 1].itemStyle = lineItemStyle;
      } else {
        echartsOption.series[echartsOption.series.length - 1].itemStyle = false;
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
  }
  // 标题
  if (title && title.length) {
    echartsOption.title.show = true;
    echartsOption.title.text = title;
  } else {
    echartsOption.title.show = false;
  }
  // x轴名字
  if (xName) {
    echartsOption.xAxis.name = xName;
  } else {
    echartsOption.xAxis.name = '';
  }
  if (xDataMaxString > 6 || xData.length * echartsOption.series.length >= 8 ) {
    echartsOption.xAxis.axisLabel.formatter = formatter;
  }
  // y轴名字
  if (yName && yName.length) {
    let yNameStr = yName.split('').join('\n');
    echartsOption.yAxis.name = yNameStr;
    echartsOption.yAxis.nameLocation = 'middle';
    echartsOption.yAxis.nameGap = 40;
    echartsOption.yAxis.nameRotate = 0;
  } else {
    echartsOption.yAxis.name = '';
  }
  // 图例
  if (label) {
    if (Array.isArray(label) && label.length) {
      echartsOption.legend.show = true;
      echartsOption.legend.data = label;
      echartsOption.legend.top = 'bottom';
    }
    if (label.data && label.data.length) {
      echartsOption.legend.show = true;
      echartsOption.legend.data = label.data;
      if (label.position === 'top') {
        echartsOption.legend.top = 0;
        echartsOption.legend.right = 20;
      }
    }
  } else {
    echartsOption.legend.show = false;
  }
  let width = 800;
  let therehold = Math.floor(800 / (60 * echartsOption.series.length));
  if (xData.length && xData.length > therehold ) {
    width = 60 * echartsOption.series.length * xData.length;
  }
  config = {
    width: width,
    height: 450,
    option: echartsOption,
    path: `${imagePath}/${filename}.png`, // Path is filepath of the image which will be created.
    enableAutoDispose: true  // Enable auto-dispose echarts after the image is created.
  };

  // console.log(JSON.stringify(config));
  echarts(config);
}
