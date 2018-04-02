<template>
  <div class="change">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>{{title}}</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="old-step padding">
        <p v-show="hasPwd == 1" class="f32 black9 pwd-top tc">请输入原支付密码，完成身份验证</p>
        <p v-show="hasPwd == 2" class="f32 black9 pwd-top tc">请输入6位支付密码</p>
        <p v-show="hasPwd == 3" class="f32 black9 pwd-top tc">请再次输入支付密码</p>
        <ul class="password password-old">
          <li class="none" v-for="(item,index) in valueArr">
            <input type="password" maxlength="1" onfocus="this.blur();" v-model="passwordArr[index]" readonly="true"/>
          </li>
        </ul>
        <p v-show="hasPwd == 1" class="black9 tc mt40 f30" @click="forgetPassword">忘记密码，<span class="base">换种方式验证</span>
        </p>
      </div>
      <ul class="keyboard">
        <li v-for="item in array" @click="numberClick(item)"><span>{{item}}</span></li>
        <li class="keyboard-gray"></li>
        <li @click="numberClick(0)"><span>0</span></li>
        <li class="keyboard-gray delete" @click="deleteVal"><img src="../../img/icon_pay_keyboard_delete.png"/></li>
      </ul>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import login from '@/api/home/index'
  import {toast, setwithdrawalPwd} from '@/util/index'

  export default {
    data() {
      return {
        valueArr: ['', '', '', '', '', ''],
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        title: "设置支付密码",
        passwordArr: [],
        oldPassword: '',
        password: '',
        password1: '',
        hasPwd: '1',         //1：输入旧密码   2:设置6位密码    3:确认密码
        forget: '0'
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },
    computed: {},
    methods: {
      back() {
        //this.$router.back(-1)
        this.$router.push({"path": "/toAccountinformation"});
      },
      forgetPassword() {
        this.$router.push({path: '/forgetPassword'})
      },
      numberClick(n) {
        this.passwordArr.push(n);
        if (this.passwordArr.length == 6) {
          var $this = this;
          $this.password = $this.passwordArr.join('');
          let encrypt = new JSEncrypt();
          encrypt.setPublicKey($this.$store.state.commonkey);
          if ($this.hasPwd == 1) {         //1：输入旧密码   2:设置6位密码    3:确认密码
            $this.oldPassword = $this.password
            setTimeout(function () {
              //请求接口
              let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId"),
                oldPwd: encrypt.encrypt($this.oldPassword)
              }
              my.checkPayPwd(senddata).then((res) => {
                if (res.data.code == 200) {
                  $this.hasPwd = 2;
                } else if (res.data.code == 401) {
                  toast(res.data.message);
                  setTimeout(function () {
                    $this.$router.push({path: '/login'})
                  }, 1000);
                } else {
                  toast(res.data.message)
                }
                $this.passwordArr = [];
              });
            }, 1000);
          } else if ($this.hasPwd == 2) {
            setTimeout(function () {
              $this.password1 = $this.password;
              $this.passwordArr = [];
              $this.hasPwd = 3;
            }, 1000);
          } else if ($this.hasPwd == 3) {
            setTimeout(function () {
              if ($this.password1 == $this.password) {
                if ($this.forget == 1) {
                  //请求接口
                  let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    newPwd: encrypt.encrypt($this.password)
                  }
                  my.phonePayPwd(senddata).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                      toast('设置成功');
                      setTimeout(function () {
                        $this.$router.push({path: "/toAccountinformation"});
                      }, 1000);
                    } else if (res.data.code == 401) {
                      toast(res.data.message);
                      setTimeout(function () {
                        $this.$router.push({path: '/login'})
                      }, 1000);
                    } else {
                      toast(res.data.message)
                    }
                  })
                } else {
                  //请求接口
                  let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    oldPwd: encrypt.encrypt($this.oldPassword),
                    newPwd: encrypt.encrypt($this.password)
                  }
                  my.payPwd(senddata).then((res) => {
                    if (res.data.code == 200) {
                      toast('设置成功');
                      setTimeout(function () {
                        $this.$router.push({path: "/toAccountinformation"});
                      }, 1000);
                    } else if (res.data.code == 401) {
                      toast(res.data.message);
                      setTimeout(function () {
                        $this.$router.push({path: '/login'})
                      }, 1000);
                    } else {
                      toast(res.data.message)
                    }
                  })
                }
              } else {
                toast("两次密码应一样");
                $this.passwordArr = [];
              }
            }, 1000);
          }
        }
      },
      deleteVal() {
        this.passwordArr.pop();
      }

    },
    mounted() {
      this.phoneCode = window.localStorage.getItem("phone");
      this.hasPwd = this.$route.query.hasPwd;
      if (this.$route.query.forget) {
        this.forget = this.$route.query.forget;
      }
      if (this.hasPwd == 1) {
        this.title = "修改支付密码";
      } else if (this.hasPwd == 2) {
        this.title = "设置支付密码";
      }
      document.querySelector('title').innerText = this.title;
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '设置支付密码';
      next()
    }
  }


</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .change {
    .pwd-top {
      padding: 0.8rem 0;
    }
    .password:after {
      content: "";
      display: block;
      clear: both;
    }
    .password li {
      width: 16.6%;
      height: 1.2rem;
      float: left;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .password li:not(:last-child) {
      border-right: 0;
    }

    .password li input {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: .75rem;
      padding-bottom: .1rem;
      color: @newColor;
      background: @FFF;
    }

    .keyboard {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 5.6rem;
      width: 100%;
      z-index: 11;
    }

    .keyboard li {
      width: 33.3%;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      float: left;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      font-size: 0.65rem;
    }

    .keyboard li span {
      width: 100%;
      height: 100%;
      display: inline-block;
    }

    li.keyboard-gray {
      background-color: #ccc;
    }

    .delete img, .delete-num img {
      width: 0.58rem;
    }

  }


</style>
