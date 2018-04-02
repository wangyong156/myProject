<template>
  <div class="change">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>修改手机号</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div v-show="!this.new">
        <div class="form padding">
          <p class="black3 mt30 mb24 f28">手机号码 <span
            class="ml20">{{phoneCode.substring(0, 3) + "****" + phoneCode.substring(7, 11)}}</span></p>
          <div class="phoneCode">
            <span>验证码</span>
            <input type="text" name="" v-model="inputCode" value="" placeholder="请输入验证码" maxlength="6"/>
            <a @click="oldPhoneSendMsg" :class="phoneCodetitle == '获取验证码' ||phoneCodetitle == '重新获取验证码' ?'active':'' " v-text='phoneCodetitle'></a>
          </div>
        </div>
        <v-button buttonText='下一步' :isActive='isActive' topNum='0.8rem' @toNext='phoneCheckMsg'></v-button>
      </div>
      <div class="mt60" v-show="this.new">
        <div class="form padding">
          <div class="phoneCode">
            <span>手机号</span>
            <input type="text" name="" v-model="newPhone" value="" placeholder="请输入手机号" maxlength="11"/>
          </div>
          <div class="phoneCode borderT">
            <span>验证码</span>
            <input type="text" name="" v-model="inputCode1" value="" placeholder="请输入验证码" maxlength="6"/>
            <a @click="newPhoneSendMsg" class="cdspan"  v-text='phoneCodetitle'></a>
          </div>
        </div>
        <v-button buttonText='下一步' :isActive='nextActive'  topNum='0.8rem' @toNext='phone'></v-button>
      </div>
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
        inputCode1: "",
        newPhone: "",
        new: false,
        timer: ""
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
      },
      nextActive: function () {
        if (this.inputCode1 && this.newPhone && this.isPhone(this.newPhone)) {
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
      isPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length != 11) {
          return false
        } else if (/^1[34578]\d{9}$/.test(phone) && phone.length == 11) {
          return true;
        }
      },
      oldPhoneSendMsg() {
        if (this.count != 60) {
          return false
        }
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId")
        }
        my.oldPhoneSendMsg(senddata).then((res) => {
          if (res.data.code == 200) {
            this.toastPhone(this.phoneCode);
            this.getphoneCode();
          } else if (res.data.code == 401) {
            toast(res.data.message);
            var that = this;
            setTimeout(function () {
              that.$router.push({path: '/login'})
            }, 1000);
          } else {
            toast(res.data.message);
          }
        })
      },
      phoneCheckMsg() {
        if (this.inputCode == '') {
          toast("请输入验证码");
          return false;
        } else {
          if (this.press) {
            this.press = false;
            let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId"),
              msgCode: this.inputCode
            }
            my.phoneCheckMsg(senddata).then((res) => {
              if (res.data.code == 200) {
                  window.localStorage.setItem("token", res.data.hid);
                this.new = !this.new;
                clearInterval(this.timer);
                this.phoneCodetitle = "获取验证码";
                this.count = 60;
                this.press = true;
              } else if (res.data.code == 401) {
                toast(res.data.message);
                var that = this;
                setTimeout(function () {
                  that.$router.push({path: '/login'})
                }, 1000);
              } else {
                toast(res.data.message);
                this.press = true;
              }
            })
          }
        }
      },
      newPhoneSendMsg() {
        if (this.newPhone == '') {
          toast("请填写手机号");
          return false;
        } else if (!this.isPhone(this.newPhone)) {
          toast("请填写正确的手机号");
          return false;
        } else {
          let senddata = {
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId"),
            newPhone: this.newPhone
          }
          my.newPhoneSendMsg(senddata).then((res) => {
            if (res.data.code == 200) {
              this.toastPhone(this.newPhone);
              this.getphoneCode();
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
      },
      phone() {
        if (this.newPhone == '') {
          toast("请填写手机号");
          return false;
        } else if (!this.isPhone(this.newPhone)) {
          toast("请填写正确的手机号");
          return false;
        } else if (this.inputCode1 == '') {
          toast("请填写验证码");
          return false;
        } else {
          if (this.press) {
            this.press = false;
            let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId"),
              msgCode: this.inputCode,
              newPhone: this.newPhone,
              newMsgCode: this.inputCode1
            }
            my.phone(senddata).then((res) => {
              if (res.data.code == 200) {
                  window.localStorage.setItem("token", res.data.hid);
                this.logout();
                that.$router.push({path: '/login'});
              } else if (res.data.code == 401) {
                toast(res.data.message);
                var that = this;
                setTimeout(function () {
                  that.$router.push({path: '/login'})
                }, 1000);
              } else {
                toast(res.data.message);
                this.press = true;
              }
            })
          }
        }
      },
      logout() {
        //localStorage.clear();         //批量删除
        window.localStorage.removeItem("phone");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        this.$router.push({path: '/login'});
      },
      toastPhone(phone) {
        toast("验证码已经发送到您的手机" + phone.substring(0, 3) + "****" + phone.substring(7, 11) + "，请查收！");
      },
      getphoneCode() {
        if (this.count != 60) {
          return false
        }
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.count--
          this.phoneCodetitle = `${this.count}s`
          if (this.count == 0) {
            clearInterval(this.timer);
            this.phoneCodetitle = '重新获取验证码';
            this.count = 60;
          }
        }, 1000);
      }
    },
    mounted() {
      this.phoneCode = window.localStorage.getItem("phone");
      //this.oldPhoneSendMsg();
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '修改手机号'
      next()
    }
  }


</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .change {
    .phoneCode {
      padding: 0.4rem 0;
      height: 1.3067rem;
      font-size: @f32;
      background-color: @FFF;
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
        color: @nine;
        //color: @actColor;
      }
      .active{
        color: @actColor;
      }
      input {
        width: 3.4rem;
        color: @newColor;
        border: none;
        overflow: hidden;
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
