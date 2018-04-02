<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>推广赚钱</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="topTitle">
        <div v-for='(item,index) in tabs' @click='toActive(index)'>
          <span :class="{'active':falg==index}">{{item.name}}</span>
        </div>
      </div>
      <div class="invte" v-show="falg==0">
        <v-Commission :item='commission'></v-Commission>
        <v-Recommend :item='recommend'></v-Recommend>
        <v-Level></v-Level>
      </div>
      <div class="tc" v-show="inviteList.length == 0 && falg != 0">
        <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
        <p class="black9 mt40 f28">暂无记录</p>
      </div>
      <div class="myUnderling" v-show="inviteList.length != 0 && falg != 0">
        <table>
          <tr>
            <th>
              用户名
            </th>
            <th>
              交易手数
            </th>
            <th>
              注册时间
            </th>
          </tr>
          <tr v-for="v in inviteList">
            <td class="name">
              {{v.userName}}
            </td>
            <td class="num">
              {{v.tradeNum}}
            </td>
            <td class="time">
              {{v.createTime.substring(0, 10)}}
            </td>
          </tr>
        </table>
      </div>
    </v-ContentHead>
  </div>
</template>
<script>
  import ContentHead from '@/components/ContentHead'
  import Footer from '@/components/Footer'
  import Commission from '@/components/find/commission2'
  import Recommend from '@/components/find/recommend'
  import Channel from '@/components/find/channel'
  import Level from '@/components/find/level'
  import ExtendList from '@/components/find/extendList'
  import home from '@/api/home/index'
  import {toast} from '@/util/index'

  export default {
    data() {
      return {
        falg: 0,
        tabs: [
          {name: '推广赚钱'},
          {name: '我的下线'}
        ],
        commission: {
          money: "0",
          scale: "0.00%",
          people: "0",
          rewardScale: 0
        },
        recommend: {
          times: "0",
          tolink: "",
          src: require('../../assets/QRcode.png'),
        },
        inviteList: [],
        extendList: []

      }

    },
    components: {
      'v-Footer': Footer,
      'v-ContentHead': ContentHead,
      'v-Commission': Commission,
      'v-Recommend': Recommend,
      'v-Channel': Channel,
      'v-ExtendList': ExtendList,
      'v-Level': Level
    },
    methods: {
      toActive(index) {
        this.falg = index
      },
      back() {
        this.$router.back(-1)
      }
    },


    beforeRouteEnter(to, from, next) {
      document.querySelector('title').innerText = '推广赚钱'
      next()
    },
    mounted() {
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      /*我的下线*/
      home.getMyInviteList(senddata).then((res) => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          this.inviteList = res.data.data;
        } else if (res.data.code == 401) {
          toast(res.data.message);
          var that = this;
          setTimeout(function () {
            that.$router.push({path: '/login'})
          }, 1000);
        } else {
          toast(res.data.message)
        }
      }),
        /*用户邀请链接*/
        home.getInviteUrl(senddata).then((res) => {
          if (res.data.code == 200) {
              window.localStorage.setItem("token", res.data.hid);
            this.recommend.tolink = res.data.data.popularizeUrl;
            this.commission = {
              reward: res.data.data.reward,
              tradeNum: res.data.data.tradeNum,
              rewardScale: res.data.data.rewardScale,
              inviteNum: res.data.data.inviteNum,
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
  };
</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .topTitle {
    line-height: 1.09333rem;
    width: 100%;
    font-size: 0;
    background-color: @FFF;
    margin-bottom: 0.2667rem;

    height: 1.0933rem;
    z-index: 10;
    div {
      width: 50%;
      display: inline-block;
      text-align: center;
      span {
        display: inline-block;
        width: 1.6rem;
        height: 1.09333rem;
        line-height: 1.09333rem;
        color: @newColor;
        font-size: 0.37333rem;
      }
      .active {
        color: @actColor;
        border-bottom: 2px solid @actColor;
      }
    }
  }

  .myUnderling {
    margin: 0 0 @p30 0;
    table {
      width: 100%;
      background: @FFF;
    }
    color: #fff;
    table th {
      text-align: center;
      line-height: 1.17rem;
      padding: 0 @p30;
      border-bottom: 1px solid @ddd;
      color: @nine;
      font-size: @f28;
    }
    table td {
      color: @newColor;
      width: 33%;
      text-align: center;
      line-height: 1.17rem;
      padding: 0 @p30;
      border-bottom: 1px solid @ddd;
      font-size: @f28;
    }
    table .name, .name {
      width: 30%;
    }
    table .time {
      width: 40%;
    }
  }
</style>


