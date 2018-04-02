<template>
  <div class="dealwrap">
      <v-dealTab ></v-dealTab>
  </div>
</template>

<script>
import dealTab from '@/components/deal/dealTab'
export default {
  components:{
      'v-dealTab':dealTab
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.dealwrap{
  padding-top: @marginbm;
}
</style>

