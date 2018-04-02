<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span class="headerTitle">
			<span :class="{'active':!Active}" @click="toActiveTitle">模拟行情</span>
			<span :class="{'active':Active}">模拟持仓</span>
			</span>
      <span class="rule" @click="theRule">规则</span>
    </div>
    <div class="wrap">
      <div class="topTitle capitalTop">
        <div v-for='(item,index) in tabs' @click='toActive(index)'>
          <!--<span :class="{'active':falg==index}">{{item.name}}</span>-->
          <span :class="{'active':falg==index}">{{item.name}}</span>
        </div>
      </div>
      <div class="listwrap">
        <v-entrust ref="childEntrust" :typeFlag='typeFlagFather' v-show="falg==0"></v-entrust>
        <v-holding ref="childHolding" :typeFlag='typeFlagFather' v-show="falg==1"></v-holding>
        <v-settled ref="childSettled" :typeFlag='typeFlagFather' v-show="falg==2"></v-settled>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentHead from '@/components/ContentHead'
  import entrust from './entrust'
  import holding from './holding'
  import settled from './settled'

  export default {
    data() {
      return {
        name: this.$route.query.name,
        code: this.$route.query.code,
        contract: this.$route.query.contract,
        id: this.$route.query.id,
        falg: 0,
        Active: true,
        press:true,
        tabs: [
          {name: '委托'},
          {name: '持仓'},
          {name: '结算'}
        ],
        typeFlagFather: 2
      }
    },
    components: {
      'v-entrust': entrust,
      'v-holding': holding,
      'v-settled': settled,
      'v-ContentHead': ContentHead
    },
    methods: {
      toActive(index) {
          this.falg = index
        if (index == 0) {
          clearInterval(window.entrustTime);
          clearInterval(window.holdingTime);
          this.$refs.childEntrust.childEntrustFn();
        } else if (index == 1) {
          clearInterval(window.entrustTime);
          clearInterval(window.holdingTime);
          this.$refs.childHolding.childHoldingFn();
        } else if (index == 2) {
          clearInterval(window.entrustTime);
          clearInterval(window.holdingTime);
          if(!$('.topTitle div span:last').hasClass('active')){
              this.$refs.childSettled.childSettledFn();
          }else{
              return false;
          }
        }
      },
      back() {
        this.$router.push({"path": "/home"});
      },
      toActiveTitle(event) {
        if (event.target.innerText == '模拟行情') {
          this.Active = false;
        }
        this.$router.push({path: '/firmOffer', query: {id: this.id, type: 0}})
      },
      theRule() {
        this.$router.push({
          path: '/ruleA',
          query: {
            'name': this.name,
            'code': this.code,
            'contract': this.contract,
            'id': this.id
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.openWay == 1) {
        this.falg = 1;
        this.$refs.childHolding.childHoldingFn(2);
      } else if (this.$route.query.openWay == 2) {
        this.falg = 0;
        this.$refs.childEntrust.childEntrustFn(2);
      } else {
        this.falg = 0;
        this.$refs.childEntrust.childEntrustFn(2);
      }
    },
    beforeRouteLeave(to, form, next) {  //离开
      clearInterval(window.entrustTime);
      clearInterval(window.holdingTime);
      next();
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '模拟持仓'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .dealwrap {
    padding-top: @marginbm;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch
  }

  .header {
    padding: 0 @p30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: @hwrap;
    color: #fff;
    font-size: .48rem;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    .headerTitle{
      display: block;
      font-size: @f26;
      width:3.68rem;
      height:0.69333rem;
      line-height:0.69333rem;
      border-radius: .08rem;
      overflow: hidden;
      span {
        display: inline-block;
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        color:@newColor;
        border: 1px solid @ddd;
        border-right: none;
        border-radius: .08rem 0  0 .08rem;
      }
      .active {
        color: @newColor;
        background: @actColor;
        border: 1px solid @actColor;
        border-radius: 0 .08rem .08rem 0;
      }
  }
  .rule {
    font-size: @f26;
    color: #333;
  }
  }

  .listwrap {
    /*margin-top: 2.6rem;*/
    top: 2.65rem;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    width: 100%;
    overflow: scroll;
  }

  .wrap {
    background-color: @bgColor;
    .capitalTop {
      width: 100%;
      height: 1.0933rem;
      position: fixed;
      top: 1.30667rem;
      background-color: @FFF;
      font-size: 0;
      z-index: 10;

    }
    .topTitle {
      div {
        width: 33.3333%;
        display: inline-block;
        text-align: center;
        position: relative;
        span {
          display: inline-block;
          width: 1.6rem;
          height: 1.09333rem;
          line-height: 1.09333rem;
          color: @newColor;
          font-size: 0.37333rem;
        }
        .active {
          color: @actColor;
          border-bottom: 2px solid @actColor;
        }
      }
    }
  }
</style>




