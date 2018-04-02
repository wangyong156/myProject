<template>
    <div class="allBig">
        <div class="enjoySelf">
            <div class="header">
                <img @click="back" src="../../img/nav_icon_back@2x.png"/>
            </div>
            <img class="ylq_banner" src="../../img/happy/ylq_banner@2x.png" alt="">
        </div>
        <div class="enjoySelfContent">
            <div class="enjoySelfHeader tc">
                <p class="w49 ylq_icon_record fl">
                    <span class="enjoy_left common">
                        <img src="../../img/happy/ylq_icon_record@2x.png" alt="">
                        <i class="f36">{{point}}</i>
                    </span>
                </p>
                <p class="w50 fr" @click="toScore()">
                    <span class="enjoy_right common">
                        <img src="../../img/happy/ylq_icon_gold@2x.png" alt="">
                        <i class="f28">积分记录</i>
                    </span>
                </p>
            </div>
            <ul class="enjoy_list">
                <li v-show="is_login">
                    <img class="fl"  src="../../img/happy/yl_icon_sign@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">签到</span>
                        <span class="f24 black9">积分+{{signValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="activeSign? 'sign_s' : 'sign_n'" @click="sign">{{signContent}}</span>
                </li>
                <li v-show="is_regist">
                    <img class="fl"  src="../../img/happy/yl_icon_register@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">成功注册账号</span>
                        <span class="f24 black9">积分+{{registValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="activeRegister? 'sign_s' : 'sign_n'" @click="register">{{registContent}}</span>
                </li>
                <li v-show="is_recharge">
                    <img class="fl"  src="../../img/happy/yl_icon_recharge@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">首次完成一次充值</span>
                        <span class="f24 black9">积分+{{rechargeValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="rechargeSign? 'sign_s':'sign_n'" @click="recharge">{{rechargeContent}}</span>
                </li>
                <li v-show="is_recharge_step">
                    <img class="fl"  src="../../img/happy/yl_icon_recharge@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">累计充值{{rechargeMoney}}元</span>
                        <span class="f24 black9">积分+{{recharge_stepValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="recharge_stepSign? 'sign_s':'sign_n'" @click="rechargeAll">{{recharge_stepValueContent}}</span>
                </li>
                <li v-show="is_simulate">
                    <img class="fl"  src="../../img/happy/yl_icon_trade@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">完成模拟交易({{time}}/{{allTime}})</span>
                        <span class="f24 black9">积分+{{teade_simulateValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="simulateSign? 'sign_s':'sign_n'" @click="simulate">{{teade_simulateContent}}</span>
                </li>
                <li v-show="is_trade">
                    <img class="fl"  src="../../img/happy/yl_icon_trade@2x.png" alt="">
                    <p class="fl">
                        <span class="f30 black3 mt30">完成{{tradeTime}}次实盘交易</span>
                        <span class="f24 black9">积分+{{tradeValue}}</span>
                    </p>
                    <span class="fr sign tc" :class="tradeSign? 'sign_s':'sign_n'" @click="trade">{{tradeContent}}</span>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import {toast} from '@/util/index'
    import enjoy from '@/api/home/index'
    export default {
        data() {
            return {
                islogin:false,
                signValue:0,
                signContent:'',
                registValue:0,
                registContent:'',
                rechargeValue:0,
                rechargeContent:'',
                recharge_stepValue:0,
                recharge_stepValueContent:'',
                teade_simulateValue:0,
                teade_simulateContent:'',
                tradeValue:0,
                tradeContent:'',
                rechargeMoney:0,
                time:0,
                allTime:0,
                tradeTime:'',
                point:0,
                activeSign:true,
                activeRegister:true,
                rechargeSign:true,
                recharge_stepSign:true,
                simulateSign:true,
                tradeSign:true,
                is_login:false,
                is_regist:false,
                is_recharge:false,
                is_recharge_step:false,
                is_simulate:false,
                is_trade:false
            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
            toScore(){
                this.$router.push({path: '/toScore'})
            },
            getdata(){
                let pramedata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId")
                }

                enjoy.enjoySelf(pramedata).then((res) => {
                    var data = res.data;
                    if (data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        this.point = data.data.point;
                        this.islogin = data.data.login;
                        let list = data.data.pointRule;
                        let that = this;
                        $.each(list,function(i,v){
                            if(v.nid == 'sign'){
                                that.signValue = v.value;
                                that.is_login = true;
                                if(v.finishCount == v.rewardCount){
                                    that.signContent = '已完成';
                                    that.activeSign = false;
                                }else{
                                    that.signContent = '签到';
                                    that.activeSign = true;
                                }
                            }
                            if(v.nid == 'regist'){
                                that.registValue = v.value;
                                that.is_regist = true;
                                if(v.finishCount == v.rewardCount){
                                    that.registContent = '已完成';
                                    that.activeRegister = false;
                                }else{
                                    that.registContent = '领取';
                                    that.activeRegister = true;
                                }
                            }
                            if(v.nid == 'recharge'){
                                that.rechargeValue = v.value;
                                that.is_recharge = true;
                                if(v.finishCount == v.rewardCount){
                                    that.rechargeContent = '已完成';
                                    that.rechargeSign = false;
                                }else{
                                    that.rechargeContent = '去完成';
                                    that.rechargeSign = true;
                                }
                            }
                            if(v.nid == 'recharge_step'){
//                                that.recharge_stepValue = v.value;
                                that.is_recharge_step = true;
                                let value = v.value;
                                if(value.indexOf(';') < 0){/*没有；*/
                                    that.rechargeMoney = value.split(',')[0];
                                    that.recharge_stepValue =value.split(',')[1];
                                    if(v.finishCount == 0){
                                        that.recharge_stepValueContent = '去完成';
                                        that.recharge_stepSign = true;
                                    }else{
                                        that.recharge_stepValueContent = '已完成';
                                        that.recharge_stepSign = false;
                                    }
                                }else{
                                    let rechargeList = value.split(';');
                                    if(v.finishCount == rechargeList.length){
                                        that.rechargeMoney = rechargeList[v.finishCount-1].split(',')[0];
                                        that.recharge_stepValue = rechargeList[v.finishCount-1].split(',')[1];
                                        that.recharge_stepValueContent = '已完成';
                                        that.recharge_stepSign = false;
                                    }else{
                                        that.rechargeMoney = rechargeList[v.finishCount].split(',')[0];
                                        that.recharge_stepValue = rechargeList[v.finishCount].split(',')[1];
                                        that.recharge_stepValueContent = '去完成';
                                        that.recharge_stepSign = true;
                                    }

                                }
                            }
                            if(v.nid == 'teade_simulate'){
                                that.teade_simulateValue = v.value;
                                that.is_simulate = true;
                                that.time = v.finishCount;
                                that.allTime = v.rewardCount;
                                if(v.finishCount == v.rewardCount){
                                    that.teade_simulateContent = '已完成';
                                    that.simulateSign = false;
                                }else{
                                    that.teade_simulateContent = '去完成';
                                    that.simulateSign = true;
                                }
                            }
                            if(v.nid == 'trade'){
                                that.tradeValue = v.value;
                                that.is_trade = true;
                                if(v.finishCount == v.rewardCount){
                                    that.tradeContent = '已完成';
                                    that.tradeSign = false;
                                }else{
                                    that.tradeContent = '去完成';
                                    that.tradeSign = true;
                                }
                                that.tradeTime = v.rewardCount;
                            }

                        })
                    } else {
                        toast(data.message);
                    }
                })
            },
            sign(event){
                let pramedata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId")
                }
                if(pramedata.HUIMI_USERID == '' || pramedata.HUIMI_USERID == null){
                    let that = this;
                    setTimeout(function(){
                        that.$router.push({path: '/login'})
                    });
                }else{
                    if(event.target.innerText == '签到'){
                        if(this.islogin){
                            enjoy.mark(pramedata).then((res) => {
                                if (res.data.code == 200) {
                                    toast("签到成功");
                                    this.point = parseFloat(this.signValue)+parseFloat(this.point);
                                    this.activeSign = false;
                                    this.signContent = '已完成';
                                } else if(res.data.code == 401){
                                    toast(res.data.message);
                                    let that = this;
                                    setTimeout(function(){
                                        that.$router.push({path: '/login'})
                                    },1000);
                                }else {
                                    toast(res.data.message);
                                    /* setTimeout (function(){
                                       location.reload();
                                     },500);*/
                                }
                            })
                        }
                    }
                }

            },
            register(event){
                if(this.islogin){
                    if(event.target.innerText == '去完成'){
                        this.$router.push({path: '/register1'});
                    }
                }else{
                    this.$router.push({path: '/login'});
                }
            },
            recharge(event){
                if(this.islogin) {
                    if (event.target.innerText == '去完成') {
                        this.$router.push({path: '/toRecharge'});
                    }
                }else{
                    this.$router.push({path: '/login'});
                }
            },
            rechargeAll(event){
                if(this.islogin) {
                    if (event.target.innerText == '去完成') {
                        this.$router.push({path: '/toRecharge'});
                    }
                }else{
                    this.$router.push({path: '/login'});
                }
            },
            simulate(event){
                if(this.islogin) {
                    if(event.target.innerText == '去完成'){
                        this.$router.push({path: '/firmOffer',query:{id:1,type:0}})
                    }
                }else{
                    this.$router.push({path: '/login'});
                }
            },
            trade(event){
                if(this.islogin) {
                    if(event.target.innerText == '去完成'){
                        this.$router.push({path: '/firmOffer',query:{id:1,type:1}})
                    }
                }else{
                    this.$router.push({path: '/login'});
                }

            }
        },
        components: {

        },
        mounted() {
            this.getdata();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '娱乐专区';

            next()
        }
    }

</script>
<style lang="less" scoped>
    @import '../../less/config.less';
    .allBig{
        /*position:absolute;*/
        /*top:0;*/
        /*bottom:0;*/
        /*overflow:auto;*/
        background: #f4f4f4;
        padding-bottom: .08rem;
    .enjoySelf{
        height:5.44rem;
        position: relative;
        .header img{

            top: .3rem;
        }
    .ylq_banner{
        width:100%;
        height:100%;
    }
    .header{
        background: none;
        border-bottom:0;
    }
    }
    .enjoySelfHeader {
        height:1.6rem;
        background:@FFF;
    .ylq_icon_record{
        border-right:1px solid @ddd;
    }
    p {
        height:1.0667rem;
        line-height:1.0667rem;
        margin-top:0.2667rem;
    img{
        display: inline-block;
        width:0.42667rem;
        height:0.42667rem;
        margin-right:0.05rem;
    }
    .enjoy_left i{
        color:@red;
    }
    }

    }
    .enjoy_list{
        margin-top:0.2667rem;
    li{
        height:2rem;
        line-height:2rem;
        padding:0 0.4rem;
        background:@FFF;
        margin-bottom:0.2667rem;
    img{
        width:0.96rem;
        height:0.96rem;
        margin-top:0.52rem;
        margin-right:0.2667rem;
    }
    p{
        line-height:0.7rem;
    span{
        display: block;
    }
    }
    .sign{
        width:1.813rem;
        height:0.77333rem;
        line-height:0.77333rem;
        border-radius: 0.5333rem;
        margin-top:0.61333rem;
    }
    .sign_s{
        background:@actColor;
        color:@zero;
    }
    .sign_n{
        background:@CCC;
        color:@FFF;
    }
    }
    }
    }
    .enjoySelfHeader {
        .fl span{
            float: left;
            margin-left: 1rem;
        }
        .fr span{
            float: right;
            margin-right: 1rem;
        }
    }


</style>


