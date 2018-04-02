<template>
  <div class="quickpay">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>快捷支付</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
    <div class="ct">
      <div class="inner mt20">
        <span class="inner-left">账户余额</span>
        <p><span>{{accountMoney}}</span>元</p>
      </div>
      <div class="inner mt20">
        <span class="inner-left">充值金额</span>
        <input type="text" placeholder="请输入金额" v-model="amount" />
      </div>
      <p class="tip">
        <img src="../../assets/recharge_pic_kuaijie.png"/>
        无需开通网银，有银行卡就能支付
      </p>
      <div class="hide">
        <div class="inner" >
          <span>开户姓名</span>
          <input type="text" placeholder="输入开户姓名" v-model="accountName"/>
        </div>
        <div class="inner">
          <span>身份证号</span>
          <input type="text" placeholder="身份证号" v-model="idCardNo"/>
        </div>
        <div class="inner">
          <span>支付银行</span>
          <input type="text" id="trigger" readonly="true" onfocus="this.blur()" placeholder="选择支付银行"
                 v-model="bankName"/>
          <img src="../../img/arrow_right@2x.png"/>
        </div>
        <div class="inner">
          <span>银行卡号</span>
          <input type="text" placeholder="输入银行卡号" v-model="bankNo"/>
        </div>
        <div class="inner">
          <span>手机号码</span>
          <input type="text" placeholder="输入银行卡预留手机号" v-model="phone"/>
        </div>
        <div class="inner">
          <span>验证码</span>
          <input type="text" placeholder="输入验证码" v-model="validate"/>
          <a data-v-cab32f0a="" style="color: rgb(248, 204, 0);">获取验证码</a>
        </div>
        <p>注：单卡单笔限额5000，每日最高1万</p>
      </div>

      <div class="more-info">

        <div class="inner" style="border-bottom: 1px solid #ddd">
          <span class="inner-left">开户姓名</span>
          <input type="text" placeholder="输入开户姓名" v-model="realNameTips"  readonly="readonly" disabled="disabled" />
        </div>
        <div class="inner">
          <span class="inner-left">身份证号</span>
          <input type="text" placeholder="输入身份证号" v-model="idCardTips"  readonly="readonly" disabled="disabled" />
        </div>
        <div class="inner mt20"  @click="model">
          <span class="inner-left">银行卡&nbsp&nbsp&nbsp&nbsp</span>
          <p class="bank-name">{{current | currentBank}}</p>
          <img src="../../assets/arrow_right.png"/>
        </div>
      </div>


      <v-button buttonText='提交' :isActive='isActive' topNum='0.8rem' @toNext='doRecharge'></v-button>

      <form method="post"  style="display: none" >
        HUIMI_SESSIONID: <input type="text" name="HUIMI_SESSIONID" v-model="HUIMI_SESSIONID"/>
        <br/>
        HUIMI_USERID: <input type="text" name="HUIMI_USERID" v-model="HUIMI_USERID" />
        <br/>
        amount: <input type="text" name="amount" v-model="amount">
        <br/>
        bankId: <input type="text" name="bankId" v-model="bankId">
        <br/>

      </form>
      <!--模态框-->
      <div class="model" v-show="flag">
        <div class="model-inner">
          <div class="model-header">选择我的银行卡</div>
          <div class="card" v-for="(bank,index) in banklist" @click="chooseBank(index,bank)">
            <img class="bankLogo" :src="bank.bankCode|bankLogo"/>
            <p>
              <span class="name">{{bank.bankName}}</span>
              <span>**** **** **** {{bank.bankNo ? bank.bankNo.substring(bank.bankNo.length - 4, bank.bankNo.length) : ""}}</span>
            </p>
            <img v-show="currentIndex == index" src="../../img/select_card_s@2x.png"/>
          </div>
          <div class="card" style="height: 1.653rem;" @click="addCard">
            <img src="../../img/select_card_add@2x.png"/>
            <p>
              <span class="name">添加银行卡</span>
            </p>
          </div>
          <div class="model-footer" @click="hidden">
            取消
          </div>

        </div>
      </div>
    </div>
    </v-ContentHead>

  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast, isRealName, isBankNumber, Money} from '@/util/index'
  import Button from '@/components/Button'
  import '../../components/mobileSelect/mobileSelect.js';

  export default {
    data() {
      return {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId"),
        press: true,
        accountMoney: "0.00",
        rechargeMin: "",
        rechargeMax: "",
        quick: "",
        bankList: [],
        selectedbank: "",
        amount: "",
        accountName: "",
        idCardNo: "",
        bankName: "",
        bankNo: "",
        phone: "",
        accountName: "",
        validate: "",
        current: '',
        currentIndex: 0,
        flag: false,
        banklist: [],
        realName:'',
        idCard:'',
        bankId:"",
        realNameTips:'',
        idCardTips:''

      }
    },
    computed: {
      isActive: function () {
        return true;
      }
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      model() {
          this.flag = true;

      },
      model() {
          this.flag = true;

      },
      hidden() {
          this.flag = !this.flag;
      },
      hidePassword() {
          this.showPassword = !this.showPassword;
      },
      addCard() {
          this.$router.push({path: '/addCard'})
      },
      chooseBank(i,bank) {

          this.bankId = bank.id;
          this.currentIndex = i;
          this.current = this.banklist[i];
          this.flag = !this.flag;
      },
      init() {
        var that = this;
        var mobileSelect = new MobileSelect({
          trigger: "#trigger",
          title: "选择银行",
          wheels: [
            {data: this.bankList}
          ],
          callback: function (indexArr, data) {
            that.bankName = data[0].value;
          }
        });
      },
        Transfer(data){
            var action = data.wwap_url;
            $("form").attr("action",action);
            $("#req_data").val(data.value);
            $("form").submit();
        },
      doRecharge() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          amount: this.amount,
          bankId:this.bankId,
          realname:this.realName,
          idCardNo:this.idCard,
        }
          if (this.amount == '' || this.amount == 0) {
            toast("请输入大于0的金额");
            return false;
          }

          if (!Money(this.amount)) {
              toast("请输入正确的金额");
              return false;
          }

          if(this.rechargeMax != null){
              if(this.amount > Number(this.rechargeMax)){
                  toast('充值金额不得大于' + this.rechargeMax + '元' );
                  return false;
              }
          }

          if(this.rechargeMin != null){
              if(this.amount < Number(this.rechargeMin)){
                  toast('充值金额不得小于' + this.rechargeMin + '元');
                  return false;
              }
          }
          if (this.press) {
            this.press = false;
            var url = window.wrapUrl;
              $("form").attr("action", url +'/api/member/pay/lianlian/wapAuthPay');
              $("form").submit();
            /*my.wapAuthPay(senddata).then((res) => {
              if (res.data.code == 200) {
                  this.Transfer(res.data.data);
                //   window.localStorage.setItem("token", res.data.hid);
                // var result = res.data.data;
                // var url = result.redirctUrl;
                // location.href = url;
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
            })*/


        } else {
          toast("请输入正确的金额");
          this.press = true;
          return false;
        }
      },
      getQueryBankCard(){
          let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId")
          }
          my.queryBankCard(senddata).then(res => {
              //取默认第一条数据ID等
              if (res.data.code == 200) {

                  this.banklist = res.data.data.bankList;
                  this.realName =  res.data.data.realName;
                  this.idCard =  res.data.data.idCard;
                  var name = '';
                  for (var i = 1; i < this.realName.length; i++) {
                      name += "*";
                  }
                  this.realNameTips = this.realName.substring(0,1) + name;
                  this.idCardTips =    this.idCard.substring(0,2) +  "** **** **** **" + this.idCard.substring(this.idCard.length-2,this.idCard.length);
                  if (this.banklist.length > 0) {
                      this.current = this.banklist[0];
                      this.bankId = this.current.id;
                  } else {


                  }
              } else if (res.data.code == 400){
                  toast(res.data.message)
                  var that = this;
                  setTimeout(function () {
                      that.$router.push({path: '/realNameInfo'})
                  }, 1000);
              }else if (res.data.code == 401) {
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
    },
    mounted() {


        this.getQueryBankCard();
      this.quick = this.$route.query.quick;
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.rechargeLimit(senddata).then(res => {
        if (res.data.code == 200) {
          var result = res.data.data;
          this.accountMoney = (result.available).toFixed(2);
          this.rechargeMax = result.rechargeMax;
          this.rechargeMin = result.rechargeMin;
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
      /* my.getMerBank(senddata).then((res) => {   //获取联动优势商户支持的银行列表
         if (res.data.code == 200) {
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
       })*/

    },
    filters: {
        bankLogo(value) {
            if (value > 21 || value == 6 || value == 9 || value == 14 || value == 15 || value == 16) {
                return require("../../img/bank_logo/2X/bank0.png");
            } else {
                return require("../../img/bank_logo/2X/bank" + value + ".png");
            }
        },
        currentBank(val) {
            if(val == ''){
                return '请先添加银行卡';
                toast('请先添加银行卡');
                var self = this;
                setTimeout(function () {
                    self.$router.push({path: '/realNameInfo'})
                }, 800);

            }else{
                var bankNo = val.bankNo;
                bankNo = bankNo ? "(尾号" + bankNo.substring(bankNo.length - 4, bankNo.length) + ")" : "";
                return val.bankName + bankNo;
            }

        }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '快捷支付'
      next()
    }

  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';
  @import '../../components/mobileSelect/mobileSelect.css';
  .border-none{
    botder:none;
  }
  .quickpay {
    color: @newColor;
    .inner {
      background: @FFF;
      padding:  0 .45rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.17333rem;
/*      border-bottom: 1px solid @fColor;*/
      img{
        width: .4rem;
      }
      input {
        flex: 1;
        width: 3.4rem;
        font-size: @f32;
        color: @newColor;
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
          height: .8rem;

        }
      }
      a {
        text-decoration: none;
        display: inline-block;
        border-left: 1px solid @ddd;
        width: 3.2rem;
        text-align: center;
      }
      .inner-left {
        font-size: @f32;
        display: inline-block;
        margin-right: 1.06493rem;
      }
      p {
        font-size: @f32;
        padding: 0px;
        color: #333;
        span {
          font-size: @f32;
          margin-right: .1rem;
          color: @red;
          text-align: right;
        }
      }
      .bank-name{
        flex: 1;
        font-size: @f32;
      }
    }
    .tip {
      padding: .6rem .4rem ;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 0.8rem;
      color: @fcolor;
      img {
        margin-right: @p30;
      }
    }
    .login {
      margin-top: 1.226666rem;
      width: 9.2rem;
      height: 1.17333rem;
      line-height: 1.17333rem;
      text-align: center;
      color: @Color;
      border: 2px @Color solid;
      margin: 0 auto;
      font-size: 0.48rem;
      border-radius: 0.08rem;

    }
    .tip img {
      width: 1.76rem;
    }
    .tip{
      color: @six;
    }
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
      height: 5.94666rem;
      background: white;
      border-radius: 24px;
      overflow-y: scroll;
      .model-header {
        height: 1.36rem;
        color: @newColor;
        font-size: @f34;
        text-align: center;
        line-height: 1.36rem;
      }
      .card {
        height: 1.76rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top: 1px solid #ddd;
        img {
          padding: 0 @p30;
          width: 1.44rem;
          height: 0.64rem;
          box-sizing: border-box;
        }
        p {
          height: 1.76rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: @newColor;
          font-size: @f24;

          .name {
            font-size: @f34;
          }
        }
      }
      .model-footer {
        height: 1.173333rem;
        line-height: 1.173333rem;
        color: #037bff;
        font-size: @f34;
        text-align: center;
        border-top: 1px solid #ddd;
      }
    }
    .model-password {
      position: relative;
      width: 7.2rem;
      height: 3.73rem;
      background: white;
      border-radius: 24px;
      overflow-y: hidden;
      padding: 0.5rem 0.4rem;
    }
  }
</style>
