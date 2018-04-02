<template>
  <div class="warp">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>确认跟单</span>
      <span class="img"></span>
    </div>
    <div class="contentWrap"></div>
    <div class="head">
      <p class="tips">请选择跟单手数</p>
      <ul class="num-list">
        <li v-for="(v,index) in lists" @click="showItem(index,$event)" :class="status == index?'active':''">{{v}}</li>
      </ul>
      <p class="input-item">
        <input class="track-input"  v-model="liHmtl"   @keyup="keyup"  type="number" placeholder="请输入任意整数"  onKeyUp="value=value.replace(/[^\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"

        ><span class="label" >其他整数</span></p>
      <p class="info clearfix">
        <span class="fl">
          跟单综合服务费：<span class="num">{{fee}}</span>元/手
        </span>
        <span class="fr">
           盈利分成：{{divide | evaluateTo}}
        </span>
      </p>
    </div>
    <ul class="item-list">
      <li>
        1、跟单手数选择完成后，只要您的账号余额充足，即可自动执行买卖指令，完全托管。
      </li>
      <li>
        2、跟单的策略可以隔夜持仓，用户也可以根据自身情况选择止盈止损或自主卖出。
      </li>
      <li>
        3、跟单目标为平台收益率最高的前三名，并不保证100%盈利，市场风险由您自己把握，慎重选择。
     </li>
      <li>
        4、平台只提供撮合服务，不对跟单盈亏负责。
     </li>

    </ul>
    <div class="bottomButton">
      <span class="active"  @click="toOrder">确定跟单</span>
    </div>
  </div>

</template>

<script>
  import home from '../../api/home/index'
  import { toast } from '@/util/index'
  export default {
    data() {
      return {
        followMax:0,//最大跟单手数
        fee:'',
        divide:'',
        liHmtl :'请输入任意整数',
        status:-1,
        flag: -1,
        lists: [
        ],
      }
    },
    filters:{
      evaluateTo(value){
        switch(value){
          case 0.9:
           return '九一开';
           break;
          case 0.8:
            return '八二开';
            break;
          case 0.7:
            return '七三开';
            break;
          case 0.6:
            return '六四开';
            break;
          case 0.5:
            return '五五开';
            break;
          case 0.4:
            return '四六开';
            break;
          case 0.3:
            return '三七开';
            break;
          case 0.2:
            return '二八开';
            break;
          case 0.1:
            return '一九开';
            break;
        }
      }
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      showItem(index,event){

        this.status = index;
        this.liHmtl = event.target.innerText;

      },
      keyup(){
       this.status = -1;
      },
      todetals(index) {

        if (this.flag == index) {
          this.flag = -1
        } else {
          this.flag = index
        }
      },
      //跟单提交
      toOrder(){
        if(this.liHmtl == '' || this.liHmtl == '请输入任意整数'){
            toast('跟单手数不能为空');
          }
         else if( parseFloat(this.liHmtl) >   parseFloat(this.followMax )){
          toast('跟单手数不能大于'+ this.followMax);
        }else if(parseFloat(this.liHmtl) <= 0){
          toast('跟单手数不能小于1');
        } else{
          var $self = this;
          let senddata  = {
            num:$self.liHmtl,
            followId:this.$route.query.userId,
            HUIMI_SESSIONID: window.localStorage.getItem("token"),
            HUIMI_USERID: window.localStorage.getItem("userId")
          };

          home.trackingCheckS(senddata).then((res) => {
            if (res.data.code == 200) {
                window.localStorage.setItem("token", res.data.hid);
              toast('跟单成功');
              setTimeout(function () {
                $self.$router.push({path:'/FollowOderTab'})
              },1000);
            }else {
              toast(res.data.message)
            }
          })
        }


      }
    },
    mounted(){
      let senddata = {
        'HUIMI_SESSIONID': window.localStorage.getItem("token"),
        'HUIMI_USERID': window.localStorage.getItem("userId"),
      }

      //请求期货列表
      home.trackingCheck(senddata).then((res) => {
        if (res.data.code == 200) {
          this.lists = res.data.data.followHandNum;
          this.divide = res.data.data.allotRate;
          this.fee = res.data.data.fee;
          this.followMax =  res.data.data.followMax;

        }else {
          toast(res.data.message)
        }
      })
    },
    beforeRouteEnter(to,form,next){
      document.querySelector('title').innerText = '确定跟单';
      next();
    }
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';
  .num{
    color: @titleColor;
  }
  .bottomButton {
    width: 100%;
    height: 1.76rem;
    line-height: 1.76rem;
    position: fixed;
    bottom: 0;
    z-index: 9988;
    background-color: @FFF;
    text-align: center;
    font-size: .48rem;
    span {
      display: inline-block;
      width: 9.1rem;
      height: 1.17333rem;
      line-height: 1.17333rem;
      background-color: #0b101c;
      color: #56627c;
      border-radius: 6px;
    }
    .active {
      border: none;
      background-color: @actColor;
      color: @zero;
    }
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  .warp{
    color: #fff;

    .head{
      background:@FFF;
      padding: 0 .3rem;
    }
    .tips{
      color: @newColor;
      padding: .3rem 0;
      font-size: 0.38rem;
    }
    .num-list{
      display: flex;
      text-align: center;
      color: @newColor;
      margin-right:-.3rem;
      li{

        height:1.3rem;
        line-height:1.3rem;
        width:3rem;
        flex:1;
        background: #f4f4f4;
        border-radius:6px;
        margin-right:.3rem;
        font-size: @f34;
      }
      .active{
        background: @actColor;
        color: @zero;
      }
    }
    .track-input{
      position: relative;
      margin-top: .4rem;
      padding:.3rem;
      color: #eee;
      width: 100%;
      background: #FFF;
      padding-left: 2.6rem;
    }
    .info{
      font-size:.32rem;
      padding: 0.45rem 0;
      color: @nine;
    }
    .item-list{
      font-size: .32rem;
      margin-top: .3rem;
      padding: 0 .3rem;
      color: @six;
      line-height:2;
    }
    .input-item{
      height:1.3rem;
      font-size:.42rem;
      position: relative;
      span{
        position: absolute;
        top: .76rem;
        left:.3rem;
        color:@newColor;
      }
      input{
        height:1.1rem;
        line-height:1.1rem;
        background: #f4f4f4;
        color:@newColor;
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
  }


</style>
