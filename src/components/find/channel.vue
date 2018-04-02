<template>
	<div class="channel">
		<div class="buy">
			<span>----</span>
			<p>如何赚钱</p>
			<span>----</span>
		</div>
		<div class="buy_img">
			<ul>
				<li>
					<img class="img1" src="../../assets/promotion_icon1.png"/>
					<p>发送推广<br />链接给好友</p>
				</li>
				<li class="tobottom1">
					<img  src="../../assets/promotion_arrow_down.png"/>
				</li>
				<li class="img2">
					<img  src="../../assets/promotion_icon2.png"/>
					<p>点击链接<br />注册成为你的用户</p>
				</li>
				<li class="tobottom2">
					<img class="" src="../../assets/promotion_arrow_up.png"/>
				</li>
				<li>
					<img class="img3"  src="../../assets/promotion_icon3.png"/>
					<p>你的用户<br />开始交易</p>
				</li>
				<li class="tobottom3">
					<img src="../../assets/promotion_arrow_down.png"/>
				</li>
				<li class="img4">
					<img  src="../../assets/promotion_icon4.png"/>
					<p>开启<br />赚钱模式</p>
				</li>
			</ul>
		</div>
		<div class="buy">
			<span>----</span>
			<p>推广渠道</p>
			<span>----</span>
		</div>
		<div class="method">
			<p>朋友、微信、朋友圈、QQ、微博、博客、论坛</p>
			<p>或在自己的网站上推广</p>
		</div>
	</div>
</template>

<script>

</script>

<style lang="less" scoped>
@import '../../less/config.less';
	.channel{
		background:#141723;
		color: white;
		padding-top:.2rem;
		.buy{
			margin:.6rem 0rem;
			display:flex;
			justify-content: center;
			align-items: center;
			font-size:@f32;
			p{
				margin: 0 @f28;
			}
		}
		.buy_img{
			padding: 0 @p30;
			margin-top: .8rem;
			margin-bottom:.4rem;
			ul{
				width:100%;
				display:flex;
				justify-content:center;
				align-items: flex-start;
				li{
					text-align: center;
				}
				.img2,.img4{
						padding-top:.8rem;
				}
				.tobottom1{
					padding-top: .6rem;
				}
				.tobottom2{
					padding-top: .4rem;
				}
				.tobottom3{
					padding-top: .4rem;
				}

			}
		}
		.method{
			width: 9.2rem;
			height: 1.44rem;
			text-align: center;
			padding: @f28 0;
			border: 3px solid white;
			margin:0 auto;
			border-radius: 0.72rem;

		}

	}
</style>
