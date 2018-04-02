<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>发现</span>
      <span class="img"></span>
    </div>
    <v-Content>
      <v-Commission :item='commission'></v-Commission>
      <div class="news-list">
        <p class="title mainback">公告</p>
        <div class="tc" v-show="show == 1">
          <img style="margin-top: 0.8rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
          <p class="black9 mt40 f28">暂无公告</p>
        </div>
        <mt-loadmore  v-show="newsList.length != 0" :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="false">
          <ul class="news-ul">
            <li class="borderB" v-for="(value,index) in newsList">
              <div class="head" v-on:click="showNews(index)">
                <p class="list-title"> <img v-show="index == 0" class="new-icon" src="../../img/newImg/found_label_new.png" alt="">{{value.title}}
                  <!--<span v-show="index == 0" class="new-label">new </span>-->
                  <img v-show="nowIndex!= index" class="icon" src="../../img/arrow_fold@2x.png" alt="">
                  <img v-show="nowIndex == index" class="icon" src="../../img/arrow_unfold@2x.png" alt="">
                </p>
              </div>
              <div class="info-ct" v-show="nowIndex == index ">
                <p class="main">
                  {{value.content}}
                </p>
                <p class="time">
                  {{value.updateTime}}
                </p>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
      <!--<v-Recommend :item='recommend'></v-Recommend>-->
      <!--<v-Channel></v-Channel>-->
      <!--<v-Level></v-Level>-->
      <!--<v-ExtendList :item='extendList'></v-ExtendList>-->
    </v-Content>

    <v-Footer></v-Footer>

  </div>

</template>
<script>
  import Content from '@/components/Content'
  import Footer from '@/components/Footer'
  import Commission from '@/components/find/commission'
  import Recommend from '@/components/find/recommend'
  import Channel from '@/components/find/channel'
  import Level from '@/components/find/level'
  import ExtendList from '@/components/find/extendList'
  import home from '@/api/home/index'
  import FundArrowList from '@/components/FundArrowList'
  import {Loadmore} from 'mint-ui'

  export default {
    data() {
      return {
        iconIndex: true,
        nowIndex: 0,
        commission: {
          money: "1200",
          scale: "0.06%",
          people: "2"
        },
        newsList: [/*{
        title:'美国原油公告1',
        content:'这里是美国原油新闻,原油期货电子盘价格收盘上涨0.09美元,涨幅0.17%,报52.91美元/桶;ICE布伦特6月原油期货电子盘价格收盘',
        time:'2017-11-30'
      },{
        title:'美国黄金公告2',
        content:'美国WTI原油的价格10月份从50美元/桶以下的价格回升目前52.60美元/桶.',
        time:'2017-11-31'
      }*/],
        recommend: {
          times: "12",
          tolink: "http://www.baidu.com",
          src: require('../../assets/QRcode.png'),
        },
        extendList: [
          /*        {
                    user:'h******',
                    time:'1小时前',
                    product:'明河股份',
                    number:'2500股',
                    profit:'盈利分配',
                    Price:'3210.00'
                  }*/
        ],
        show: 0,
        star: 1,
        currentSize: 0,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode: "touch"   // iphone或安卓机存在问题
      }
    },
    components: {
      'v-Footer': Footer,
      'v-Content': Content,
      'v-Commission': Commission,
      'v-Recommend': Recommend,
      'v-Channel': Channel,
      'v-ExtendList': ExtendList,
      'v-Level': Level,
      'v-FundArrowList': FundArrowList,
      'mt-loadmore':Loadmore
    },
    methods: {
      toActive(index) {
        this.falg = index
      },
      back() {
        this.$router.back(-1)
      },
      showNews(index) {
        if (this.nowIndex == index) {
          this.nowIndex = -1;
        } else {
          this.nowIndex = index
        }

      },
      getList() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          rows: 10,
          sort: '',
          order: '',
          star: this.star
        }
        //请求公告列表
        home.getAnnounceList(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            var list = res.data.data.rows;
            this.newsList = this.newsList.concat(list);
            this.total = res.data.data.totalPage;
            if (this.newsList.length == 0) {
              this.show = 1;
            }
            if (this.star == this.total) {
              this.allLoaded = true;
              this.$refs.loadmore.onBottomLoaded();
            } else {
              this.star = this.star + 1;
            }
          } else if (res.data.code == 401) {
            toast(res.data.message);
            var that = this;
            setTimeout(function () {
              that.$router.push({path: '/login'})
            }, 1000);
          } else {
            toast(res.data.message)
          }
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '发现'
      next()
    },
    mounted() {
      this.getList()
    }


  }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';
  .news-list {
    margin-top: 0.3rem;
    font-size: .42rem;
    p.title {
      height: 1.17rem;
      line-height: 1.17rem;
      padding: 0 .4rem;
      color: @newColor;
    }
    .list-title{
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      padding-right:0.6rem;
    }
    .news-ul{
      margin-bottom:0.2rem;
      background: @FFF;
    }
    li {
      .head {
        padding: 0 .4rem;
        height: 1.17rem;
        line-height: 1.17rem;
        position: relative;
        .icon {
          position: absolute;
          right: .4rem;
          top: .5rem;
          width: .4rem;
        }
      }
      .new-label {
        color: @FFF;
        background: @red;
        border-radius: 5px;
        padding: 2px 6px;
        font-size: .26rem;
        position: relative;
        top: -3px;
        margin-left: .24rem;
      }
      .info {
        color: @FFF;
        background: @fColor;
        padding: .3rem @p30;
      }
    }
    .info-ct {
      padding: 0 @p30;
      padding-top: .37rem;
      p{
        color: @six;
      }
      .time {
        font-size: @f26;
        color:@nine;
        padding-top: .4rem;
        padding-bottom: .47rem;
      }
    }
  }
  .new-icon {
    position: relative;
    margin-right:0.2rem;
    vertical-align: middle;
    width: .75rem;
  }
</style>


