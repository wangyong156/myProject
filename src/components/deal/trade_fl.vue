<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>我的跟单</span>
      <span class="img"></span>
    </div>
    <div class="wrap">
      <div class="topTitle capitalTop">
        <div v-for='(item,index) in tabs' @click='toActive(index)'>
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
                tabs: [
                    {name: '委托'},
                    {name: '持仓'},
                    {name: '结算'}
                ],
                typeFlagFather: 3
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
                    this.$refs.childSettled.childSettledFn();
                    /*        var _this = this;
                            setTimeout(function () {
                                _this.$refs.childSettled.childSettledFn();
                            },1000)*/
                }
            },
            back() {
                this.$router.push({"path": "/home"});
            },
            toActiveTitle(event) {
                if (event.target.innerText == '模拟行情') {
                    this.Active = false;
                }
                this.$router.push({path: '/firmOffer', query: {id: this.id, type: 1}})
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
            //判断是否从合同页面跳转过来 后判断其它路径
            if(localStorage.getItem('openWay') == 3 ){
                this.falg = 2;
                this.$refs.childSettled.childSettledFn();
            }else {
                if (this.$route.query.openWay == 1) {
                    this.falg = 1;
                    this.$refs.childHolding.childHoldingFn(3);
                } else if (this.$route.query.openWay == 2) {
                    this.falg = 0;
                    this.$refs.childEntrust.childEntrustFn(3);
                } else {
                    this.falg = 0;
                    this.$refs.childEntrust.childEntrustFn(3);
                }
            }
        },
        beforeRouteLeave(to, form, next) {  //离开
            clearInterval(window.entrustTime);
            clearInterval(window.holdingTime);
            localStorage.removeItem('openWay');
            next();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '我的跟单'
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
    color: #333333;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    .headerTitle {
      display: block;
      font-size: @f26;
      width: 3.68rem;
      height: 0.69333rem;
      line-height: 0.69333rem;
      border: 1px solid @fcolor;
      border-radius: 0.08rem;
      span {
        display: inline-block;
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
      }
      .active {
        color: @changeColor;
        background: @fcolor;
      }
    }
    .rule {
      font-size: @f26;
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
      background-color: #FFF;
      font-size: 0;
      z-index: 10;


    }
    .topTitle {
      div {
        width: 33.3333%;
        display: inline-block;
        text-align: center;

        span {
          display: inline-block;
          width: 1.6rem;
          height: 1.09333rem;
          line-height: 1.09333rem;
          color: #333;
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


