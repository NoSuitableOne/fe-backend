const echartsConfig = {
  line: {
      xAxis: {
          type: 'category',
          data: []
      },
      yAxis: {
          type: 'value'
      },
      series: []// Echarts configuration, type is Object.
  },
  bar: {
      xAxis: {
          type: 'category',
          data: []
      },
      yAxis: {
          type: 'value'
      },
      series: []// Echarts configuration, type is Object.
  },
  multiBar: {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    xAxis: {
            type: 'category',
            data: []
    },
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: []
  }
};

module.exports = echartsConfig;
