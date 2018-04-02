<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>账户信息</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="wrap1 border">
        <span class="main ">我的头像</span>
        <div @click="addPic">
          <img :src="photo">
        </div>
      </div>
      <!-- <div class="wrap1 wrap2" style="border: none;">
         <div>
           <span class="main">实名认证</span>
         </div>
         <p>毛*（2342343245**34534）</p>
       </div>
       <div class="wrap1 wrap2">
         <div>
           <span class="main">手机号码</span>
         </div>
         <p>{{phone}}</p>
       </div>-->
      <div class="wrapOptional name-ct">
        <v-myMessArrowList :item='UserName' @toNext='changeName'></v-myMessArrowList>
      </div>
      <div class="wrapOptional border">
        <v-myMessArrowList :item='Certification' @toNext='realNameInfo'></v-myMessArrowList>
      </div>
      <div class="wrapOptional border">
        <v-myMessArrowList :item='Phone' @toNext='phone'></v-myMessArrowList>
      </div>
      <div class="wrapOptional border">
        <v-myMessArrowList :item='Alipay' @toNext='alipayInfo'></v-myMessArrowList>
      </div>
      <div class="wrapOptional">
        <v-myMessArrowList :item='Mybankcard' @toNext='bankList'></v-myMessArrowList>
      </div>
      <div class="wrapOptional border" style="margin-top:.2667rem;">
        <v-myMessArrowList :item='Loginpassword' @toNext='loginpassword'></v-myMessArrowList>
      </div>
      <div class="wrapOptional">
        <v-myMessArrowList :item='Paypassword' @toNext='findWithdrawals'></v-myMessArrowList>
      </div>
      <!--<div class="wrap1 wrap3">
         退出登录
       </div>-->
      <input type="file" @change="onFileChange" style="display: none;" class="file">
      <!--模态框-->
      <div class="model" v-show="flag">
        <div class="model-inner">
          <div class="model-header">
            <p>如需更换或解绑支付宝账号，</p>
            <p>请联系客服电话</p>
            <p class="red">0571-85857825</p>
          </div>
          <div class="model-footer" @click="hidden">
            <span style="border-right: 1px solid #ddd;">取消</span>
            <span>确认</span>
          </div>
        </div>
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import myMessArrowList from '@/components/myMessArrowList'
  import {toast} from '@/util/index'
  import lrz from '../../../node_modules/lrz/dist/lrz.all.bundle'

  export default {
    data() {
      return {
        imgUrl: this.GLOBAL.imgUrl,
        flag: false,
        isActive: false,
        isRealName: 0,      //0:未实名认证，去认证   1：实名认证，显示认证信息，不能点
        realName: '',
        mobile:'',
        isAlipay: false,
        payPwd: 2,            //1:已有支付密码，去修改   2：没有支付密码，去设置
        photo: require("../../img/account_avator_default@2x.png"),
        Certification: {
          text: '实名认证',
          tips: '',
          color: "#333",
          hide: "1"
        },
        Phone: {
          text: '手机号码',
          tips: '',
          color: "#333"
        },
        Alipay: {
          text: '支付宝认证',
          tips: '',
          color: "#333"
        },
        Mybankcard: {
          text: '我的银行卡',
          tips: ''
        },
        Loginpassword: {
          text: '登录密码',
          tips: '修改',
          color: "#333"
        },
        Paypassword: {
          text: '支付密码',
          tips: '',
          color: "#333"
        },
          UserName: {
              text: '用户名',
              tips: '',
              color: "#333"
          }
      }
    },
    components: {
      'v-myMessArrowList': myMessArrowList,
      'v-ContentHead': ContentHead
    },
    methods: {
      toAccountinformation() {
        console.log('Alipay')
        this.$router.push({
            path: '/toAccountinformation'
        })
      },
      back() {
        //this.$router.back(-1)
        this.$router.push({"path": "/my"});
      },
      hidden() {
        this.flag = !this.flag;
      },
      loginpassword() {
        this.$router.push({path: '/changePassword'})
      },
      realNameInfo() {
        if (this.isRealName == 0) {
          this.$router.push({path: '/realNameInfo'});
        }
      },
      phone() {
        this.$router.push({path: '/phone'});
      },
      changeName() {
          this.$router.push({path: '/changeName',query:{
              userName: this.UserName.tips
          }});
      },
      alipayInfo() {
        if (this.realName == 0) {
          toast("请先实名认证");
          return false;
        } else {
          if (!this.isAlipay) {       //未进行支付宝认证跳转去认证
            this.$router.push({
              path: '/alipayInfo',
              name: 'alipayInfo',
              query: {realName: this.realName},
            });
          } else {      //修改支付宝账号拨打客服电话
            this.flag = true;
          }
        }
      },
      bankList() {
        if (this.realName == 0) {
          toast("请先实名认证");
          return false;
        } else {
          this.$router.push({path: '/bankList'})
        }
      },
      findWithdrawals() {
        this.$router.push({
          path: '/findWithdrawals',
          name: 'findWithdrawals',
          query: {hasPwd: this.payPwd}
        })
        //this.$router.push({path: '/forgetPassword'})
      },
      addPic() {
        $('input[type=file]').trigger('click');
        return false
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        console.log(files);
        var file = files[0];
        if (!files.length) {
          return
        } else if ((file.type).indexOf("image/") == -1) {
          toast("请确保上传的是图片");
          return false;
        }else if (file.size > 1024 * 1024 * 5) {
          toast("图片大小最大不能超过5M");
          return false;
        }
        this.loadImg(file);
        //this.createImage(file)
      },
      createImage(file) {
        var that = this;
        var reader = null;
        reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          //that.photo = e.target.result;
          var str = e.target.result.replace(/^data:image\/(jpeg|png|gif|jpg);base64,/, "");
          that.loadImg(str);
        }
      },
      loadImg(img) {
        console.log(img);
        var that = this;
        lrz(img, {width: 160}).then(function (rst) {
          console.log("111");
          var imgStr = rst.base64;
          let senddata = {
            base64File: imgStr,
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId")
          }
          my.doUploadphoto(senddata).then((res) => {
            if (res.data.code == 200) {
                window.localStorage.setItem("token", res.data.hid);
              that.photo = that.imgUrl + res.data.data;
              let senddata1 = {
                avatarUrl: res.data.data,
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId")
              }
              my.doUploadPic(senddata1).then((res) => {
                if (res.data.code == 200) {
                    window.localStorage.setItem("token", res.data.hid);
                  toast("头像上传成功");
                } else if (res.data.code == 401) {
                  console.log(senddata);
                  toast(res.data.message);
                  setTimeout(function () {
                    that.$router.push({path: '/login'})
                  }, 1000);
                } else {
                  toast(res.data.message)
                }
              })
            } else if (res.data.code == 401) {
              console.log(senddata);
              toast(res.data.message);
              setTimeout(function () {
                that.$router.push({path: '/login'})
              }, 1000);
            } else {
              toast(res.data.message)
            }
          })
        });
      },
      creatDom(res) {
        var result = res.data.data;
        if (result.avatarUrl) {
          this.photo = this.imgUrl + result.avatarUrl;
        }
          if(result.userName){
              this.UserName.tips = result.userName;
          }
        if (result.realName) {
          this.isRealName = 1;
          this.realName = result.realName;
          var name = result.realName.substring(0, 1);
          for (var i = 1; i < result.realName.length; i++) {
            name += "*";
          }
          this.Certification.tips = name + "(" + result.idCard.substring(0, 2) + "** **** **** **" + result.idCard.substring(result.idCard.length - 2, result.idCard.length) + ")";
          this.Certification.hide = "1";
        } else {
          this.isRealName = 0;
          this.Certification.tips = "未认证";
          this.Certification.hide = "";
        }
        if (result.bindAlipay == 0) {
          this.Alipay.tips = "未认证";
        } else {
          this.isAlipay = true;
          this.Alipay.tips = "已认证";
        }
        this.mobile = result.mobile;
        window.localStorage.setItem('phone',result.mobile);
        this.Phone.tips = result.mobile.substring(0, 3) + "****" + result.mobile.substring(7, 11);
        this.Mybankcard.tips = result.bankCardSize + "张";
        if (result.isSetPayPwd == 0) {
          this.Paypassword.tips = "设置";
          this.payPwd = 2;
        } else {
          this.Paypassword.tips = "修改";
          this.payPwd = 1;
        }
      }
    },
    mounted() {
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.getMess(senddata).then(res => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          this.creatDom(res);
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
      document.querySelector('title').innerText = '账户信息'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';
  .name-ct{
    margin-bottom:.26rem;
  }
  .wrap1 {
    display: flex;
    justify-content: space-between;
    height: 2.1333rem;
    padding: 0 @p30;
    font-size: @f32;
    align-items: center;
    background-color: @FFF;
    img {
      width: 1.44rem;
      height: 1.44rem;
      border-radius: 0.72rem;
    }
    p {
      color: @newColor;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div {
      color: @newColor;
      padding: 0;
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
    span {
      color: @newColor;
      display: inline-block;
    }
  }

  .wrap2 {
    height: 1.28rem;
    margin: 0;
    border-bottom: #262934 1px solid;
  }
  .border{
    border-bottom:1px solid @ddd;
  }
  .wrap3 {
    display: block;
    width: 9.2rem;
    margin: 0 auto;
    text-align: center;
    height: 1.173333rem;
    line-height: 1.173333rem;
    background: @FFF;
    color: @buttonColor;
    border-radius: .06rem;
    margin-top: .8rem;
  }

  .model {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .model-inner {
      position: relative;
      width: 7.2rem;
      height: 4rem;
      background: white;
      border-radius: 24px;
      overflow-y: scroll;
      .model-header {
        height: 2.827rem;
        padding-top: 0.5rem;
        color: @newColor;
        font-size: @f34;
        text-align: center;
        line-height: 0.7rem;
      }
      .model-footer {
        height: 1.173333rem;
        line-height: 1.173333rem;
        color: #037bff;
        font-size: 0;
        text-align: center;
        border-top: 1px solid #ddd;
        span {
          font-size: @f34;
          width: 50%;
          display: inline-block;
          box-sizing: border-box;
        }
      }
    }
  }

</style>
