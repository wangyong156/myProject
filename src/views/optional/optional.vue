<template>
  <div>
    <v-Content>
      <v-Navigter></v-Navigter>
      <div class="topTitle">
        <span class="left">
          股票名称
          &nbsp;<img src="../../assets/my zixuan_icon_edit.png" alt="">
        </span>
        <span class="middle">当前价</span>
        <span class="right">涨跌幅</span>
      </div>
      <div class="wrapList" v-for='(item,index) in list'>
        <div class="icon">
          {{item.code | codeTo2}}
        </div>
        <div class="details">
          <div class="user">
            <span>{{item.user}}</span>
            <br>
            <span class="tips">{{item.code}}</span>
          </div>
          <div class="products">
            <span>{{item.number}}</span>
          </div>
          <div class="profit" @click='toBuy(item)'>
            <span>{{item.buy}}</span>
          </div>
        </div>
      </div>
    </v-Content>
    <v-Footer></v-Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Content from '@/components/Content'
import Navigter from '@/components/Navigter'
import Tab from '@/components/indexTab/Tab'
export default {
  data() {
    return {
      list: [
        {
          user: '兴隆健康',
          code: 'SZ002105',
          number: '9000',
          time: '-0.10%',
          buy: '-0.10%'
        },
        {
          user: '兴隆健康',
          code: 'AZ002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '停牌'
        },
        {
          user: '兴隆健康',
          code: 'SH002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '+0.13%'
        },
        {
          user: '兴隆健康',
          code: 'SS002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '+0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        },
        {
          user: '兴隆健康',
          code: 'AA002105',
          number: '9000',
          time: '一小时前累计交易',
          buy: '-0.13%'
        }
      ]
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-Navigter': Navigter,
    'v-Tab': Tab
  },
  methods: {

  },
  mounted() {

  },
  beforeRouteEnter(to,from,next){
    document.querySelector('title').innerText='我的自选'
      next()
  },
  filters: {
    codeTo2(value) {
      return value.substring(0, 2)
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../less/config.less';
.topTitle {
  height: 1.09333rem;
  width: 100%;
  font-size: 0;
  border-bottom: 1px solid #1f232e;
  padding:0 @p30;
  span {
    width: 33.33%;
    text-align: center;
    display: inline-block;
    height: 1.09333rem;
    line-height: 1.09333rem;
    color: @fcolor;
    font-size: 0.37333rem;
    img{
      width: 0.42667rem;
      height:0.42667rem;
      vertical-align:text-bottom;
    }
  }
  .left{
    text-align: left;
  }
  .right{
    text-align: right;
  }
}

.wrapList {
  height: 1.6rem;
  color: @fcolor;
  font-size: 0.37333rem;
  padding: 0 @p30;
  border-bottom: 1px solid #1f232e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 0.37333rem;
    height: 0.37333rem;
    line-height: 1.6;
    background-color: #ff335b;
    border-radius: 4px;
    font-size: 0.24rem;
    text-align: center
  }
  img {
    width: 0.64rem;
    height: 0.73333rem;
  }
  .details {
    position: relative;
    height: 1.6rem;
    width: 8.42267rem;
    margin-left: 0.26667rem;
    div {
      position: absolute;
      line-height: 1.5;
    }
    .user {
      top: 0.3rem;
      left: 0;
    }
    .products {
      top: 0.45rem;
      left: 3.2rem;
      text-align: center;
    }
    .profit {
      top: 0.45rem;
      right: 0;
      width: 2.5rem;
      color: @actColor;
      width: 1.86667rem;
      height: 0.58667rem;
      text-align: right;
    }
    .tips {
      color: @Color;
      font-size: 0.32rem;
    }
  }
}
</style>

