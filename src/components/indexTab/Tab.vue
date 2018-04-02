<template>
  <div class="wrap">
    <div class="topTitle"  @click='toActive'>
      <div>
        <span :class='{active:isactive}'>操盘达人</span>
      </div>
      <div >
        <span :class='{active:!isactive}'>策略排行</span>
      </div>
    </div>
    <div class="listwrap">
      <v-TraderList :show='isactive'></v-TraderList>
      <v-TstrategyrankingList :show='!isactive'></v-TstrategyrankingList>
    </div>
  </div>
</template>

<script>
import TraderList from './TraderList'
import TstrategyrankingList from './TstrategyrankingList'
export default {
  data() {
    return {
      isactive: true
    }
  },
  components:{
    'v-TraderList':TraderList,
    'v-TstrategyrankingList':TstrategyrankingList
  },
  methods:{
    toActive(event){
      if(event.target.innerText=='操盘达人'){
        this.isactive=true;
      }else{
         this.isactive=false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.wrap {
  width: 100%;
  height: auto;
  background-color: @liBg;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .topTitle {
    height: 1.09333rem;
    width: 100%;
    font-size: 0;
    border-bottom: 1px solid #1f232e;
    div {
      width: 50%;
      display: inline-block;
      text-align: center;
      span {
        display: inline-block;
        height: 1.09333rem;
        line-height: 1.09333rem;
        color: @fcolor;
        font-size: 0.37333rem;
      }
      .active {
        color: @actColor;
        border-bottom:4px solid @actColor;
      }
    }
  }
}
</style>
