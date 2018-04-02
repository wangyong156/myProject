<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>资金流水</span>
      <span class="img"></span>
    </div>
    <div class="capitalTop topTitle">
      <div v-for="(item,index) in tabs" @click="toActive(index)">
        <span :class="{'active':flag == index}">{{item.name}}</span>
      </div>
    </div>
    <div class="tc" v-show="show == 1">
      <img style="margin-top: 4.5rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
      <p class="black9 mt40 f28">您还没有资金记录</p>
    </div>
    <div class="mainback capitalContent" v-show="fundList.length != 0">

        <mt-loadmore :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                     :autoFill="false">
          <ul>
          <li v-for="(item,index) in fundList">
            <div>
              <p class="f32 black3">{{item.typeFormatter}}</p>
              <p class="black9 mt15">{{item.createTime}}</p>
            </div>
            <div class="tr">
              <p class="f30" :class="color(item.direction)">{{item.direction | direction}}{{item.amount.toFixed(2)}}</p>
              <p class="black9 mt15">余额 {{item.available.toFixed(2)}}</p>
            </div>
          </li>
          </ul>
        </mt-loadmore>

    </div>
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
        show:0,
        flag: 0,
        tabs: [{name: '全部'}, {name: '充值'}, {name: '提现'}],
        fundList: "",
        star: 1,
        currentSize: 0,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode:"touch"   // iphone或安卓机存在问题
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
        if (val == 1) {
          return "-"
        } else if (val == 2) {
          return "+"
        }
      }
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      color(val) {
        if (val == 1) {
          return "green";
        } else if (val == 2) {
          return "red";
        }
      },
      toActive(index) {
        this.flag = index;
        this.fundList = [];
        this.show = 0;
        this.total = '';
        this.star = 1;       //切换类目时将当前页还原为
        this.allLoaded = false;
        this.getList();
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      getList() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          type: this.flag,
          rows: 10,
          sort: '',
          order: '',
          star: this.star
        }

        my.getFundList(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            var list = res.data.data.rows;
            this.fundList = this.fundList.concat(list);
            this.total = res.data.data.totalPage;
            if(this.fundList.length == 0){
              this.show = 1;
            }
            if (this.star == this.total) {
              this.allLoaded = true;
              this.$refs.loadmore.onBottomLoaded();
            }else{
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
      'mt-loadmore':Loadmore,
      'v-ContentHead': ContentHead
    },
    mounted() {
      this.toActive(0);
    },
    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '资金流水'
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .capitalTop {
    width: 100%;
    height: 1.0933rem;
    background-color: @FFF;
    font-size: 0;
    z-index: 10;
    position:fixed;
    top:1.30667rem;

    div {
      width: 33.3%;
      display: inline-block;
      text-align: center;
      span {
        display: inline-block;
        height: 1.09333rem;
        line-height: 1.09333rem;
        width: 1.8667rem;
        color: @newColor;
        font-size: @f28;
      }
      .active {
        color: @actColor;
        border-bottom: 2px solid @actColor;
      }
    }
  }

  .capitalContent {
    color: @fcolor;
    top: 2.65rem;
    left:0;
    right:0;
    bottom:0;
    position: absolute;
    overflow: auto;
    li {
      height: 1.44rem;
      padding: 0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    li:after{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;     
      height: 1px;
      width: 100%;
      background: #ddd;
    }
    li:last-child:after{
      content: '';
      display: block;
      height: 0;
    }
  }
  .topTitle {
    div{
      position: relative;
    }
    div:after{
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 1px;
      transform: scaleY(.4);
      background: #eee;
    }
    div:last-child:after{
      content: '';
      display: none;
    }
  }

</style>
