<template>
  <div class="withdrawals">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>实名认证</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="inner mt20">
        <span>真实姓名</span>
        <input type="text" name="" id="name" value="" maxlength="15" placeholder="请输入姓名" v-model="name"/>
      </div>

      <div class="inner borderT">
        <span>身份证号</span>
        <input type="text" name="" id="" value="" maxlength="18" placeholder="请输入身份证号" v-model="card"/>
      </div>

      <!--<div class="photo" style="margin-top: 0.2667rem;">
        <span>证件照片</span>
        <p><img :src="img" @click="addPic"/><span style="margin-top:0.34666rem;">身份证正面</span></p>
      </div>
      <input type="file" @change="onFileChange" style="display: none;" class="file">
      <input type="hidden" name="hidden" id="hidden" v-model="hideImg" value=""/>-->

      <v-button buttonText='认证' :isActive='isActive' topNum='0.8rem' @toNext='login'></v-button>
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
        card: "",
        imgUrl: "",
        hideImg: "",
        img: require("../../assets/verified_pic_add.png"),
      }
    },
    computed: {
      isActive: function () {
        if (isIdCard(this.card) && this.name) {
          return true
        } else {
          return false
        }
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
        console.log(this.name.length);
        if (this.name == "") {
          toast("请输入姓名");
          return false;
        } else if (this.card == "") {
          toast("请输入身份证号");
          return false;
        } else if (!isIdCard(this.card)) {
          toast("请输入正确的身份证号");
          return false;
        } else {
          let senddata = {
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId"),
            realName: this.name,
            idCard: this.card
          }
          if (this.press) {
            this.press = false;
            my.doRealNameJson(senddata).then((res) => {
              if (res.data.code == 200) {
                  window.localStorage.setItem("token", res.data.hid);
                this.$router.push({path: '/toAccountinformation'});
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
    mounted() {

    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '实名认证'
      next()
    }


  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .withdrawals {
    color: @newColor;
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
      background:@FFF;
      padding: 0 @p30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.17333rem;
      input {
        flex: 1;
        color: @newColor;
        font-size: @f32;
        height: 1.17333rem;
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
        font-size: @f32;
        margin-right: 0.6rem;
        width: 2rem;
      }
      p {
        font-size: @f32;
        padding: 0px;
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

</style>
