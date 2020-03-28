var echarts = require('node-echarts-canvas');
var config = {
    width: 100, // Image width, type is number.
    height: 100, // Image height, type is number.
    option: {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    }, // Echarts configuration, type is Object.
    //If the path  is not set, return the Buffer of image.
    path:  './test.png', // Path is filepath of the image which will be created.
    enableAutoDispose: true  //Enable auto-dispose echarts after the image is created.
}
 
echarts(config);
