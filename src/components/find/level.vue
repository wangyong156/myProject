<template>
	<div class="level">
		<div class="title">
			推广级别
		</div>
		<table border=0  class="black3">
			<tr  class="black9"><th>级别</th><th>下线交易<br />交易人数</th><th>佣金提成<br />比例</th><th>有效时间</th></tr>
			<tr>
				<td >初级推广员</td>
				<td>1-10</td>
				<td>5%</td>
				<td>半年</td>
			</tr>
			<tr>
				<td>中级推广员</td>
				<td>10-30人</td>
				<td>30%</td>
				<td>一年</td>
			</tr>
			<tr>
				<td>高级推广员</td>
				<td>30人以上</td>
				<td>30%</td>
				<td>永久</td>
			</tr>
		</table>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
@import '../../less/config.less';
	.level{
    background: @FFF;
		border-top:@fsize solid #f5f5f5;
		color:white;
		margin-top:@fsize;
		padding:.3rem @p30  1rem;
		margin-bottom:@fsize ;
		.title{
			font-size: @f28;
			color: @newColor;
      margin-bottom: .3rem;
		}
		table{
			width: 100%;
			font-size: @f24;
			border-collapse: collapse;
			tr{
				th{
					vertical-align:center;
          padding: .3rem  0;
          line-height:1.5;
				}
				td,th{
					text-align: center;
					border: 1px solid @ddd;
          padding: .22rem  0;
				}

			}
		}
	}

</style>
