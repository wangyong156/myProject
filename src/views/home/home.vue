<template>
    <div>


        <div class="header">
            <img @click="toService" src="../../img/newImg/nav_icon_kf.png"/>
            <span class="f36">首页</span>
            <img @click="toSimulation" src="../../img/newImg/nav_icon_help.png"/>
        </div>

        <div class="brower-dialog" v-show="isWx" @click="isWx=false">
            <img class="brower-tips"  src="../../img/tips_share_andriod.png" >
        </div>
        <v-Content>
            <v-Download @myEvent ='getIsBrowser'></v-Download>

            <!--     <v-Swiper swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
                   <a :href="top.linkUrl" v-for="top in tops" class="swiper-slide" slot="swiper-con">
                     <img :src="imgUrl + top.picPath">
                   </a>
                 </v-Swiper>-->
            <mt-swipe :auto="4000" class="mint-swipe">
                <mt-swipe-item v-for="item in tops" :key="item.id">
                    <a :href="item.linkUrl || 'javascript:;'">
                        <img :src="imgUrl + item.picPath" alt="">
                    </a>
                </mt-swipe-item>
            </mt-swipe>

            <ul class="icon-menu">
                <!--<li @click="toOrder">
                    <p class="icon">
                        <img src="../../img/home_icon_gd@2x.png"/>
                    </p>
                    <p class="title">跟单</p>
                    <p class="info">查看我的跟单</p>
                </li>-->
                <li @click="toSimulate" style="border-right:1px dashed #eaeaea;">
                    <p class="icon">
                        <img src="../../img/home_icon_mnjy@2x.png"/>
                    </p>
                    <p class="title">模拟交易专区</p>
                    <p class="info">成就高手之路</p>
                </li>
                <li @click="toEntertainment">
                    <p class="icon">
                        <img src="../../img/home_icon_ylzq@2x.png"/>
                    </p>
                    <p class="title">娱乐专区</p>
                    <p class="info">签到领积分</p>
                </li>
            </ul>
            <!--<v-Tab></v-Tab>-->
            <ul class="kind-list" v-if="outlist.length>0">
                <p class="title">国际期货</p>
                <li class="item" v-for="item in outlist" @click="toFirmOffer(item.id)">
                    <img  class="icon-title" :src=" imgUrl + item.icon"/>
                    <div class="info">
                        <p class="lable" >{{item.name}}</p>
                        <p class="lable-sm">{{item.decription}}</p>
                    </div>
                    <div class="num">
                        <p :class='color(toDaymoneyArr2[item.id])' class="money red"> {{toDaymoneyArr[item.id],item.code,toDaymoneyArr2[item.id] | setMoney}}</p>
                        <p :class='color(toDaymoneyArr2[item.id])' class="percent red">{{toDaymoneyArr2[item.id] | setPercent }}</p>
                    </div>
                    <img class="icon-right" src="../../img/arrow_right@2x.png"/>
                </li>
                <!--<li class="item">
                          <img  class="icon-title" src="../../img/home_icon_CL@2x.png"/>
                          <div class="info">
                            <p class="lable">美黄金</p>
                            <p class="lable-sm">国际黄金，全球避险产品</p>
                          </div>
                          <div class="num">
                            <p class="money">100</p>
                            <p class="percent">+20%</p>
                          </div>
                          <img class="icon-right" src="../../img/arrow_right@2x.png"/>
                </li>-->
            </ul>
            <ul class="kind-list" v-if="inlist.length>0">
                <p class="title">国内期货</p>
                <li class="item" v-for="item in inlist" @click="toFirmOffer(item.id)">
                    <img  class="icon-title" :src=" imgUrl + item.icon"/>
                    <div class="info">
                        <p class="lable" >{{item.name}}</p>
                        <p class="lable-sm">{{item.decription}}</p>
                    </div>
                    <div class="num">
                        <p :class='color(toDaymoneyArr2[item.id])' class="money red"> {{toDaymoneyArr[item.id],item.code,toDaymoneyArr2[item.id] | setMoney}}</p>
                        <p :class='color(toDaymoneyArr2[item.id])' class="percent red">{{toDaymoneyArr2[item.id] | setPercent }}</p>
                    </div>
                    <img class="icon-right" src="../../img/arrow_right@2x.png"/>
                </li>
            </ul>
            <div class="footer-about">
                <div class="tips-phpne" >
                    客服电话:<a class="phone"  href="tel:057185857825">0571-85857825</a>
                </div>
                <div class="tips-phpne" >
                    客服QQ:<a class="phone">1823267007</a>
                </div>
                <p> 交易由CME交易所及港交所实盘对接</p>
                <p>合作伙伴: 纽约商业交易所丨芝加哥商品交易所丨港交所</p>
            </div>


        </v-Content>
        <v-Footer></v-Footer>
    </div>
