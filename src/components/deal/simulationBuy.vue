<template>
  <div class="settlement">

    <div class="tc" v-show=" Length == false">
      <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
      <p class="black9 mt40 f28">暂无记录</p>
    </div>

    <mt-loadmore :top-method="loadTop" :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :autoFill="false">
      <ul v-show="lists.length != 0">
        <li class="pershares" v-for="(item,index) in lists">
          <div class="title">
            <div class="big">
              <div>
                {{item.name}}&nbsp;&nbsp;
                <span class="title-number">{{item.code}}{{item.contract}}</span>
              </div>
              <i class="span">策略号:{{item.orderNo}}</i>
            </div>
            <span class="toSet" @click="toSet(item)">修改止盈止损</span>
          </div>
          <div class="content">
            <div class="grey">
              <div class="Purchase">
                <span class="red dif">{{item.direction, item.number | evaluateTo}} <span
                  class="fllow-icon">{{item.openWay | TypeOpenWay}}</span></span>
                <span>委托&nbsp;&nbsp;{{item.entrustPrice}}</span>
                <span>现价&nbsp;&nbsp;{{nowPriceArr[item.code]}}</span>
              </div>
              <div class="presentPrice">
                <span>--</span>
                <span>止盈&nbsp;&nbsp;{{item.profitStopPrice}}</span>
                <span>止损&nbsp;&nbsp;{{item.loseStopPrice}}</span>
              </div>
            </div>
            <div class="right" @click="quitOrder(item,index)">
              <span>撤单</span>
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>

    <!--平仓-->
    <div class='swalAlert' v-show="falgIndex==0">
      <div class="swalAlertT">
        <div class="swalTitle">
          <span class="fl">{{name}} {{code}}</span>
          <span class="fr"><i class="red">{{direction, number | directionType}}</i></span>
        </div>
        <div class="swalCenter">
          <p class="item1">
            <img @click="toogleBtn" v-if="type =='a'" class="img-icon" src="../../img/radio_s@2x.png">
            <img @click="toogleBtn" v-if="type =='b'" class="img-icon" src="../../img/radio_n@2x.png">
            全部平仓共<input class="num-input" readonly="redeonly" v-model="number">手</p>
          <p>
            <img @click="toogleBtn" v-if="type == 'b'" class="img-icon" src="../../img/radio_s@2x.png">
            <img @click="toogleBtn" v-if="type == 'a'" class="img-icon" src="../../img/radio_n@2x.png">
            部分平仓
            <span class="minus-btn" @click="averageDown(number)">-</span><input class="num-input"
                                                                                v-model="averageOrderCount2"><span
            class="add-btn" @click="averageUp(number)">+</span>&nbsp;&nbsp;手

          </p>
        </div>
        <div class="swalbottom">
          <span @click="cancel">取消</span>
          <span @click="makeSure">确定</span>
        </div>
      </div>
    </div>

    <!--修改止盈止损-->
    <div class='swalAlert' v-show="falgIndex2==0">
      <div class="swalAlertT">
        <div class="swalTitle">
          <span class="fl">{{name}} {{code}}</span>
          <span class="fr"><i class="red">{{direction, number | directionType}}</i></span>
        </div>
        <div class="swalCenter">
          <p class="item1">
            到达&nbsp;<span class="minus-btn"
                          @click="profitDown(entrustPrice,profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)">-</span><input
            class="num-input"
            v-model="profitStopPrice"><span class="add-btn"
                                            @click="profitUp(entrustPrice,profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)">+</span>&nbsp;&nbsp;点位时止盈平仓
          </p>
          <p>
            到达&nbsp;<span class="minus-btn"
                          @click="lastDown(entrustPrice,loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)">-</span><input
            class="num-input"
            v-model="loseStopPrice"><span class="add-btn"
                                          @click="lastUp(entrustPrice,loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)">+</span>&nbsp;&nbsp;点位时止损平仓
          </p>
        </div>
        <div class="swalbottom">
          <span @click="cancel">取消</span>
          <span @click="averageSure(direction)">确定</span>
        </div>
      </div>
    </div>

    <!-- <div v-show="lists.length != 0" class="bottomTitle">
       持仓盈亏&nbsp;&nbsp;
       <span>{{profit}}</span>
     </div>-->
  </div>

