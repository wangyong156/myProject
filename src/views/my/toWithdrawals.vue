<template>
  <div class="withdrawals">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>账户提现</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <!--	<div class="inner" >
                <span>账户余额</span>
                <p><span>0.00</span>元</p>
            </div>-->
      <div class="inner" @click="model">
        <span>银行卡&nbsp&nbsp&nbsp&nbsp</span>
        <p>{{current | currentBank}}</p>
        <img src="../../assets/arrow_right.png"/>
      </div>
      <div class="inner" style="font-size:0">
        <span>提现金额</span>
        <input type="text" v-model="cashMoney" placeholder="请输入提现金额"  />
      </div>
      <p class="padding mt20 black9">可用余额 <span class="red">{{available}}</span>元</p>

      <!--<div class="inner" style="margin-bottom: 1.253333rem;" >
              <span>提现密码</span>
              <input type="password" name="" id="" value="" style="width:.5rem" />
              <p style="font-size: 0.37333rem; color: #fffc25;" @click="findWithdrawals">忘记密码？</p>
          </div>-->
      <v-button buttonText='确定' :isActive='isActive' topNum='0.8rem' @toNext='withdrawCheck' v-show="checkCash"></v-button>
      <div class="register-btn "  v-show="!checkCash">确定</div>
      <div class="tc mt50 black9" style="line-height: 0.6rem">
        <p>提现处理时间</p>
        <p>白天：上午11:00-下午16:00(当天17:00前处理)</p>
        <p>晚上：下午16:00-次日11:00(次日12:00前处理)</p>
        <p>具体到账时间以银行为准、节假日延后处理</p>
      </div>
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
      <!--支付密码模态框-->
      <div class="model" v-show="showPassword">
        <div class="model-password">
          <p class="black3 f36 tc mb30">请输入支付密码 <img @click="hidePassword" class="fr" src="../../img/box_close@2x.png" style="width: .35rem"/>
          </p>
          <ul class="password password-old">
            <li class="none" v-for="(item,index) in valueArr">
              <input type="password" maxlength="1" onfocus="this.blur();" v-model="passwordArr[index]" readonly="true"/>
            </li>
          </ul>
          <p class="tr mt30 f30" style="color:#007aff" @click="forgetPassword">忘记密码?</p>
        </div>
      </div>
      <ul class="keyboard" v-show="showPassword">
        <li v-for="item in array" @click="numberClick(item)"><span>{{item}}</span></li>
        <li class="keyboard-gray"></li>
        <li @click="numberClick(0)"><span>0</span></li>
        <li class="keyboard-gray delete" @click="deleteVal"><img src="../../img/icon_pay_keyboard_delete.png"/></li>
      </ul>
    </v-ContentHead>
  </div>
</template>

