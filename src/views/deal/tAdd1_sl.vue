<template>
  <div class="dealwrap">
      <v-dealTab></v-dealTab>
  </div>
</template>

<script>
import dealTab from '@/components/deal/dealTab_sl'
export default {
  components:{
    'v-dealTab':dealTab
  },
  beforeRouteEnter(to,from,next){
    document.querySelector('title').innerText='模拟持仓'
      next()
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.dealwrap{
  padding-top: @marginbm;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch
}
</style>


