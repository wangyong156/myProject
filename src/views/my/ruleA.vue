<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>{{name}}</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="tableBig">
        <table class="table" border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td>交易品种</td>
            <td>{{nameCode}}</td>
          </tr>
          <tr>
            <td>货币单位</td>
            <td>{{coinUnit}}</td>
          </tr>
          <tr>
            <td>交易单位</td>
            <td>{{tradeUnit}}</td>
          </tr>
          <tr>
            <td>最小波动</td>
            <td>{{min}}</td>
          </tr>
          <tr>
            <td>波动盈亏</td>
            <td>{{loss}}</td>
          </tr>
          <tr class="theTime">
            <td>交易时间</td>
            <td>
              <span>{{tradeTime1}}</span>
              <span>{{tradeTime2}}</span>
              <span>{{tradeTime3}}</span>
            </td>
          </tr>
          <tr class="dayTime">
            <td>日内平仓时间</td>
            <td>
              <span>{{dateTime1}}</span>
              <span>{{dateTime2}}</span>
              <span>如遇节假日特殊情况以平台公告为准</span>
            </td>
          </tr>
          <tr class="theTime">
            <td>交易综合费</td>
            <td>
              <span>{{fee}}元/手</span>
              <span>(如有变动以平台变更公告为准)</span>
            </td>
          </tr>
          <tr class="huilv">
            <td>汇率</td>
            <td>
              <span>{{rate}}</span>
              <span>(汇率波动大时，将会调整，以最新公告为准)</span>
            </td>
          </tr>
        </table>
        <p style="text-indent:2em;line-height:0.5rem;padding:0.2rem 0 0.3rem;">{{add}}</p>
      </div>
      <div v-for="(i,index) in lists" class="nav">
        <div class="title"><span></span>{{i.title}}</div>
        <div class="text">{{i.text}}</div>
        <span @click="goNew">{{i.then}}</span>
      </div>
      <div  class="nav">
        <div class="title"><span></span>什么是持仓时间？</div>
        <div class="text">{{name}}开市时间为{{holdingStartTime}}，当持仓时间到{{holdingEndTime}}时持仓中的交易会被投资人强制平仓，不保证成交价格，请务必在到期前自己选择点位卖出。冬时以上时间顺延一个小时。</div>
        <span @click="goNew"></span>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
    import ContentHead from '@/components/ContentHead'

    export default {
        data() {
            return {
                id: this.$route.query.id,
                name: this.$route.query.name + '交易规则',
                nameCode: this.$route.query.name + '' + this.$route.query.code + '' + this.$route.query.contract,
                coinUnit: "美元",
                tradeUnit: "每手100盎司",
                min: "0.1美元/盎司",
                loss: "0.1=10美元",
                tradeTime1: "夏令时上午06:00:00--次日04:55:00",
                tradeTime2: "冬令时上午07:00:00--次日05:55:00",
                tradeTime3: "",
                dateTime1: "夏:次日04:55:00",
                dateTime2: "冬:次日05:55:00",
                aboutEndTime: '4:55:00',
                fee: "158",
                rate: '1美元 = 7人民币',
                add: '纽约金属交易所COMEX黄金期货合约，每手100盎司，最小波动一次约等于70元人民币，可买涨买跌，日内T+0交易。',
                holdingStartTime:'',
                holdingEndTime:'',

                lists: [
                    {
                        title: "新手练习",
                        text: "如果您是新手，没有期货投资经验，建议您务必在模拟练习区进行模拟交易，模拟交易无需任何费用。模拟交易可以获得积分，积分可用于实盘交易时抵扣交易综合费",
                        then: '>>进入新手模拟练习区'
                    },
                    {
                        title: "什么是买涨？",
                        text: "当您点买涨成交时，最新价大于您买入价，您就赚钱，反之则亏钱。",
                        then: ''
                    },
                    {
                        title: "什么是止盈？",
                        text: "止盈是指策略盈利到达一定点位后自动平仓的功能，无需时时盯盘，在一定范围内可以随意设置锁定盈利。",
                        then: ''
                    },
                    {
                        title: "什么是止损？",
                        text: "止损是指策略发起或者执行过程中，当出现亏损时需要平仓的功能，设置成功后无需盯盘，系统会根据设定自动执行。",
                        then: ''
                    },
                    /*{
                      title: "什么是持仓时间？",
                      text: "美黄金开市时间为夏令时6:00:00至次日5:00:00，当持仓时间到4:55:00时持仓中的交易会被投资人强制平仓，不保证成交价格，请务必在到期前自己选择点位卖出。冬时以上时间顺延一个小时。",
                      then: ''
                    },*/
                    {
                        title: "什么是涨跌幅限制？",
                        text: "国际期货没有10%涨跌停限制，但是为了规避风险，该品种该品种涨幅>=20%时禁止买涨开仓，跌幅<=-20%时禁止买跌开仓。",
                        then: ''
                    },
                    {
                        title: "什么是履约保证金？",
                        text: "履约保证金是为点买人策略可行性的有限担保，当策略如果发生亏损时，履约保证金用于赔付投资人交易损失的上限。超出部分由投资人自行承担，如果投资人没有按时点买人要求执行策略，则点买人无需承担损失。如果策略盈利，冻结的履约保证金全额退回给点买人。",
                        then: ''
                    },
                    {
                        title: "什么是交易综合费？",
                        text: "平台撮合点买人与投资人进行策略合作的介绍费，达成合作则收费，如果没有达到则退回。" + this.$route.query.name + "的交易综合费为：元（数据仅供参考以平台公告为准），交易综合费开平仓只收取一次。",
                        then: ''
                    },
                    {
                        title: "盈利如何分配？",
                        text: "点买人与投资人合作交易，最大止盈金额以内的盈利，点买人拿90%，投资人拿10%。超出最大止盈金额的部分归投资人所有，同时超出履约保证金部分由投资人承担。",
                        then: ''
                    },
                    {
                        title: "实盘下单",
                        text: "点买人在平台发布的是交易策略指令，当有投资人选择合作时由投资人严格按照点买人的开仓点位买涨或者买跌，并根据点买人制定的止盈和止损点位设置，投资人通过自己的境外期货账号进行下单操作，平台负责监督投资人执行的准确性和真实性，如有必要可以要求投资人提供对应期货账号在期货公司的结算单，也可以要求投资人一起去期货公司查询。",
                        then: ''
                    }
                ]
            }
        },
        components: {
            'v-ContentHead': ContentHead
        },
        mounted() {
            var name = this.$route.query.name;
            if (name == "美黄金") {
                this.coinUnit = "美元";
                this.tradeUnit = "每手100盎司";
                this.min = "0.1美元/盎司";
                this.loss = "0.1=10美元";
                this.tradeTime1 = "夏令时上午06:00:00--次日04:55:00";
                this.tradeTime2 = "冬令时上午07:00:00--次日05:55:00";
                this.dateTime1 = "夏:次日04:55:00";
                this.dateTime2 = "冬:次日05:55:00";
                this.fee = "168";
                this.rate = '1美元 = 7人民币';
                this.add = '纽约金属交易所COMEX黄金期货合约，每手100盎司，最小波动一次约等于70元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '夏令时06:00:00至次日05:00:00';
                this.holdingEndTime = '04:55:00';
                //this.lists[7].text = "平台撮合点买人与投资人进行策略合作的介绍费，达成合作则收费，如果没有达到则退回。" + this.$route.query.name + "的交易综合费为：" + this.fee + "元（数据仅供参考以平台公告为准），交易综合费开平仓只收取一次。";
            } else if (name == "美原油") {
                this.coinUnit = "美元";
                this.tradeUnit = "每手1000桶";
                this.min = "0.01美元/桶";
                this.loss = "0.01=10美元";
                this.tradeTime1 = "夏令时上午06:00:00--次日04:55:00";
                this.tradeTime2 = "冬令时上午07:00:00--次日05:55:00";
                this.dateTime1 = "夏:次日04:55:00";
                this.dateTime2 = "冬:次日05:55:00";
                this.fee = "168";
                this.rate = '1美元 = 7人民币';
                this.add = '纽约商品交易所NYMEX原油期货合约，每手1000桶，最小波动一次约等于70元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '夏令时06:00:00至次日05:00:00';
                this.holdingEndTime = '04:55:00';
            } else if (name == "美白银") {
                this.coinUnit = "美元";
                this.tradeUnit = "每手5000盎司";
                this.min = "0.005美元/盎司";
                this.loss = "0.005=25美元";
                this.tradeTime1 = "夏令时上午06:00:00--次日04:55:00";
                this.tradeTime2 = "冬令时上午07:00:00--次日05:55:00";
                this.dateTime1 = "夏:次日04:55:00";
                this.dateTime2 = "冬:次日05:55:00";
                this.fee = "168";
                this.rate = '1美元 = 7人民币';
                this.add = '纽约金属交易所COMEX白银期货合约，每手5000盎司，最小波动一次约等于70元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '夏令时06:00:00至次日05:00:00';
                this.holdingEndTime = '04:55:00';
            } else if (name == "恒指") {
                this.coinUnit = "港币";
                this.tradeUnit = "指数点/手";
                this.min = "1";
                this.loss = "1=50港元";
                this.tradeTime1 = "上午09:15:00 - 12:00:00";
                this.tradeTime2 = "下午13:00:00 - 16:25:00";
                this.tradeTime3 = "夜间17:15:00 - 23:25:00";
                this.dateTime1 = "白天16:25:00";
                this.dateTime2 = "夜间23:25:00";
                this.aboutEndTime = '16:25:00或者23:25:00';
                this.fee = "168";
                this.rate = '1港元=0.9人民币';
                this.add = '港交所HKFE恒生指数期货合约，每点50港元，最小波动一次约等于45元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '09:15:00至16:25:00，17:15:00至23:25:00';
                this.holdingEndTime = '16:25:00或者23:25:00';
            } else if (name == "小恒指") {
                this.coinUnit = "港币";
                this.tradeUnit = "指数点/手";
                this.min = "1";
                this.loss = "1=10港元";
                this.tradeTime1 = "上午09:15:00 - 12:00:00";
                this.tradeTime2 = "下午13:00:00 - 16:25:00";
                this.tradeTime3 = "夜间17:15:00 - 23:25:00";
                this.dateTime1 = "白天16:25:00";
                this.dateTime2 = "夜间23:25:00";
                this.aboutEndTime = '16:25:00或者23:25:00';
                this.fee = "80";
                this.rate = '1港元=0.9人民币';
                this.add = '港交所HKFE恒生国企指数期货合约，每点10港元，最小波动一次约等于9元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '09:15:00至16:25:00，17:15:00至23:25:00';
                this.holdingEndTime = '16:25:00或者23:25:00';
            } else if (name == "德指") {
                this.coinUnit = "欧元";
                this.tradeUnit = "指数点/手";
                this.min = "0.5";
                this.loss = "0.5=12.5欧元";
                this.tradeTime1 = "夏令时14:00:00 - 次日03:55:00";
                this.tradeTime2 = "冬令时15:00:00 - 次日04:55:00";
                this.dateTime1 = "夏令时03:55:00";
                this.dateTime2 = "冬令时04:55:00";
                this.aboutEndTime = ' 03:55:00';
                this.fee = "198";
                this.rate = '1欧元=8.2人民币';
                this.add = '欧洲期货交易所EUREX德国DAX指数期货合约，每点12.5欧元，最小波动一次约等于102.5元人民币，可买涨买跌，日内T+0交易。';
                this.holdingStartTime = '夏令时14:00:00至次日04:00:00';
                this.holdingEndTime = '03:55:00';
            }
            this.lists[7].text = "平台撮合点买人与投资人进行策略合作的介绍费，达成合作则收费，如果没有达到则退回。" + this.$route.query.name + "的交易综合费为：" + this.fee + "元（数据仅供参考以平台公告为准），交易综合费开平仓只收取一次。";
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
            goNew() {
                this.$router.push({
                    "path": "/firmOffer",
                    "query": {
                        "id": this.id,
                        "type": 0
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  img {
    display: block;
  }

  .tableBig {
    margin-top: .2rem;
    padding: 0 0.4rem;
    background: @changeColor;
    color: @newColor;
    table {
      width: 100%;
      height: 100%;
      border: 1px solid @ddd;
      color: @newColor;
      border-collapse: collapse;
      background: #f4f4f4;
      span {
        display: block;
        line-height: 0.56rem;
      }
      tr {
        height: 0.8rem;
      }
      tr td:nth-child(1) {
        width: 30%;
        text-align: center;
      }
      tr td:nth-child(2) {
        width: 67%;
        padding-left: 3%;
      }
      td {
        border: 1px solid @ddd;
      }
      .theTime {
        height: 1.73333rem;

      }
      .dayTime {
        height: 2.18666rem;
      }
      .huilv {
        height: 2.10666rem;
      }

    }
  }

  .nav {
    background: @changeColor;
    border-radius: @fsize/2;
    padding: @p30;
    margin-top: 0.26666rem;
    .title {
      font-size: @f28;
      color: @newColor;
      font-weight:600;
      span {
        display: inline-block;
        width: .08rem;
        height: .3rem;
        margin-right: @fsize;
        background:@newColor ;
      }
    }
    .text {
      margin-top: 0.1333rem;
      font-size: @f24;
      color: @newColor;
      line-height: 0.58666rem;
    }
    span {
      color: @linkBlue;
    }

  }
</style>
