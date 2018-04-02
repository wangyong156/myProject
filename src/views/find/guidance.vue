<template>
  <div class="main">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>新手引导</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="img-ct">
        <img src="../../img/guidance/itro_banner.png"/>
        <img src="../../img/newImg/itro_pic1.png"/>
        <img src="../../img/newImg/itro_pic2.png"/>
        <img src="../../img/newImg/itro_pic3.png"/>
      </div>
      <div class="footer">
        模拟<span class="num">3</span>次，送<span class="num">30</span>元现金红包
        <div class="bottomButton">
          <span class="active" @click="toSimulation">去模拟</span>
        </div>
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
        this.$router.push({path: '/firmOffer', query: {id: 1, type: 0}});
      }

    },
    components: {
      'v-ContentHead': ContentHead
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = ' 新手引导'
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

  .footer {
    position: relative;
    top: -2px;
    bottom: 0;
    color: #fff;
    background: #ed3c3c;
    text-align: center;
    font-size: .51rem;
    padding: .6rem 0;
    .num {
      font-size: .82rem;
      color: #f8cc00;
      margin: 0 3px;
    }
  }

  .bottomButton {

    margin-top: .3rem;
    width: 100%;
    height: 1.76rem;
    line-height: 1.76rem;
    bottom: 0;

    text-align: center;
    font-size: .48rem;
    span {
      display: inline-block;
      width: 9.1rem;
      height: 1.17333rem;
      line-height: 1.17333rem;
      background-color: #0b101c;
      color: #56627c;
      border-radius: 6px;
    }
    .active {
      border: none;
      background-color: @actColor;
      color: @newColor;
    }
  }

</style>
