<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>委托买入</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="wrap">
        <ul class="onceList">
          <li>
            <span class="fl">{{name}}{{code}}{{contract}}合约</span>
            <span class="fr">持仓至 <i class="red">{{autoSettleTime}}</i> 自动平仓</span>
          </li>
        </ul>
        <ul class="onceList">
          <li class="borderB">
            <div class="fl">交易数量</div>
            <div class="fr allKind" @click="showAllNumArr('number')" v-show="tabShow"><img src="../../img/newImg/trade_title_pupdown@2x.png"></div>
            <ul class="fr theNumHand quantity">
              <li v-for='(item,index) in numArr' @click="selectStyle (item, index,$event) "
                  :class="{ active: index==selectItem }">{{item}}
              </li>
            </ul>
          </li>
          <li class="borderB">
            <span class="fl">止盈金额</span>
            <!--<span class="fr"><i class="">{{((deposit*1000) * (profitStopTimes*1000) * (deposits*1000))/1000000000 }}</i>元</span>-->
            <span class="fr"><i class="">{{((Math.abs((this.tabone))).toFixed(3) * 10).toFixed(3)*1000/1000}}</i>元</span>
          </li>
          <li class="borderB">
            <div class="fl">止损金额</div>
            <div class="fr allKind" @click="showAllNumArr('lost')" v-show="tabShows"><img src="../../img/newImg/trade_title_pupdown@2x.png"></div>
            <ul class="fr stopLoss theNumHand">
              <li v-for='(item,index) in lostValueArr' @click="typeTemp(item, index,$event)"
                  :class="{ active: index==selectThisItem }">{{item.toFixed(3)*1000/1000}}
              </li>
            </ul>

          </li>
        </ul>
        <ul class="onceList">
          <li class="borderB" style="height:1.28rem;line-height:1.28rem;">
            <div class="fl">冻结履约保证金</div>
            <span class="fr red"><i>{{deposit * 1000 / 1000}}元</i>&nbsp;&nbsp;({{currencyCode}}{{(deposit / exchangeRate).toFixed(3) * 1000 / 1000}})</span>
          </li>
          <li class="liSpecial">
            <div class="top">
              <div class="fl">支付交易综合费</div>
              <span class="fr red">{{alldeposit}}元</span>
            </div>
            <p>
              <img @click="deduction" v-show='check' src="../../img/buy_radio_n@2x.png"/>
              <img @click="deduction" v-show='!check' src="../../img/buy_radio_s@2x.png"/>
              <span>使用积分可抵扣 <i class="red">{{maxPoints}}</i> 元</span>
            </p>
          </li>
        </ul>
        <div class='explain'>*{{name}}交易的货币为{{currency}}，平台为方便点买计算以人民币显示 1{{currencyCode}} = ￥{{exchangeRate}}(以平台公布的最新数据为准)</div>
        <ul class="buyChoise">
          <li class="borderB">
            <img @click='toggle($event)' :src="img_s">
            <span>市价买入 ( 最新买入价 <i>{{newPrise}}</i>)</span>
          </li>
          <li>
            <img @click='toggle($event)' :src="img_n">
            <span>限价买入 <input type="text" v-model="entrustPrice" maxlength="9" /> ( 当前为最新价 可修改)</span>
          </li>
        </ul>
        <div class='explain'>*市价买入以五档最优成交，限价交易新手慎用！</div>
        <div class="footer-ct">
          <div class="agreement">
            <img @click='agree($event)' src="../../img/check_s@2x.png"/>
            我已阅读并同意<span @click="regulation">《相关协议》</span>
          </div>
          <div class="footerBtn">
            <span class='buyBtn buyMinus' v-show="ok" @click="buyUp()">确定买跌</span>
            <span class='buyBtn transaction' v-show="!ok" @click="buyUp()">确定买涨</span>
          </div>
        </div>
      </div>
      <div class='swalAlert' v-show="alert" @click="hidden">
        <div class="swalAlertT">
          <ul v-show="theAlert">
            <li v-for='(item,index) in numArrAll' @click="selectStyle(item,index,$event)">{{item}}</li>
          </ul>
          <ul v-show="!theAlert">
            <li v-for='(item,index) in lostValueArrAll' @click="typeTemp(item, index,$event)">{{item.toFixed(3)*1000/1000}}</li>
          </ul>
        </div>
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {toast} from '@/util/index'
    import trade from '@/api/home/index'
    import ContentHead from '@/components/ContentHead'

    export default {
        data() {
            return {
                press: true,
                selectItem: 0,
                selectThisItem: 0,
                check: true,
                img_s: require('../../img/buy_radio_s@2x.png'),
                img_n: require('../../img/buy_radio_n@2x.png'),
                id: this.$route.query.id,
                name: '',
                code: '',
                contract: '',
                stu: this.$route.query.status,
                a: true,
                ok: true,
                tabShow: false,
                tabShows: false,
                agreeThis: true,
                alert: false,
                theAlert: false,
                autoSettleTime: '',
                points: '', /*积分*/
                fee:'',     /*手续费*/
                maxPoints:0, /*当前抵扣最大值*/
                mypoint: 0,
                numArr: [], /*前五档的交易手数*/
                numArrAll: [], /*所有档位的交易手数*/
                numArrNew: [], /*保存原有的数组前五个*/
                lostValueArr: [], /*前三档的止损金额*/
                lostValueArrNew: [], /*保存原有的数组前五个*/
                lostValueArrAll: [], /*所有档位的止损金额*/
                lostStopArr: [],
                tabone: '',
                number: 1,
                openWay: 1,
                entrustPrice: '', /*委托价格*/
                profitStopTimes: '', /*止盈倍数*/
                alldeposit: '', /*综合*/
                deposit: '', /*保证金*/
                alldeposits: '',
                deposits: '',/*止损比率*/
                targetProfit: '',
                newPrise: '',
                np: '',
                currency: '', /*币种类*/
                currencyCode: '', /*币种符号*/
                pointVlaue: '', /*每点合约价值*/
                exchangeRate: '', /*汇率*/
                lostPoint: ''/*止损点数*/
            }
        },
        components: {
            'v-ContentHead': ContentHead
        },
        methods: {
            back() {
                this.$router.back(-1);
            },
            /*几手*/
            selectStyle(item, index, event) {
                this.number = event.target.innerText;
                this.alert = false;
                if (index > 4) {
                    this.selectItem = 0;
                    this.numArr = [];
                    this.numArr.push(this.number);
                } else {
                    this.selectItem = index;
                    this.numArr = this.numArrNew;
                }
                this.tabone = (this.lostPoint * this.number * this.pointVlaue * this.exchangeRate).toFixed(3);
                /*当前选中的止损值*/
                this.alldeposit = parseInt(this.number * this.alldeposits);

                /*综合费变化*/
                this.deposit = (this.tabone / this.deposits).toFixed(3);


                /*保证金变化*/
                console.log(  this.alldeposit,this.deposit,this.tabone);
                /*积分抵扣不超过手续费*/
                if(this.alldeposit <= this.points){
                    this.maxPoints =this.alldeposit;
                }else{
                    this.maxPoints = this.points
                }
                let that = this;
                $.each(that.lostValueArr, function (i, v) {
                    that.lostValueArr[i] = that.lostStopArr[i] * that.pointVlaue * that.exchangeRate * (-1) * that.number;
                })
                $.each(that.lostValueArrAll, function (i, v) {
                    that.lostValueArrAll[i] = that.lostStopArr[i] * that.pointVlaue * that.exchangeRate * (-1) * that.number;
                })
            },
            /*止损*/
            typeTemp(item, index, event) {
                this.tabone = -(event.target.innerText);
                this.alert = false;
                if (index > 2) {
                    this.selectThisItem = 0;
                    this.lostValueArr = [];
                    this.lostValueArr.push(-this.tabone);
                } else {
                    this.selectThisItem = index;
                    this.lostValueArr = this.lostValueArrNew;
                }
                this.deposit = (this.tabone / this.deposits).toFixed(3);
                /*保证金变化*/
                this.lostPoint = this.lostStopArr[index];
            },
            regulation() {
                this.$router.push({
                    path: '/agreementFee',
                    name: 'agreementFee',
                    query: {
                        id: this.id,
                        name: this.name
                    }
                });
            },
            deduction() {
                if (this.check == true) {
                    this.check = false;
                    this.mypoint = this.maxPoints;
                } else {
                    this.check = true;
                    this.mypoint = 0;
                }

            },
            toggle(event) {
                var thisSrc = event.target;
                if (thisSrc.src == require('../../img/buy_radio_n@2x.png')) {
                    if (this.a == true) {
                        this.img_n = require('../../img/buy_radio_s@2x.png');
                        this.img_s = require('../../img/buy_radio_n@2x.png');
                        this.a = false;
                        this.openWay = 2;
                    } else {
                        this.img_n = require('../../img/buy_radio_n@2x.png');
                        this.img_s = require('../../img/buy_radio_s@2x.png');
                        this.a = true;
                        this.openWay = 1;
                    }
                }
            },
            agree(event) {
                var thisSrc = event.target;
                if (thisSrc.src == require('../../img/check_n@2x.png')) {
                    thisSrc.src = require('../../img/check_s@2x.png');
                    this.agreeThis = true;
                } else {
                    thisSrc.src = require('../../img/check_n@2x.png');
                    this.agreeThis = false;
                }
            },
            start() {
                if (this.stu == 1) {
                    this.ok = false;
                } else {
                    this.ok = true;
                }
                let prameData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id
                }
                let that = this;
                trade.getTradeParams(prameData).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem('token',res.data.hid);
                        let data = res.data;
                        that.autoSettleTime = data.data.autoSettleTime;
                        /*明日 04:55*/
                        that.points = data.data.points;
                        that.fee = data.data.fee;
                        /*积分抵扣不超过手续费*/
                        if(that.fee <= that.points){
                            that.maxPoints =that.fee;
                        }else{
                            that.maxPoints = that.points
                        }

                        /*积分抵扣*/
                        /*name*/
                        that.name = data.data.name;
                        that.code = data.data.code;
                        that.contract = data.data.contract;
                        /*交易数量*/
                        $.each(data.data.nums, function (i, v) {
                            that.numArrAll.push(v);
                            if (that.numArr.length == 5) {
                                that.tabShow = true;
                            } else {
                                that.numArr.push(v);
                                that.numArrNew.push(v);
                                that.tabShow = false;
                            }
                        })

                        /*每点合约价值*/
                        that.pointVlaue = data.data.pointVlaue;
                        /*止损*/
                        $.each(data.data.lostStopPoints, function (i, v) {
                            that.lostStopArr.push(v);
                            that.lostValueArrAll.push(v * data.data.pointVlaue * data.data.exchangeRate * (-1));
                            if (that.lostValueArr.length == 3) {
                                that.tabShows = true;
                            } else {
                                that.lostValueArr.push(v * data.data.pointVlaue * data.data.exchangeRate * (-1));
                                that.lostValueArrNew.push(v * data.data.pointVlaue * data.data.exchangeRate * (-1));
                                that.tabShows = false;
                            }
                        })
                        that.tabone = that.lostValueArr[0];
                        that.lostPoint = that.lostStopArr[0];
                        /*汇率*/
                        that.exchangeRate = data.data.exchangeRate;
                        /*止损比率*/
                        that.deposits = data.data.loseStopRate;
                        /*履约保证金*/
                        that.deposit = (-that.lostValueArr[0] / that.deposits).toFixed(3);
                        /*止盈倍数*/
                        that.profitStopTimes = data.data.profitStopTimes;
                        /*综合费*/
                        that.alldeposits = data.data.fee;
                        that.alldeposit = data.data.fee * data.data.nums[0];
                        /*最新价*/
                        that.newPrise = data.data.np;
                        that.entrustPrice = data.data.np;
                        if (data.data.code == 'GC' || data.data.code == 'CL' || data.data.code == 'SI') {
                            that.currency = '美元';
                            that.currencyCode = '$';
                        } else if (data.data.code == 'HSI' || data.data.code == 'MHI') {
                            that.currency = '港币';
                            that.currencyCode = 'HK$';
                        } else if (data.data.code == 'DAX') {
                            that.currency = '欧元';
                            that.currencyCode = '€';
                        }
                    } else {
                        toast(res.data.message);
                    }
                })
            },
            showAllNumArr(str) {
                this.alert = true;
                if (str == 'number') {
                    this.theAlert = true;
                } else {
                    this.theAlert = false;
                }
            },
            hidden() {
                this.alert = false;
            },
            buyUp() {

                if (this.agreeThis == true) {
                    if (this.openWay == 1) {
                        this.np = 0;
                    } else {
                        this.np = this.entrustPrice;
                    }
                    var reg = /^[1-9]\w{1,4}\.\d{0,3}$/;
                    var reg2 = /^[1-9]\w{1,4}$/;
                    if(this.openWay == 2){
                        if(!reg.test(this.entrustPrice) && !reg2.test(this.entrustPrice)){
                            toast('委托价格有误')
                        }else{
                            if (this.press) {
                                this.press = false;
                                let theinfo = {
                                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                                    'commoId': this.id,
                                    'num': this.number, /*数量*/
                                    'lostPoint': this.lostPoint, /*止损点数*/
                                    'point': this.mypoint, /*积分抵扣*/
                                    'openWay': this.openWay, /*开仓类型 1市价 2限*/
                                    'direction': this.stu, /*交易方向 1买涨 2买跌*/
                                    'entrustPrice': this.np  /*委托价格（限价单使用）*/
                                }
                                trade.risingMinus(theinfo).then((res) => {
                                    if (res.data.code == 200) {
                                        window.localStorage.setItem('token',res.data.hid);
                                        toast(res.data.message);
                                        var that = this;
                                        setTimeout(function () {
                                            that.$router.push({
                                                path: '/trade_re',
                                                query: {
                                                    'openWay': that.openWay,
                                                    'id': that.id,
                                                    'name': that.name,
                                                    'code': that.code,
                                                    'contract': that.contract
                                                }
                                            });
                                        }, 1000);
                                    } else {
                                        toast(res.data.message);
                                        this.press = true;
                                    }
                                })
                            }
                        }
                    }else{
                        if (this.press) {
                            this.press = false;
                            let theinfo = {
                                'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                                'HUIMI_USERID': window.localStorage.getItem("userId"),
                                'commoId': this.id,
                                'num': this.number, /*数量*/
                                'lostPoint': this.lostPoint, /*止损点数*/
                                'point': this.mypoint, /*积分抵扣*/
                                'openWay': this.openWay, /*开仓类型 1市价 2限*/
                                'direction': this.stu, /*交易方向 1买涨 2买跌*/
                                'entrustPrice': this.np  /*委托价格（限价单使用）*/
                            }
                            trade.risingMinus(theinfo).then((res) => {
                                if (res.data.code == 200) {
                                    window.localStorage.setItem('token',res.data.hid);
                                    toast(res.data.message);
                                    var that = this;
                                    setTimeout(function () {
                                        that.$router.push({
                                            path: '/trade_re',
                                            query: {
                                                'openWay': that.openWay,
                                                'id': that.id,
                                                'name': that.name,
                                                'code': that.code,
                                                'contract': that.contract
                                            }
                                        });
                                    }, 1000);
                                } else {
                                    toast(res.data.message);
                                    this.press = true;
                                }
                            })
                        }
                    }

                } else {
                    toast('请勾选协议！');
                }

            }
        },
        mounted() {
            this.start();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '委托买入';
            next();
        }
    }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .wrap {
    img {
      display: inline-block;
      width: 0.3733333rem;
      height: 0.3733333rem;
    }
    font-size: @f28;
    color: @fcolor;
    .onceList {
      padding: 0 0.4rem;
      margin-top: 0.2666666rem;
      background: @FFF;
      li {
        height: 1.1733333rem;
        line-height: 1.1733333rem;
        color:@newColor;
        .allKind {
          display: inline-block;
          width: 0.8rem;
          height: 0.64rem;
          margin-top: 0.2666665rem;
          background:@changeColor;
          text-align:center;
          line-height:0;
          img{
            display: inline-block;
            width:0.2667rem;
            height:0.2667rem;
            margin-top:0.18rem;
          }
        }
      }
      .theNumHand {
        li {
          float: left;
          height: 0.64rem;
          line-height: 0.64rem;
          text-align: center;
          background:@changeColor;
          margin-right: 0.1066666rem;
          margin-top: 0.2666665rem;
          color:@newColor;
        }
        .active {
          background: @actColor;
          color: @zero;
        }
      }
      .quantity li {
        width: 0.8rem;
      }
      .stopLoss {
        li {
          min-width: 1.4rem;
          padding: 0 .1rem;
          color:@newColor;
        }
        .active {
          background: @actColor;
          color: @zero;
        }
      }
      .liSpecial {
        height: 1.73333rem;
        line-height: 0;
        div, span {
          margin-top: 0.5rem;
        }
        .top {
          height: 0.9rem;
        }
        p {
          float: right;
          font-size: @f24;
          img {
            float: left;
            margin-right: 0.16rem;
          }
          span {
            float: left;
            margin-top: 0.2rem;
            color:@nine;
          }
        }
      }
    }
    .explain {
      padding: 0.2rem 0.4rem;
      font-size: @f24;
      color: @nine;
      line-height: 0.5rem;
    }
    .buyChoise {
      padding: 0 0.4rem;
      background: @FFF;
      color:@newColor;
      li {
        height: 1.28rem;
        line-height: 1.28rem;
      }
      input {
        display: inline-block;
        width: 1.866666rem;
        height: 0.64rem;
        line-height: 0.64rem;
        text-align: center;
        background: @huiColor;
        border-radius: 0.1rem;
      }
    }
    .agreement {
      padding: 0.2rem 0.4rem;
      font-size: @f24;
      color: @nine;
      img {
        vertical-align: middle;
        margin-right: 0.2rem;
      }
      span {
        color: @actColor;
        margin-top: 0.2rem;
      }
    }
    .footerBtn {
      text-align: center;
      margin-top: 0.3rem;
      .buyBtn {
        display: inline-block;
        width: 9.2rem;
        height: 1.1733333rem;
        line-height: 1.1733333rem;
        border-radius: 0.1rem;
      }
      .buyMinus {
        background: @green;
      }
      .transaction {
        background: @red;
      }
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
      width: 7.84rem;
      height: 5.173333rem;
      border-radius: 0.32rem;
      background: #fff;
      margin-top: 5rem;
      margin-left: 1rem;
      color: @newColor;
      font-size: @p30;
      ul {
        height: 5.173333rem;
        overflow-y: scroll;
        overflow-x: hidden;
        li {
          height: 1.36rem;
          line-height: 1.36rem;
          padding: 0 0.4rem;
          border-bottom: 1px solid @ddd;
          text-align: center;
        }
        li:last-child {
          border-bottom: none;
        }
      }
      ::-webkit-scrollbar {
        width: 0px
      }
    }
  }
</style>
