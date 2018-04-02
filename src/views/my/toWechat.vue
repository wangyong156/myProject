<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>关注公众号</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="tc" style="padding-top:2.9333rem">
        <img src="../../img/QRcode@2x.png"/>
        <p class="f34 black3 mt30">微信扫一扫，关注就有好礼哦~</p>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import ContentHead from '@/components/ContentHead'

  export default {
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back(-1)
      }
    },
    components: {'v-ContentHead': ContentHead},
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '关注公众号'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .tc img {
    width: 3.7333rem;
  }

</style>
