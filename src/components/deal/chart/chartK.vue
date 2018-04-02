<template>
    <div class="chartWrap">
        <div id="main"></div>
    </div>
</template>
<script>

export default {
    methods: {
        init() {
            var echarts = require('echarts/lib/echarts');
            require('echarts/lib/chart/bar');
            require('echarts/lib/chart/candlestick');
            require('echarts/lib/component/axis');
            require('echarts/lib/component/axisPointer');
            require('echarts/lib/component/dataZoom');
            let main = document.getElementById('main')
            // let dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr')
            // if (dpr == '2') {
            //     main.style.width = '660px'
            //     main.style.height = '574px'
            // }
            var myChart = echarts.init(main)
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
            var rawData = [["2016-05-25", 17735.09, 17851.51, 17735.09, 17891.71, 79180000], ["2016-05-26", 17859.52, 17828.29, 17803.82, 17888.66, 68940000], ["2016-05-27", 17826.85, 17873.22, 17824.73, 17873.22, 73190000], ["2016-05-31", 17891.5, 17787.2, 17724.03, 17899.24, 147390000], ["2016-06-01", 17754.55, 17789.67, 17664.79, 17809.18, 78530000], ["2016-06-02", 17789.05, 17838.56, 17703.55, 17838.56, 75560000], ["2016-06-03", 17799.8, 17807.06, 17689.68, 17833.17, 82270000], ["2016-06-06", 17825.69, 17920.33, 17822.81, 17949.68, 71870000], ["2016-06-07", 17936.22, 17938.28, 17936.22, 18003.23, 78750000], ["2016-06-08", 17931.91, 18005.05, 17931.91, 18016, 71260000], ["2016-06-09", 17969.98, 17985.19, 17915.88, 18005.22, 69690000], ["2016-06-10", 17938.82, 17865.34, 17812.34, 17938.82, 90540000], ["2016-06-13", 17830.5, 17732.48, 17731.35, 17893.28, 101690000], ["2016-06-14", 17710.77, 17674.82, 17595.79, 17733.92, 93740000], ["2016-06-15", 17703.65, 17640.17, 17629.01, 17762.96, 94130000], ["2016-06-16", 17602.23, 17733.1, 17471.29, 17754.91, 91950000], ["2016-06-17", 17733.44, 17675.16, 17602.78, 17733.44, 248680000], ["2016-06-20", 17736.87, 17804.87, 17736.87, 17946.36, 99380000], ["2016-06-21", 17827.33, 17829.73, 17799.8, 17877.84, 85130000], ["2016-06-22", 17832.67, 17780.83, 17770.36, 17920.16, 89440000]]
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
                        borderWidth: 'borderDpr()',
                        borderColor: '#777'
                    },
                    {
                        left: '1%',
                        right: '1%',
                        top: '72%',
                        height: '20%',
                        show: true,
                        borderWidth: borderDpr(),
                        borderColor: '#777'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.categoryData,
                        boundaryGap: true,
                        splitLine: { show: true, lineStyle: { color: '#777', width: borderDpr() } },
                        axisLine: { onZero: false, show: false },
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
                        boundaryGap: true,
                        axisLine: { onZero: false },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        splitNumber: 20,
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
                        min: '12000',
                        splitNumber: 2,
                        splitLine: { show: true, lineStyle: { color: '#777', width: borderDpr() } },
                        axisLine: {
                            show: true,
                            onZero: false,
                            lineStyle: { color: '#777', width: borderDpr() }
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
                        xAxisIndex: [0, 1],
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        xAxisIndex: [0, 1],
                        type: 'inside',
                        start: 0,
                        end: 100
                    }
                ],
                calculable: true,
                series: [
                    {
                        name: 'Dow-Jones index',
                        type: 'candlestick',
                        data: data.values,
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        },
                        tooltip: {
                            formatter: function (param) {
                                param = param[0];
                                return [
                                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                    'Open: ' + param.data[0] + '<br/>',
                                    'Close: ' + param.data[1] + '<br/>',
                                    'Lowest: ' + param.data[2] + '<br/>',
                                    'Highest: ' + param.data[3] + '<br/>'
                                ].join('');
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        symbol: 'none',
                        data: calculateMA(5, data),
                        smooth: true,
                        lineStyle: {
                            normal: { opacity: 0.5 }
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        symbol: 'none',
                        data: calculateMA(10, data),
                        smooth: true,
                        lineStyle: {
                            normal: { opacity: 0.5 }
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        symbol: 'none',
                        data: calculateMA(20, data),
                        smooth: true,
                        lineStyle: {
                            normal: { opacity: 0.5 }
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        symbol: 'none',
                        data: calculateMA(30, data),
                        smooth: true,
                        lineStyle: {
                            normal: { opacity: 0.5 }
                        }
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
            // window.onresize = function () {
            //     myChart.resize;
            //     console.log(111)
            // }
        }
    },
    mounted() {
        this.init()
        console.log(111)
    }
}
</script>


<style lang="less" scoped>
@import '../../../less/config.less';
.chartWrap {
    height: 7.92rem;
    padding: @marginbm @p30 0;
    #main {
        width: 9.2rem;
        height: 7.6533rem;
    }
}
</style>
