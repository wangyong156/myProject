<template>
  <div class="div">
  <div class="header">
    <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
    <span>查看战绩</span>
    <span class="img"></span>
  </div>
  <div class="contentWrap"></div>
  <div class="settlement">

    <mt-loadmore :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :autoFill="false">
    <ul>
    <div class="pershares" v-for="(item,index) in lists">
      <div class="title">
        <div class="big">
          <div>
            {{item.name}}&nbsp;&nbsp;
            <span class="title-number">{{item.code}}{{item.contract}}</span>
          </div>
          <i class="span">{{item.a}}策略号:{{item.orderNo}}</i>
        </div>
        <span class="type">{{item.settleTypeFormatter}}</span>
      </div>
      <div class="content">
        <div class="grey">
          <div class="Purchase">
            <span :class="color(item.direction)" class="dif">{{item.direction | evaluateTo}}</span>
            <span>开仓&nbsp;&nbsp;<i class="market-data">{{item.openPrice}}</i></span>
            <span>平仓&nbsp;&nbsp;<i class="market-data">{{item.settlePrice}}</i></span>
          </div>
          <div class="presentPrice">
            <span :class="settleMoneyColor(item.profit,item.status)">{{item.profit,item.exRate,item.code,item.status
            | exchangeRate}}</span>
            <span>止盈&nbsp;&nbsp;<i class="market-data">{{item.profitStopPrice}}</i></span>
            <span>止损&nbsp;&nbsp;<i class="market-data">{{item.loseStopPrice}}</i></span>
          </div>
        </div>
        <div class="right">
          <span>结算成功</span>
        </div>
      </div>
    </div>
    </ul>
    </mt-loadmore>
  </div>
  </div>
</template>

<script>
  import home from '../../api/home/index'
  import { toast } from '@/util/index'
  import {Loadmore} from 'mint-ui'
  import FundArrowList from '@/components/FundArrowList'


  export default {
    data() {
      return {
        star: 1,
        currentSize: 0,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode: "touch",  // iphone或安卓机存在问题

        isUp:true,
        flag: -1,
        lists: [
        ],
      }
    },
    components:{
      'v-FundArrowList': FundArrowList,
      'mt-loadmore': Loadmore
    },
    filters:{
      evaluateTo(value){
        if(value == '1'){
          return '买涨'+ value + '手';
        }else{
          return '买跌'+ value + '手';
        }
      },
      //根据价格汇率输出价格
      exchangeRate(profit,exchangeRate,code,status){
        if(status == 5){
          return '--';
        }else{
          let newPrice,newRete;
          if(profit<0){
            newPrice =  profit*100/100;
          }else {
            newPrice =  '+'+ profit*100/100;
          }

          let rete = (newPrice / exchangeRate).toFixed(2)*100/100;
          if(rete < 0){
            newRete =  rete;
          }else{
            newRete =  '+' + rete;
          }
          let moneyCode;
          if(code  ==  'GC' ||code  == 'CL' || code  =='SI'){
            moneyCode = '$'
          }else if(code  ==  'HSI' || code  =='MHI'){
            moneyCode = 'HK$'
          }else{
            moneyCode = '€'
          }
          return newPrice + '('+  moneyCode + newRete + ')';
        }
      }

    },
    methods:{
      color(v){
        if(v == 1 ){
          return 'up';
        }else{
          return 'down';
        }
      },
      //控制计算价格总额是否显示和颜色
      settleMoneyColor(profit,status){
        if(status == 5){
          return '';
        }else{
          if(profit < 0){
            return 'down'
          }else {
            return 'up'
          }
        }
      },
      back() {
        this.$router.back(-1)
      },
      getList(){
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          id:this.$route.query.userId,
          rows: 10,
          star: this.star
        }

        //我的跟单
        home.getRecord(senddata).then((res) => {
          if (res.data.code == 200) {
            this.lists = this.lists.concat(res.data.data.rows);
            this.currentSize = res.data.data.rows.length;
            this.total = res.data.data.totalPage;
            //判断是否大于总个数
            if (this.star == this.total) {
              this.allLoaded = true;
            } else {
              this.star = this.star + 1;
            }
          } else if (res.data.code == 401) {
            toast(res.data.message);
            var that = this;
            setTimeout(function () {
              that.$router.push({path: '/login'})
            }, 1000);
          } else {
            toast(res.data.message)
          }
        })
      }
    },
    mounted(){
      this.getList();
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '查看战绩'
      next()
    }
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';
  .up{
    color: @red;
  }
  .down{
    color: @downColor;
  }

  .header{
    padding:0 @p30;
    display: flex;
    justify-content:space-between;
    align-items: center;
    height:@hwrap;
    color:@newColor;
    font-size:.48rem;
    img,.img{
      width: 0.4rem;
        height: 0.4rem;
    }
  }
  .settlement {
    width: 100%;
    height: auto;
    overflow: auto;
    background-color: @bgColor;
    -webkit-overflow-scrolling: touch;
    color: #ffffff;
    top: 1.6rem;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    .pershares {
      width: 100%;
      padding: 0 @p30;
      background-color: @FFF;
      margin-bottom: @marginbm;
    }
    .title {
      height: 1.17333rem;
      line-height: 1.17333rem;
      font-size: 0.373333rem;
      color: @fcolor;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .type{
        color: @nine;
      }
      .big{
        width:60%;
        line-height:0;
        position:relative;
      }
      div {
        position: absolute;
        top: -0.1rem;
        color:@newColor;
      }
      .span {
        position: absolute;
        top: 0.35rem;
        font-size: 0.293333rem;
        color: @nine;
      }
      span {
        color: @Color;
        font-size: 0.32rem;
      }
      .title-number{
        color: #fff;
      }
    }
    .content {
      height: 2.56rem;
      line-height: 2;
      color: #ff335b;
      font-size: 0.37333rem;
      border-top: solid 1px @ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grey {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @nine;
        font-size: 0.32rem;
        span {
          display: block;
        }
        .Purchase{
          width: 3.1rem;
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
    .bottomTitle {
      width: 100%;
      height: 1.17333rem;
      line-height: 1.1733rem;
      position: fixed;
      bottom: 0;
      z-index: ccc9;
      background-color: @liBg;
      text-align: center;
      font-size: .373333rem;
      color: @fcolor;
      span {
        display: inline-block;
        height: 1.17333rem;
        line-height: 1.17333rem;
        color: #ff335b;
      }
    }
  }
  .market-data{
    color: #333;
  }
</style>
