<template>
    <div>
        <div class="header">
            <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
            <span>客服中心</span>
            <a class="img" href="tel:057185857825" >
                <img class="serve hide" src="../../img/newImg/nav_icon_phone.png"/>
            </a>
        </div>
        <div class="thequestion">
            <div class="news-list">
                <p class="title mainback">注册问题</p>
                <ul class="news-ul">
                    <li class="" v-for="(value,index) in newsListOne">
                        <div class="head" @click="showNews1(index)">
                            <p class="list-title">{{value.title}}
                                <img v-show="nowIndex1 != index" class="icon" src="../../img/arrow_fold@2x.png" alt="">
                                <img v-show="nowIndex1 == index" class="icon" src="../../img/arrow_unfold@2x.png" alt="">
                            </p>
                        </div>
                        <div class="info-ct" v-show="nowIndex1 == index ">
                            <p class="main">
                                {{value.content}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="news-list">
                <p class="title mainback">充值问题</p>
                <ul class="news-ul">
                    <li  class=""  v-for="(value,index) in newsListTwo">
                        <div class="head" @click="showNews2(index)">
                            <p class="list-title">{{value.title}}
                                <img v-show="nowIndex2 != index" class="icon" src="../../img/arrow_fold@2x.png" alt="">
                                <img v-show="nowIndex2 == index" class="icon" src="../../img/arrow_unfold@2x.png" alt="">
                            </p>
                        </div>
                        <div class="info-ct" v-show="nowIndex2 == index ">
                            <p class="main">
                                {{value.content}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="news-list">
                <p class="title mainback">交易保证金/费用问题</p>
                <ul class="news-ul">
                    <li class="" v-for="(value,index) in newsListThree">
                        <div class="head" @click="showNews3(index)">
                            <p class="list-title">{{value.title}}
                                <img v-show="nowIndex3 != index" class="icon" src="../../img/arrow_fold@2x.png" alt="">
                                <img v-show="nowIndex3  == index" class="icon" src="../../img/arrow_unfold@2x.png" alt="">
                            </p>
                        </div>
                        <div class="info-ct" v-show="nowIndex3 == index ">
                            <p class="main">
                                {{value.content}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="news-list">
                <p class="title mainback">结算问题</p>
                <ul class="news-ul">
                    <li class="" v-for="(value,index) in newsListFour">
                        <div class="head" @click="showNews4(index)">
                            <p class="list-title">{{value.title}}
                                <img v-show="nowIndex4 != index" class="icon" src="../../img/arrow_fold@2x.png" alt="">
                                <img v-show="nowIndex4 == index" class="icon" src="../../img/arrow_unfold@2x.png" alt="">
                            </p>
                        </div>
                        <div class="info-ct" v-show="nowIndex4 == index ">
                            <p class="main">
                                {{value.content}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-btn" @click="toMyOrder">
            没有解决问题？点此提问
        </div>
    </div>
</template>
<script>
    import {toast} from '@/util/index'
    export default {
        data() {
            return {
                nowIndex1:-1,
                nowIndex2:-1,
                nowIndex3:-1,
                nowIndex4:-1,
                newsListOne: [{
                    title:'用户名无法登录怎么办？',
                    content:'使用注册手机号码也可以登录。'
                },{
                    title:'忘记登录密码如何获取？',
                    content:'可以用注册手机找回密码。\n操作流程：选择登录 —— 点击忘记密码 —— 输入手机号码 —— 获取验证码 —— 输入新登录密码 —— 修改成功。'
                },{
                    title:'获取短信验证码失败怎么办？',
                    content:'检查是否输错手机号码。如无问题，请致电--客服热线进行处理。'
                },{
                    title:'登录的方式有哪些？',
                    content:'支持微信公众号、app、pc进行登录。'
                }],
                newsListTwo: [{
                    title:'如何充值？',
                    content:'微信端/APP端目前支持银行卡快捷充值、支付宝转账，在线充值立即到账。'
                },{
                    title:'充值提现有什么限制吗？提现多久到账？',
                    content:'1、充值最低100元 ' +
                    '2、交易结算后、或者账户有余额，可随时申请提出现金。' +
                    '3、单次起提金额100元，16点前提款一般当天处理，16点后提款次日处理，如遇节假日顺延到下个工作日。'
                },{
                    title:'为什么银行卡会充值失败？',
                    content:'1、确保银行卡号、姓名、银行预留身份号、身份证号、开户银行是否保持一致。\n' +
                    '2、充值失败可致电--获取帮助。'
                },{
                    title:'快捷支付收不到验证码怎么办？',
                    content:'1、请核实手机号是否为该银行卡的绑定手机，手机是否设置短信拦截功能。\n' +
                    '2、因支付验证码是由第三方支付公司发出的，如仍收不到验证码，请致电--客服热线咨询并获取帮助。'
                }],
                newsListThree: [{
                    title:'什么是履约保证金？',
                    content:'1、履约保证金为点买人委托平台冻结用于履约交易亏损赔付义务的保证金。\n' +
                    '2、点买人以冻结的履约保证金作为承担交易亏损赔付的上限。\n' +
                    '3、多出上限部分的亏损全部由合作的投资人承担。\n' +
                    '4、合作交易结束后，根据结算结果，如交易盈利，点买人冻结的履约保证金全额退还。如交易亏损，从冻结的履约保证金中，扣减操盘人所应承担的亏损赔付额，扣减后余额退还。'
                },{
                    title:'交易的履约保证金是固定的还是浮动的？',
                    content:'目前是固定的，根据投资人选择对应的交易手数叠加。'
                },{
                    title:'交易过程中可以追加履约保证金吗？',
                    content:'交易中不能追加履约保证金，所以开仓的时候，建议选择高保证金，下单成功后，可以自行设置止盈止损。'
                },{
                    title:'风险较高容易被平仓，如何选择保证金档次？',
                    content:'1、每个品种都有多个保证金档次可选的，客户可以按照自己的风险承受能力自由选择每笔的保证金档次。\n' +
                    '2、比如客户可以用1340保证金做一手原油，也可以2010、2680的保证金做一手的原油，在开仓界面，触发止损中选择即可。履约保证金高，不容易被平仓。'
                },{
                    title:'交易需要支付什么费用？',
                    content:'交易过程中只需要支付每笔的交易综合费，不交易不收费，下单未成功撤单也不收费。'
                },{
                    title:'交易时间费用和汇率是固定的吗？',
                    content:'关于交易时间和交易综合费 、汇率，因期货公司变动，平台有可能进行调整，以平台公布的最新数据为准。'
                }],
                newsListFour: [{
                    title:'盈亏如何分配？',
                    content:'1、点买人与投资人合作交易，止盈金额以内的盈利全归您。\n' +
                    '2、超出止盈部分的盈利全部归合作的投资人所有，同时超出止亏部分的亏损也全部由投资人承担。'
                },{
                    title:'如何设置止盈止损？是否有限制？',
                    content:'下单成功后，在持仓信息里可自定义设置，止盈、止损有最大限制。'
                },{
                    title:'如何设置止盈止损？是否有限制？',
                    content:'下单成功后，在持仓信息里可自定义设置，止盈、止损有最大限制。'
                },{
                    title:'国际期货的持仓盈亏是如何计算的？',
                    content:'美原油、美黄金是以美元计价，恒指是以港币计价，德指是以欧元计价，盈亏显示是以期货公司的汇率换算后的人民币等值价格，交易完成后，投资人以冻结在平台的人民币做为支付货币。'
                },{
                    title:'是否支持限定价格卖出？',
                    content:'暂时不支持。可以通过修改止盈止损去实现。'
                }]
            }
        },

        methods: {
            back() {
                this.$router.back(-1)
            },
            showNews1(index) {
                if (this.nowIndex1 == index) {
                    this.nowIndex1 = -1;
                } else {
                    this.nowIndex1 = index
                }
            },showNews2(index) {
                if (this.nowIndex2 == index) {
                    this.nowIndex2 = -1;
                } else {
                    this.nowIndex2 = index
                }
            },showNews3(index) {
                if (this.nowIndex3 == index) {
                    this.nowIndex3 = -1;
                } else {
                    this.nowIndex3 = index
                }
            },showNews4(index) {
                if (this.nowIndex4 == index) {
                    this.nowIndex4 = -1;
                } else {
                    this.nowIndex4 = index
                }
            },
            toMyOrder(){
                this.$router.push({path:'/service'});
            }
        },
        components: {

        },
        mounted() {

        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '客服中心'
            next()
        }
    }

</script>
<style lang="less" scoped>
    @import '../../less/config.less';
    .thequestion{
        position: absolute;
        top: 1.30667rem;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow:auto;
        margin-top: .28rem;
        /*.borderB{
            position: relative;
        }
        li:before{
            display: block;
            position: absolute;
            width: 100%;
            height: 1px;
            background: red;
        }*/
    }
    /*::-webkit-scrollbar{width:0px}*/
    .news-list {
        font-size: .42rem;
    p.title {
        padding: 0 .4rem;
        margin-bottom: .28rem;

        color: @nine;
        font-size:@f28;
        background:@changeColor;
    }
    .list-title{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        padding-right:0.6rem;
        color:@newColor;
        font-size:@f28;
    }
    .news-ul{
        margin-bottom:0.2rem;
        background: @FFF;
    }
    li {
    .head {
        padding: 0 .4rem;
        height: 1.17rem;
        line-height: 1.17rem;
        position: relative;
    .icon {
        position: absolute;
        right: .4rem;
        top: .5rem;
        width: .4rem;
    }
    }
    .info {
        color: @FFF;
        background: @fColor;
        padding: .3rem @p30;
    }
    }
    .info-ct {
        padding: 0 @p30;
        padding-bottom: .2rem;
    p{
        color: @six;
        line-height:0.6rem;
        font-size:@f24;
    }
    }
    }
    .footer-btn {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: @FFF;
        font-size: @f32;
        color: @newColor;
        display: inline-block;
        width: 100%;
        text-align: center;
        height: 1.2rem;
        line-height: 1.2rem;

    }
    .serve{
        width: .5rem;
        height: .5rem;
        margin-top: -.01rem;
    }
    .news-ul li{
        position: relative;
    }
    .news-ul li:after{
       content: '';
       display: block;
       width: 100%;
       height: 1px;
       background: @ddd;
    }
    .news-ul li:last-child:after {
        content: '';
        display: block;
        height: 0;
    }
</style>


