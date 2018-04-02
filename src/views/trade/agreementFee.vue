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
          <div class="agreeTitle f28  tc">点买人参与{{name}}期货交易涉及费用及资费标准</div>
          <div class="explance">
            点买人通过平台参与恒指期货策略合作将涉及交易综合费和履约保证金的发生。
          </div>
          <p class='f28 '>一、交易综合费</p>
          <div class="explance">
            <p>
              1、交易综合费为平台向点买人收取的费用。交易综合费包含：1)平台为点买人提供交易合作信息发布、交易合作撮合、交易指令通讯、交易风控管理与交易记账等服务而收取的信息服务费；2）平台代第三方支付平台收取用于第三方支付为点买人提供资金存取、冻结、解冻、支付和结算等服务手续费。
            </p>
            <p>
              2、交易综合费以点买人每次发布策略的交易手数来计算，恒指每发布一条策略为158元/手（下表数值仅为用户查询方便提供，交易综合费具体数值通过点买页面公布，以点买人实际选择为准。)
            </p>
            <table class="table mt10" border="1" cellspacing="0" cellpadding="0">
              <tr>
                <td>策略手数</td>
                <td>交易综合费（元）</td>
              </tr>
              <tr v-for="(item,index) in numArr">
                <td>{{item}}</td>
                <td>{{fee * item}}</td>
              </tr>
            </table>
            <p style="margin-top: .4rem">
              3、交易综合费于点买人签署《点买人与投资人参考期货策略合作协议》时即支付。交易综合费一经支付不予退还。当且仅当因平台原因导致系统故障，致使点买人和投资人交易合作失败时，点买人方可向申请退还交易综合费。
            </p>
          </div>
          <p class='f28 '>二、履约保证金</p>
          <div class="explance">
            <p>
              1、履约保证金为点买人委托平台冻结用于履行交易亏损赔付义务的保证金。点买人以冻结履约保证金之数额作为承担交易亏损赔付的上限。
            </p>
            <p>
              2、履约保证金以策略手数为计算基数，以触发止损为冻结系数，计算点买人应冻结履约保证金金额。计算公式：履约保证金=止损金额/止损率（下表数值仅为用户查询方便提供，触发止损具体数值通过点买页面公布，以点买人实际选择为准。）
            </p>
            <table class="table" border="1" cellspacing="0" cellpadding="0" v-for="(item,index) in moneyArr">
              <tr>
                <td>策略手数</td>
                <td>止损金额（元）</td>
                <td>履约保证金（元）</td>
              </tr>
              <tr  v-for="(ite,ind) in item">
                <td>{{ite.num}}</td>
                <td>{{ite.a}}</td>
                <td>{{ite.b}}</td>
              </tr>
            </table>
            <p class="mt10">
              3、交易合作结束，根据平台的记录结果，如交易盈利，点买人冻结履约保证金全额解冻。如交易亏损，从点买人通过平台冻结在三方支付公司的履约保证金中，扣减点买人所应承担亏损赔付额的数额，扣减后余额解冻并返还。
            </p>
          </div>
          <p class='f28 '>三、关于以上资费标准的声明</p>
          <div class="explance">
            <p>1、平台声明，以上所有涉及资费标准的数据，均为平台根据市场行情阶段性调整的实时标准，该数据具有一定浮动性。</p>

            <p>2、平台关于以上资费标准不做不予调整的承诺，平台将根据客观的市场行情对资费标准进行适时调整，关于调整结果将及时告知所有平台用户，并将一如既往地尊重用户在新的资费条件下是否选择继续与平台合作的权利。</p>

            <p>3、以上计算单元为人民币，期货交易这程中可能涉及美金、欧元、港币等，平台在汇率波动不大时以一个相对固定值做为参考依据，并随时有权利根据汇率波动进行调整。</p>

          </div>
        </div>
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
  import ContentHead from '@/components/ContentHead'
  import home from '../../api/home/index'
  import {toast} from '@/util/index'

  export default {
    data() {
      return {
        name: this.$route.query.name,
        fee: 158,
        numArr:[],
        moneyArr: [
          [{"a": "-1320", "b": "1650"}, {"a": "-2640", "b": "3300"}, {"a": "-4400", "b": "5500"}],
          [{"a": "-2640", "b": "3300"}, {"a": "-5280", "b": "6600"}, {"a": "-8800", "b": "11000"}],
          [{"a": "-3960", "b": "4950"}, {"a": "-7920", "b": "9900"}, {"a": "-13200", "b": "16500"}],
          [{"a": "-5280", "b": "6600"}, {"a": "-10560", "b": "13200"}, {"a": "-17600", "b": "22000"}],
          [{"a": "-6600", "b": "8250"}, {"a": "-13200", "b": "16500"}, {"a": "-22000", "b": "27500"}],
        ]
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1);
      }

    },
    filters: {
      timeTo(code) {
        if (code == 'GC') {
          return '06:00-次日24:00';
        } else {
          return '06:00-次日24:00';
        }
      }

    },
    mounted() {

        let params = {
            'HUIMI_SESSIONID': window.localStorage.getItem("token"),
            'HUIMI_USERID': window.localStorage.getItem("userId"),
            'commoId': this.$route.query.id,
        }

        let that = this;

        home.getRules(params).then((res) => {
            if (res.data.code == 200) {
                window.localStorage.setItem("token", res.data.hid);
                that.moneyArr = res.data.data.moneyArr;
                that.numArr = res.data.data.numArr;
                that.fee = res.data.data.fee;
            } else {
                toast(res.data.message);
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
        text-align: center;
        span {
          display: block;
          line-height: 0.56rem;
        }
        tr {
          height: 0.8rem;
        }

      }
      table:not(:first-child) {
        margin-top: 0.4rem;
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
