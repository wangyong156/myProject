<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>客服中心</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="call">
        <div class="call-left">
          <p class="call-top">客服热线<span>400-0181-8261</span></p>
          <p class="call-bottom">服务时间08:30-20:30</p>
        </div>
        <div class="call-right">
          <img src="../../assets/icon_call.png"/>
          <span>立即拨打</span>
        </div>
      </div>
      <div class="title">点买问题</div>
      <div>
        <v-ServerArrowList :item='buyOne' @toNext=''></v-ServerArrowList>
      </div>
      <div class="wrapOptional">
        <v-ServerArrowList :item='buyTwo' @toNext=''></v-ServerArrowList>
      </div>
      <div class="title">清算问题</div>
      <div>
        <v-ServerArrowList :item='castOne' @toNext=''></v-ServerArrowList>
      </div>
      <div class="wrapOptional">
        <v-ServerArrowList :item='castTwo' @toNext=''></v-ServerArrowList>
      </div>
      <div class="title">充值问题</div>
      <div>
        <v-ServerArrowList :item='rechargeOne' @toNext=''></v-ServerArrowList>
      </div>
      <div class="wrapOptional">
        <v-ServerArrowList :item='rechargeTwo' @toNext=''></v-ServerArrowList>
      </div>
      <div class="wrapOptional">
        <v-ServerArrowList :item='rechargethree' @toNext=''></v-ServerArrowList>
      </div>
      <div class="footer">
        没有解决问题?点此提问
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
  import ServerArrowList from '@/components/ServerArrowList'
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, isRealName, isBankNumber} from '@/util/index'

  export default {
    data() {
      return {
        buyOne: {
          text: '为什么我点买失败',
          hidden: '由于行情波动只有全部成交后，才会结算该策略'
        },
        buyTwo: {
          text: '为什么点卖时会部分成交，怎么结算？',
          hidden: '由于行情波动过大，点卖时会造成部分成交，只有全部成交后，只有全部只有全部只有全部只有全部才会结算该策略'
        },
        castOne: {
          text: '点卖清算后资金何时返还账户余额？',
          hidden: '由于行情波动过大，点卖时会造成部分成交波动过大，点卖时会造成部分成交，只有全部成交后，才会结算该策略'

        },
        castTwo: {
          text: '为什么点卖时会部分成交，怎么结算？',
          hidden: '由于行情波动过大，点卖时会造成部分成交'
        },
        rechargeOne: {
          text: '怎么充值？',
          hidden: '由于行情波动过大，点卖时会造成部分成交，才会结算该策略'
        },
        rechargeTwo: {
          text: '充值到账速度快吗？',
          hidden: '由于行情波动过大，波动过大，点卖时会造成部分成交，点卖时会造成部分成交，只有全部成交后，才会结算该策略'

        },
        rechargethree: {
          text: '提款到账速度快吗？',
          hidden: '由于行情波动过大，点卖时会造成部分成交，只有全部成交后，才会结算该策略波动过大，点卖时会造成部分成交，波动过大，点卖时会造成部分成交，'
        }
      }
    },
    components: {
      'v-ServerArrowList': ServerArrowList,
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1);
      }
    },
    mounted() {
      let senddata = {
        userId: window.localStorage.getItem("token")
      }

      my.suggestion(senddata).then((res) => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          this.name = res.data.data.userAuth.realname;
          this.bankList = res.data.data.sysBankList;

        } else if (res.data.code == 103) {
          this.$router.push({path: '/realnameInfo'})
        } else {
          toast(res.data.message)
        }
      })
    }
  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .call {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @p30;
    height: 2.08rem;
    background-color: #141723;
    .call-left {
      .call-top {
        font-size: @f32;
        span {
          color: #FFDD25;
          margin-left: @f24;
        }
      }
      .call-bottom {
        font-size: @f26;
        color: @Color;
        margin: @f24 0 0 2rem;
      }
    }
    .call-right {
      width: 2.74666rem;
      height: .88rem;
      border-radius: 0.66666rem;
      background: #FFDD25;
      color: #8e4106;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: @p30;
      span {
        margin-left: .1rem;
      }
    }
  }

  .title {
    padding-left: @p30;
    height: 0.90666rem;
    line-height: 0.90666rem;
    color: @Color;
  }

  .wrapOptional {
    border-top: @border 2px solid;
  }

  .footer {
    height: @hwrap;
    line-height: @hwrap;
    color: #FFFFFF;
    text-align: center;
    font-size: @f28;
  }
</style>
