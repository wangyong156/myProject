<template>
  <div class="wrap">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>注册</span>
      <span class="img"></span>
    </div>
    <v-Content>
      <div class="main">
      <div class="input-item" >
      <!--<div class="list">-->
      <!--<span>用户名</span>-->
      <!--<input style="width:7rem" type="text" maxlength="16" v-model='userName' placeholder='6-16位数字和字母组成的用户名' @keyup='isuserNameClean'>-->
      <!--<img src="../../assets/icon_clean.png" class="rIcon" v-show="isuserName" @click='cleanuserName' alt="">-->
      <!--</div>-->

      <div class="list">
        <span>登录密码</span>
        <input v-if='ispassword1' type="password" maxlength="16" v-model='password1' placeholder='8-16位数字和字母组成'
               @keyup='isCleanShow1'>
        <input v-if='!ispassword1' type="text" maxlength="16" v-model='password1' placeholder='8-16位数字和字母组成'
               @keyup='isCleanShow1'>
        <img src="../../assets/icon_clean.png" v-show="passShow1" @click='isClean1' alt="">
        <img class="rIcon" :src="passwordSrc1" alt="" @click='checkTpye1'>
      </div>
      <div class="newlists list">
        <span>确认密码</span>
        <input v-if='ispassword2' type="password" maxlength="16" v-model='password2' placeholder='请确认登录密码'
               @keyup='isCleanShow2'>
        <input v-if='!ispassword2' type="text" maxlength="16" v-model='password2' placeholder='请确认登录密码'
               @keyup='isCleanShow2'>
        <img src="../../assets/icon_clean.png" v-show="passShow2" @click='isClean2' alt="">
        <img class="rIcon" :src="passwordSrc2" alt="" @click='checkTpye'>
      </div>
    </div >
       <div class="btn" :isActive='isActive' @click='confirm'>注册</div>
      </div>
    </v-Content>
  </div>
</template>
<script>
  import Button from '@/components/Button'
  import login from '@/api/home/index'
  import {toast, isUserName, isPassWord} from '@/util/index'
  import Content from '@/components/ContentHead'

  export default {
    data() {
      return {
        userName: '',
        isuserName: false,
        password1: '',
        passShow1: false,
        ispassword1: true,
        passwordSrc1: require('../../assets/icon_hide_pwd.png'),
        password2: '',
        passShow2: false,
        ispassword2: true,
        passwordSrc2: require('../../assets/icon_hide_pwd.png'),
      }
    },
    computed: {
      isActive() {
        if (isUserName(this.userName) && isPassWord(this.password1) && isPassWord(this.password2) && this.password1 == this.password2) {
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
        this.$router.push({
          path: '/register1', query: {
            inviteCode: this.$route.query.inviteCode,
            mobilePhone: this.$route.query.mobilePhone,
            phoneCode: this.$route.query.phoneCode
          }
        })
      },
      isuserNameClean() {
        if (this.userName != '') {
          this.isuserName = true
        } else {
          this.isuserName = false
        }
      },
      cleanuserName() {
        this.userName = '',
          this.isuserName = false
      },
      isCleanShow1() {
        if (this.password1 != '') {
          this.passShow1 = true
          return
        } else {
          this.passShow1 = false
          return
        }
      },
      isClean1() {
        if (this.password1 != '') {
          this.password1 = ''
          this.passShow1 = false
          return
        }
      },
      checkTpye1() {
        this.ispassword1 = !this.ispassword1;
        if (!this.ispassword1) {
          this.passwordSrc1 = require('../../assets/icon_show_pwd.png')
        } else {
          this.passwordSrc1 = require('../../assets/icon_hide_pwd.png')
        }
      },
      isCleanShow2() {
        if (this.password2 != '') {
          this.passShow2 = true
          return
        } else {
          this.passShow2 = false
          return
        }
      },
      isClean2() {
        if (this.password2 != '') {
          this.password2 = ''
          this.passShow2 = false
          return
        }
      },
      checkTpye() {
        this.ispassword2 = !this.ispassword2;
        if (!this.ispassword2) {
          this.passwordSrc2 = require('../../assets/icon_show_pwd.png')
        } else {
          this.passwordSrc2 = require('../../assets/icon_hide_pwd.png')
        }
      },
      confirm() {
        if(this.password1 == '' || this.password2 == ''){
            toast('登录密码不能为空');
        }
        else if (!isPassWord(this.password1)) {
          toast('密码由8-16位数字和字母组成');
          return false;
        } else if (this.password1 != this.password2) {
          toast('2次输入的密码不一致');
          return false;
        } else {
          console.log('confirm')
          let encrypt = new JSEncrypt();
          encrypt.setPublicKey(this.$store.state.commonkey);
          let sendData = {
            phoneCode: this.$route.query.phoneCode,
            mobilePhone: this.$route.query.mobilePhone,
            password: encrypt.encrypt(this.password1),
            inviteCode: this.$route.query.inviteCode
          }
          login.userRegister(sendData).then(data => {
            if (data.data.code == 200) {
              this.$store.dispatch('saveToken', data.data.hid);
              window.localStorage.setItem("userId", data.data.data.id);
              toast('注册成功');
              var $self = this;
              setTimeout(function () {
                $self.$router.push({path: '/my'})
              }, 1000);

            } else {
              toast(data.data.message)
            }
          })
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '注册'
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
  .btn {
    margin: .8rem auto;
    width: 9.2rem;
    font-size: .48rem;
    height: 1.17333rem;
    line-height: 1.17333rem;
    color: #000;
    border-radius: 0.08rem;
    text-align: center;
    background: #f8cc00;
    border: 2px solid #f8cc00;
  }

  .wrap {
    height: 100%;
    background: @changeColor;
    padding-top: @p30;
  }

  .input-item {
    width: 94%;
    margin: 0 auto;
    border-radius: 5px;
    .list {
      background-color: #FFF;
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
    }
  }
  body .newlists{
    border-bottom: none;
  }
  .list {

    padding: 0.3rem 0.4rem;
    margin-bottom: 0.34667rem;
    position: relative;
    font-size: 0.42667rem;
    color: @newColor;
    background-color: #141723;
    border-bottom: 1px solid @ddd;
    span {
      display: inline-block;
      width: 1.85rem;
    }
    .cdspan {
      width: 2.5rem;
      color: @actColor;
      right: @p30;
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
      width: 4.8rem;
      color: @newColor;
      margin-left: 0.4rem;
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
</style>

