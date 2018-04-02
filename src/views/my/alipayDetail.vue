<template>
  <div class="alipay">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>支付宝转账</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="padding mt24 mb24 f28">第一步：请复制或牢记我们的支付宝账号</div>
      <div class="mainback first">
        <img class="mr75" src="../../img/recharge_pic_zhifubao@2x.png"/>
        <div style="flex:1">
          <p class="black3">支付宝账号: <span id="number">{{info}}</span>
            <button class="  copy" data-clipboard-action="copy" data-clipboard-target="#number">复制</button>
          </p>
          <p class="black9 mt20">{{company}}</p>
        </div>
      </div>
      <div class="padding mt24 mb24 f28">第二步：手机打开支付宝，快速转账</div>
      <div class="mainback second">
        <div class="w40 fl tc">
          <img style="width:1.33rem" src="../../img/alipay_pay1.png"/>
          <p class="mt20">手机打开支付宝</p>
        </div>
        <div class="w20 fl tc">
          <img style="width:1.33rem" src="../../img/newImg/alipay_pay2.png"/>
        </div>
        <div class="w40 fl tc">
          <img style="width:1.92rem" src="../../img/alipay_pay3.png"/>
          <p class="mt20">选择转账到支付宝账户</p>
        </div>
        <div class="fd-clear"></div>
        <p class="mt60 tc black3">完成后，手机登录APP查看账户余额</p>
      </div>

      <v-button buttonText='确定' :isActive='isActive' topNum='0.8rem' @toNext='toMy'></v-button>
      <p class="black9" style="text-align: center; display: block;line-height: 0.6rem; margin-top: 0.8rem;">
        到账时间<br/>
        08:30-17:30（1小时内到账）<br/>
        17:30以后（次日09:30前到账）<br/>
        如急需到账，请电话 <a class="base" href="tel:0571-85857825">联系客服</a>
      </p>
    </v-ContentHead>
  </div>
</template>

<script>
  import Button from '@/components/Button'
  import "../../components/clipboard/clipboard.min.js"
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, services} from '@/util/index'

  export default {
    data() {
      return {
        info: '',
        company: ''
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
    methods: {
      back() {
        this.$router.back(-1);
      },
      init() {
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function (e) {
          console.log(e);
          toast('复制到剪切板成功');
        });
        clipboard.on('error', function (e) {
          console.log(e);
          toast('复制到剪切板失败，请手动复制');
        });
      },
      toMy() {
        this.$router.push({path: '/my'})
      },
    },
    mounted() {
      this.init();
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.rechargeInfo(senddata).then(res => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          var result = res.data.data;
          this.info = result.alipayAccount;
          this.company = result.fullName;
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
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '支付宝转账'
      next()
    }

  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';
  .copy{
    float: right;
    color: @linkBlue;
  }
  .f28{
    color: #333;
  }
  a{
    text-decoration: none;
    color: @linkBlue;
  }
  #number{
    display: inline-block;
    vertical-align: middle;
    width: 3.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .alipay {
    color: white;
    .first {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      padding: 0 0.4rem;
      button {
        background-color: transparent;
        border: 0;
      }
      img {
        width: 1.76rem;
      }
    }
    .second {
      padding: 0.6rem 0;
      p{
        color: @newColor;
      }
    }
  }

</style>
