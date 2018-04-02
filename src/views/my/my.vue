<template>
  <div>
    <v-ContentFooter>
      <div class="informationTop">
        <div class="informationTopImg">
        <div class="accountTop">
          <img @click="goService" src="../../img/newImg/nav_icon_kf.png"/>
          <span class="f36 name-title" >{{userName}}</span>
          <span class="f28" @click="logout">退出</span>
        </div>
          <div class="account_left">
            <img  v-if="isSign == 1" @click="mark" src="../../img/newImg/mine_sign_n.png"/>
            <img  v-if="isSign == 2" src="../../img/newImg/mine_sign_s.png"/>
          </div>
          <div class="isMyImg">
            <img class="avator" :src="photo"/>
          </div>
        </div>
        <div class="accountMoney">
          <div class="w50">
            <p class="black9 f28">账户余额(元)</p>
            <p class="black3 f44 mt24">{{money}}</p>
          </div>
          <div class="w50">
            <p class="black9 f28">积分(个)</p>
            <p class="black3 f44 mt24">{{score}}</p>
          </div>
        </div>
        <div class="accountButtons">
          <span class="f32" style="margin-right: 1rem;" @click="toRecharge">充值</span>
          <span class="f32" @click="checkCash">提现</span>
        </div>
      </div>
      <div class="mt20 mb40">
        <ul class="account-item">
          <li @click="toAccountinformation" class="item">
            <img src="../../img/newImg/mine_icon_account.png"/>
            <span class="black3 ml24">账户信息</span>
          </li>
          <li @click="toCapital" class=" item">             <!--或者toFunddetails-->
            <img src="../../img/newImg/mine_icon_details.png"/>
            <span class="black3 ml24">资金流水</span>
          </li>
          <li @click="toWechat" class="item">
            <img src="../../img/newImg/mine_icon_wechat.png"/>
            <span class="black3 ml24">关注公众号</span>
          </li>
          <li @click="toExtend" class="item">
            <img src="../../img/newImg/mine_icon_spread.png"/>
            <span class="black3 ml24">扫码推广赚钱</span>
          </li>
          <li @click="toApply" >
            <img src="../../img/newImg/mine_icon_apply.png"/>
            <span class="black3 ml24">申请成为投资人</span>
          </li>
          <li @click="toScore" class="">             <!--或者toFunddetails-->
            <img src="../../img/newImg/mine_icon_jfjl.png"/>
            <span class="black3 ml24">积分记录</span>
          </li>
        </ul>
      </div>
    </v-ContentFooter>
    <v-Footer></v-Footer>
  </div>
