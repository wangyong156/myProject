<template>
    <div class="footerColor">
        <footer>
            <router-link @click='test' v-for="item in list" :to="item.path" :key="item.index" exact>
                <span>
                    <img :src="item.path==$route.path?item.src:item.unsrc" alt="">
                </span>
                <p>{{item.title}}</p>
            </router-link>
        </footer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    title: '首页',
                    path: '/home',
                    src: require('../img/tabbar/tab_home_s@2x.png'),
                    unsrc: require('../img/tabbar/tab_home_n@2x.png')
                },
                {
                    title: '资讯',
                    path: '/news',
                    src: require('../img/tabbar/tab_news_s@2x.png'),
                    unsrc: require('../img/tabbar/tab_news_n@2x.png')
                },
                {
                    title: '交易',
                    path: '/firmOffer?id=1&type=1',
                    src: require('../img/newImg/tab_trade_s@2x.png'),
                    unsrc: require('../img/newImg/tab_trade_n@2x.png')
                },
                {
                    title: '发现',
                    path: '/find',
                    src: require('../img/tabbar/tab_found_s@2x.png'),
                    unsrc: require('../img/tabbar/tab_found_n@2x.png')
                },
                {
                    title: '我的',
                    path: '/my',
                    src: require('../img/tabbar/tab_mine_s@2x.png'),
                    unsrc: require('../img/tabbar/tab_mine_n@2x.png')
                }
            ]
        }
    },
    methods:{
        test(){
            alert(1111)
        }
    }
}
</script>

<style lang="less" scoped>
@actColor: #f8cc00;
@Color: #56627c;
@fsize: 0.2667rem;
@hwrap: 1.30667rem;
@huiColor:#999;
@changeColor:#FFF;
div,
footer {
    width: 100%;
    height: @hwrap;
    position: fixed;
    bottom: 0;
    font-size: @fsize;
    display: flex;
    background-color: @changeColor;
    z-index:3339;
    span {
        display: block;
        text-align: center;
        img{
          width: 0.586rem;
        }
    }
    p{
        text-align: center;
        /*color:@huiColor;*/
    }
    a {
        width: 20%;
        color: @Color;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    a:nth-child(3){
      span{
        img{
          position: absolute;
          left:50%;
          top:-0.24rem;
          width:0.96rem;
          height:0.96rem;
          margin-left:-0.48rem;
          z-index:123;
        }
      }
      p{
        margin-top:0.7rem;
      }
    }
    .router-link-active {
        color: @actColor;
    }
}
</style>
