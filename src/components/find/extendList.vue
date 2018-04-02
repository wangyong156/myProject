<template>
  <div>
   <div class="title">排行榜</div>
    <div v-show='show' class="wrap" v-for='(item,index) in list'>
      <div class="icon" v-if='index<3'>
        <img v-if='index==0' src="../../assets/ranking_first.png" alt="">
        <img v-if='index==1' src="../../assets/ranking_second.png" alt="">
        <img v-if='index==2' src="../../assets/ranking_third.png" alt="">
      </div>
      <div v-else class="icon">
        <span>{{index+1}}</span>
      </div>
      <div class="details">
        <div class="user">
          <span>{{item.user}}</span>
        </div>
        <div class="products">推广
          <span>{{item.product}}</span>人	
        </div>
        <div class="profit">
          <span>{{item.profit}}</span>
          <br>
          <span class="Price">{{item.Price}}</span>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
 	props: ['extendList'],
	data(){
	    return {
	      list:[
	        {
	          user:'h******',
	          time:'1小时前',
	          product:'23',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	        {
	          user:'h******',
	          time:'1小时前',
	          product:'54',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	        {
	          user:'h******',
	          time:'1小时前',
	          product:'56',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	        {
	          user:'h******',
	          time:'1小时前',
	          product:'2',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	         {
	          user:'h******',
	          time:'1小时前',
	          product:'23',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	         {
	          user:'h******',
	          time:'1小时前',
	          product:'234',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        },
	         {
	          user:'h******',
	          time:'1小时前',
	          product:'234',
	          number:'2500股',
	          profit:'获得',
	          Price:'3210.00'
	        }
	      ]
	    }
	 },
  	props: {
	    show: {
	      type: Boolean,
	      default: true
	    }
  	}
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.title{
	padding: 0 @p30;
	font-size:@f28;
	height: 1.0933rem;
	line-height: 1.0933rem;
	color: white;
}
.wrap {
  height: 1.6rem;
  color: @fcolor;
  font-size: 0.37333rem;
  padding: 0 @p30;
  border-bottom: 1px solid #1f232e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon{
    width: 0.64rem;
    height: 0.73333rem;
    text-align: center;
  }
  img {
    width: 0.64rem;
    height: 0.73333rem;
  }
  .details {
    position: relative;
    height: 1.6rem;
    width: 7.81333rem;
    margin-left: 0.74667rem;
    div {
      position: absolute;
      line-height: 1.5;
    }
    .user {
      top: 0.5rem;
      left: 0;
    }
    .products {
      top: 0.5rem;
      left: 3rem;
      span{
      	color: #ffd900;
      }
    }
    .profit {
      top: 0.3rem;
      right: 0;
    }
    .tips {
      color: @Color;
      font-size: 0.32rem;
    }
    .Price {
      color: @actColor;
      font-size: 0.32rem;
    }
  }
}
</style>
