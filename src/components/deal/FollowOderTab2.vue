<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span class="headerTitle">
			<span :class="{'active':!Active}" @click="toActiveTitle">跟单列表</span>
			<span :class="{'active':Active}" @click="toActiveTitles">我的跟单</span>
			</span>
      <span style="visibility: hidden" class = "rule">规则</span>
    </div>
    <div class="contentWrap"></div>
    <div class="wrap">
      <div class="listwrap">
        <v-followList v-show="falg==0"></v-followList>
      </div>
    </div>
  </div>

</template>

<script>


  import followOreder from './followOreder'
  import followList from './followList'

  export default {
    data() {
      return {
        falg: 0,
        Active: false,
        tabs: [
          { name: '委托' },
          { name: '持仓'},
          { name: '结算' }
        ]
      }
    },
    components: {

      'v-followOreder':followOreder,
      'v-followList':followList
    },
    methods: {
      toActive(index) {
        this.falg = index
      },
      back() {
        this.$router.push({path:'home'});
      },
      toActiveTitle(event) {
        if (event.target.innerText == '跟单列表') {
          this.Active = false;
        }
        this.$router.push({path:'/FollowOderTab2'})
      },
      toActiveTitles(event) {
        if (event.target.innerText == '我的更单') {
          this.Active = true;
        }
        this.$router.push({path:'/FollowOderTab'})
      },
    },
    beforeRouteEnter(to,form,next){
        document.querySelector('title').innerText = '跟单列表'
        next();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';
 .header{
    padding:0 @p30;
    display: flex;
    justify-content:space-between;
    align-items: center;
    height:@hwrap;
    color:#fff;
    font-size:.48rem;
    img{
      width:0.32rem;
      height:0.32rem;
    }
  .headerTitle {
    display: block;
    font-size: @f26;
    width: 3.68rem;
    height: 0.69333rem;
    line-height: 0.69333rem;
    border-radius: 0.08rem;
  span {
    display: inline-block;
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    color:@newColor;
    border: 1px solid @ddd;
    border-left: none;
    border-radius: 0 .08rem .08rem 0;
  }
  .active {
    color: @newColor;
    background: @actColor;
    border: 1px solid @actColor;
    border-radius: .08rem 0  0 .08rem;
  }
  }
  .rule {
    font-size: @f26;
  }
  }
  .wrap {
    color: #ffffff;
    top:  1.30667rem;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: auto;
    background-color: @bgColor;
    .topTitle {
      height: 1.09333rem;
      line-height: 1.09333rem;
      width: 100%;
      font-size: 0;
      background-color: @liBg;
      div {
        width: 33.3333%;
        display: inline-block;
        text-align: center;
        span {
          display: inline-block;
          width: 1.6rem;
          height: 1.09333rem;
          line-height: 1.09333rem;
          color: @fcolor;
          font-size: 0.37333rem;
          overflow: hidden;
        }
        .active {
          color: @zero;
          border-bottom: 4px solid @actColor;
        }
      }
    }
  }
</style>
