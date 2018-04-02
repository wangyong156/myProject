<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>申请投资人</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="black6 f28">
        <div class="mt20 mainback applyItem">
          <p class="black3 tc f32">什么是期货投资宝投资人</p>
          <p class="mt30 textIndent">具有合法的期货投资资格，以自主的期货账户通过期货投资宝与点买人 进行撮合策略交易，按点买人的交易策略进行下单，并按合作协议和交易结果共享收益共担风险！</p>
        </div>
        <div class="mt20 mainback applyItem">
          <p class="black3 f32">一、投资人的基本要求</p>
          <p class="mt30 textIndent">1、年满18周岁，具有完全民事行为能力</p>
          <p class="textIndent">2、有至少200万的投资资金，20万的履约保证金</p>
          <p class="textIndent">3、投资期货或者境外金融衍生口不少于3年（以期货账号交易记录为准）</p>
          <p class="textIndent">4、同意并接受《点买人与投资人参与期货合作协议》</p>
          <p class="textIndent">5、需要指定券商或期货公司开户</p>
          <p class="textIndent">6、合作过程能严格执行点买人交易策略</p>
          <p class="textIndent">7、开通期货投资宝平台账户</p>
          <p class="textIndent">8、通过申请审核后，需至期货投资宝运营公司现场签署相关协议</p>
        </div>
        <div class="mt20 mainback applyItem">
          <p class="black3 f32">二、投资人的风险警示</p>
          <p class="mt30 textIndent">1、需要承担策略交易中超过点买人履约保证金范围的亏损风险</p>
          <p class="textIndent">2、需要承担网络通讯、系统等不可抗力的投资亏损风险</p>
          <p class="textIndent">3、需要承担停牌、换合约等无法卖出的资金占用风险</p>
          <p class="textIndent">4、需要承担券商、期货公司以及交易所等系统故障造成的风险</p>
          <p class="textIndent">5、需要承担持续涨跌停导致无法卖出的风险</p>
          <p class="textIndent">6、需要知晓止损会因行情延迟以及指令延迟造成的亏损风险</p>
          <p class="textIndent">7、需要承担超出点买人认可的时限内完成交易的价格偏差风险</p>
          <p class="textIndent">8、需要承担策略合作可能不盈利导致无法收益分享的风险</p>
        </div>
      </div>
      <!--<div class="mt20 mainback bottonWrap">
        <v-button buttonText='联系客服' :isActive='isActive' topNum='0' @toNext=''></v-button>
      </div>-->
      <div class="mt20 mainback bottonWrap tc"><a href="tel:40001818261">联系客服</a></div>
    </v-ContentHead>
  </div>
</template>
<script>
  import Button from '@/components/Button'
  import ContentHead from '@/components/ContentHead'

  export default {
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back(-1)
      }
    },
    computed: {
      isActive: function () {
        return true;
      }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '申请投资人'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .bottonWrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    a {
      display: inline-block;
      width: 100%;
      height: 1.17333rem;
      line-height: 1.17333rem;
      background-color: @actColor;
      border-radius: 0.08rem;
      color: @zero;
      font-size: 0.48rem;
      text-decoration: none;
    }
  }

  .applyItem {
    padding: 0.64rem 0.4rem 0.4rem;
    line-height: 0.58rem;
  }
  .applyItem:last-child{
    margin-bottom: 2rem;
  }
</style>
