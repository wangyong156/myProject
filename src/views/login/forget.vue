<template>
  <div class="wrap">
    <div class="input-item">
      <div class="list">
        <span>手机号</span>
        <input type="tel" maxlength="11" v-model='phone' placeholder='请输入手机号' @keyup='isPhoneClean'>
        <img src="../../assets/icon_clean.png" class="rIcon" v-show="isphone" @click='cleanPhone' alt="">
      </div>
      <div class="list newlists">
        <span>验证码&nbsp;&nbsp;&nbsp;</span>
        <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
        <span @click='getphoneCode' v-text='phoneCodetitle' class="rIcon cdspan"></span>
      </div>
    </div>
    <!--<p class="tips">我已经阅读同意  <router-link class="tologin" to='/find'>《涨盈宝服务协议》</router-link></p>-->
    <v-button buttonText='下一步' :isActive='isActive' topNum='0.8rem' @toNext='confirm'></v-button>
    <!--<div class="islogin">-->
    <!--已有帐号？-->
    <!--<router-link class="tologin" to='/'>请登录</router-link>-->
    <!--</div>-->
    <!--<div class="islogin">-->
      <!--如果收不到验证码，请拨打-->
      <!--<router-link class="tologin" to='/'>客服热线</router-link>处理-->
    <!--</div>-->
  </div>


</template>
<script>
  import login from '@/api/home/index'
  import Button from '@/components/Button'
  import { toast, isPhone, isPassWord } from '@/util/index'
  export default {
    data() {
      return {
        phone: '',
        phoneCodetitle: '获取验证码',
        isphone: false,
        count: 60,
        phoneCode: '',
      }
    },
    computed: {
      isActive: function () {
        if (isPhone(this.phone) && this.phoneCode.length == 6) {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      'v-button': Button
    },
    methods: {
      isPhoneClean() {
        if (this.phone != '') {
          this.isphone = true
        } else {
          this.isphone = false
        }
      },
      cleanPhone() {
        this.phone = ''
        this.isphone = false
      },
      getphoneCode() {
        if (isPhone(this.phone)) {
          if (this.count != 60) {
            return false
          }
          let timer = setInterval(() => {
            this.count--
            this.phoneCodetitle = `${this.count}秒`
            if (this.count == 0) {
              clearInterval(timer)
              this.phoneCodetitle = '重新获取验证码'
              this.count = 60
            }
          }, 1000)
          let sendData={
            phone:this.phone
          }
          login.userGetRegistCode(sendData).then(data => {
            if (data.data.code == 200) {

            } else {
              toast(data.data.message)
            }
          })
        }
      },
      confirm() {
        console.log('confirm')
        if (this.isActive) {
          let sendData={
            phone:this.phone,
            phoneCode:this.phoneCode
          }
          login.userCheckRegistCode(sendData).then(data=>{
            if(data.data.code==200){
              this.$store.dispatch('saveRegisterPhone',this.phone)
              this.$router.push({ path: '/register2'})
            }else{
              toast(data.data.message)
            }
          })
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../less/config.less';
  body .newlists{
    border-bottom: none;
  }
  .wrap {
    background: @changeColor;
    height: 100%;
    padding-top: @p30;
  }
  .input-item{
    width: 94%;
    margin: 0 auto;

    border-radius: 5px;
    .list{
      height: 1.2rem;
      margin-bottom: 0;
    }
  }
  .tips{
    margin-top: 0.4rem;
    color: #56627c;
    font-size: 0.36rem;
    padding-left:4%;
    .tologin {
      color: @actColor;
    }
  }
  .list {
    height: 1.1733rem;
    padding: 0 @p30;
    margin-bottom: 0.34667rem;
    position: relative;
    font-size: 0.42667rem;
    color: @newColor;
    background-color: @changeColor;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    opacity: 0.7;
    span {
      display: inline-block;
      width: 1.70667rem;
    }
    .cdspan {
      width: 3rem;
      color: @actColor;
      right: @p30;
      border-left: 2px solid @ddd;
    }
    img {
      width: 0.42667rem;
      line-height: 1.1733rem;
      vertical-align: middle
    }
    .rIcon {
      position: absolute;
      right: @p30;
      top: 0.45rem;
      text-align: right;
    }
    input {
      padding-left: @p30;
      width: 5rem;
      color: @newColor;
      line-height: 1.1733rem;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 4 to 18*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+*/
      color: @placeColor;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+*/
      color: @placeColor;
    }
  }

  .islogin {
    margin-top: 0.4rem;
    text-align: center;
    color: @Color;
    font-size: 0.38rem;
    .tologin {
      color: @actColor;
    }
  }
</style>

