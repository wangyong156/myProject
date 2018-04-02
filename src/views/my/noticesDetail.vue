<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>公告详情</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="nav">
        <span class="nav-name">{{title}}</span>
        <span class="nav-time">{{time}}</span>
      </div>
      <div class="article">
			<span class="article-title">
				尊敬的用户您好
			</span>
        <p>
          {{main}}
        </p>
        <div class="article-foodter">
          <div class="article-name">微策略</div>
          <div class="article-time">{{date}}</div>
        </div>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast} from '@/util/index'

  export default {

    data() {
      return {
        msg: '你好',
        id: "",
        title: "",
        time: "",
        main: "",
        date: "",
        name: '',
      }
    },
    methods: {
      getParams() {
        let routerParams = this.$route.params.name;
        alert(routerParams);
        this.msg = routerParams
      },
      back() {
        this.$router.back(-1)
      },
    },
    components: {
      'v-ContentHead': ContentHead
    },
    mounted() {
      let routerParams = this.$route.query.id;
      this.id = routerParams;

      let senddata = {
        userId: window.localStorage.getItem("token"),
        id: this.id
      }

      my.noticeDetail(senddata).then((res) => {
        if (res.data.code == 200) {

          this.title = res.data.data.title;
          this.time = res.data.data.createTime;
          this.main = res.data.data.content;
          this.date = res.data.data.publishTime;
        } else {
          toast(res.data.message)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 1.76rem;
    .nav-name {
      font-size: @f34;
      color: white;
    }
    .nav-time {
      font-size: @f24;
      color: @Color;
      margin-top: .4533rem;
    }
  }

  .article {
    padding: 0.58667rem 0.66667rem;
    font-size: @f28;
    color: #FFFFFF;
    border-top: 1px solid #262934;
    p {
      line-height: .64rem;
      margin: 1.493333rem 0 2.6666666rem;
    }
    .article-foodter {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
    }
  }
</style>
