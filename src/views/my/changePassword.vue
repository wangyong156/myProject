<template>
  <div class="change">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>修改登录密码</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="form padding">
        <div class="list mt50">
          <span style="color: #333;width:1.85rem;">当前密码</span>
          <input v-if='ispassword' type="password" maxlength="16" v-model='password' placeholder='请输入当前密码'
                 @keyup='isCleanShow'>
          <input v-if='!ispassword' type="text" maxlength="16" v-model='password' placeholder='请输入当前密码'
                 @keyup='isCleanShow'>
          <img src="../../assets/icon_clean.png" v-show="passShow" @click='isPassWrodClean' alt="">
          <img class="rIcon" :src="passwordSrc" alt="" @click='checkTpye'>
        </div>
        <div class="list mt20">
          <span style="color: #333; width:1.85rem;">登录密码</span>
          <input v-if='newispassword' type="password" maxlength="16" v-model='newpassword' placeholder='请输入新密码'
                 @keyup='newisCleanShow'>
          <input v-if='!newispassword' type="text" maxlength="16" v-model='newpassword' placeholder='请输入新密码'
                 @keyup='newisCleanShow'>
          <img src="../../assets/icon_clean.png" v-show="newpassShow" @click='newisPassWrodClean' alt="">
          <img class="rIcon" :src="newpasswordSrc" alt="" @click='newcheckTpye'>
        </div>
        <div class="list borderT">
          <span style="color: #333;width:1.85rem;">确认密码</span>
          <input v-if='new2ispassword' type="password" maxlength="16" v-model='new2password' placeholder='请确认新密码'
                 @keyup='new2isCleanShow'>
          <input v-if='!new2ispassword' type="text" maxlength="16" v-model='new2password' placeholder='请确认新密码'
                 @keyup='new2isCleanShow'>
          <img src="../../assets/icon_clean.png" v-show="new2passShow" @click='new2isPassWrodClean' alt="">
          <img class="rIcon" :src="new2passwordSrc" alt="" @click='new2checkTpye'>
        </div>
      </div>
      <v-button buttonText='确定' :isActive='isActive' topNum='0.7rem' @toNext='login'></v-button>
    </v-ContentHead>
  </div>

</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import Button from '@/components/Button'
  import {toast, isPassWord} from '@/util/index'

  export default {
    data() {
      return {
        press: true,
        password: '',
        passShow: false,
        passwordSrc: require('../../assets/icon_hide_pwd.png'),
        ispassword: true,

        newpassword: '',
        newpassShow: false,
        newpasswordSrc: require('../../assets/icon_hide_pwd.png'),
        newispassword: true,

        new2password: '',
        new2passShow: false,
        new2passwordSrc: require('../../assets/icon_hide_pwd.png'),
        new2ispassword: true,
      }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    computed: {
      isActive: function () {
        return true
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
      isCleanShow() {
        if (this.mobile != '') {
          this.iconShow = true
        } else {
          this.iconShow = false
        }
        if (this.password != '') {
          this.passShow = true
        } else {
          this.passShow = false
        }
      },

      isPassWrodClean() {
        if (this.password != '') {
          this.password = ''
          this.passShow = false
          return
        }
      },
      checkTpye() {
        this.ispassword = !this.ispassword;
        if (!this.ispassword) {
          this.passwordSrc = require('../../assets/icon_show_pwd.png')
        } else {
          this.passwordSrc = require('../../assets/icon_hide_pwd.png')
        }
      },
      newisCleanShow() {

        if (this.newpassword != '') {
          this.newpassShow = true
        } else {
          this.newpassShow = false
        }
      },

      newisPassWrodClean() {
        if (this.newpassword != '') {
          this.newpassword = ''
          this.newpassShow = false
          return
        }
      },
      newcheckTpye() {
        this.newispassword = !this.newispassword;
        if (!this.newispassword) {
          this.newpasswordSrc = require('../../assets/icon_show_pwd.png')
        } else {
          this.newpasswordSrc = require('../../assets/icon_hide_pwd.png')
        }
      },


      new2isCleanShow() {

        if (this.new2password != '') {
          this.new2passShow = true
        } else {
          this.new2passShow = false
        }
      },

      new2isPassWrodClean() {
        if (this.new2password != '') {
          this.new2password = ''
          this.new2passShow = false
          return
        }
      },
      new2checkTpye() {
        this.new2ispassword = !this.new2ispassword;
        if (!this.new2ispassword) {
          this.new2passwordSrc = require('../../assets/icon_show_pwd.png')
        } else {
          this.new2passwordSrc = require('../../assets/icon_hide_pwd.png')
        }
      },

      login() {
        if (this.password == '') {
          toast("请输入当前密码");
          return false;
        } else if (this.newpassword == "") {
          toast("请输入新密码");
          return false;
        } else if (!isPassWord(this.newpassword)) {
          toast("密码由8-16位数字和字母组成");
          return false;
        } else if (this.password == this.newpassword) {
          toast("新密码不能与旧密码相同");
          return false;
        } else if (this.newpassword != this.new2password) {
          toast("确认密码应与新密码相同");
          return false;
        } else {
          let encrypt = new JSEncrypt();
          encrypt.setPublicKey(this.$store.state.commonkey);
          let senddata = {
            oldPwd: encrypt.encrypt(this.password),
            newPwd: encrypt.encrypt(this.newpassword),
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId")
          }
          if (this.press) {
            this.press = false;
            my.changeP(senddata).then((data) => {
              if (data.data.code == 200) {
                this.$router.push({path: '/login'})
              } else {
                toast(data.data.message);
                this.press = true;
              }
            })
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '修改登录密码';
      next()
    }
  }


</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .change {
    .list {
      span {
        display: inline-block;
        height: auto;
      }
      padding: 0.3rem @p30;
      position: relative;
      font-size: 0.42667rem;
      background-color: #FFF;
      filter: alpha(opacity=70);
      -moz-opacity: 0.7;
      -khtml-opacity: 0.7;
      opacity: 0.7;
      img {
        width: 0.42667rem;
        vertical-align: middle;
      }
      .rIcon {
        position: absolute;
        right: @p30;
        top: 0.42rem;
      }
      input {
        margin-left: @p30;
        width: 4.8rem;
        color: @newColor;
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

  }


</style>
