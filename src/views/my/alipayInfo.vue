<template>
  <div class="withdrawals">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>支付宝账户认证</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="ct">
        <div class="inner mt20">
          <span>支付宝姓名</span>
          <input type="text" name="" id="name" value="" maxlength="15" readonly="true" onfocus="this.blur()"
                 placeholder="请输入支付宝姓名" v-model="name"/>
        </div>

        <div class="inner borderT">
          <span>支付宝账号</span>
          <input type="text" name="" id="" value="" maxlength="50" placeholder="请输入支付宝账号" v-model="account"/>
        </div>

        <v-button buttonText='认证' :isActive='isActive' topNum='0.8rem' @toNext='login'></v-button>
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, isIdCard} from '@/util/index'
  import Button from '@/components/Button'

  export default {
    data() {
      return {
        press: true,
        name: "",
        account: "",
        imgUrl: "",
        hideImg: "",
        img: require("../../assets/verified_pic_add.png"),
      }
    },
    computed: {
      isActive: function () {
        return true
      }
    },
    mounted() {
      this.name = this.$route.query.realName;
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      addPic() {
        $('input[type=file]').trigger('click');
        return false
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files)
      },
      createImage(file) {
        var that = this
        var reader = null
        var leng = file.length

        for (var i = 0; i < leng; i++) {
          reader = new window.FileReader()
          reader.readAsDataURL(file[i])
          reader.onload = function (e) {
            that.img = e.target.result;
            var str = e.target.result.replace("data:image/png;base64,", "");
            that.loadImg(str);
          }
        }
      },
      loadImg(img) {
        var that = this;
        let senddata = {
          imgBase64Str: img,
          userId: window.localStorage.getItem("token")
        }
        my.doUploadPic(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            that.hideImg = res.data.data.imgUrl;
          } else {
            toast(res.data.message)
          }
        })
      },
      login() {
          let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
          let param = this.account;
        if(this.account == '') {
          toast("请输入支付宝账号");
          return false;
        }else if(param.match(regRule)) {
              param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
              toast("不支持表情输入");
              return false;
          }else {
          let senddata = {
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId"),
            alipayAccount: this.account
          }
          if (this.press) {
            this.press = false;
            my.bindAlipay(senddata).then((res) => {
              if (res.data.code == 200) {
                  window.localStorage.setItem("token", res.data.hid);
                this.$router.push({path: '/toAccountinformation'})
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
      }

    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '支付宝账户认证'
      next()
    }


  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .withdrawals {
    color: white;
    .title {
      padding: 0 @p30;
      color: #FF335B;
      height: 1.06666rem;
      line-height: 1.06666rem;
      font-size: @f24;
    }
    .photo {
      background: #141723;
      padding: @p30;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      span {
        font-size: @f32;
        margin-right: 1.06493rem;
        width: 2rem;
      }
      p {
        padding: 0;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
          margin-top: @f26;
          width: auto;
          margin: 0;
        }
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }

    .inner {
      background: @FFF;
      padding: 0 @p30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.17333rem;
      input {
        flex: 1;
        color: @six;
        font-size: @f32;
      }
      select {
        flex: 1;
        color: #40495f;
        font-size: @f32;
        height: 1.17333rem;
        background: url(../../assets/arrow_fold.png) no-repeat right center;
        border: none;
        -webkit-appearance: none;
        option {
          color: #40495f;
          font-size: @f32;
        }
      }
      span {
        color: @six;
        font-size: @f32;
        margin-right: 0.6rem;
        width: 2.2rem;
      }
      p {
        font-size: @f32;
        padding: 0;
        color: white;
        span {
          margin-right: .3rem;
          font-weight: bold;
        }
      }
    }
    p {
      padding: 0 @p30;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 1.36rem;
      color: @Color;
      font-size: @f32;
    }
    .login {

      width: 9.2rem;
      height: 1.17333rem;
      line-height: 1.17333rem;
      text-align: center;
      color: @Color;
      border: 2px @Color solid;
      margin: 1.0666rem auto 0;
      font-size: 0.48rem;
      border-radius: 0.08rem;

    }

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

</style>
