const baseConfig = {
  backgroundColor: '#fff',
  title: {
    show: false,
    text: '',
    subtext: '',
    left: 'left'
  },
  legend: {
    show: false,
    top: 'bottom'
  }
};

const echartsConfig = {
  line: {
    ...baseConfig,
    xAxis: {
      type: 'category',
      data: [],
      axisLabel:{
    		interval: 0
    	},
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
      data: [],
      axisLabel:{
    		interval: 0
    	}
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
      axisLabel:{
    		interval: 0
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
      data: [],
      axisLabel:{
    		interval: 0
    	}
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
