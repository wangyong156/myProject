<template>
  <div class="alipay">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>支付宝转账</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="inner mt20 mb20 border-none">
        <span>账户余额</span>
        <p><span style="width: auto;">{{amount}}</span>元</p>
      </div>
      <div class="inner">
        <span>支付宝实名</span>
        <p style="flex: 1; color: #333;">{{name}}</p>
      </div>
      <div class="inner">
        <span>支付宝账号</span>
        <p style="flex: 1; color: #333;">{{no}}</p>
      </div>
      <div class="inner border-none">
        <span>充值金额</span>
        <input type="text" v-model="money" placeholder="请输入金额"/>
      </div>
<!--      <p style="margin-top: 0.2667rem;">注：进入个人中心->账户信息-><span class="base">支付宝账户认证</span></p>
      <p style="margin-top: 0.34666rem ;margin-bottom: 1.04rem;">绑定支付宝账号，认证通过后，可以提高支付宝到账时间</p>-->
      <v-button buttonText='下一步' :isActive='isActive' topNum='1rem' @toNext='toAlipayDetail'></v-button>
      <p style="text-align: center; display: block;line-height: 0.6rem; margin-top: 0.96rem;">
        到账时间<br/>
        08:30-17:30（1小时内到账）<br/>
        17:30以后（次日09:30前到账）<br/>
        如急需到账，请电话 <a class="base" href="tel:0571-85857825">联系客服</a>
      </p>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, Money} from '@/util/index'
  import Button from '@/components/Button'

  export default {
    data() {
      return {
        press: true,
        amount: '0.00',
        name: '',
        no: '',
        money: '',
        rechargeMin:'',
        rechargeMax:'',
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
        toAlipayDetail() {

            if (this.money == '') {
                toast("请输入金额");
                return false;
            }
            if (!Money(this.money)) {
                toast("请输入正确的金额");
                return false;
            }
            if(this.rechargeMax != null){
                if(this.money > Number(this.rechargeMax)){
                    toast('充值金额不得大于' + this.rechargeMax + '元');
                    return false;
                }
            }

            if(this.rechargeMin != null){
                if(this.money < Number(this.rechargeMin)){
                    toast('充值金额不得小于' + this.rechargeMin + '元');
                    return false;
                }
            }


            if (this.press) {
                this.press = false;
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    amount: this.money
                }
                my.aliPayRecharge(senddata).then(res => {
                    if (res.data.code == 200) {
                        this.alipayUrl = res.data.data.alipayUrl;
//                    this.alipayUrl = "https://qr.alipay.com/aex03343ihflz1yzu85lu1f";
                    } else if (res.data.code == 401) {
                        toast(res.data.message);
                        var that = this;
                        setTimeout(function () {
                            that.$router.push({path: '/login'})
                        }, 1000);
                    } else {
                        toast(res.data.message);
                        this.press = true;
                        clearInterval(window.stopAlipay);
                    }
                })

                this.goAlipay();
            }
        },

        goAlipay(){
            let that = this;
            let isApp = window.localStorage.getItem('isApp');

            if(isApp != 1){
                this.$router.push({path: '/alipayDetail'});
            }else {
                window.getAlipay = setInterval(function () {
                    if (that.alipayUrl != null && that.alipayUrl!=''){
                        clearInterval(window.getAlipay);
                        window.location.href = that.alipayUrl;
                    }
                },100)

                window.stopAlipay = setTimeout(function () {
                    clearInterval(window.getAlipay);
                    that.$router.push({path: '/alipayDetail'});
                },5000)
            }
        },
    },
    mounted() {
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.aliPayAccount(senddata).then(res => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          var result = res.data.data;
          this.amount = (result.available).toFixed(2);
          this.no = result.alipayAccount;
          this.name = result.realName;
          this.rechargeMin = result.rechargeMin;
          this.rechargeMax = result.rechargeMax;
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
  .border-none{
    border:none !important;
  }
  a{
    text-decoration: none;
    color: @linkBlue;
  }
  .alipay {
    color: @newColor;
    .inner {
      border-bottom: 1px solid @ddd;
      background: @FFF;
      padding: 0 @p30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.17333rem;
      input {
        flex: 1;
        font-size: @f32;
        color: @newColor;
      }
      span {
        width: 2.4rem;
        font-size: @f32;
        margin-right: 0.69333rem;
      }
      p {
        font-size: @f32;
        padding: 0px;

        span {
          margin-right: .3rem;
          color: @red;
          font-weight: bold;

        }
      }
    }
    p {
      padding: 0 @p30;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @nine;
      font-size: @f24;
    }

  }

</style>
