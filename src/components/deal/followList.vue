<template>
  <div class="settlement">
    <div class="tc" v-show=" Length == false">
      <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
      <p class="black9 mt40 f28">暂无记录</p>
    </div>

    <mt-loadmore :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :autoFill="false">
      <ul>
        <div v-show="lists.length != 0" class="pershares" v-for="item in lists">
          <p class="title">
          <span class="img-ct">
           <img :src="userImgFn(item.u.avatarUrl)"/>
        </span>
            <span class="user-name">{{item.u.userName}}</span>
            <span class="moreA" @click="toRecode(item.userId)">查看战绩</span></p>

          <tr class="content">
            <td class="item">
              <p class="num">{{item.orderNum}}</p>
              <p class="lable">下单笔量</p>
            </td>
            <td class="item">
              <p  class="num" :class="item.totalProfitPoint<0?'down':'up'">{{item.totalProfitPoint}}</p>
              <p class="lable">盈亏点数</p>
            </td>
            <td class="item">
              <p class="num" :class="item.averageProfit<0?'down':'up'">{{item.averageProfit.toFixed(2)}}</p>
              <div class="lable">
                <p class="sm-title">平均每单盈亏</p>
                <p>金额(元)</p>
              </div>
            </td>
          </tr>
          <!--<p class="tips">-->
          <!--当前账户余额为{{item.targetProfit}}元，跟单预计占用资金{{item.presentPrice}}元，为了确保你的策略能够成功执行，-->
          <!--请注意保持余额充足！-->
          <!--</p>-->
          <div class="footer clearfix">
            <div class="present-tips">当前跟单<span class="num">{{item.followNum}}</span>人</div>
            <div class="btn-list clearfix">
              <div class="btn btn-base" @click="toOrder(item.userId)">立即跟单</div>
              <!--<div class="btn btn-base2">取消订单</div>-->
            </div>
          </div>
        </div>
      </ul>
    </mt-loadmore>

  </div>
</template>

<script>
  import {toast} from '@/util/index'
  import home from '../../api/home/index'
  import {Loadmore} from 'mint-ui'
  import FundArrowList from '@/components/FundArrowList'

  export default {
    data() {
      return {
        star: 1,
        currentSize: 0,
        total: '',
        allLoaded: false,
        bottomText: '上拉加载更多...',
        scrollMode: "touch",  // iphone或安卓机存在问题

        Length: true,  //判断显示无数据图标
        imgUrl:this.GLOBAL.imgUrl,
        flag: -1,
        lists: [
         /* {
          averageProfit: 500.5,
          followNum : 8,
          orderNum : 2,
          totalProfitPoint:99,
          u :{
            avatarUrl:"",
            userName:"13****40"
          }
        }*/
        ],
      }
    },

    components: {
      'v-FundArrowList': FundArrowList,
      'mt-loadmore': Loadmore
    },
    methods: {
      //头像显示输出
      userImgFn(img){
        if(img == ''){
          return require("../../img/account_avator_default@2x.png");
        }else{
          return this.imgUrl + img;
        }
      },
      toRecode: function (userId) {
        let sendData = {
          userId: userId
        }
        this.$router.push({
          path: '/orderRecode', query: {
            userId: userId
          }
        })
      },
      toOrder: function (userId) {
        let sendData = {
          userId: userId
        }
        this.$router.push({
          path: '/trackingCheck', query: {
            userId: userId
          }
        })
      },
      todetals() {
        if (this.flag == index) {
          this.flag = -1
        } else {
          this.flag = index
        }
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      getList() {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          rows: 5,
          sort: '',
          order: '',
          star: this.star
        }
        //请求期货列表

        home.getFollowList(senddata).then((res) => {

          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            if(res.data.data.rows.length ==  0){

              this.Length = false;
            }

            var list = res.data.data.rows;
            this.lists = this.lists.concat(list);
            this.total = res.data.data.totalPage;
            if(this.lists.length == 0){

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
    mounted() {
      this.getList()
    },
    filters: {

    },
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';
   .up{
     color: @red !important;
   }
   .down{
     color: @green !important;
   }
  .user-name{
    display: inline-block;
    max-width: 3.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .settlement{
    width: 100%;
    height: auto;
    overflow: auto;
    background-color: #f5f5f5;
    -webkit-overflow-scrolling: touch;
    color: #ffffff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  .pershares {
      .img-ct {
        margin-top: .12rem;
        margin-right: @p30;
        float: left;
        width: .85rem;
        height: .85rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    padding: 0 @p30;
    background: @FFF;
    margin-top: @marginbm;
    color: @nine;
    font-size: @f24;
    .title {
      color: @newColor;
      font-size: @f28;
      height: 1.17333rem;
      line-height: 1.17333rem;
      border-bottom: 1px solid @ddd;
      .author {
        color: @actColor;
      }
      .moreA {
        color: @actColor;
        float: right;
      }
    }
    .info-item {

      margin-top: @marginbm;
      .label {
        margin-right: 0.8rem;
      }
    }
    .tips {
      border-bottom: 1px solid @fColor;
      padding: @marginbm 0;
    }
    .btn-list {
      /*display: inline-block;*/
      text-align: right;
      height: 1.17333rem;
      /*line-height: 1.17333rem;*/
    }
    .btn {
      font-size: @f24;
      color: @zero;
      display: inline-block;
      width: 1.8rem;
      text-align: center;
      height: .64rem;
      line-height: .64rem;
      border-radius: 0.08rem;
    }
    .btn-base {
      background-color: #ffdd25;
    }
    .btn-base2 {
      color: @actColor;
      border: 2px solid @actColor;
    }
    .content {
      display: flex;
      border-bottom: 1px solid @fColor;
      .item {
        flex: 1;
        text-align: center;
        height: 2.35rem;
        .num {
          padding-top: @p30;
          padding-bottom: @p30;
          color: @titleColor;
          font-size: @f32;
        }
        .label {
          color: #ccc;
          font-size: @f24;
        }
        .sm-title {
          margin-bottom: .15rem;
        }
      }
    }
    .footer {

      width: 100%;
      height: 1.17rem;
      line-height: 1.17rem;
    }
    .present-tips {
      display: inline-block;
      float: left;
      font-size: @f24;
      .num {
        color: @actColor;
      }
    }

  }

  .clearfix:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
</style>
