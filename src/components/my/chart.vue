<template>
	<div>
		<div id="main"></div>
	</div>
</template>

<script>
	export default {
		methods:{
			init(){
				var echarts = require('echarts');
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main'));
				// 绘制图表
				myChart.setOption({
				    title: {
				        text: '收益状况'
				    },
				    tooltip: {},
				    xAxis: {
				        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				    },
				    yAxis: {},
				    series: [{
				        name: '销量',
				        type: 'bar',
				        data: [5, 20, 36, 10, 10, 20]
				    }]
				});
			}
		},
		mounted(){
			this.init();
		}
	}

</script>

<style lang="less" scoped>
@import '../../less/config.less';
#main{
	width: 100%;
	height:5.1033334rem;
}
</style>