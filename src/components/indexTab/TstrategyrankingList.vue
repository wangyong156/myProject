<template>
  <div>
    <div v-show='show' class="wrap" v-for='(item,index) in list'>
      <div  class="icon">
        {{item.code | codeTo2}}
      </div>
      <div class="details">
        <div class="user">
          <span>{{item.user}}</span>
          <br>
          <span class="tips">{{item.code}}</span>
        </div>
        <div class="products">
          <span>{{item.number}}</span>
          <br>
          <span class="tips">{{item.time}}</span>
        </div>
        <div class="profit" @click='toBuy(item)'>
          <span>{{item.buy}}</span>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {
          user:'兴隆健康',
          code:'SZ002105',
          number:'9000股',
          time:'一小时前累计交易',
          buy:'我要点买'
        },
         {
          user:'兴隆健康',
          code:'AZ002105',
          number:'9000股',
          time:'一小时前累计交易',
          buy:'我要点买'
        },
         {
          user:'兴隆健康',
          code:'SH002105',
          number:'9000股',
          time:'一小时前累计交易',
          buy:'我要点买'
        },
         {
          user:'兴隆健康',
          code:'SS002105',
          number:'9000股',
          time:'一小时前累计交易',
          buy:'我要点买'
        },
         {
          user:'兴隆健康',
          code:'AA002105',
          number:'9000股',
          time:'一小时前累计交易',
          buy:'我要点买'
        }
      ]
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods:{
    toBuy(item){
      console.log(item)
    }
  },
  filters:{
    codeTo2(value){
      return value.substring(0,2)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
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
    width: 0.37333rem;
    height:  0.37333rem;
    line-height: 1.6;
    background-color:#ff335b;
    border-radius:4px;
    font-size: 0.24rem;
    text-align: center
  }
  img {
    width: 0.64rem;
    height: 0.73333rem;
  }
  .details {
    position: relative;
    height: 1.6rem;
    width: 8.42267rem;
    margin-left: 0.26667rem;
    div {
      position: absolute;
      line-height: 1.5;
    }
    .user {
      top: 0.3rem;
      left: 0;
    }
    .products {
      top: 0.3rem;
      left: 2.5rem;
    }
    .profit {
      top: 0.45rem;
      right: 0;
      color: @actColor;
      border: 2px solid @actColor;
      border-radius: 2px;
      width: 1.86667rem;
      height: 0.58667rem;
      text-align: center
    }
    .tips {
      color: @Color;
      font-size: 0.32rem;
    }
  }
}
</style>