</template>
<script>
  import ContentFooter from '@/components/ContentFooter'
  import Footer from '@/components/Footer'
  import IconRightArrowList from '@/components/IconRightArrowList'
  import chart from '@/components/my/chart'
  import my from '@/api/home/index'
  import {toast,services} from '@/util/index'
  export default {
    data() {
      return {
        isSign:0, //是否登录
        service:{},
        imgUrl:this.GLOBAL.imgUrl,
        phone: "",
        photo: require("../../img/account_avator_default@2x.png"),
        money: 0,
        score:0,
        isActive: false,
        userName:'',
       /* Invitationcode: {
          src: require("../../assets/mine_icon_yqm.png"),
          text: '我的邀请码',
          tips: ''
        },
        Accountinformation: {
          src: require('../../assets/mine_icon_account.png'),
          text: '账户信息',
          tips: ''
        },
        Funddetails: {
          src: require('../../assets/mine_icon_fund details.png'),
          text: '资金明细',
          tips: ''
        },
        Notices: {
          src: require('../../assets/account_icon_news@2x.png'),
          text: '公告信息',
          tips: ''
        },
        ServiceCenter: {
          src: require('../../assets/mine_icon_suspension.png'),
          text: '客服中心',
          tips: ''
        },

        Guide: {
          src: require('../../assets/account_icon_novice@2x.png'),
          text: '新手指导',
          tips: ''
        }*/
      }
    },
    components: {
      'v-Footer': Footer,
      'v-ContentFooter': ContentFooter,
      'v-IconRightArrowList': IconRightArrowList,
      'v-chart': chart
    },

    methods: {
      logout(){
        //localStorage.clear();         //批量删除
        window.localStorage.removeItem("phone");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        this.$router.push({path:'/'});
      },
      goService(){
        this.$router.push({path:'/beforeService'});
      },
      mark(){
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId")
        }
        my.mark(senddata).then((res) => {
          if (res.data.code == 200) {
            toast("签到成功");
            this.isSign = 2;
            this.score += parseInt(res.data.data);
           // location.reload();
          }else if(res.data.code == 400 && res.data.message == '今日已签到'){
                toast(res.data.message);
                this.isSign = 2;
          } else if(res.data.code == 401){
            toast(res.data.message);
            var that = this;
            setTimeout(function(){
              that.$router.push({path: '/login'})
            },1000);
          }else {
            toast(res.data.message);
           /* setTimeout (function(){
              location.reload();
            },500);*/
          }
        })

      },
        checkCash(){
            let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId")
            }
            my.checkCash(senddata).then((res) => {
                if (res.data.code == 200) {
                    this.$router.push({path: '/toWithdrawals'})
                } else if(res.data.code == 401){
                    toast(res.data.message);
                    var that = this;
                    setTimeout(function(){
                        that.$router.push({path: '/login'})
                    },1000);
                }else{
                    toast(res.data.message);
                }
            })
        },
      toRecharge(event) {
        if (event.target.innerText == '充值') {
          this.isActive = true;
        }
        this.$router.push({path: '/toRecharge'})
        //this.$router.push({path: '/quickRecharge'})
      },
      toWithdrawals(event) {
        if (event.target.innerText == '提现') {
          //this.isActive = false;
        }
        this.$router.push({path: '/toWithdrawals'})
      },
      toAccountinformation() {
        this.$router.push({path: '/toAccountinformation'})
      },
      toCapital() {
        this.$router.push({path: '/toCapital'})
      },
      toScore(){
        this.$router.push({path: '/toScore'})
      },
      toWechat() {
        this.$router.push({path: '/toWechat'})
      },
      toExtend() {
        this.$router.push({path: '/invite'})
      },
      toApply() {
        this.$router.push({path: '/toApply'})
      },
      myInviteCode() {
        this.$router.push({path: '/myInviteCode'})
      },
      toServiceCenter() {
        this.$router.push({path: '/toServiceCenter'})
      },
      toFunddetails() {
        this.$router.push({path: '/toFunddetails'})
      }
    },
    mounted() {



      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }


      my.indexJson(senddata).then((res) => {
        if (res.data.code == 200) {
          var data = res.data.data;

          this.isSign = data.isSign;
          this.phone = data.mobile.substring(0,3) + "****" + data.mobile.substring(7,11);
          this.userName = data.userName;
          if(data.avatarUrl){
            this.photo = this.imgUrl + data.avatarUrl;
          }
          if(data.amount){
            this.money = data.amount;
          }
          if(data.point){
            this.score = data.point;
          }
        } else if(res.data.code == 401){
          toast(res.data.message);
          var that = this;
          setTimeout(function(){
            that.$router.push({path: '/login'})
          },1000);
        }else {
          toast(res.data.message)
        }
      })
      //services();     //第三方在线客服

    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '我的'
      next()
    }
  }

</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  /*.canvasTitle{
      width: 100%;
      height: 1.093333rem;
      line-height: 1.093333rem;
      text-align: center;
      color: white;
      font-size:.3733rem;
  }
  canvas{
      width: 100%;
      height:5.1033334rem;
  }*/

  .avator{
    width:2rem;
    height:2rem;
    border-radius:1rem;
  }
  .name-title{
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .informationTop {
    width: 100%;
    height: 9rem;
    background: @FFF;
    color: @newColor;
    font-size: 0.37333rem;
    text-align: center;
  .informationTopImg{
    width: 100%;
    height: 5.7067rem;
    background: url('../../img/newImg/account_bg.png') no-repeat center center;
    background-size: cover;
    .isMyImg{
      margin-top:1.673rem;
    }
  }
    span {
      display: inline-block;
    }
    .accountTop {
      display: flex;
      justify-content: space-between;
      height: 1.5rem;
      align-items: center;
      padding: 0 0.4rem;
      img{
        width:0.45rem;
        height:0.45rem;
      }
    }
    .accountMoney {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
    }
  .account_left img{width:2.1rem;float:right;}
    .accountButtons {
      margin-top: 0.4rem;
      span {
        width: 3.2rem;
        height: 1.06667rem;
        line-height: 1.06667rem;
        text-align: center;
        background-color: @actColor;
        border: solid 0.02667rem @actColor;
        border-radius: 0.5rem;
        color: @zero;
      }
    }
  }

  .account-item {
    width: 100%;
    margin-left: -1px;
    li {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 0 0 0.5rem;
      width:50%;
      height:2.1333rem;
      background-color: @FFF;
      float:left;
      font-size: @f32;
      img{
        width:0.5867rem;
      }
    }
    li.item:after{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: @ddd;
      z-index: 11;
      transform: scaleY(0.5);
    }
    li:before{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left:  0;
      height: 100%;
      width: 1px;
      background: @ddd;
      z-index: 11;
      transform: scaleX(0.5);
    }
  }
  .account-item:after{
    content: '';
    display: block;
    clear: both;
  }
</style>


