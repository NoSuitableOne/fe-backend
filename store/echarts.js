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
  },
  grid: {
    top: 40,
    bottom: 40,
    left: 100,
    right: 100
  },
  color: ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"]
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
