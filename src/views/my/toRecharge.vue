<template>
  <div class="recharge">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>账户充值</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="inner" @click="quickpay">
        <img class="leftImg" src="../../img/recharge_pic_kuaijie@2x.png"/>
        <p >
          快捷支付 <br/>
          <img src="../../img/recharge_tag_recommend@2x.png"/> <span>快速安全，24小时支付</span>
        </p>
        <img class="rightImg" src="../../img/arrow_right@2x.png"/>
      </div>
      <div class="inner" @click="alipay">
        <img class="leftImg" src="../../img/recharge_pic_zhifubao@2x.png"/>
        <p>支付宝转账 <br/><span >手机支付，免手续费</span></p>
        <img class="rightImg" src="../../img/arrow_right@2x.png"/>
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
      return {}
    },
    components: {
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      quickpay() {

          let senddata = {
              HUIMI_SESSIONID: window.localStorage.getItem("token"),
              HUIMI_USERID: window.localStorage.getItem("userId")
          }

          my.getMess(senddata).then(res => {
              if (res.data.code == 200) {
                  if (res.data.data.idCard == '' || res.data.data.realName == '' ||res.data.data.idCard == null || res.data.data.realName == null  ) {
                      toast("请先进行实名认证");
                      var that = this;
                      setTimeout(function () {
                          that.$router.push({path: '/realNameInfo'});
                      }, 1000);

                  }else if (res.data.data.bankCardSize <= 0) {
                      toast("请先进行绑定银行卡");
                      var that = this;
                      setTimeout(function () {
                          that.$router.push({path: '/bankList'});
                      }, 1000);

                  }else{
                      this.$router.push({path: '/quickpay'});
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
      },
      alipay() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId")
        }

        my.getMess(senddata).then(res => {
          if (res.data.code == 200) {
            if (res.data.data.bindAlipay == '0') {
              toast("请先进行支付宝认证");
              var that = this;
              setTimeout(function () {
                that.$router.push({path: '/toAccountinformation'});
              }, 1000);
            } else {
              this.$router.push({path: '/alipay'})
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

      },

    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '账户充值'
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
      background: @FFF;
      margin-top: @fsize;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      p {
        flex: 1;
        margin-left: @p30;
        font-size: @f32;
        line-height: 0.56rem;
        color: #333;
        span {
          font-size: @f24;
          color: #999;
        }
        img {
          vertical-align: middle;
          width: 0.9333rem;
        }
      }
      .leftImg {
        width: 2.75rem;
      }
      .rightImg {
        width: 0.4rem;
      }
    }
  }

</style>
