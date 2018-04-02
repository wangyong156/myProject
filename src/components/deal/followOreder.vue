<template>
  <div class="settlement">
    <div class="ct">
      <div class="tc"   v-show=" !Length">
        <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
        <p class="black9 mt40 f28">暂无记录</p>
      </div>

      <mt-loadmore :bottom-method="getList" :bottom-all-loaded="allLoaded" ref="loadmore"
                   :autoFill="false">
        <ul>
          <div v-show="lists.length != 0" class="pershares" v-for="(item,index) in lists">
            <p class="title">我正在跟<span class="author">【{{item.fu.userName}}】</span>的交易策略！ </p>
            <p class="info-item">
          <span class="label">
            开始跟单时间
          </span>
              <span>
            {{item.createTime}}
          </span>
            </p>
            <p class="info-item">
            <span class="label">
              我的跟单手数
            </span>
              <span>
                {{item.number}}手
            </span>
            </p>
            <p class="tips">
              当前账户余额为  <span class="red">{{item.account.available}}</span> 元，跟单预计占用资金<span
              class="red"> {{item.needAmount}} </span>元，为了确保你的策略能够成功执行，
              请注意保持余额充足！
            </p>
            <div class="btn-list clearfix">
              <div @click="toRecharge" class="btn btn-base">充值</div>
              <div class="btn btn-base2" @click="resetOrder(item.followId,index)">取消订单</div>
            </div>
          </div>
        </ul>
      </mt-loadmore>
    </div>


    <div v-show="lists.length != 0" class="footer-btn" @click="toMyOrder">
      查看我的跟单持仓
    </div>
  </div>

</template>

<script>
  import home from '../../api/home/index'
  import {toast} from '@/util/index'
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

        Length:true,
        flag: -1,
        lists: [
          /*{
            fu:{
              userName:'123',
            },
            account:{
              available:1000,
            },
            title: '中过平安',
            code: 'SH456133',
            updownNumber: '+80',
            buyPrices: '23506',
            targetProfit: '13215',
            presentPrice: '23065',
            stopPrice: '-1325',
            msg: '成功'
          },*/
        ],
      }
    },
    components: {
      'v-FundArrowList': FundArrowList,
      'mt-loadmore': Loadmore
    },
    methods: {
      toRecharge() {
        this.$router.push({path: '/toRecharge'})
      },
      toMyOrder() {
        this.$router.push({path: '/trade_fl'})
      },
      todetals(index) {
        if (this.flag == index) {
          this.flag = -1
        } else {
          this.flag = index
        }
      },
      resetOrder(id, index) {
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          followId: id
        }

        //取消订单
        home.ResetFollowOrder(senddata).then((res) => {
          if (res.data.code == 200) {
            this.lists.splice(index, 1);
            if( this.lists.length == 0){
                this.Length = false;
            }
            toast('取消成功');
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
      },
      //获取订单列表
      getList(){
        let senddata = {
          HUIMI_SESSIONID: window.localStorage.getItem("token"),
          HUIMI_USERID: window.localStorage.getItem("userId"),
          rows: 3,
          sort: '',
          order: '',
          star: this.star
        }

        home.getMyFollowOrder(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);


            var list = res.data.data.rows;
            this.lists = this.lists.concat(list);
              if(list ==  0){
                  this.Length = false;
              }else{
                  this.Length = true;
              }
            this.total = res.data.data.totalPage;

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
    }
  }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  .ct {
    margin-bottom: 1.6rem;
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
  .pershares {
    padding: 0 @p30;
    margin-top: @marginbm;
    color: @newColor;
    font-size: @f24;
    background: @FFF;
    .title {
      color: @newColor;
      font-size: @f28;
      height: 1.17333rem;
      line-height: 1.17333rem;
      border-bottom: 1px solid @fColor;
      .author {
        vertical-align: middle;
        color: @actColor;
        display: inline-block;
        max-width: 3.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .info-item {
      margin-top: @marginbm;
      color:@nine;
      .label {
        margin-right: 0.8rem;
      }
    }
    .tips {
      border-bottom: 1px solid @fColor;
      padding: @marginbm 0;
      color:@six;
    }
    .btn-list {
      text-align: right;
      height: 1.17333rem;
      line-height: 1.17333rem;
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
      background-color: @actColor;
      border: 1px solid @actColor;

    }
    .btn-base2 {
      color: @actColor;
      border: 1px solid @actColor;
    }
  }

  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: @actColor;
    font-size: @f32;
    color: @zero;
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;

  }
</style>
