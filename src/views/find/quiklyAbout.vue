<template>
  <div class="main">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>一分钟了解期货投资宝</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="img-ct">
        <img src="../../img/about/about_02.png"/>
        <img src="../../img/about/about_03.png"/>
        <img src="../../img/about/about_04.png"/>
        <img src="../../img/about/about_05.png"/>
        <img src="../../img/about/about_06.png"/>
        <img src="../../img/about/about_07.png"/>
        <img src="../../img/about/about_08.png"/>
        <img src="../../img/about/about_09.png"/>
        <img src="../../img/about/about_10.png"/>
        <img src="../../img/about/about_11.png"/>
        <img src="../../img/about/about_12.png"/>
        <img src="../../img/about/about_13.png"/>
        <img src="../../img/about/about_14.png"/>
        <img src="../../img/about/about_15.png"/>
        <img src="../../img/about/about_16.png"/>
        <img src="../../img/about/about_17.png"/>
        <img src="../../img/about/about_18.png"/>
        <img src="../../img/about/about_19.png"/>
        <img src="../../img/about/about_20.png"/>
        <img src="../../img/about/about_21.png"/>
        <img src="../../img/about/about_22.png"/>
        <img src="../../img/about/about_23.png"/>
        <img src="../../img/about/about_24.png"/>
        <img src="../../img/about/about_25.png"/>

      </div>

    </v-ContentHead>
  </div>

</template>

<script>
  import home from '../../api/home/index'
  import {toast} from '@/util/index'
  import ContentHead from '@/components/ContentHead'

  export default {
    data() {
      return {}

    },

    methods: {
      back() {
        this.$router.back(-1)
      },
      toSimulation() {
        this.$router.push({path: '/home'});
      }

    },
    components: {
      'v-ContentHead': ContentHead
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '一分钟了解期货投资宝'
      next()
    }
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';

  .main {
    background: #ed3c3c;
  }

  .img-ct {
    font-size: 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 0;
      margin: 0;
      padding: 0;
      position: relative;
      margin-top: -2px;

    }
  }




</style>
