<template>
  <div class="change">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>忘记支付密码</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="form padding">
        <p class="black9 mt30 mb24 f28">手机号码 <span
          class="ml20">{{phoneCode.substring(0, 3) + "****" + phoneCode.substring(7, 11)}}</span></p>
        <div class="phoneCode">
          <span>验证码</span>
          <input type="text" name="" v-model="inputCode" max-length="6" value="" placeholder="请输入验证码"/>
          <a style="color: #f8cc00;" class="validate" @click="phoneSendMsg" v-text='phoneCodetitle'></a>
        </div>
      </div>
      <v-button buttonText='下一步' :isActive='isActive' topNum='0.8rem' @toNext='login'></v-button>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import login from '@/api/home/index'
  import Button from '@/components/Button'
  import {toast, setwithdrawalPwd} from '@/util/index'

  export default {
    data() {
      return {
        press: true,
        phoneCodetitle: "获取验证码",
        phoneCode: "",
        count: 60,
        inputCode: "",
      }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    computed: {
      isActive: function () {
        if (this.inputCode) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      isPhone() {
        if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length != 11) {
          return false
        } else if (/^1[34578]\d{9}$/.test(phone) && phone.length == 11) {
          return true;
        }
      },

      login() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          msgCode: this.inputCode
        }
        if (this.press) {
          this.press = false;
          my.phoneCheckPaypwdMsg(senddata).then(data => {
            if (data.data.code == 200) {
                window.localStorage.setItem("token", data.data.hid);
              this.$router.push({
                path: '/findWithdrawals',
                name: 'findWithdrawals',
                query: {hasPwd: 2, forget: 1}
              })
            } else {
              toast(data.data.message);
              this.press = true;
            }
          })
        }
      },
      phoneSendMsg() {
        if (this.count != 60) {
          return false
        }
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId")
        }
        my.phoneSendMsg(senddata).then(res => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            toast("验证码已经发送到您的手机" + this.phoneCode.substring(0, 3) + "****" + this.phoneCode.substring(7, 11) + "，请查收！");
            this.getphoneCode();
          } else if(res.data.code == 401){
            toast(res.data.message);
            var that = this;
            setTimeout(function(){
              that.$router.push({path: '/login'})
            },1000);
          } else {
            toast(res.data.message);
          }
        })
      },
      getphoneCode() {
        if (this.phoneCode) {
          if (this.count != 60) {
            return false
          }
          let timer = setInterval(() => {
            this.count--
            this.phoneCodetitle = `${this.count}秒`
            if (this.count == 0) {
              clearInterval(this.timer)
              this.phoneCodetitle = '重新获取验证码'
              this.count = 60
            }
          }, 1000)
        }
      },
    },
    mounted() {
      this.phoneCode = window.localStorage.getItem("phone");
      //this.phoneSendMsg();
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '忘记支付密码'
      next()
    }
  }


</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .change {
    .phoneCode {
      padding: 0.4rem 0;
      font-size: 0;
      height: 1.3067rem;
      font-size: @f32;
      background-color: #FFF;
      color: @newColor;
      span {
        display: inline-block;
        width: 2.3rem;
        text-align: center;
      }
      a {
        text-decoration: none;
        display: inline-block;
        border-left: 1px solid @ddd;
        width: 3.2rem;
        text-align: center;
      }
      input {
        width: 3.4rem;
        color: @newColor;
        border: none;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers*/
        color: #ccc;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 4 to 18*/
        color: #ccc;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+*/
        color: #ccc;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+*/
        color: #ccc;
      }

    }
  }


</style>
