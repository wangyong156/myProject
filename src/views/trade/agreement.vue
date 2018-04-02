<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>协议</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="wrap">
        <div class="tableBig">
          <div class="agreeTitle f28 black0 tc">点买人与投资人参与期货合作协议</div>
          <table class="table" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <td>点买人ID</td>
              <td style='padding-left: 10%'>{{userId}}</td>

            </tr>
            <tr>
              <td>点买人姓名</td>
              <td style='padding-left: 10%'>{{userName  || '--'  }}</td>

            </tr>
            <tr>
              <td>投资人ID</td>
              <td style='padding-left: 10%'>{{investId}}</td>
            </tr>
            <tr>
              <td>投资人姓名</td>
              <td style='padding-left: 10%'>{{investName || '--' }}</td>
            </tr>
          </table>
          <div class="explance">
            本次交易合作由期货投资宝提供撮合服务。在期货投资宝的撮合下，投资人与点买协商一致，就双方秉承共享收益共担风险之原则，由点买人提供交易策略，由投资人利用自有资金和账户进行交易合作事宜订立如下协议，以兹共守：
          </div>
          <p class='f28 black0'>一、定义</p>
          <div class="explance">
            本协议中，除非上下文另有解释，下列词语具有一下含义：<br>
            <p>
              1、{{fullName}}由温州赢透网络科技有限公司运营，面向期货投资宝注册用户提供包括但不限于沪深所A股、中金所期指、上期所贵金属期货、纽交所商品期货、纽交所能源期货、
              港交所期货、港交所期货、港交所期货、港交所期货、港交所期货、港交所期货、港交所期货等服务平台。
            </p>
            <p>
              2、支付机构：指期货投资宝委托的为期货投资宝用户提供资金划转、查询、结算等支付服务的第三方支付机构。本协议项下提供上述服务的机构为联动优势电子商务有限公司（以下简称"联动支付"）。
            </p>
            <p>
              3、点买人：指通过期货投资宝注册成为的用户，作为投资人的交易合作方，负责向投资人提供交易策略的自然人。
            </p>
            <p>
              4、投资人：指通过期货投资宝注册成为投资人的用户，作为点买人的交易合作方，负责按点买人交易策略并利用自有资金和账户进行交易的自然人。
            </p>
            <p>
              5、买入：指点买人向投资人发出买入指令。买入指令为市价买入或者限价买入，市价买入指点买人要求投资人在收到交易指令所在时点起，即时市价买入指定数量和指定交易方向的品种。限价买入是指点买人要求投资人按指令归定的价格买入指定数量和指定交易方向的品种。
            </p>
            <p>
              6、卖出：指点买人向投资人发出卖出指令。卖出指令为市价卖出或者限价卖出，市价卖出为点买人要求投资人在收到交易指令所在时点起，即时市价卖出指定数量和指定交易方向的品种。限价卖出是指点买人要求投资人按指令归定的价格卖出指定数量和指定交易方向的品种。
            </p>
            <p>
              7、交易标的：为点买人和投资每次合作交易的期货合约品种。品种由点买人指定，指定合约一般为主力合约。
            </p>
            <p>
              8、浮动盈亏：交易方向为看多时，浮动盈亏＝（最新价－买入价）＊合约乘数，交易方向为看空时，浮动盈亏=（买入价-最新价）* 合约乘数。计算结果为正值（含零）时即为浮盈金额，计算结果为负值时即为浮亏金额。
            </p>
            <p>
              9、触发止盈：当合作交易品种盈利且点位达到设定数值时，投资人根据设定点位和点买人归定的交易方式卖出交易品种进行止盈，此时该盈利结算即为触发止盈。
            </p>
            <p>
              10、 触发止损：当合作交易品种亏损且点位达到设定数值时，投资人根据设定点位和点买人归定的交易方式卖出交易品种进行止损，此时该损亏结算即为触发止损。


            </p>
            <p>
              11、触发强平：当合作交易品种亏损到点买人选择的最大亏损值时，或者当前品种日内交易时间收盘前5分钟的时，投资人有权以市价强行卖出进行止损。
            </p>
          </div>
          <p class='f28 black0'>二、本次合作基本信息</p>
          <div class="explance">
            <p>
              1、交易品种：{{commoName}}
            </p>
            <p>
              2、交易方向：{{direction}}
            </p>
            <p>
              3、交易数量：{{numer}}手
            </p>
            <p>
              4、持仓时间：1天
            </p>
            <p>
              5、触发止盈：{{profitStopPrice}}
            </p>
            <p>
              6、触发止损：{{loseStopPrice}}
            </p>
            <p>
              7、合作方式：撮合
            </p>
          </div>
          <p class='f28 black0'>三、投资人权利与义务</p>
          <div class="explance">
            <p>1、投资人负责提供用于本次交易合作的账户和资金。</p>

            <p>2、投资人承担本次交易产生的手续费。</p>

            <p>3、投资人按照点买人的买入指令/卖出指令执行交易品种的买入/卖出。</p>

            <p>4、投资人接受点买人买入指令的时间为：一般为交易日{{code | timeTo}}。</p>

            <p>5、投资人接受用户卖出指令的时间为：一般为交易日{{code | timeTo}}。</p>

            <p>6、交易时段盘中，当交易品种浮盈金额≥触发止盈额时或浮亏金额≤触发止损额时，视同用户已向投资人发出市价卖出指令，投资人执行市价卖出指令的，点买人对此不持有异议。

            <p>7、点买人必须在持仓截止时间前向投资人发出卖出指令，否则视同点买人违约，投资人有权在此后任意交易时间卖出并以实际卖出成交价结算，点买人对此不持有异议。</p>

            <p>8、交易盈利时，投资人有权要求系统在交易盈利时按本协议相关约定，从冻结的履约保证金中支付用户盈利分配款。</p>

            <p>10、交易亏损时，投资人有权要求期货投资宝系统按本协议相关约定，将点买人冻结的履约保证金首先用于弥补亏损。</p>

            <p>11、交易亏损大于点买人冻结履约保证金，则超过的亏损部分由投资人自行承担。</p>
          </div>
          <p class='f28 black0'>四、点买人权利与义务</p>
          <div class="explance">

            <p>1、点买人负责提供本次交易合作的交易策略，即买入指令、卖出指令、止盈、止损。</p>

            <p> 2、点买人应在交易时段：上午{{code | timeTo}}。，向投资人发出买入/卖出指令。</p>

            <p>3、点买人应按照《附件1：期货投资宝点买人参与{{commoName}}期货交易涉及费用及资费标准》，通过向期货投资宝平台支付交易综合费，期货投资宝平台提供双方的撮合服务。</p>

            <p>4、点买人应按照《附件1：期货投资宝点买人参与{{commoName}}期货交易涉及费用及资费标准》向期货投资宝平台指定的三方支付联动支付托管履约保证金，并同意由期货投资宝</p>进行冻结，作为履行交易亏损赔付义务的保证。

            <p>5、点买人应授权期货投资宝平台在交易亏损时按本协议相关约定，从冻结的履约保证金中向投资人支付应承担的亏损赔付款。</p>

            <p>6、点买人以其所冻结的履约保证金为最高限额承担交易亏损赔付。如交易亏损大于用户冻结履约保证金数额，超过部分点买人无需承担。</p>


          </div>

          <p class='f28 black0'>五、交易清结算和盈亏分配</p>
          <div class="explance">
            <p> 投资人和点买人共同委托期货投资宝平台按照以下规则对本次交易合作进行记账并交由联动支付对两方履约保证金进行清结算，双方同意以期货投资宝平台的记账数据作为双方盈亏分配的共同依据：</p>

            <p> 1、买入成交价：买入成交价来自交易所回报数据，不含手续费。</p>

            <p> 2、卖出成交价：卖出成交价来自交易所回报数据，不含手续费。</p>

            <p>
              3、交易盈亏：交易方向为买涨时，交易盈亏＝（卖出成交价－买入成交价）×合约乘数；交易方向为买跌时，交易盈亏＝（买入成交价－卖出成交价）×合约乘数。计算结果为正值（含零）时即为交易盈利，计算结果为负值时即为交易亏损。</p>

            <p>
              4、盈利分配：点买人与投资人共同享有本次交易盈利。点买人首先获得交易盈利90％但不高于"触发止盈额×90％"的盈利分配。交易盈利扣减点买人盈利分配即为投资人的盈利分配。即，当：交易盈利≤触发止盈额×90％时，点买人盈利分配＝交易盈利×90％，投资人盈利分配＝交易盈利－点买人盈利分配；当：交易盈利＞触发止盈额×90％时，点买人盈利分配＝触发止盈额×90％，投资人盈利分配＝交易盈利－点买人盈利分配；</p>

            <p>
              5、亏损赔付：点买人与投资人共同承担本次交易亏损。交易亏损首先由点买人承担，点买人以所冻结的履约保证金为最高上限承担交易亏损赔付，交易亏损超过点买人所冻结的履约保证金部分由投资人承担。即，当：交易亏损≤用户冻结履约保证金时，交易亏损由点买人全部承担，投资人无需承担；当：交易亏损＞点买人冻结履约保证金时，点买人以冻结履约保证金额为限承担交易亏损，超过部分由投资人承担。</p>


          </div>


          <p class='f28 black0'> 六、特别约定</p>
          <div class="explance">
            <p>
              1、双方约定为从投资人收到点买人交易指令时点起，至投资人委托下单成交时点止，两时点间隔不超过30秒即为即时买入／即时卖出的时间范畴。根据《期货投资宝服务协议》，从点买人发出交易指令被期货投资宝系统确认时点起，至交易指令成交时点止，两时点时间间隔不超过30秒。如因网络等原因造成交易成交结果回报时间延迟的，以实际交易成交时间为准。</p>

            <p>
              2、交易品种在交易时段因涨停、跌停导致无法卖出的，双方约定由投资人于下一交易时段前5分钟内市价卖出，并保持卖出委托直至卖出全部数量的交易品种，按照实际卖出成交价进行清结算。如整个交易时段皆因涨停、跌停无法卖出，则继续顺延至下一时段。</p>

            <p>
              3、双方授权期货投资宝系统依据期货投资宝账户的记账数据，通过双方在期货投资宝指定的联动支付冻结的履约保证金进行盈利分配款或亏损赔付款的划拨。即：交易盈利时，从投资人履约保证金中划款至点买人期货投资宝账户，划拨金额等于点买人享有的盈利分配额；交易亏损时，从点买人履约保证金中划款至投资人期货投资宝账户，划拨金额等于点买人承担的亏损赔付额。</p>

            <p>
              4、因期货投资宝账户记账数据错误造成双方盈利分配或亏损赔付出现数额差错的，双方约定在期货投资宝规定时限内将异议提交至期货投资宝，通过期货投资宝向对方索取差额补差。如异议一方未在规定时限内提交异议，视同放弃通过期货投资宝向对方索取差额补差之权利。</p>

            <p> 5、因不可抗力导致期货投资宝系统故障，引发交易指令通讯失败或交易指令执行失败，双方约定以期货投资宝系统恢复就近时间重新执行并以执行的最终结果进行交易清结算。期货投资宝不就该等不可抗力承担责任。</p>
          </div>
          <p class='f28 black0'>七、协议的签订、成交和生效</p>
          <div class="explance">
            <p>1、签订方式：本协议由投资人和点买人通过期货投资宝平台以网络页面点击确认的方式签署。</p>

            <p>2、成立：本协议自点买人或投资人签订本协议之日（以两者孰后签订时间为准）成立。</p>

            <p> 3、生效：本协议一经双方签订即生效。</p>
          </div>
          <p class='f28 black0'> 八、其他事项</p>
          <div class="explance">
            <p>1、点买人和投资人必须通过本协议约定的方式或其他双方及期货投资宝认可的方式进行交易合作,否则由此引起的法律后果及违约责任由投资人或点买人自行承担。</p>

            <p>2、本协议项下的双方非涉及个人隐私信息如昵称等均为公开信息。</p>

            <p>3、本协议项下双方交易信息归属期货投资宝平台所有，期货投资宝可根据自身经营需求商业化无偿使用。</p>

            <p> 4、本协议受中华人民共和国法律管辖并按中华人民共和国法律解释。协议履行中发生争议，应由各方先行协商解决。协商不成的，各方可提交有管辖权的法院审理。</p>
          </div>

        </div>
      </div>
    </v-ContentHead>
  </div>
