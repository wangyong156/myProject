<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>公告详情</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div v-for="(i,index) in lists" class="nav">
        <div class="title"><span></span>{{i.title}}</div>
        <div class="text">{{i.text}}</div>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import ContentHead from '@/components/ContentHead'

  export default {
    data() {
      return {
        lists: [
          {
            title: "什么事是么是投资人",
            text: "点买人是指时间飞逝覅撒娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          },
          {
            title: "什么事点斯蒂芬是否收到粉丝是的发生的么是投资人",
            text: "点买人是指时间飞逝覅撒娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          },
          {
            title: "什么事点么是投资人",
            text: "点买人是指时间飞逝覅撒水电费手动阀搜地方速度是的发送到的娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          },
          {
            title: "什么事点而非手动阀搜是投资人",
            text: "点买人是指时间飞逝覅撒娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          },
          {
            title: "什什么是投资人",
            text: "点买人是指时间飞逝覅撒娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          },
          {
            title: "什什么是投资人",
            text: "点买人是指时间飞逝覅撒娇飞机撒佛杀地方撒of搜地方考试时佛山东方干嘛什么的数据佛山大家ASO手动阀搜地方身份啥的飞机撒奥斯丁发偶家哦哦哦"
          }
        ]
      }
    },
    components: {
      'v-ContentHead': ContentHead
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  img {
    display: block;
  }

  .nav {
    color: white;
    background: @liBg;
    margin: @fsize @p30;
    border-radius: @fsize/2;
    padding: @p30;
    .title {
      font-size: @f28;
      color: white;
      span {
        display: inline-block;
        width: .16rem;
        height: .16rem;
        margin-right: @fsize;
        background: #FFDD25;
        border-radius: 50%;
      }
    }
    .text {
      margin-top: @p30;
      font-size: @f24;
      color: #ccc;
    }

  }
</style>
