<template>
  <div class="recharge">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>快捷支付</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="inner" v-for="(item,index) in bankList" @click="quickpay(item[1])">
        <img class="bankLogo" :src="item[0]|bankLogo"/>
        <p>
          {{item[0] | bankName}}(尾号{{item[2]}})
        </p>
        <img src="../../img/arrow_right@2x.png"/>
      </div>
      <div class="inner" @click="quickpay()">
        <img class="bankLogo" :src="defaultBank"/>
        <p>
          快捷支付
        </p>
        <img src="../../img/arrow_right@2x.png"/>
      </div>
    </v-ContentHead>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast} from '@/util/index'

  export default {
    data() {
      return {
        bankList: [],
        defaultBank: require("../../img/bank_logo/2X/bank0.png"),
      }
    },
    filters: {
      bankLogo(value) {
        var n;
        if (value == "BOC") {
          n = 1;
        } else if (value == "ICBC") {
          n = 2;
        } else if (value == "ABC") {
          n = 3;
        } else if (value == "COMM") {
          n = 4;
        } else if (value == "GDB") {
          n = 5;
        } else if (value == "CCB") {
          n = 7;
        } else if (value == "SPDB") {
          n = 8;
        } else if (value == "CMB") {
          n = 10;
        } else if (value == "PSBC") {
          n = 11;
        } else if (value == "CMBC") {
          n = 12;
        } else if (value == "CIB") {
          n = 13;
        } else if (value == "CITIC") {
          n = 17;
        } else if (value == "CEB") {
          n = 19;
        } else if (value == "BJBANK") {
          n = 20;
        } else if (value == "SPAB") {
          n = 22;
        } else {
          n = 0;
        }
        return require("../../img/bank_logo/2X/bank" + n + ".png");
      },
      bankName(value) {
        if (value == "BOC") {
          return "中国银行";
        } else if (value == "ICBC") {
          return "中国工商银行";
        } else if (value == "ABC") {
          return "中国农业银行";
        } else if (value == "CCB") {
          return "中国建设银行";
        } else if (value == "COMM") {
          return "交通银行";
        } else if (value == "PSBC") {
          return "中国邮政";
        } else if (value == "CMB") {
          return "招商银行";
        } else if (value == "CMBC") {
          return "中国民生银行";
        } else if (value == "CITIC") {
          return "中信银行";
        } else if (value == "CEB") {
          return "中国光大银行";
        } else if (value == "GDB") {
          return "广发银行";
        } else if (value == "CIB") {
          return "兴业银行";
        } else if (value == "SPDB") {
          return "浦发银行";
        } else if (value == "BJBANK") {
          return "北京银行";
        } else if (value == "SPAB") {
          return "平安银行";
        }
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      quickpay(number) {
        this.$router.push({
          path: '/quickpay',
          name: 'quickpay',
          query: {quick: '1', number: number}
        })
      }
    },
    mounted() {
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.queryBank(senddata).then((res) => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          var result = res.data.data;
          var arr1 = result.split("|");
          for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split(",");
            this.bankList.push(arr2);
          }
          console.log(this.bankList);
        } else if (res.data.code == 401) {
          toast(res.data.message);
          var that = this;
          setTimeout(function () {
            that.$router.push({path: '/login'})
          }, 1000);
        } else if (res.data.code == 400) {
          toast(res.data.message);
        } else {
          toast(res.data.message)
        }
      })
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '快捷支付'
      next()
    }

  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .recharge {
    color: white;
    .inner {
      padding: 0 @p30;
      background: @changeColor;
      margin-top: @fsize;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.3067rem;
      .bankLogo {
        width: 0.64rem;
        height: 0.64rem;
      }
      p {
        flex: 1;
        margin-left: @p30;
        font-size: @f32;
      }
    }
  }

</style>