</template>

<<script>
    import ContentHead from '@/components/ContentHead'
    import home from '../../api/home/index'
    import {toast} from '@/util/index'

    export default {
        data() {
            return {
                commoName: '',
                userId: '',
                investId: '',
                code: '',
                numer: '',
                fullName: '',
                direction: '',
                profitStopPrice: '',
                loseStopPrice: '',
                investName: '',
                userName: '',
                prevUrl:'',
            }
        },
        components: {
            'v-ContentHead': ContentHead
        },
        methods: {
            back() {
                this.$router.back(-1);
                localStorage.setItem('openWay','3');
            }

        },
        filters: {
            timeTo(code) {

                if (code == 'GC' || code == 'CL' || code == 'SL') {
                    return '06:00-次日24:00';
                } else if (code == 'HSI' || code == 'MHI') {
                    return '09:15-次日12:00';
                } else {
                    return '14:00-次日24:00';
                }
            }

        },
        mounted() {

            let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId"),
                orderId: this.$route.query.id,
            }

            //我的跟单
            home.getAgreement(senddata).then((res) => {
                if (res.data.code == 200) {
                    window.localStorage.setItem('token',res.data.hid);
                    this.userId = res.data.data.userId;
                    this.investId = res.data.data.investId;
                    this.commoName = res.data.data.commoName;
                    this.direction = res.data.data.direction;
                    this.numer = res.data.data.numer;
                    this.profitStopPrice = res.data.data.profitStopPrice;
                    this.loseStopPrice = res.data.data.loseStopPrice;
                    this.fullName = res.data.data.fullName;
                    this.code = res.data.data.code;
                    this.userName = res.data.data.userName;
                    this.investName = res.data.data.investName;

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
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .wrap {
    .tableBig {
      padding: 0 0.4rem 0.1rem 0.4rem;
      background: @FFF;
      .agreeTitle {
        padding: 0.4rem 0;
      }
      table {
        width: 100%;
        height: 100%;
        border-color: @ddd;
        border: 1px solid @ddd;
        color: @newColor;
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
      }
      .explance {
        text-indent: 0.65rem;
        line-height: 0.5rem;
        color: @newColor;
        margin: 0.4rem 0;
      }

    }
  }
</style>
