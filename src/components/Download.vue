<template>
    <div class="download" v-show="isDownload">
        <div class="logo-ct">
            <img :src="downloadIcon" alt="">
            <div class="info">
                <h2 class="title">{{appName}}</h2>
                <p>交易就这么简单</p>
            </div>
        </div>
        <div class="down-ct">
            <div class="down-btn" @click="goDownload">
                立即下载
            </div>
        </div>
        <img @click="clonseDown" src="../img/download_close.png"  class="clonse-download">

    </div>
</template>

<script>
    export default {
        data(){
            return {
                isDownload:true,
                toBrower:false,
                appName:'',
                android_tzb:'',
                android_jyz:'',
                apple_tzb:'',
                apple_jyz:'',
                downloadIcon:'',
                icon_jyz:require('../img/download_icon.png'),
                icon_tzb:require('../img/download_icon_tzb.png'),
        }

        },
        props: {
            item: {}
        },
        methods: {
            getName(){
                var url  = location.href;
                if(url.indexOf('tzb')>0){
                    this.appName = '期货投资宝';
                    this.downloadIcon = this.icon_tzb;
                }else if(url.indexOf('jyz')>0){
                    this.appName = '期货加油站'
                    this.downloadIcon = this.icon_jyz;

                }

            },
            clonseDown(){
                this.isDownload = false
            },
            goDownload(){
                //终端检测跳转
                let downUrl;
                function isAndroid_ios(){
                    var u = navigator.userAgent, app = navigator.appVersion;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    return isAndroid==true?true:false;
                }


                if(!isAndroid_ios()){
                    if(this.appName == '期货加油站'){
                        //console.log('期货加油站');
                        downUrl = 'https://itunes.apple.com/cn/app/%E6%9C%9F%E8%B4%A7%E5%8A%A0%E6%B2%B9%E7%AB%99-%E4%B8%BA%E6%82%A8%E7%9A%84%E6%9C%9F%E8%B4%A7%E4%BA%A4%E6%98%93%E5%8A%A0%E6%B2%B9/id1339137065?mt=8';
                        window.location.href = downUrl;
                    }else if(this.appName == '期货投资宝'){
                        console.log('期货投资宝');
                        downUrl = 'https://itunes.apple.com/cn/app/期货投资宝-原油黄金外盘期货开户软件/id1335547388?mt=8';
                        window.location.href = downUrl;
                    }

                }else{
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        this.toBrower = true;
                        this.$emit('myEvent',this.toBrower);
                        return false;
                    }else{
                        if(this.appName == '期货加油站'){
                          //  console.log('期货加油站');
                            downUrl = 'http://bket001.oss-cn-beijing.aliyuncs.com/app/qhjyz1-29-1.apk'
                            window.location.href = downUrl;
                        }else if(this.appName == '期货投资宝'){
                            console.log('期货投资宝');
                            downUrl = 'http://bket001.oss-cn-beijing.aliyuncs.com/app/touzibao-release.apk'
                            window.location.href = downUrl;
                        }

                    }
                }


            },
        },
        mounted(){
            this.getName();
            let isApp = window.localStorage.getItem('isApp');
             if(this.$route.query.app == 1 || isApp == 1){
                window.localStorage.setItem('isApp',1);
                 this.isDownload = false;
             }else{
               this.isDownload = true;
             }



        }
    }

</script>
<style lang="less" scoped>
    @import '../less/config.less';
    .download{
        position: relative;
        height: 1.5rem;
        background: #fff;
        z-index: 300;
        .clonse-download{
            position: absolute;
            right: 0;
            top: 0;
            width: .58rem;
        }
    }
    .logo-ct{
        float: left;
        margin-left:.5rem;
        padding-top: .33rem;
        width: 40%;
        img{
            width: .8rem;
            margin-right: .26rem;
            float: left;
        }
        .title{
            color: #333;
            font-size: @f26;
            font-weight: bold;
            margin-bottom: .16rem;
        }
        p{
            color: #999;
            font-size: .24rem;
        }
    }
    .down-ct{
        float: right;
        .down-btn{
            margin: .37rem .6rem 0 0;
            width: 2.13rem;
            height: .75rem;
            line-height: .75rem;
            border-radius: 5px;
            background: #ff5151;
            text-align: center;
            color: #fff;
            font-size: @f28;
        }
    }

</style>
