<template>
  <div class="withdrawals">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>添加银行卡</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <p class="title">温馨提示：为了确保资金安全，只能添加{{name}}的银行卡</p>
      <div class="inner" style="border: none;">
        <span>真实姓名</span>
        <span style="flex: 1;">{{name}}</span>
      </div>
      <div class="inner">
        <span>开户银行</span>
        <div id="trigger" style="flex:1" :class="bankColorFn()">{{bankName}}</div>
        <!--<input type="text" name="" value="" readonly="true" v-model="bankName" onfocus="this.blur()" placeholder="请选择开户银行"/>-->
        <img src="../../img/arrow_right@2x.png"/>
      </div>
      <div class="inner">
        <span>开户省市</span>
        <div id="trigger1" style="flex:1" :class="cityColorFn()">{{province}} {{city}}</div>
        <!--<input type="text" name="" value="" readonly="true" onfocus="this.blur()" placeholder="请选择省市"/>-->
        <img src="../../img/arrow_right@2x.png"/>
      </div>
      <div class="inner">
        <span>开户支行</span>
        <input type="text" name="" v-model="branch"  maxlength="30" value="" placeholder="请输入所属支行"/>
      </div>
      <div class="inner" style="margin-top: 0.2667rem;border: none">
        <span>银行卡号</span>
        <input type="text" name="" v-model="bankNo"  maxlength="30" value="" placeholder="请输入银行卡号"/>
      </div>
      <div class="inner">
        <span>确认卡号</span>
        <input type="text" name="" v-model="bankNo2" maxlength="30" value="" placeholder="确认银行卡号"/>
      </div>
      <!--<div class="photo" style="margin-top: 0.2667rem;">
        <span>证件照片</span>
        <p><img :src="imgSrc" @click="addPic"/><span style="margin-top:0.34666rem;">银行卡正面</span></p>
      </div>
      <input type="file" @change="onFileChange" style="display: none;" class="file">
      <input type="hidden" name="hidden" id="hidden" value=""/>-->

      <v-button buttonText='确定' :isActive='isActive' topNum='0.8rem' @toNext='sure'></v-button>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, isRealName, isBankNumber,isChinese} from '@/util/index'
  import Button from '@/components/Button'
  /*import '../../components/mobileSelect/mobileSelect.js';*/
  import MobileSelect from 'mobile-select'

  export default {
    data() {
      return {
        press: true,
        selectedbank: '',
        name: '',
        realName: '',
        bankCode: '',
        bankName: '请选择开户银行',
        province: '请选择省市',
        city: '',
        branch: '',
        bankNo: '',
        bankNo2: '',
        bankList: [],
        cityList: require('../../../city.json')
      }
    },
    computed: {
      isActive: function () {
        return true
      }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    methods: {
      bankColorFn(){
        if(this.bankName == ''  || this.bankName == '请选择开户银行'){
            return 'tips-color';
        }
      },
      cityColorFn(){
        if(this.province == ''  || this.province == '请选择省市'){
            return 'tips-color';
        }
      },
      init() {
        var that = this;
        var mobileSelect = new MobileSelect({
          trigger: "#trigger",
          title: "选择开户行",
          wheels: [
            {data: this.bankList}
          ],
          callback: function (indexArr, data) {
            console.log(data);
            that.bankName = data[0].value;
            that.bankCode = data[0].id;
          }
        });
        var mobileSelect1 = new MobileSelect({
          trigger: "#trigger1",
          title: "选择省市",
          wheels: [
            {data: this.cityList}
          ],
          callback: function (indexArr, data) {
            console.log(data);
            that.province = data[0].value;
            that.city = data[1].value;
          }
        });
      },
      back() {
        this.$router.back(-1);
      },
      addPic() {
        $('input[type=file]').trigger('click')
        return false
      },
      change() {
        this.arrowSrc = this.arrowSrc == require('../../assets/arrow_fold.png') ? require('../../assets/arrow_unfold.png') : require('../../assets/arrow_fold.png')
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
            that.imgSrc = e.target.result;
            var str = e.target.result.replace("data:image/png;base64,", "");
            that.loadImg(str);
          }
        }
      },
      loadImg(img) {
        let senddata = {
          imgBase64Str: img,
          userId: window.localStorage.getItem("token")
        }
        my.doUploadPic(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            document.getElementById("hidden").value = res.data.data.imgUrl;
          } else {
            toast(res.data.message)
          }
        })
      },
        sure() {
            if (this.bankName == '选择开户行' || this.bankCode == '') {
                toast("请选择开户银行");
                return false;
            } else if (this.province == "请选择省市") {
                toast("请选择省市");
                return false;
            } else if (this.branch == "") {
                toast("请填写所属支行");
                return false;
            } else if (!isChinese(this.branch)) {
                toast("开户支行名称为中文");
                return false;
            } else if (this.bankNo == "") {
                toast("请填写银行卡号");
                return false;
            } else if (!isBankNumber(this.bankNo)) {
                toast("请填写正确的银行卡号");
                return false;
            } else if (this.bankNo != this.bankNo2) {
                toast("银行卡输入不一致");
                return false;
            } else {
                let mecity;
                if(this.province == '澳门特别行政区'){
                    mecity = '澳门特别行政区'
                }else if(this.province == '香港特别行政区'){
                    mecity = '澳门特别行政区'
                }else if(this.province == '台湾省'){
                    mecity = '台湾省'
                }else{
                    mecity = this.city
                }
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    realName: this.realName,
                    bankCode: this.bankCode,
                    bankName: this.bankName,
                    province: this.province,
                    city: mecity,
                    branch: this.branch,
                    bankNo: this.bankNo
                }
                if (this.press) {
                    this.press = false;
                    my.doAddBankCard(senddata).then((res) => {
                        if (res.data.code == 200) {
                            this.$router.back(-1);
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
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.getMess(senddata).then(res => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          var result = res.data.data;
          this.realName = result.realName;
          this.name = result.realName.substring(0, 1);
          for (var i = 1; i < result.realName.length; i++) {
            this.name += "*";
          }
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
      let senddata1 = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.getAddBankInitData(senddata1).then((res) => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          // this.each(res.data.data);
          var val = res.data.data;
          for (var i = 0; i < val.length; i++) {
            var obj = new Object();
            obj.id = val[i].insideCode;
            obj.value = val[i].name;
            this.bankList.push(obj);
          }
          //  console.log(this.bankList);
          this.init();
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
      document.querySelector('title').innerText = '添加银行卡'
      next();
    },
    beforeRouteLeave(to, form, next) {
      document.activeElement.blur();
      next();
    }
  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';
  @import '../../components/mobileSelect/mobileSelect.css';
   .tips-color{
     color: @placeColor !important;
   }
  .withdrawals {
    color: white;
    .title {
      padding: 0 @p30;
      color: @red;
      height: 1.06666rem;
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
        margin-right: 0.6rem;
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
      border-top: @ddd solid 1px;
      color: @six;
      input {
        flex: 1;
        color: @six;
        font-size: @f32;
        height: 1.17333rem;
        overflow: hidden;
      }
      img {
        width: 0.4rem;
      }
      div {
        font-size: @f32;
      }
      select {
        flex: 1;
        color: @six;
        font-size: @f32;
        height: 1.17333rem;
        background: url(../../assets/arrow_fold.png) no-repeat right center;
        border: none;
        -webkit-appearance: none;
        option {
          font-size: @f32;
          height: .8rem;
          color: @six;

        }
      }
      span {
        font-size: @f32;
        margin-right: 0.6rem;
        width: 2rem;
        color: @six;
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
