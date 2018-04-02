<template>
  <div class="dealwrap">
      <v-dealTab ></v-dealTab>
  </div>
</template>

<script>
import dealTab from '@/components/deal/dealTab2'
export default {
  components:{
    'v-dealTab':dealTab
  },
  beforeRouteEnter(to,from,next){
    document.querySelector('title').innerText='我的跟单'
      next()
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.dealwrap{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch
}
</style>


