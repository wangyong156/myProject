<template>
  <div class="box">
    <div class="conent">
      <!--<div class="money">已赚佣金 <br />{{item.money}}</div>-->
      <!--<div class="border"></div>-->
      <!--<div class="scale">佣金比例 <br />{{item.scale}} <br /> <br /><img src="../../assets/icon_common vip.png"/></div>-->
      <!--</div>-->
      <!--<div class="myuser"><span>我的用户</span> <p>{{item.people}}人 <img src="../../assets/arrow_right.png"/></p></div>-->
      <div class="left">
        <div class="title">模拟比赛(敬请期待)</div>
        <p class="info">赚积分抵扣交易费</p>
        <img class="icon" src="../../img/newImg/found_icon_mnbs.png" alt="">

      </div>
      <div class="right">
        <div class="recreation top" @click="toEntertainment">
          <div class="title-item">
            <p class="title">娱乐专区</p>
            <p class="info">
              每天积分签到，玩游戏，交易综合费能打折
            </p>
          </div>
          <img class="icon" src="../../img/newImg/found_icon_ylzq.png">
          <div class="fd-clear"></div>
        </div>

        <router-link class="generalize recreation" to='/invite'>
          <div class="title-item">
            <p class="title">推广赚钱</p>
            <p class="info">
              0成本，月入过万元
            </p>
          </div>
          <img class="icon" src="../../img/newImg/found_icon_tgzq.png">
          <div class="fd-clear"></div>
        </router-link>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            item: {}
        },
        methods: {
            toEntertainment(){
                this.$router.push({path: '/toEntertainment'})
            },
            toNext() {
                this.$emit('toNext')
            }
        }
    }

</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  .box {
    background: @changeColor;
    width: 100%;
    color: white;
    height:4.4rem;
    .conent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      //padding:@p30 0;
      color: @newColor;
      font-size: @f28;
      .money, .scale {
        flex: 1;
        text-align: center;
        line-height: 150%;

      }
      .border {
        width: 1px;
        height: 1.6rem;
        background: @FFF;
      }
    }
    .myuser {
      font-size: @f28;
      display: flex;
      padding: 0 @p30;
      border-top: #262934 1px solid;
      justify-content: space-between;
      align-items: center;
      height: @hwrap;
      p {
        img {
          vertical-align: center;
        }
      }

    }
  }

  .conent {
    display: flex;
    background: @FFF;
    .top {
      .title {
        margin-top: 0.1rem;
      }
      .icon {
        margin-top: 0.1rem;
      }
    }
    .left {
      flex: 0.9;
      border-right: 1px solid @ddd;
      text-align: center;
      .title {
        font-size: 0.37rem;
        margin: 0.37rem 0.4rem;
        text-align:left;
      }
      .info {
        color:@nine;
        text-align:left;
        margin-left:0.4rem;
      }
      .icon {
        margin-top: 0.6rem;
        width: 1.6rem;
        margin-bottom: 0.5rem;
      }
    }
    .right {
      .title {
        font-size: @f26;
        margin-bottom: 0.34rem;
      }
      .info {
        color: @nine;
        font-size: .3rem;
      }
      flex: 1;
      .recreation {
        display: block;
        border-bottom: 1px solid @ddd;
        padding: .35rem .26rem;

        .title-item {
          float: left;
          width: 70%;
          text-align: left;
          .title{
            color:@newColor;
          }
        }
        .icon {
          float: right;
          height: 1.33rem;
        }
      }
      .generalize {
        border-bottom: none;
        margin-top: 0.1rem;
        .title{
          margin-top:0.1rem;
        }
      }
    }
  }
</style>