</template>

<script>
  import home from '../../api/home/index'
  import {toast} from '@/util/index'
  import {Loadmore} from 'mint-ui'
  import FundArrowList from '@/components/FundArrowList'

  export default {
    name:'childDealBuy',
    data() {
      return {
        star: 1,
        currentSize: 0,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode: "touch",  // iphone或安卓机存在问题

        Length: true,
        type: 'a',
        nowPriceArr: '',
        profit: 0,
        name: '',
        code: '',
        number: '',//手数
        direction: "",//涨跌type
        upNum1: 0,
        downNum1: 0,
        profitStopPrice: "", //止盈价格
        profitStopMaxPrice: '',//止盈最大价格
        loseStopPrice: '',//止损价格
        loseStopMinPrice: "", //止损最小价格
        orderCount: '',
        averageOrderCount2: 1,//部分平仓
        id: "",  //订单ID
        waveMin:'', //最小波动点数
        entrustPrice:'',// 委托价

        sendAverage: "",
        flag: -1,
        falgIndex: 1,
        falgIndex2: 1,
        lists: [],

      }
    },
    components: {
      'v-FundArrowList': FundArrowList,
      'mt-loadmore': Loadmore
    },
    beforeRouteLeave(to, form, next) {
      next();
    },
    filters: {
      TypeOpenWay(value) {
        if (value == 1) {
          return '市';
        } else {
          return '限';
        }
      },
      directionType(val, num) {
        if (val == '1') {
          return '买涨' + num + '手';
        } else {
          return '买跌' + num + '手';
        }
      },
      evaluateTo(value, num) {
        if (value == '1') {
          return '买涨' + num + '手';
        } else {
          return '买跌' + num + '手';
        }
      },
      //涨跌type，开仓，现价，汇率，code类别,手数，每点合约价值，最小波动点数
      exchangeRate2(direction, openPrice, settlePrice, exchangeRate, code,number,pointVlaue,w) {
        let price, newPrice, newRete;
        //根据买涨买跌判断所获得的货币金额
        if (direction == 1) {
          price = (settlePrice - openPrice) * pointVlaue / w * number ;
        } else {
          price = (openPrice - settlePrice) * pointVlaue / w * number;
        }

        if (price < 0) {
          newPrice = price.toFixed(2);
        } else {
          newPrice = '+' + price.toFixed(2);
        }

        //根据所获得金额乘以汇率
        let rete = (price * exchangeRate).toFixed(2);
        if (rete < 0) {
          newRete = rete;
        } else {
          newRete = '+' + rete;
        }
        //根据code返回货币种类
        let moneyCode;
        if (code == 'GC' || code == 'CL' || code == 'SL') {
          moneyCode = '$'
        } else if (code == 'HSI' || code == 'MHI') {
          moneyCode = 'HK$'
        } else {
          moneyCode = '€'
        }
        return newRete + '(' + moneyCode +  newPrice +')';
      }
    },
    methods: {
      dealBuyFn(){      //父组件请求列表，刷新列表，获取实时价格
        this.lists = [];
        this.getList();
        let self = this;
        self.getNowPrice();
        window.dealBuyTime = setInterval(function () {
          self.getNowPrice();
        },1000);
      },
      toogleBtn() {    //切换平仓选择
        if (this.type == 'a') {
          this.type = 'b';
        } else if(this.type == 'b'){
          this.type = 'a';
        }
      },
      color(v) {
        if (v == 1) {
          return 'up';
        } else {
          return 'down';
        }
      },
      toSet(item) {
        this.orderCount = item.orderCount;
        this.name = item.name;
        this.code = item.code;
        this.falgIndex2 = 0;
        this.number = item.number;
        this.direction = item.direction;
        this.profitStopPrice = item.profitStopPrice; //止盈价格
        this.profitStopMaxPrice = item.profitStopMaxPrice;  //止盈最大价格
        this.loseStopPrice = item.loseStopPrice; //止损价格
        this.loseStopMinPrice = item.loseStopMinPrice;  //止损最小价格
        this.id = item.id;  //订单id
        this.direction = item.direction;
        this.waveMin = item.waveMin; //最小波动点数
        this.entrustPrice = item.entrustPrice;// 委托价
      },

      //止盈平仓减去 -
      profitDown(basePrice, currPrice, max, min, waveMin, direction) {
        if(direction == 1){
          if (currPrice - waveMin >= basePrice) {  //如果type为涨则
            this.profitStopPrice = (this.profitStopPrice*1000 - waveMin*1000)/1000;
          } else {
            this.profitStopPrice = basePrice;
            toast('不能小于' +   basePrice );
          }
        }else{
          if (currPrice - waveMin >= max) {
            this.profitStopPrice = (this.profitStopPrice*1000 - waveMin*1000)/1000;
          } else {
            this.profitStopPrice = max;
            toast('不能小于' +   max );
          }
        }

      },
      //止盈平仓加 +
      profitUp(basePrice, currPrice, max, min, waveMin, direction) {
        if(direction == 1){
          if (currPrice + waveMin <= max) {
            this.profitStopPrice = (this.profitStopPrice*1000 + waveMin*1000)/1000;
          } else {
            this.profitStopPrice = max;
            toast('不能大于' +  max);
          }
        }else{
          if (currPrice + waveMin <= basePrice) {
            this.profitStopPrice = (this.profitStopPrice*1000 + waveMin*1000)/1000;
          } else {
            this.profitStopPrice = basePrice;
            toast('不能大于' +  basePrice);
          }
        }

      },
      //止损平仓减 -
      lastDown(basePrice, currPrice, max, min, waveMin, direction) {
        if(direction == 1){
          if (currPrice - waveMin >= min) {
            this.loseStopPrice = (this.loseStopPrice*1000 - waveMin*1000)/1000;
          } else {
            this.loseStopPrice = min;
            toast('不能小于' + min);
          }
        }else{
          if (currPrice - waveMin >= basePrice) {
            this.loseStopPrice = (this.loseStopPrice*1000 - waveMin*1000)/1000;
          } else {
            this.loseStopPrice = basePrice;
            toast('不能小于' + basePrice);
          }
        }

      },
      //止损平仓 +
      lastUp(basePrice, currPrice, max, min, waveMin, direction) {
        if(direction == 1){
          if (currPrice + waveMin <= basePrice) {
            this.loseStopPrice = (this.loseStopPrice*1000 + waveMin*1000)/1000;
          } else {
            this.loseStopPrice = basePrice;
            toast('不能大于' + basePrice);
          }
        }else{
          if (currPrice + waveMin <= min) {
            this.loseStopPrice = (this.loseStopPrice*1000 + waveMin*1000)/1000;
          } else {
            this.loseStopPrice = min;
            toast('不能大于' + min);
          }
        }
      },

      unravel(item) {
        this.name = item.name;
        this.code = item.code;
        this.falgIndex = 0;
        this.orderCount = item.orderCount;
        this.number = item.number;
        this.id = item.id;  //订单id
        this.direction = item.direction;
        this.sendAverage = this.number;
      },

      quitOrder(item,index){ //撤单
        let id = item.id;
        let sendata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          orderId:id
        }
        home.getMNCancelQuit(sendata).then((res) =>{
          if (res.data.code == 200) {
            toast('撤单成功');
            this.lists.splice(index,1)
          }else if (res.data.code == 401) {
            toast(res.data.message);
            var that = this;
            setTimeout(function () {
              that.$router.push({path: '/login'})
            }, 1000);
          }else {
            toast(res.data.message)
          }
        })
      },
      //平仓分配加减
      averageDown() {
        if (this.averageOrderCount2 - 1 > 0) {
          this.averageOrderCount2 -= 1;
        } else {
          toast('不能小于0');
        }
      },
      averageUp(val) {
        if (this.averageOrderCount2 + 1 > val) {
          this.averageOrderCount2 = val;
          toast('不能大于全部手数');
        } else {
          this.averageOrderCount2 += 1;
        }
      },
      cancel() {
        this.falgIndex = 1;
        this.falgIndex2 = 1;
      },
      averageSure(direction) {   //止损平仓确认
        if(direction == 1){
          if (this.profitStopPrice > this.profitStopMaxPrice) {
            this.profitStopPrice = this.profitStopMaxPrice;
            toast('止盈价格不能大于' + this.profitStopMaxPrice);
            return false;
          }
          if(this.profitStopPrice < this.entrustPrice){
            this.profitStopPrice = this.entrustPrice;
            toast('止盈价格不能小于' + this.entrustPrice);
            return false;
          }
          if (this.loseStopPrice < this.loseStopMinPrice) {
            this.loseStopPrice = this.loseStopMinPrice;
            toast('止损价格不能小于' + this.loseStopMinPrice);
            return false;
          }
          if(this.loseStopPrice > this.entrustPrice){
            this.loseStopPrice = this.entrustPrice;
            toast('止损价格不能大于' + this.entrustPrice);
            return false;
          }
        }else{
          if (this.profitStopPrice < this.profitStopMaxPrice) {
            this.profitStopPrice = this.profitStopMaxPrice;
            toast('止盈价格不能小于' + this.profitStopMaxPrice);
            return false;
          }
          if(this.profitStopPrice > this.entrustPrice){
            this.profitStopPrice = this.entrustPrice;
            toast('止盈价格不能大于' + this.entrustPrice);
            return false;
          }
          if (this.loseStopPrice > this.loseStopMinPrice) {
            this.loseStopPrice = this.loseStopMinPrice;
            toast('止损价格不能大于' + this.loseStopMinPrice);
            return false;
          }
          if(this.loseStopPrice < this.entrustPrice){
            this.loseStopPrice = this.entrustPrice;
            toast('止损价格不能小于' + this.entrustPrice);
            return false;
          }
        }

        let sendata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          orderId: this.id,
          profitStop: this.profitStopPrice,
          loseStop: this.loseStopPrice
        }
        home.getMNModifyProfitStop(sendata).then((res) => {
          if (res.data.code == 200) {
            toast('修改成功');
            this.falgIndex = 1;
            this.falgIndex2 = 1;
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
      },
//     平仓确定时间
      makeSure() {
        //判断type选择发送平仓数量
        let sendNumber;
        if(this.type == 'a'){
          sendNumber = this.number;
        }else if(this.type=='b'){
          sendNumber = this.averageOrderCount2;
        }

        let sendata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          orderId: this.id,
          num: sendNumber
        }
        home.getMNCover(sendata).then((res) => {
          if (res.data.code == 200) {
            toast('平仓成功');    //平仓成功隐藏dialog,重新获取数据，按钮回到全部平仓
            this.falgIndex = 1;
            this.falgIndex2 = 1;
            this.lists =[];
            this.getList();
            this.type = 'a';
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
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      //获取List
      getList() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          follow: 1,
          status: 2,
          rows: 10,
          star: this.star
        }

        //我的跟单
        home.getTradeList(senddata).then((res) => {
          if (res.data.code == 200) {
            if(res.data.data.rows.length ==  0){
              this.Length = false;
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

      },
      //获取最新价格实时请求
      getNowPrice() {
        let senddata2 = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          follow: 1,
          status: 2
        }
        var self = this;
        home.getNowPrice(senddata2).then((res) => {
          if (res.data.code == 200) {
            self.profit = res.data.data.profit;
            var dataArr = [];
            $.each(res.data.data, function (key, value) {
              dataArr[key] = value;
            });
            self.nowPriceArr = dataArr;
          } else if (res.data.code == 401) {
            toast(res.data.message);
            setTimeout(function () {
              self.$router.push({path: '/login'})
            }, 1000);
          } else {
            toast(res.data.message)
          }
        })
      }


    },
    mounted() {

    }


  }
</script>


<style lang="less" scoped>

  @import '../../less/config.less';

  .up {
    color: #ff335b;
  }

  .down {
    color: @downColor;
  }

  .settlement {
    margin-bottom: 1.5rem;
    .pershares {
      width: 100%;
      padding: 0 @p30;
      background-color: @liBg;
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
      .big {
        width: 60%;
        line-height: 0;
        position: relative;
      }
      div {
        position: absolute;
        top: -0.1rem;
      }
      .span {
        position: absolute;
        top: 0.35rem;
        font-size: 0.293333rem;
        color: @huiColor;
      }
      span {
        color: @Color;
        font-size: 0.32rem;
      }
      .title-number{
        color: #fff;
      }
      .toSet {
        color: @actColor;
      }
    }
    .content {
      height: 2.56rem;
      line-height: 2;
      color: #ff335b;
      font-size: 0.37333rem;
      border-top:1px solid  #262a35;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grey {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #babbbc;
        font-size: 0.32rem;
        .Purchase {
          width: 3.1rem;
        }
        span {
          display: block;
          .fllow-icon {
            display: inline-block;
            color: @fColor;
            background: @actColor;
            border-radius: 50%;
            width: .37rem;
            height: .37rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.27rem;
          }
        }
        .red {
          color: #ff335b;
        }
        .dif {
          font-size: 0.37333rem;
        }
      }
      .right {
        width: 1.3333rem;
        height: 1.3333rem;
        line-height: 1.3333rem;
        text-align: center;
        font-size: @f32;
        color: #8d4006;
        background-color: #ffdd25;
        border-radius: 0.08rem;
      }
    }
    .bottomTitle {
      width: 100%;
      height: 1.1733rem;
      line-height: 1.1733rem;
      position: fixed;
      bottom: 0;
      z-index: ccc;
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
    .swalAlert {
      background: rgba(97, 96, 96, 0.75);
      width: 100%;
      position: fixed;
      height: 100%;
      z-index: 1000;
      top: 0;
      display: block;
      .swalAlertT {
        width: 8.6rem;
        height: 5.173333rem;
        border-radius: 0.32rem;
        background: #fff;
        margin: 5rem auto;
        color: @newColor;
        font-size: @p30;
        .swalTitle {
          height: 1.36rem;
          line-height: 1.36rem;
          padding: 0 0.4rem;
          border-bottom: 1px solid @ddd;
        }
        .swalCenter {
          height: 2.64rem;
          border-bottom: 1px solid @ddd;
        }
        .swalCenter {
          padding: .35rem @p30;
          font-size: .4rem;
          .minus-btn, .add-btn {
            display: inline-block;
            border: 1px solid #ddd;
            width: .64rem;
            height: .64rem;
            line-height: .64rem;
            text-align: center;
            border-radius: 6px;
            color: #007aff;
          }
          .num-input {
            border: 1px solid #ddd;
            width: 2.3rem;
            margin: 0 .1rem;
            text-align: center;
            padding: .08rem 0;
            border-radius: 4px;
          }
          .item1 {
            margin-bottom: .46rem;
          }
          .img-icon {
            display: inline-block;
            margin-right: .3rem;
            width: .4rem;
            height: .4rem;
          }
        }
        .swalbottom {
          span {
            display: inline-block;
            width: 49.9%;
            float: left;
            line-height: 1.1733333rem;
            text-align: center;
            color: @blue;
            font-size: @f34;
          }
          span:nth-child(1) {
            border-right: 1px solid @ddd;
          }
        }
      }
    }

  }
</style>