</template>

<script>
    import { toast } from '@/util/index'
    import Footer from '@/components/Footer'
    import Content from '@/components/Content'
    import Download from '@/components/Download'
    // import Swiper from '@/components/swiper/Swiper.vue'
    import Navigter from '@/components/Navigter'
    import BuyA from '@/components/BuyA'
    import Tab from '@/components/indexTab/Tab'
    import home from '@/api/home/index'
    import { Swipe, SwipeItem } from 'mint-ui';

    export default {
        data() {
            return {
                isWx:false,
                imgUrl: this.GLOBAL.imgUrl,
                toDaymoneyArr:[],
                toDaymoneyArr2 : [],
                imgSrc:require('../../img/home_icon_CL@2x.png'),
                swiper: '',
                tops: [
                ],
                futuresList:[],
                outlist:[],
                inlist:[],
                tabs: [],
                chartOptes :{
                    sline: {},
                    kline: {},
                    tline: {}
                },
            }
        },
        components: {
            'v-Download':Download,
            'v-Content': Content,
            'v-Footer': Footer,
            //'v-Swiper': Swiper,
            'v-Navigter': Navigter,
            'v-BuyA':BuyA,
            'v-Tab':Tab,
            'mt-swipe':Swipe,
            'mt-swipe-item':SwipeItem
        },
        methods: {
            getIsBrowser(isBrowser){
                console.log('是否' + isBrowser);
                this.isWx = isBrowser;
            },
            toFirmOffer(id){
                this.$router.push({path:'/firmOffer',query:{
                    id:id,
                    type:1
                }});
            },
            toService(){
                this.$router.push({path:'/beforeService'});
            },
            toSimulation(){
                this.$router.push({path:'/guidance'});
            },
            toOrder:function() {
                this.$router.push({path: '/FollowOderTab2'})
            },
            /*模拟交易*/
            toSimulate(){
                this.$router.push({path: '/firmOffer',query:{id:1,type:0}})
            },
            toEntertainment(){
                this.$router.push({path: '/toEntertainment'})
            },
            color(val){
                if(val>=0){
                    return 'red';
                }else{
                    return 'green';
                }
            }
        },

        beforeUpdate(){

        },
        filters:{
            setPercent(val){
                if(val == undefined){
                    return '暂无数据'
                }else if(val>=0){
                    return '+' +   val.toFixed(2) +'%';
                }else{
                    return val.toFixed(2) + '%';
                }
            },
                setMoney(val,code,type){
                if(val == undefined){
                    return '--'
                }else if(val>=0 && type >=0){
                    return  +  val;
                }else{
                    return  + val;
                }
            },


        },
        beforeRouteEnter(to,from,next){
            document.querySelector('title').innerText='首页'
            next()
        },
        beforeRouteLeave(to,form,next){
            clearInterval(window.itemClock);
            next();
        },

        mounted() {

            let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId")
            }


            home.getFutures(senddata).then((res) => {
                if (res.data.code == 200) {
                    window.localStorage.setItem("token", res.data.hid);
                    this.outlist = res.data.data.outlist;
                    this.inlist = res.data.data.inlist;
                    this.tabs = this.outlist.concat(this.inlist);
                    let obj={}, objs={},objk={},objt={};
                    let that = this;
                    for(let  i = 0;i<that.tabs.length;i++){
                        let index;
                        if(that.tabs[i].wavePointMin .toString().split(".")[1] != undefined){
                            index = that.tabs[i].wavePointMin .toString().split(".")[1].length;
                        }else{
                            index = 0;
                        }
                        objs[that.tabs[i].code] = {
                            wrap: "sline-wrap-chart",
                            scale: index
                        };
                        objk[that.tabs[i].code] = {
                            wrap: "kline-wrap-chart",
                            scale: index
                        };
                        objt[that.tabs[i].code] = {
                            wrap: "tline-wrap-chart",
                            unit: that.tabs[i].wavePointMin,
                            multiple: 2
                        };
                        obj[that.tabs[i].code] = that.tabs[i].name;
                    }
                    that.chartOptes.commodityTitles = obj;
                    that.chartOptes.sline = objs;
                    that.chartOptes.kline = objk;
                    that.chartOptes.tline = objt;
                    that.chartOptes.tabs = that.tabs;
                    localStorage.setItem('chartOptes',JSON.stringify(that.chartOptes));
                }else {
                    toast(data.data.message)
                }
            })

            //请求期货列表
            var self = this;
            getAllSimpleQuotation();
            function getAllSimpleQuotation() {
                home.getAllSimpleQuotation(senddata).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);

                        var dataArr=[],dataArr2=[];
                        $.map(res.data.data,function(value,key) {
                            let sp = JSON.parse(value);
                            dataArr[key] = sp.np;
                            dataArr2[key] = sp.rf;
                        });

                        self.toDaymoneyArr = dataArr;
                        self.toDaymoneyArr2 = dataArr2;
                    }else {
                        toast(data.data.message)
                    }
                });
            }

            window.itemClock = setInterval(function () {
                getAllSimpleQuotation();
            },500);

            home.getBanner(senddata).then((res) => {
                if (res.data.code == 200) {
                    window.localStorage.setItem("token", res.data.hid);
                    this.tops=res.data.data;
                }else {
                    toast(res.data.message)
                }
            })


        },

    }
