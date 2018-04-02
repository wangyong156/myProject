<template>
  <div class="settlement">
    <div class="pershares" v-for="(item,index) in lists">
      <div class="title">
        <div class="big">{{item.title}}&nbsp;&nbsp;
          <span>{{item.code}}</span>
        </div>
        <span>自主卖出</span>
      </div>
      <div class="content">
        <div class="grey">
          <div class="Purchase">
            <span class="red dif">看涨1手</span>
            <span>买入&nbsp;&nbsp;{{item.buyPrices}}</span>
            <span>现价&nbsp;&nbsp;{{item.presentPrice}}</span>
          </div>
          <div class="presentPrice">
            <span class="red">{{item.updownNumber}}</span>
            <span>止盈&nbsp;&nbsp;{{item.targetProfit}}</span>
            <span>止损&nbsp;&nbsp;{{item.stopPrice}}</span>
          </div>
        </div>
        <div class="right">
          <span>结算成功</span>
        </div>
      </div>
      <!--<div class="detals" @click='todetals(index)'>-->
        <!--<span class="todetals">-->
          <!--查看详情-->
        <!--</span>-->
      <!--</div>-->
      <div class="msg" v-show='flag==index'>
        <p>
          {{item.msg}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: -1,
        lists: [
          {
            title: '中过平安',
            code: 'SH456133',
            updownNumber: '+80',
            buyPrices: '23506',
            targetProfit: '13215',
            presentPrice: '23065',
            stopPrice: '-1325',
            msg: '成功'
          },
          {
            title: '热水电费',
            code: 'SH456133',
            updownNumber: '+80',
            buyPrices: '23506',
            targetProfit: '13215',
            presentPrice: '23065',
            stopPrice: '-1325',
            msg: '成功'
          },
          {
            title: '防守对方',
            code: 'SH456133',
            updownNumber: '+80',
            buyPrices: '23506',
            targetProfit: '13215',
            presentPrice: '23065',
            stopPrice: '-1325',
            msg: '成功'
          }
        ],
      }
    },
    methods: {
      todetals(index) {
        console.log('todetals')
        if (this.flag == index) {
          this.flag = -1
        } else {
          this.flag = index
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';
  .settlement {
    width: 100%;
    height: auto;
    overflow: auto;
    background-color: @bgColor;
    -webkit-overflow-scrolling: touch;
    padding-top: @marginbm;
    .pershares {
      width: 100%;
      padding: 0 @p30;
      background-color: @FFF;
      margin-bottom: @marginbm;
    }
    .title {
      height: 1.17333rem;
      line-height: 1.17333rem;
      font-size: 0.48rem;
      color: @fcolor;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: inline-block;
        color:@newColor;
      }
      span {
        color: @Color;
        font-size: 0.32rem;
      }
    }
    .content {
      height: 2.56rem;
      line-height: 2;
      color: #ff335b;
      font-size: 0.37333rem;
      border-top: solid 1px @ddd;
      border-bottom: solid 1px @ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grey {
        width: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #babbbc;
        font-size: 0.32rem;
        span {
          display: block;
        }
        .red{
          color:#ff335b;
        }
        .dif{
          font-size: 0.37333rem;
        }
      }
      .right {
        width: 1.3333rem;
        height: 1.3333rem;
        line-height: 1.2;
        text-align: center;
        font-size: @f32;
        color: @fcolor;
        padding: 0.2rem;
        background-color: #ccc;
        border-radius: 0.08rem;
      }
    }
    .detals {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: @actColor;
    }
    .msg {
      line-height: 1.8;
      background-color: @liBg;
      color: @Color;
      text-align: center;
    }
  }
</style>
