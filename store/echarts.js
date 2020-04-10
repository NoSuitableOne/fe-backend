const baseConfig = {
    backgroundColor: '#fff'
};

const echartsConfig = {
  line: {
    ...baseConfig,
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value',
    },
    series: []
  },
  lines: {
    ...baseConfig,
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    legend: {
      data: []
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
  },
  bar: {
    ...baseConfig,
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: []
    },
    yAxis: {
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      data: []
    },
    series: []
  },
  bars: {
    ...baseConfig,
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    legend: {
      data: []
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
