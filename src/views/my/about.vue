<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>关于我们</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="top-nav">
        <img src="../../assets/about_logo.png"/>
        <p>{{name}}</p>
        <span>{{v}}</span>
      </div>
      <div class="list" style="border: none;" @click="Vchat">
        <span>微信公众号</span>
        <div>
          <span>策略金</span>
          <img src="../../assets/arrow_right.png"/>
        </div>
      </div>
      <div class="list" @click="Phone">
        <span>客服电话</span>
        <div>
          <span style="color: #fbf825;">0571-85857825</span>
          <img src="../../assets/arrow_right.png"/>
        </div>

      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import ContentHead from '@/components/ContentHead'

  export default {
    data() {
      return {
        name: "策略金APP",
        v: "版本信息v1.1.1"
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },
    methods: {
      Vchat() {
        alert("微信公众号");
      },
      Phone() {
        alert("客服电话");
      },
      back() {
        this.$router.back(-1)
      },
    }

  }
</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  .top-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: @bgColor;
    img {
      margin: 1.36rem 0rem 0.8rem;
    }
    p {
      font-size: .48rem;
      color: white;
    }
    span {
      font-size: @f24;
      color: #ccc;
      margin: @fsize 0rem 1.36rem;
    }
  }

  .list {
    height: 1.28rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @FFF;
    padding: 0 @p30;
    font-size: @f32;
    border-top: 1px solid @ddd;
    span{
      color: @newColor;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      span{
        color:@nine;
      }
      img {
        margin-left: @fsize;
      }
    }

  }

</style>
