<template>
  <div class="wrap">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>找回登录密码</span>
      <span class="img"></span>
    </div>
    <v-Content>
      <div class="main">
        <div class="input-item" >
          <div class="list">
            <span>手机号</span>
            <input type="tel" maxlength="11" v-model='phone' placeholder='请输入手机号' @keyup='isPhoneClean'>
            <img src="../../assets/icon_clean.png" class="rIcon" style="right:0.4rem" v-show="isphone" @click='cleanPhone'
                 alt="">
          </div>
          <div class="list newlists">
            <span>验证码&nbsp;&nbsp;&nbsp;</span>
            <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
            <span @click='phoneSendMsg' v-text='phoneCodetitle' class="rIcon cdspan"></span>
          </div>
        </div>
        <v-button buttonText='下一步' :isActive='isActive' topNum='0.8rem' @toNext='confirm'></v-button>
      </div>
    </v-Content>
  </div>


</template>
<script>
  import login from '@/api/home/index'
  import Button from '@/components/Button'
  import {toast, isPhone, isPassWord} from '@/util/index'
  import Content from '@/components/ContentHead'

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
        if (isPhone(this.phone) && this.phoneCode.length >= 4) {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      'v-button': Button,
      'v-Content': Content,
    },
    methods: {
      back() {
        this.$router.push({path: '/login'})
      },
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
      phoneSendMsg() {
        if (this.count != 60) {
          return false
        } else if (this.phone == "" || !this.phone) {
          toast("请输入手机号");
          return false;
        } else if (!isPhone(this.phone)) {
          toast("请输入正确的手机号码");
          return false;
        } else {
          let sendData = {
            mobile: this.phone
          }
          login.userRetrievePwd(sendData).then(data => {
            if (data.data.code == 200) {
              toast("验证码已经发送到您的手机" + this.phone.substring(0, 3) + "****" + this.phone.substring(7, 11) + "，请查收！");
              this.getphoneCode();
            } else {
              toast(data.data.message)
            }
          })
        }
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
        } else {
          toast('请输入正确的手机号码');
        }
      },
      confirm() {

        if (this.phone == '') {
          toast('请输入手机号码');
        } else if (isPhone(this.phone) == false) {
          toast('请输入正确的手机号码');
        } else if (this.phoneCode.length == 0) {
          toast('请输入验证码');
        } else if (this.phoneCode.length < 4) {
          toast('验证码不能小于4位');
        }
        if (this.isActive) {
          let sendData = {
            mobile: this.phone,
            captcha: this.phoneCode
          }
          login.userGetForgotCode(sendData).then(data => {
            if (data.data.code == 200) {
              this.$store.dispatch('saveRegisterPhone', this.phone)
              this.$router.push({
                path: '/forget2', query: {
                  mobilePhone: this.phone,
                  phoneCode: this.phoneCode
                }
              })
            } else {
              toast(data.data.message)
            }
          })
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '找回登录密码'
      next()
    }
  }
</script>
<style lang='less' scoped>
  @import '../../less/config.less';
  .main{
    padding-top: .75rem;
    width: 100%;
    height: 100%;
    background:@changeColor;
  }
  .wrap {
    background: @changeColor;
    height: 100%;
    padding-top: @p30;
  }
  body .newlists{
    border-bottom: none;
  }
  .input-item {
    width: 94%;
    margin: 0 auto;

    border-radius: 5px;
    .list {
      height: 1.2rem;
      margin-bottom: 0;
    }
  }

  .tips {
    margin-top: 0.4rem;
    color: #56627c;
    font-size: 0.36rem;
    padding-left: 4%;
    .tologin {
      color: @actColor;
      font-size: .4rem;
    }
  }

  .list {
    height: 1.1733rem;
    padding: 0 @p30;
    margin-bottom: 0.34667rem;
    position: relative;
    font-size: 0.42667rem;
    color: @newColor;
    background-color: #FFF;
    border-bottom: 1px solid #ddd;
    span {
      display: inline-block;
      width: 1.70667rem;
    }
    .cdspan {
      width: 3.4rem;
      color: @actColor;
      right: @p30;
      border-left: 1px solid @fColor;
      font-size: .4rem;
    }
    img {
      width: 0.42667rem;
      line-height: 1.1733rem;
      vertical-align: middle
    }
    .rIcon {
      position: absolute;
      right: 0;
      top: 0.45rem;
      text-align: center;
    }
    input {
      width: 5rem;
      color: @newColor;
      padding: .3rem 0 .3rem @p30;
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