<script>
  import Button from '@/components/Button'
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import { toast } from '@/util/index'

  export default {
    data() {
      return {
        flag: false,
        showPassword: false,
        valueArr: ['', '', '', '', '', ''],
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        title: "设置支付密码",
        passwordArr: [],
        password: '',
        banklist: [],
        current: '',
        currentIndex: 0,
        cashMin: 0,
        cashMax:0,
        cashMoney:'',
        available: '',
        bankId: '', //银行卡ID
        rechargeMin:'',
        rechargeMax:'',
        checkCash:false,

      }
    },
    computed: {
      isActive: function () {
          if (this.cashMoney) {
            return true;
          }
      }
    },
    components: {
      'v-button': Button,
      'v-ContentHead': ContentHead
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
    methods: {
      back() {
        this.$router.back(-1);
      },
      model() {
        this.flag = true;

      },
      hidden() {
        this.flag = !this.flag;
      },
      hidePassword() {
        this.showPassword = !this.showPassword;
        this. passwordArr = [];
      },
      addCard() {
        this.$router.push({path: '/addCard'})
      },
      chooseBank(i,bank) {

        this.bankId = bank.id;
        console.log(i,this.bankId);
        this.currentIndex = i;
        this.current = this.banklist[i];
        this.flag = !this.flag;
      },
      findWithdrawals() {
        this.$router.push({path: '/findWithdrawals'})
      },
      toMy() {
        this.$router.push({path: '/my'})
      },
      forgetPassword() {
        this.$router.push({path: '/forgetPassword'})
      },
      numberClick(n) {
        this.passwordArr.push(n);
        if (this.passwordArr.length == 6) {
          var that = this;
          that.password = that.passwordArr.join('');
          console.log(that.password);
          setTimeout(function () {
            //请求接口
             that.showPassword = false;
             that.withdrawFn()
            that.passwordArr = [];

          }, 500);

        }
      },
      deleteVal() {
        this.passwordArr.pop();
        console.log(this.passwordArr);
      },
      //提现判断
      withdrawCheck(){
        var reg = /^[1-9]\d*$/;
        var reg2 = /^[1-9]+\.\d{0,2}$/;

        if(this.bankId == ''){
          toast('请选择银行卡');
        }else if(this.cashMoney == '' || this.cashMoney == 0){
          toast('提现金额不可为空');
        }else if(this.cashMoney > this.available){
          toast('提现金额不能大于可用余额');
        }else{
          // this.withdrawFn();
            this.showPassword = true;
        }


      },
      withdrawFn(){
          let encrypt = new JSEncrypt();
          encrypt.setPublicKey(this.$store.state.commonkey);
         let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          money:this.cashMoney,
          bankCardId:this.bankId,
          cashPasswd:encrypt.encrypt(this.password)
        }
        my.doCash(senddata).then(res => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            toast('提现成功');
            var that = this;
            setTimeout(function () {
              that.$router.push({path: '/my'})
            }, 800);
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
      getQueryBankCard(){
          let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId")
          }
          my.queryBankCard(senddata).then(res => {
              //取默认第一条数据ID等
              if (res.data.code == 200) {
                 console.log(res);
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
      checkCashFn(){
          let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId")
          }
          my.checkCash(senddata).then(res => {
          if (res.data.code == 200) {
              var result = res.data.data;
              this.checkCash = true;
          } else if(res.data.code == 400){
              this.checkCash = false;
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
      }
    },
    mounted() {
      // this.getQueryBankCard();
      this.checkCashFn();
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.bankList(senddata).then(res => {
        //取默认第一条数据ID等
        if (res.data.code == 200) {
          this.banklist = res.data.data;
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

      my.getAccountInfo(senddata).then(res => {
        if (res.data.code == 200) {
          var result = res.data.data;
          this.available = result.available;
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
      document.querySelector('title').innerText = '账户充值'
      next()
    }

  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';
.register-btn{

  margin: 0.8rem auto;
  width: 9.2rem;
  font-size: .48rem;
  height: 1.17333rem;
  line-height: 1.17333rem;
  color: @six;
  background: #ccc;
  border-radius: 0.08rem;
  text-align: center;

}
  .withdrawals {
    color: @newColor;
    .inner {
      margin-top: @fsize;
      background: @FFF;
      padding: 0 @p30;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 1.17333rem;
      input {
        flex: 1;
        font-size: @f32;
        color: @newColor;
      }
      span {
        font-size: @f32;
        margin-right: 1.06493rem;

      }
      p {
        flex: 1;
        font-size: @f32;
      }
      img {
        width: 0.4rem;
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
    .password:after {
      content: "";
      display: block;
      clear: both;
    }
    .password li {
      width: 16.6%;
      height: 1.0667rem;
      float: left;
      box-sizing: border-box;
      border: 1px solid #ddd;
    }
    .password li:not(:last-child) {
      border-right: 0;
    }

    .password li input {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 0.35rem;
    }

    .keyboard {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 5.6rem;
      width: 100%;
      z-index: 11;
      color: @newColor;
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
      font-size: 0.5rem;
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
