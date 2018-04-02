<template>
  <div class="chartWrap">
    <div id="mainTime"></div>
    <div class="list">
      <ul>
        <li>卖</li>
        <li>
          <span>5</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>4</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>3</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>2</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>1</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
      </ul>
      <ul style="margin-top:0.5333rem;">
        <li>买</li>
        <li>
          <span>1</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>2</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>3</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>4</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
        <li>
          <span>5</span>
          <span class="greenColor">36.68</span>
          <span>4553</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    initMainTime() {
      var echarts = require('echarts/lib/echarts');
      require('echarts/lib/chart/bar');
      require('echarts/lib/chart/line');
      require('echarts/lib/component/axis');
      require('echarts/lib/component/axisPointer');
      require('echarts/lib/component/dataZoom');
      let mainTime = document.getElementById('mainTime')
      // let dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr')
      // if (dpr == '2') {
      //   mainTime.style.width = '480px'
      //   mainTime.style.height = '500px'
      // }
      var myChart = echarts.init(mainTime)
      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i]);
          volumns.push(rawData[i][4]);
        }
        return {
          categoryData: categoryData,
          values: values,
          volumns: volumns
        };
      }

      function calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-');
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
          }
          result.push(+(sum / dayCount).toFixed(3));
        }
        return result;
      }
      var getDpr = function getDpr() {
        var dpr = $('html').attr('data-dpr');
        if (dpr == 1) {
          return 12;
        } else if (dpr == 2) {
          return 24;
        } else {
          return 36;
        }
      };
      var borderDpr = function getDpr() {
        var dpr = $('html').attr('data-dpr');
        if (dpr == 1) {
          return 1;
        } else if (dpr == 2) {
          return 2;
        } else {
          return 3;
        }
      };
      var rawData = [["2016-05-03", 17870.75, 17750.91, 17670.88, 17870.75, 97060000], ["2016-05-04", 17735.02, 17651.26, 17609.01, 17738.06, 95020000], ["2016-05-05", 17664.48, 17660.71, 17615.82, 17736.11, 81530000], ["2016-05-06", 17650.3, 17740.63, 17580.38, 17744.54, 80020000], ["2016-05-09", 17743.85, 17705.91, 17668.38, 17783.16, 85590000], ["2016-05-10", 17726.66, 17928.35, 17726.66, 17934.61, 75790000], ["2016-05-11", 17919.03, 17711.12, 17711.05, 17919.03, 87390000], ["2016-05-12", 17711.12, 17720.5, 17625.38, 17798.19, 88560000], ["2016-05-13", 17711.12, 17535.32, 17512.48, 17734.74, 86640000], ["2016-05-16", 17531.76, 17710.71, 17531.76, 17755.8, 88440000], ["2016-05-17", 17701.46, 17529.98, 17469.92, 17701.46, 103260000], ["2016-05-18", 17501.28, 17526.62, 17418.21, 17636.22, 79120000], ["2016-05-19", 17514.16, 17435.4, 17331.07, 17514.16, 95530000], ["2016-05-20", 17437.32, 17500.94, 17437.32, 17571.75, 111990000], ["2016-05-23", 17507.04, 17492.93, 17480.05, 17550.7, 87790000], ["2016-05-24", 17525.19, 17706.05, 17525.19, 17742.59, 86480000], ["2016-05-25", 17735.09, 17851.51, 17735.09, 17891.71, 79180000], ["2016-05-26", 17859.52, 17828.29, 17803.82, 17888.66, 68940000], ["2016-05-27", 17826.85, 17873.22, 17824.73, 17873.22, 73190000], ["2016-05-31", 17891.5, 17787.2, 17724.03, 17899.24, 147390000], ["2016-06-01", 17754.55, 17789.67, 17664.79, 17809.18, 78530000], ["2016-06-02", 17789.05, 17838.56, 17703.55, 17838.56, 75560000], ["2016-06-03", 17799.8, 17807.06, 17689.68, 17833.17, 82270000], ["2016-06-06", 17825.69, 17920.33, 17822.81, 17949.68, 71870000], ["2016-06-07", 17936.22, 17938.28, 17936.22, 18003.23, 78750000], ["2016-06-08", 17931.91, 18005.05, 17931.91, 18016, 71260000], ["2016-06-09", 17969.98, 17985.19, 17915.88, 18005.22, 69690000], ["2016-06-10", 17938.82, 17865.34, 17812.34, 17938.82, 90540000], ["2016-06-13", 17830.5, 17732.48, 17731.35, 17893.28, 101690000], ["2016-06-14", 17710.77, 17674.82, 17595.79, 17733.92, 93740000], ["2016-06-15", 17703.65, 17640.17, 17629.01, 17762.96, 94130000], ["2016-06-16", 17602.23, 17733.1, 17471.29, 17754.91, 91950000], ["2016-06-17", 17733.44, 17675.16, 17602.78, 17733.44, 248680000], ["2016-06-20", 17736.87, 17804.87, 17736.87, 17946.36, 99380000], ["2016-06-21", 17827.33, 17829.73, 17799.8, 17877.84, 85130000], ["2016-06-22", 17832.67, 17780.83, 17770.36, 17920.16, 89440000]]
      var data = splitData(rawData);
      var option;
      myChart.setOption(option = {
        animation: false,
        grid: [
          {
            top: '1%',
            left: '1%',
            right: '1%',
            bottom: '35%',
            show: true,
            borderWidth: borderDpr(),
            borderColor: '#777'
          },
          {
            show: true,
            left: '1',
            right: '1',
            top: '75%',
            height: '20%',
            borderWidth: borderDpr(),
            borderColor: '#777'
          }
        ],
        axisPointer: {
          link: { xAxisIndex: 'all' }
        },
        xAxis: [
          {
            type: 'category',
            data: data.categoryData,
            boundaryGap: false,
            splitLine: { show: true, lineStyle: { color: '#777' } },
            axisLine: { onZero: false, show: false, lineStyle: { color: '#777' } },
            axisLabel: {
              textStyle: {
                fontSize: getDpr(),
                color: '#fff',
                align: 'left'
              },
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              label: {
                formatter: function (params) {
                  var seriesValue = (params.seriesData[0] || {}).value;
                  return params.value
                    + (seriesValue != null
                      ? '\n' + echarts.format.addCommas(seriesValue)
                      : ''
                    );
                }
              }
            }
          }
        ],
        yAxis: [
          {
            scale: false,
            position: 'right',
            splitNumber: 2,
            min: 'dataMin',
            max: 'dataMax',
            splitLine: { show: true, lineStyle: { color: '#777' } },
            axisLine: {
              show: false,
              onZero: false,
              lineStyle: { color: '#777' }
            },
            axisLabel: {
              inside: true,
              formatter: '{value}\n',
              textStyle: {
                fontSize: getDpr(),
                color: '#56627c'
              },
              showMinLabel: false,
              showMaxLabel: false
            },
            axisTick: {
              show: false
            }
          },
          {
            scale: true,
            gridIndex: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 0],
            start: 0,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 0],
            type: 'inside',
            start: 0,
            end: 100
          }
        ],
        calculable: true,
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 136, 212, 0.2)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            data: data.volumns
          },

          {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList;
                  if (data.values[params.dataIndex][1] > data.values[params.dataIndex][0]) {
                    colorList = '#FD1050';
                  } else {
                    colorList = '#0CF49B';
                  }
                  return colorList;
                },
              }
            },
            data: data.volumns
          }
        ]
      })
      // window.onresize = myChart.resize;
    }
  },
  mounted() {
    this.initMainTime()
  }
}
</script>


<style lang="less" scoped>
@import '../../../less/config.less';
.chartWrap {
  height: 7.92rem;
  padding: @marginbm @p30 0;
  position: relative;
  #mainTime {
    width: 6.4rem;
    height: 6.6667rem;
  }
  .list {
    position: absolute;
    top: @marginbm;
    right: @p30;
    height: 7.65333rem;
    color: @fcolor;
    font-size: @fsize;
    li {
      height: 0.5rem;
    }
    span {
      display: inline-block;
    }
    .greenColor {
      color: #33ffc3;
      width: 1.5rem;
      text-align: center;
    }
  }
}
</style>