</script>

<style lang='less' scoped>
    .red{
        color: @titleColor !important;
    }
    .green{
        color: @green !important;
    }
    @import '../../less/config.less';
    /* .swiper-slide img{
       width: 100%;
       height: 3.2rem;
     }*/
    .mint-swipe{
        color: white;
        height: 3.2rem;
        img{
            font-size: 100px;
            width: 100%;
            height:100%;
        }
    }
    .icon-menu{
        display: flex;
        text-align: center;
        background: @FFF;
        padding-top:.37rem;;
        padding-bottom: .37rem;
        li{
            flex:1;
            /*border-right: 1px solid @fColor;*/
            img{

                margin-bottom: .2rem;
                width: 1.05rem;
            }
            .title{
                font-size: @f28;
                margin-bottom: .2rem;
                color: @newColor;
            }
            .info{
                color: @nine;
                font-size: @f24;
            }
        }
        li:last-child{
            border-right: none;
        }
    }
    .kind-list{
        margin-top: .27rem;
        color: @newColor;
        background: @FFF;
        .title{
            font-size: @f26;
            margin-left: .8rem;
            height:.72rem;
            line-height: .72rem;
            position: relative;
        }
        .title:after{
            content: '';
            display: block;
            position: absolute;
            left: -.3rem;
            top:.18rem;
            width: 2px;
            height:50%;
            background: #f8cc00;

        }
        li:after{
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: .4rem;
            height: 1px;
            width: 100%;
            background: @fColor;
            transform: scaleY(0.5);
        }
        li:last-child:after{
            content: '';
            display: block;
            height: 0;
        }
        li{
            display: flex;
            position: relative;
            padding: 0 @p30;
            padding-top: @p30;
            overflow: hidden;

            /*height:1.6rem;*/
            //border-bottom: 1px solid @fColor;

            .icon-title{
                width: .85rem;
                height: .85rem;
                margin-right: .27rem;
                margin-bottom: @p30;
                margin-top: .08rem;
            }
            .info{
                flex: 1;
                .lable{
                    font-size: @f28;
                    margin-bottom: .13rem;
                    color:@newColor;
                }
                .lable-sm{
                    font-size: @f24;
                    color: @nine;
                }
            }
            .num{
                font-size: @f28;
                width:3rem;
                text-align: right;
                margin-right: .5rem;
                color: @titleColor;
                .money{
                    margin-bottom: .14rem;
                }
            }
        }
        .icon-right{
            position: absolute;
            right: .3rem;
            top: .7rem;
            width: .4rem;
        }

    }
    .footer-about{
        text-align: center;
        color: @nine;
        padding: .52rem 0 .3rem 0;
        .tips-phpne{
            background: #f4f4f4;
            text-align: center;
            font-size: .32rem;
            padding-bottom: .2rem;
            .phone{
                color: @actColor;
                text-decoration: none;
            }
        }
        p{
            line-height: 1.32;
        }
    }

    .accountMoney {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        margin-top: 1rem;
    }
    .accountButtons {
        margin-top: 1.2rem;
        span {
            width: 3.2rem;
            height: 1.06667rem;
            line-height: 1.06667rem;
            text-align: center;
            background-color: @FFF;
            border: solid 0.02667rem @actColor;
            border-radius: 0.08rem;
            color: @actColor;
        }
    }
    .header img{
        width: .45rem;
        height: .45rem;
    }
    .brower-dialog{
        position: fixed;
        z-index: 10000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        text-align: right;
        img{
            width: 7.15rem;
            margin-top: .3rem;
            margin-right: 1.2rem;

        }
    }
</style>

