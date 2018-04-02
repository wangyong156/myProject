<template>
	<div class="box">
		<div class="conent">
			<div class="money">已获得佣金 <br /> <span class="quantity">{{item.reward}}</span> <p class="units">元</p></div>
			<div class="border"></div>
      <div class="scale ">佣金比例 <br /><span class="quantity reward">{{item.rewardScale + '%'}}</span> <br /> <br />
       <!-- <img class="vip-icon" src="../../assets/icon_common vip.png"/>-->
      </div>
      <div class="border"></div>
      <!--<div class="myuser"><p>我的用户</p> <br /> <p>{{item.people}} </p></div>-->
      <div class="money">我的下线用户 <br /><span class="red">{{item.inviteNum}}</span> <p class="units">交易 <span class="quantity">{{item.tradeNum}}</span> 人</p></div>
		</div>

	</div>
</template>

<script>
	export default {
	    props: {
	        item: {}
	    },
	    methods: {
	        toNext() {
	            this.$emit('toNext')
	        }
	    }
	}

</script>
<style lang="less" scoped>
@import '../../less/config.less';

  .quantity{
    color: @titleColor;
  }
	.box{
		background:@FFF;
		width:100%;
		color: white;
    .vip-icon{
      height: .65rem;
    }
    .units{
     padding-top:.4rem;
    }
		.conent{
			display:flex;
			align-items: space-between;
			justify-content:center;
			padding:@p30 0;
			color:@newColor;
			font-size:@f28;
			.money,.scale{
				flex: 1;
				text-align: center;
				line-height: 150%;

			}
			.border{
				width: 1px;
				height: 1.6rem;
				background: @fColor;
			}
		}
    .reward{
      position: relative;
      top: .38rem;
    }
		.myuser{
			font-size:@f28;
			display: flex;
			padding:0 @p30 ;
			border-top: #262934 1px solid;
			justify-content: space-between;
			align-items: center;
			height: @hwrap;
			p{
				img{
					vertical-align: center;
				}
			}
		}
	}
</style>
