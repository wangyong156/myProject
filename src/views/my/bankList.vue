<template>
  <div>
    <div class="bankList">
      <div class="header">
        <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
        <span>我的银行卡</span>
        <span><img @click="add" src="../../img/newImg/nav_icon_add.png"/></span>
      </div>
      <v-ContentHead>
        <div class="bank-inner">
          <div class="tc" v-show="banklist.length == 0">
            <img style="margin-top: 2rem;width:2.7467rem;" src="../../img/icon_default_card@2x.png"/>
            <p class="black9 mt40 f28">您还没有添加银行卡</p>
          </div>
          <div v-show="banklist.length > 0" class="bank" :class="background(bank.bankCode)" v-for="(bank,index) in banklist">
            <div class="bankLogo"><img :src="bank.bankCode|bankLogo"/></div>
            <!--<div><img src="../../img/bank_logo/2X/bank1.png"/></div>-->
            <div class="right">
              <p>
                <span class="bankName">{{bank.bankName}}</span>
                <span class="delete" @click="showModel(bank.id,index)">删除</span>
              </p>
              <p class="bankType mt10">储蓄卡</p>
              <div class="bankNum mt40" v-html="bankNoTransfer(bank.bankNo)"></div>
            </div>
          </div>
          <!--<div class="addbank" @click="add">
            <img src="../../assets/select_card_add.png"/>
            <span>添加银行卡</span>
          </div>
          <p style="color:#56627C; font-size: @f24; text-align: center; margin-top: .3rem;">最多可添加3张银行卡</p>-->
        </div>
        <!--模态框-->
        <div class="model" v-show="flag">
          <div class="inner">
            <div class="tc photo-choose" @click="deleteCard(this.current, this.index)">
              <p>删除银行卡</p>
            </div>
            <div class="tc photo-cancel" @click="hidden">
              <p>取消</p>
            </div>
          </div>
        </div>
      </v-ContentHead>
    </div>
  </div>
</template>

<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast} from '@/util/index'
  export default {
    data() {
      return {
        // banklist: [{bankName:"djghj",bankNo:"874678657864786",id:"1"},{bankName:"djghj",bankNo:"874678657864786",id:"2"},{bankName:"djghj",bankNo:"874678657864786",id:"3"}]
        banklist: [],
        flag:false,
        current:'',
        index:'',
        img1:'../../img/bank_logo/2X/bank',
        img2:'.png'
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },

    filters:{
      bankLogo(value){
        if(value > 21 || value == 6 || value == 9 || value == 14 || value == 15 || value == 16){
          return require("../../img/bank_logo/2X/bank0.png");
        }else{
          return require("../../img/bank_logo/2X/bank"+value+".png");
        }
      }
    },
    methods: {
      back() {
        //this.$router.back(-1)
        this.$router.push({"path":"/toAccountinformation"});
      },
      background(code){
        if(code == 3 || code == 11 || code == 12){
          return "greenBack"
        } else if(code == 4 || code == 7 || code == 8 || code == 13){
          return "blueBack"
        } else if(code == 19 || code == 21){
          return "yellowBack"
        }else{
          return '';
        }
      },
      hidden() {
        this.flag = !this.flag;
      },
      add() {
        this.$router.push({path: '/addCard'})
      },
      showModel(item, index){
        this.flag = ! this.flag;
        this.current = item;
        this.index = index;
      },
      deleteCard() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          id:this.current
        }
        my.deleteBankCard(senddata).then(res => {
          var that = this;
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            that.banklist.splice(this.index, 1);
            this.current = '';
            this.index = '';
            this.flag = ! this.flag;
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
      bankNoTransfer(num) {
        return "<span>" + num.substring(0, 4) + "</span><span class='ml40'>****</span><span class='ml40'>****</span><span class='ml40'>" + num.substring(num.length - 4, num.length) + "</span>";
      }
    },
    mounted() {
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      my.bankList(senddata).then(res => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          this.banklist = res.data.data;
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
      document.querySelector('title').innerText = '我的银行卡'
      next();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .bankList {
    .bank-inner {
      background: @bgColor;
      padding: 0 @p30 @p30;
      .bank {
        padding: 0.6rem 0.53rem 0.53rem;
        width: 9.2rem;
        height: 3.2rem;
        background: #ef6d74;
        border-radius: @fsize;
        margin-top: @p30;
        display: flex;
        justify-content: flex-start;
        .bankLogo{
          background-color: #fff;
          height:1rem;
          width: 1rem;
          border-radius:0.5rem;
          padding:0.12rem;
          img{
            width:100%;
          }
        }
        .right {
          padding: 0 0 0 @p30;
          flex: 1;
          p {
            display: flex;
            justify-content: space-between;
            .bankName {
              font-size: 0.48rem;
              color: white;
              width: 4.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .delete {
              color: rgba(255, 255, 255, 0.5);
              font-size: 0.3733rem;
              display: inline-block;
              border: 1px solid rgba(255, 255, 255, 0.5);
              line-height: 0.6667rem;
              height: 0.6667rem;
              width: 1.6rem;
              text-align: center;
              border-radius: 0.35rem;
            }
          }
          .bankType {
            font-size: @f24;
            color: white;
          }
          .bankNum {
            font-size: 0.48rem;
            color: white;
            margin-top: .5rem;
          }
        }
      }
      .yellowBack{
        background: #efc400;
      }
      .blueBack{
        background:#578cce;
      }
      .greenBack{
        background: #4bbe88;
      }
      .addbank {
        width: 9.2rem;
        height: 3.2rem;
        border-radius: @fsize;
        border: 3px dashed @placeColor;
        margin-top: @p30;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #56627c;
        img {

        }
        span {
          margin-top: @f34;
          font-size: 0.48rem;
        }
      }
    }
    .model {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      .inner {
        width: 100%;
        padding: 0.21rem 0.4rem;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
      }
      .photo-choose,
      .photo-cancel {
        border-radius: 0.24rem;
        line-height: 1.4rem;
        background-color: #fff;
        font-size: 0.48rem;
        color:@blue;
      }
      .photo-cancel {
        margin-top: 0.2rem;
      }
    }
  }
</style>
