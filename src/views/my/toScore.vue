<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>积分记录</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="tc" v-show="show == 1">
        <img style="margin-top: 4.5rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
        <p class="black9 mt40 f28">您还没有积分记录</p>
      </div>
      <div class="mainback capitalContent" v-show="fundList.length != 0">
        <mt-loadmore :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="false">
          <ul>
            <li v-for="(item,index) in fundList">
              <div>
                <p class="f32 black3">{{item.title}}</p>
                <p class="black9 mt15">{{item.createTime}}</p>
              </div>
              <div class="tr">
                <p class="f30" :class="color(item.amount)">{{item.amount | direction}}{{item.amount}}</p>
        <!--        <p class="black9 mt15">{{item.totalLeft}}</p>-->
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
  import {toast} from '@/util/index'
  import FundArrowList from '@/components/FundArrowList'
  import {Loadmore} from 'mint-ui'

  export default {
    data() {
      return {
        show: 0,
        fundList: [],
        star: 1,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode: "touch"   // iphone或安卓机存在问题
      }
    },
    filters: {
      type(val) {
        if (val == 1) {
          return "充值"
        } else if (val == 5) {
          return "测试"
        } else if (val == 2) {
          return "提现冻结"
        } else if (val == 4) {
          return "充值失败退回"
        } else if (val == 8) {
          return "提现解冻"
        } else if (val == 9) {
          return "提现扣款"
        } else if (val == 10) {
          return "提现退回"
        } else if (val == 11) {
          return "推广佣金"
        } else if (val == 12) {
          return "手动入金"
        } else if (val == 13) {
          return "手动出金"
        } else if (val == 15) {
          return "冻结交易综合费"
        } else if (val == 16) {
          return "解冻交易综合费"
        } else if (val == 17) {
          return "扣除交易综合费"
        } else if (val == 18) {
          return "冻结履约保证金"
        } else if (val == 19) {
          return "解冻履约保证金"
        } else if (val == 21) {
          return "冻结止盈保证金"
        } else if (val == 22) {
          return "解冻止盈保证金"
        } else if (val == 25) {
          return "结算收入"
        } else if (val == 26) {
          return "结算扣除"
        }
      },
      direction(val) {
        if (val > 0) {
          return "+"
        } else if (val < 0) {
          return ""
        }
      }
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      color(val) {
        if (val < 0) {
          return "green";
        } else if (val > 0) {
          return "red";
        }
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      getList() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          rows: '10',
          sort: '',
          order: '',
          star: this.star
        }

        my.getScoreLog(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            var list = res.data.data.rows;
            this.fundList = this.fundList.concat(list);
            this.total = res.data.data.totalPage;
            if (this.fundList.length == 0) {
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
    components: {
      'v-FundArrowList': FundArrowList,
      'mt-loadmore': Loadmore,
      'v-ContentHead': ContentHead
    },
    mounted() {
      this.getList();
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '积分记录'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .capitalTop {
    width: 100%;
    height: 1.0933rem;
    position: fixed;
    top: 1.30667rem;
    background-color: @changeColor;
    font-size: 0;
    z-index: 10;
    div {
      width: 33.3%;
      display: inline-block;
      text-align: center;
      span {
        display: inline-block;
        height: 1.09333rem;
        line-height: 1.09333rem;
        width: 1.8667rem;
        color: @fcolor;
        font-size: @f28;
      }
      .active {
        color: @actColor;
        border-bottom: 4px solid @actColor;
      }
    }
  }

  .capitalContent {
    color: @fcolor;
    li {
      height: 1.44rem;
      border-bottom: 1px solid @ddd;
      padding: 0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

</style>
