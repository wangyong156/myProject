<template>
  <div class="div">
    <div class="settlement">

      <div class="tc" v-show=" Length == false">
        <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
        <p class="black9 mt40 f28">暂无记录</p>
      </div>

      <mt-loadmore  :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                    :autoFill="false">
        <ul v-show="lists.length != 0">
          <div class="pershares" v-for="(item,index) in lists"  v-show="lists.length != 0" >
            <div class="title">
              <div class="big">
                <div>
                  {{item.name}}&nbsp;&nbsp;
                  <span class="title-number">{{item.code}}{{item.contract}}</span>
                </div>
                <i class="span">策略号:{{item.orderNo}}</i>
              </div>
              <span class="title-sm-type">{{item.settleTypeFormatter}}</span>
            </div>
            <div class="content">
              <div class="grey">
                <div class="Purchase">
                  <span :class="color(item.direction)" class="dif">{{item.direction, item.number | evaluateTo}}</span>
                  <span>开仓&nbsp;&nbsp;<span class="market-data">{{item.openPrice}}</span></span>
                  <span>平仓&nbsp;&nbsp;<span class="market-data">{{item.settlePrice}}</span></span>
                </div>
                <div class="presentPrice">
            <span :class="settleMoneyColor(item.profit,item.status)">{{item.profit,item.exRate,item.code,item.status
            | exchangeRate}}</span>
                  <span>止盈&nbsp;&nbsp;<span class="market-data">{{item.profitStopPrice}}</span></span>
                  <span>止损&nbsp;<span class="market-data">&nbsp;{{item.loseStopPrice}}</span></span>
                </div>
              </div>
              <div class="right">
                <span>{{item.status | orderStatusFn}}</span>
              </div>
            </div>
            <div class="profit-item">
              <p v-show="item.status == 6 && item.profit != 0 && item.profit > 0">盈利{{item.profit | dealProfit }}元 = 您获得<span :class="profitItemColor(item.profit, item.deposit, item.profitDeposit, item.allotRate)">{{item.profit, item.deposit, item.profitDeposit, item.allotRate | dealProfitUser }}</span>元 + 投资人分成{{item.profit,item.deposit,item.profitDeposit,item.allotRate | dealProfitInvestor }}元</p>
              <p v-show="item.status == 6 && item.profit != 0 && item.profit < 0">亏损{{item.profit | dealProfit }}元 = 您承担<span :class="profitItemColor(item.profit, item.deposit, item.profitDeposit, item.allotRate)">{{item.profit, item.deposit, item.profitDeposit, item.allotRate | dealProfitUser }}</span>元 + 投资人承担{{item.profit,item.deposit,item.profitDeposit,item.allotRate | dealProfitInvestor }}元</p>
            </div>

            <ul class="hidden-content " v-show='flag==index'>
              <li>开仓类型 &nbsp;&nbsp;{{item.openWay  | wayTo}}开仓</li>
              <li>平仓类型 &nbsp;&nbsp;{{item.settleWay  | wayTo}}平仓</li>
              <li>开仓时间 &nbsp;&nbsp;{{item.openTime || "--"}}</li>
              <li>平仓时间 &nbsp;&nbsp;{{item.settleTime || '--'}}</li>
              <li v-if="routeName != 'trade_sl'" @click="toInfo(item.id)">点买合同 &nbsp;&nbsp;<span class="more-a">查看合同详情</span></li>
            </ul>
            <div class="detals" @click='todetals(index)'>
              <span class="todetals"v-show='flag!=index' >
                  查看详情
               </span>
              <span class="todetals" v-show='flag==index'>
              收起
              </span>
            </div>
          </div>

        </ul>
      </mt-loadmore>
    </div>

    <!--<div class="bottomTitle" v-show="lists.length != 0">
      结算盈亏&nbsp;&nbsp;
      <span :class="moneyColor(this.allProfit)">{{allProfit}}</span>
    </div>-->


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
                scrollMode:"touch" ,  // iphone或安卓机存在问题

                Length: true,
                isUp:true,
                flag: -1,
                downText:'查看详情',
                lists: [],
                follow:1,    //1点买 模拟 2跟单
                routeName:""   //当前路由名

            }
        },
        props: {
            typeFlag: {} //1实盘，2模拟，3跟单
        },
        name: 'childSettled',
        components: {
            'v-FundArrowList': FundArrowList,
            'mt-loadmore':Loadmore
        },
        filters:{
            // 总盈亏
            dealProfit(profit){
                if(profit < 0){
                    return profit * (-100) / 100;
                }else{
                    return profit * 100 / 100;
                }
            },
            // 点买人分成
            dealProfitUser(profit, deposit, profitDeposit, allotRate){
                var  userMoney;
                if(profit < 0){
                    profit = profit * (-1);
                    userMoney = profit > deposit ? deposit*100/100 : profit*100/100;
                    return userMoney.toFixed(2);
                }else{
                    userMoney = profit > profitDeposit ? profitDeposit * allotRate*100/100 : profit * allotRate*100/100;
                    return userMoney.toFixed(2);
                }
            },
            // 投资人分成
            dealProfitInvestor(profit, deposit, profitDeposit, allotRate){
                if(profit < 0){
                    profit = profit * (-1);
                    return profit > deposit ? (profit*100 - deposit*100)/100 : 0;
                }else{
                    return profit > profitDeposit ? (profit - (profitDeposit * allotRate))*100/100 :(profit - (profit * allotRate).toFixed(2)) .toFixed(2) *100/100;
                }
            },
            evaluateTo(value, num) {
                if (value == '1') {
                    return '买涨' + num + '手';
                } else {
                    return '买跌' + num + '手';
                }
            },
            wayTo(v){
                if(v==1){
                    return '市价'
                }else{
                    return '限价'
                }
            },
            //根据订单状态
            orderStatusFn(status){
                if(status  == '4'){
                    return '结算中'
                }else if(status == '6'){
                    return '结算成功'
                }

            },
            //根据价格汇率输出价格
            exchangeRate(profit,exchangeRate,code,status){
                if(status == 4){
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
            profitItemColor(profit){
                if(profit<0){
                    return 'down'
                }else{
                    return 'up'
                }
            },
            childSettledFn() {
                this.lists = [];
                this.star = 1;
                this.currentSize= 0;
                this.getList();
            },
            //控制底部金额颜色
            moneyColor(val){
                if(val < 0){
                    return 'down'
                }else{
                    return 'up'
                }
            },
            //控制计算价格总额是否显示和颜色
            settleMoneyColor(profit,status){
                if(status == 4){
                    return '';
                }else{
                    if(profit < 0){
                        return 'down'
                    }else {
                        return 'up'
                    }
                }
            },
            color(v){  //控制涨跌颜色
                if(v == 1 ){
                    return 'up';
                }else{
                    return 'down';
                }
            },
            back() {
                this.$router.back(-1)
            },
            todetals(index){
                if(index != this.flag){
                    this.flag = index;
                    this.downText = '收起';
                }else{
                    this.flag = -1;
                    this.downText = '查看详情';
                }
            },
            toInfo(id){
                this.$router.push({ path: '/agreement',query: {
                        id:id,
                    }})
            },
            getList(){
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    follow:this.follow,
                    status:5,
                    rows: 10,
                    star: this.star
                }

                //结算页
                // 获取的数据
                if(this.typeFlag == 2){
                    home.getTradeList_sl(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);

                            if(res.data.data.rows.length ==  0){
                                this.Length = false;
                            }else{
                                this.Length = true;
                            }
                            if(this.star == 1 && this.lists.length < 0 ){
                                this.lists = [];
                            }
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
                }else {
                    home.getTradeList(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            if(res.data.data.rows.length ==  0){
                                this.Length = false;
                            }else{
                                this.Length = true;
                            }
                            if(this.star == 1 && this.lists.length < 0 ){
                                this.lists = [];
                            }
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
            }
        },
        mounted(){
            this.routeName  = this.$route.name;
            //判断策略列表，1点买 2跟单
            if(this.typeFlag == 1){
                this.follow = 1;
            }else if(this.typeFlag == 2){
                this.follow = 1;
            }else if(this.typeFlag == 3){
                this.follow = 2;

            }
        }
    }
</script>




<style lang="less" scoped>
  @import '../../less/config.less';
  .up{
    color:@red !important;
  }
  .down{
    color: @green !important;
  }
  .header{
    padding:0 @p30;
    display: flex;
    justify-content:space-between;
    align-items: center;
    height:@hwrap;
    color:#fff;
    font-size:.48rem;
    img,.img{
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .profit-item{
    color: #ccc;
    font-size: 0.32rem;
    p{
      margin-bottom: .32rem;
      color: @nine;
    }
  }
  .settlement {
    width: 100%;
    height: auto;
    overflow: auto;
    background-color: @bgColor;
    -webkit-overflow-scrolling: touch;
    color: #ffffff;
    top: 0;
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
      .title-sm-type{
        color: @nine;
      }
      .title-number{
        color: @newColor;
      }
    }
    .content:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: @fColor;
      //transform: scaleY(0.5);
    }
    .content {
      height: 2.56rem;
      line-height: 2;
      color: #ff335b;
      font-size: 0.37333rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .grey {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ccc;
        font-size: 0.32rem;
        .Purchase{
          width: 3.4rem;
        }
        span {
          display: block;
          color: @nine;
        }
        .market-data{
          display: inline-block;
          color: @newColor;
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
    .detals:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: @fColor;
      //transform: scaleY(0.5);
    }
    .detals {
      position: relative;
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

    .hidden-content{
      line-height: 1.8;
      color: @nine;
      font-size: @f24;
      margin-bottom: .2rem;
    }

  }
  .bottomTitle {
    width: 100%;
    height: 1.17333rem;
    line-height: 1.1733rem;
    position: fixed;
    bottom: 0;
    z-index: 998;
    background-color: @FFF;
    text-align: center;
    font-size: .373333rem;
    color: @newColor;
    span {
      display: inline-block;
      height: 1.17333rem;
      line-height: 1.17333rem;
      color: #ff335b;
    }
  }
  .more-a{
    color: @linkBlue;
  }
</style>
