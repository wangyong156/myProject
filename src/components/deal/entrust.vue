<template>
  <div class="marin">
    <div class="settlement">

      <div class="tc" v-show=" lists.length == 0">
        <img style="margin-top: 3rem;width:2.7467rem;" src="../../img/newImg/no_recond_img@2x.png"/>
        <p class="black9 mt40 f28">暂无记录</p>
      </div>

      <ul  v-show="lists.length != 0">
        <li class="pershares" v-for="(item,index) in lists">
          <div class="title">
            <div class="big">
              <div>
                {{item.name}}&nbsp;&nbsp;
                <span class="title-number">{{item.code}}{{item.contract}}</span>
              </div>
              <i class="span">策略号:{{item.orderNo}}</i>
            </div>
            <span class="toSet" @click="toSet(item,index)">修改止盈止损</span>
          </div>
          <div class="content">
            <div class="grey">
              <div class="Purchase">
                <span :class="color(item.direction)"  class="dif">{{item.direction, item.number | directionType}} </span>

                <span >委托&nbsp;&nbsp;<span class="market-data">{{item.entrustPrice,typeFlag | dealPrice}}</span>
                  <img  v-show="checkRestrict(item.openWay) " :src="iconRestrict" class="icon-base" alt="">
                  <img   v-show="checkiconBazaar(item.openWay)" :src="iconBazaar" class="icon-base" alt="">
                  <img   v-show="typeFlag == 3" :src="iconFl" class="icon-base" alt="">
                </span>
                <span >现价&nbsp;&nbsp;<span class="market-data">{{item.lastPrice}}</span></span>
              </div>
              <div class="presentPrice">
                <span>--</span>
                <span >止盈 &nbsp;<span class="market-data">{{item.profitStopPrice,typeFlag | dealPrice}}</span></span>
                <span >止损&nbsp;&nbsp;<span class="market-data">{{item.loseStopPrice,typeFlag | dealPrice}}</span></span>
              </div>
            </div>
            <div class="right" @click="checkQuitOrder(item,index)" v-show="isClose ">
              <span>撤单</span>
            </div>
            <div class="right"  v-show="isClose == false">
              <span>撤单</span>
            </div>
          </div>
        </li>
      </ul>




    </div>

    <!--平仓-->
    <div class='swalAlert' v-show="falgIndex==0">
      <div class="swalAlertT">
        <div class="swalTitle">
          <span class="fl">{{name}} {{code}}</span>
          <span class="fr"><i :class="color(direction)">{{direction, number | directionType}}</i></span>
        </div>
        <div class="swalCenter">
          <p class="item1 text-center">
            <img @click="toogleBtn" v-if="type =='a'" class="img-icon" src="../../img/radio_s@2x.png">
            <img @click="toogleBtn" v-if="type =='b'" class="img-icon" src="../../img/radio_n@2x.png">
            全部平仓共<input class="num-input" readonly="redeonly" v-model="number">手</p>
          <p class="text-center">
            <img @click="toogleBtn" v-if="type == 'b'" class="img-icon" src="../../img/radio_s@2x.png">
            <img @click="toogleBtn" v-if="type == 'a'" class="img-icon" src="../../img/radio_n@2x.png">
            部分平仓
            <span class="minus-btn" @click="averageDown(number)">-</span><input class="num-input"
                                                                                v-model="averageOrderCount2"><span
                  class="add-btn" @click="averageUp(number)">+</span>&nbsp;&nbsp;手

          </p>
        </div>
        <div class="swalbottom">
          <span @click="cancel">取消</span>
          <span @click="makeSure">确定</span>
        </div>
      </div>
    </div>

    <!--修改止盈止损-->
    <div class='swalAlert' v-show="falgIndex2==0">
      <div class="swalAlertT">
        <div class="swalTitle">
          <span class="fl">{{name}} {{code}}{{contract}}</span>
          <span class="fr"><i :class="color(direction)">{{direction, number | directionType}}</i></span>
        </div>
        <div class="swalCenter">
          <p class="item1 text-center cell">
            <label class="first-title">到达</label>
            <!--<span class="minus-btn" @click="profitDown(profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)">-</span>-->
            <img :src="iconMinus"  @click="profitDown(profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)" class="item-btn">
            &nbsp;<input  class="num-input"  v-model="profitStopPrice" >&nbsp;
            <!--<span class="add-btn"  @click="profitUp(profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)">+</span>-->
            <img :src="iconAdd"   @click="profitUp(profitStopPrice,profitStopMaxPrice,loseStopMinPrice,waveMin,direction)" class="item-btn">
            &nbsp;&nbsp;点位时止盈平仓
          </p>
          <p class=" text-center cell">
            <label class="first-title">到达</label>
            <!--    <span class="minus-btn"  @click="lastDown(loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)">-</span>-->
            <img :src="iconMinus"  @click="lastDown(loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)" class="item-btn">
            &nbsp;<input class="num-input"  v-model="loseStopPrice" >&nbsp;
            <!--<span class="add-btn"  @click="lastUp(loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)">+</span>-->
            <img :src="iconAdd"  @click="lastUp(loseStopPrice,profitStopPrice,loseStopMinPrice,waveMin,direction)" class="item-btn">
            &nbsp;&nbsp;点位时止损平仓
          </p>
        </div>
        <div class="swalbottom">
          <span @click="cancel">取消</span>
          <span @click="averageSure(direction)">确定</span>
        </div>
      </div>
    </div>

    <div class="dialogs" v-show="dialogQuit">
      <div class="mask"></div>
      <div class="model" v-show="flag">
        <div class="model-header">
          <p>请确认是否撤单？</p>
        </div>
        <div class="model-footer" >
          <span style="border-right: 1px solid #ddd;" @click="dialogQuit = false">取消</span>
          <span @click="quitOrder()">确认</span>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
    import home from '../../api/home/index'
    import {toast} from '@/util/index'
    import {Loadmore} from 'mint-ui'
    import FundArrowList from '@/components/FundArrowList'
    import { MessageBox } from 'mint-ui';
    import modal from  '@/components/deal/modal'

    export default {
        name:'childEntrust',
        data() {
            return {
                dialogQuit:false,
                isQuite:true,
                iconFl:require('../../img/label_gen@2x.png'),
                iconRestrict:require('../../img/label_xian@2x.png'),
                iconBazaar:require('../../img/label_shi@2x.png'),

                isClose:true,
                quitItemId:'',
                quitItemIndex:-1,

                type: 'a',
                profit: 0,
                name: '',
                code: '',
                contract:'',
                number: '',//手数
                direction: "",//涨跌type
                upNum1: 0,
                downNum1: 0,
                profitStopPrice: "", //止盈价格
                profitStopMaxPrice: '',//止盈最大价格
                loseStopPrice: '',//止损价格
                loseStopMinPrice: "", //止损最小价格
                orderCount: '',
                averageOrderCount2: 1,//部分平仓
                id: "",  //订单ID
                waveMin:'', //最小波动点数
                quitIndex : -1,


                iconMinus:require('../../img/input_less_s@2x.png'),  //加减图片4张
                iconAdd:require('../../img/input_plus_s@2x.png'),
                iconMinusOff:require('../../img/input_less_n@2x.png'),
                iconAddOff:require('../../img/input_plus_n@2x.png'),


                sendAverage: "",
                flag: -1,
                falgIndex: 1,
                falgIndex2: 1,
                lists: [],
                follow:1,    //1点买 模拟 2跟单
                itemIndex: 0
            }
        },
        props: {
            typeFlag: {} //1实盘，2模拟，3跟单
        },
        components: {
            'v-FundArrowList': FundArrowList,
            'mt-loadmore': Loadmore,
            'mt-messageBox': MessageBox,
            'modal':modal,
        },
        beforeRouteLeave(to, form, next) {
            next();
        },
        filters: {
            //判断type是否显示价格
            dealPrice(price,type){
                if(type == 1 || type == 2){
                    return price;
                }else{
                    return '--';
                }
            },
            TypeOpenWay(value) {
                if (value == 1) {
                    return '市';
                } else {
                    return '限';
                }
            },
            directionType(val, num) {
                if (val == '1') {
                    return '买涨' + num + '手';
                } else {
                    return '买跌' + num + '手';
                }
            },
            //涨跌type，开仓，现价，汇率，code类别,手数，每点合约价值，最小波动点数
            exchangeRate2(direction, openPrice, settlePrice, exchangeRate, code,number,pointVlaue,w) {
                let price, newPrice, newRete;
                //根据买涨买跌判断所获得的货币金额
                if (direction == 1) {
                    price = (settlePrice - openPrice) * pointVlaue / w * number ;
                } else {
                    price = (openPrice - settlePrice) * pointVlaue / w * number;
                }

                if (price < 0) {
                    newPrice = price.toFixed(2);
                } else {
                    newPrice = '+' + price.toFixed(2);
                }

                //根据所获得金额乘以汇率
                let rete = (price * exchangeRate).toFixed(2);
                if (rete < 0) {
                    newRete = rete;
                } else {
                    newRete = '+' + rete;
                }
                //根据code返回货币种类
                let moneyCode;
                if (code == 'GC' || code == 'CL' || code == 'SI') {
                    moneyCode = '$'
                } else if (code == 'HSI' || code == 'MHI') {
                    moneyCode = 'HK$'
                } else {
                    moneyCode = '€'
                }

                return newRete + '(' + moneyCode +  newPrice +')';
            }
        },
        methods: {

            //市价显示
            checkRestrict(openWay){
                if(openWay == 2 && (this.typeFlag == 1 || this.typeFlag == 2)){
                    return true;
                }
            },
            //现价显示
            checkiconBazaar(openWay){
                if(openWay == 1 && (this.typeFlag == 1 || this.typeFlag == 2)){
                    return true;
                }
            },

            childEntrustFn() {     //父组件请求列表，刷新列表，获取实时价格
                this.lists = [];
                this.getList();
                let self = this;
                window.entrustTime = setInterval(function () {
                    self.getList();
                },1000);
            },
            toogleBtn() {    //切换平仓选择
                if (this.type == 'a') {
                    this.type = 'b';
                } else if(this.type == 'b'){
                    this.type = 'a';
                }
            },
            color(v) {
                if (v == 1) {
                    return 'up';
                } else {
                    return 'down';
                }
            },
            toSet(item,index) {
                this.orderCount = item.orderCount;
                this.name = item.name;
                this.code = item.code;
                this.contract = item.contract;

                this.falgIndex2 = 0;
                this.number = item.number;
                this.direction = item.direction;
                this.profitStopPrice = item.profitStopPrice; //止盈价格
                this.profitStopMaxPrice = item.profitStopMaxPrice;  //止盈最大价格
                this.loseStopPrice = item.loseStopPrice; //止损价格
                this.loseStopMinPrice = item.loseStopMinPrice;  //止损最小价格
                this.id = item.id;  //订单id
                this.direction = item.direction;
                this.waveMin = item.waveMin; //最小波动点数
                this.itemIndex = index;// 委托价
            },
            //止盈平仓减去 -
            profitDown(currPrice, max, min, waveMin, direction) {
                if(direction == 1){
                    if (currPrice - waveMin >= min) {  //如果type为涨则
                        this.profitStopPrice = (this.profitStopPrice*1000 - waveMin*1000)/1000;
                    } else {
                        this.profitStopPrice = min;
                        toast('不能小于' +   min );
                    }
                }else{
                    if (currPrice - waveMin >= max) {
                        this.profitStopPrice = (this.profitStopPrice*1000 - waveMin*1000)/1000;
                    } else {
                        this.profitStopPrice = max;
                        toast('不能小于' +   max );
                    }
                }

            },
            //止盈平仓加 +
            profitUp(currPrice, max, min, waveMin, direction) {
                if(direction == 1){
                    if (currPrice + waveMin <= max) {
                        this.profitStopPrice = (this.profitStopPrice*1000 + waveMin*1000)/1000;
                    } else {
                        this.profitStopPrice = max;
                        toast('不能大于' +  max);
                    }
                }else{
                    if (currPrice + waveMin <= min) {
                        this.profitStopPrice = (this.profitStopPrice*1000 + waveMin*1000)/1000;
                    } else {
                        this.profitStopPrice = min;
                        toast('不能大于' +  min);
                    }
                }

            },
            //止损平仓减 -
            lastDown(currPrice, max, min, waveMin, direction) {
                if(direction == 1){
                    if (currPrice - waveMin >= min) {
                        this.loseStopPrice = (this.loseStopPrice*1000 - waveMin*1000)/1000;
                    } else {
                        this.loseStopPrice = min;
                        toast('不能小于' + min);
                    }
                }else{
                    if (currPrice - waveMin >= max) {
                        this.loseStopPrice = (this.loseStopPrice*1000 - waveMin*1000)/1000;
                    } else {
                        this.loseStopPrice = max;
                        toast('不能小于' + max);
                    }
                }
            },
            //止损平仓 +
            lastUp(currPrice, max, min, waveMin, direction) {
                if(direction == 1){
                    if (currPrice + waveMin <= max) {
                        this.loseStopPrice = (this.loseStopPrice*1000 + waveMin*1000)/1000;
                    } else {
                        this.loseStopPrice = max;
                        toast('不能大于' + max);
                    }
                }else{
                    if (currPrice + waveMin <= min) {
                        this.loseStopPrice = (this.loseStopPrice*1000 + waveMin*1000)/1000;
                    } else {
                        this.loseStopPrice = min;
                        toast('不能大于' + min);
                    }
                }
            },
            unravel(item) {
                this.name = item.name;
                this.code = item.code;
                this.falgIndex = 0;
                this.orderCount = item.orderCount;
                this.number = item.number;
                this.id = item.id;  //订单id
                this.direction = item.direction;
                this.sendAverage = this.number;
            },

            //撤单询问
            checkQuitOrder(item,index){
                console.log(item.id);
                console.log(index);
                this.itemId = item.id;
                this.dialogQuit = true;
            },
            //撤单
            quitOrder(){
                this.dialogQuit = false;
                this.isClose = false;
                var index = this.quitIndex;

                let sendata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    orderId:this.itemId
                }
                if(this.typeFlag == 2){
                    home.getCancel_sl(sendata).then((res) =>{
                        if (res.data.code == 200) {
                            toast('撤单成功');
                            this.lists.splice(index,1);
                            var _this = this;
                            setTimeout(function () {
                                _this.isClose = true;
                            },1000)
                        }else if (res.data.code == 401) {
                            toast(res.data.message);
                            var that = this;
                            setTimeout(function () {
                                that.$router.push({path: '/login'})
                            }, 1000);
                        }else {
                            this.isClose = true;
                            toast(res.data.message)

                        }
                    })
                }else {
                    home.getCancel(sendata).then((res) =>{
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            toast('撤单成功');
                            this.lists.splice(index,1);
                            var _this = this;
                            setTimeout(function () {
                                _this.isClose = true;
                            },1000)
                        }else if (res.data.code == 401) {
                            toast(res.data.message);
                            var that = this;
                            setTimeout(function () {
                                that.$router.push({path: '/login'})
                            }, 1000);
                        }else {
                            this.isClose = true;
                            toast(res.data.message)

                        }
                    })
                }
            },
            //平仓分配加减
            averageDown() {
                if (this.averageOrderCount2 - 1 > 0) {
                    this.averageOrderCount2 -= 1;
                } else {
                    toast('不能小于0');
                }
            },
            averageUp(val) {
                if (this.averageOrderCount2 + 1 > val) {
                    this.averageOrderCount2 = val;
                    toast('不能大于全部手数');
                } else {
                    this.averageOrderCount2 += 1;
                }
            },
            cancel() {
                this.falgIndex = 1;
                this.falgIndex2 = 1;
            },
            //止损平仓确认
            averageSure(direction) {
                var reg = /^\d+(\.\d+)?$/
                if(!reg.test(this.profitStopPrice) || !reg.test(this.loseStopPrice)){
                    toast('请输入正确的数值')
                    return false;
                }
                if(direction == 1){
                    if (this.profitStopPrice > this.profitStopMaxPrice) {
                        this.profitStopPrice = this.profitStopMaxPrice;
                        toast('止盈价格不能大于' + this.profitStopMaxPrice);
                        return false;
                    }
                    if (this.loseStopPrice < this.loseStopMinPrice) {
                        this.loseStopPrice = this.loseStopMinPrice;
                        toast('止损价格不能小于' + this.loseStopMinPrice);
                        return false;
                    }
                    if(this.loseStopPrice > this.profitStopPrice){
                        // this.loseStopPrice = this.profitStopPrice;
                        toast('止损价格不能大于止盈价格');
                        return false;
                    }
                }else {
                    if (this.profitStopPrice < this.profitStopMaxPrice) {
                        this.profitStopPrice = this.profitStopMaxPrice;
                        toast('止盈价格不能小于' + this.profitStopMaxPrice);
                        return false;
                    }
                    if (this.loseStopPrice > this.loseStopMinPrice) {
                        this.loseStopPrice = this.loseStopMinPrice;
                        toast('止损价格不能大于' + this.loseStopMinPrice);
                        return false;
                    }
                    if (this.loseStopPrice < this.profitStopPrice) {
                        // this.loseStopPrice = this.profitStopPrice;
                        toast('止损价格不能小于止盈价格');
                        return false;
                    }
                }

                let sendata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    orderId: this.id,
                    profitStop: this.profitStopPrice,
                    loseStop: this.loseStopPrice
                }

                if(this.typeFlag == 2){
                    home.getModifyProfitStop_sl(sendata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            toast('修改成功');
                            this.falgIndex = 1;
                            this.falgIndex2 = 1;
                            this.lists[this.itemIndex].profitStopPrice = this.profitStopPrice;
                            this.lists[this.itemIndex].loseStopPrice = this.loseStopPrice;
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
                }else {
                    home.getModifyProfitStop(sendata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            toast('修改成功');
                            this.falgIndex = 1;
                            this.falgIndex2 = 1;
                            this.lists[this.itemIndex].profitStopPrice = this.profitStopPrice;
                            this.lists[this.itemIndex].loseStopPrice = this.loseStopPrice;
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
            // 平仓确定
            makeSure() {
                //判断type选择发送平仓数量
                let sendNumber;
                if(this.type == 'a'){
                    sendNumber = this.number;
                }else if(this.type=='b'){
                    sendNumber = this.averageOrderCount2;
                }

                let sendata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    orderId: this.id,
                    num: sendNumber
                }
                if(this.typeFlag == 2){
                    home.getTradeCover_sl(sendata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            toast('平仓成功');    //平仓成功隐藏dialog,重新获取数据，按钮回到全部平仓
                            this.falgIndex = 1;
                            this.falgIndex2 = 1;
                            this.lists =[];
                            this.getList();
                            this.type = 'a';
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
                }else {
                    home.getTradeCover(sendata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            toast('平仓成功');    //平仓成功隐藏dialog,重新获取数据，按钮回到全部平仓
                            this.falgIndex = 1;
                            this.falgIndex2 = 1;
                            this.lists =[];
                            this.getList();
                            this.type = 'a';
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
            loadTop() {
                this.$refs.loadmore.onTopLoaded();
            },
            //获取List
            getList() {
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    follow: this.follow,
                    status: 2,
                    rows: 10,
                    star: this.star
                }
                // 获取的数据
                if(this.typeFlag == 2){
                    home.getTradeList_sl(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            this.lists = res.data.data;
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
                }else {
                    home.getTradeList(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            this.lists = res.data.data;
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

            }

        },
        mounted() {
            //MessageBox('提示', '操作成功');
            //判断策略列表，1点买 2跟单
            if(this.typeFlag == 1){
                this.follow = 1;
            }else if(this.typeFlag == 2){
                this.follow = 1;
            }else if(this.typeFlag == 3){
                this.follow = 2;
            }
        }
    }
</script>


<style lang="less" scoped>

  @import '../../less/config.less';

  .up {
    color: #ff335b !important;
  }

  .down {
    color: @downColor !important;
  }

  .text-center{
    text-align: center;
  }
  .icon-base{
    width: .37rem;
    height: .37rem;
    position: relative;
    top:0.05rem;
  }
  .settlement {
    margin-bottom: 1.5rem;
    .pershares {
      width: 100%;
      padding: 0 @p30;
      background-color: @FFF;
      margin-bottom: @marginbm;
    }
    .title {
      height: 1.17333rem;
      line-height: 1.17333rem;
      font-size: 0.373333rem;
      color: @fcolor;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .big {
        width: 60%;
        line-height: 0;
        position: relative;
      }
      div {
        position: absolute;
        top: -0.1rem;
        color:@newColor;
      }
      .span {
        position: absolute;
        top: 0.35rem;
        font-size: 0.293333rem;
        color: @nine;
      }
      span {
        color: @Color;
        font-size: 0.32rem;
      }
      .title-number {
        color: @newColor;
      }
      .toSet {
        color: @actColor;
      }
    }
    .content {
      height: 2.56rem;
      line-height: 2;
      font-size: 0.37333rem;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grey {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @nine;
        font-size: 0.32rem;
        .Purchase {
          width: 3.4rem;
        }
        span {
          display: block;
          color: @nine;
          .fllow-icon {
            display: inline-block;
            color: @nine;
            background: @actColor;
            border-radius: 50%;
            width: .37rem;
            height: .37rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.27rem;
          }
        }
        .market-data{
          display: inline-block;
          color: @newColor;
        }
        .red {
          color: #ff335b;
        }
        .dif {
          font-size: 0.37333rem;
        }
      }
      .right {
        width: 1.3333rem;
        height: 1.3333rem;
        line-height: 1.3333rem;
        text-align: center;
        font-size: @f32;
        color: @zero;
        background-color: #ffdd25;
        border-radius: 0.08rem;
      }
    }
    .bottomTitle {
      width: 100%;
      height: 1.1733rem;
      line-height: 1.1733rem;
      position: fixed;
      bottom: 0;
      z-index: 999;
      background-color: @liBg;
      text-align: center;
      font-size: .373333rem;
      color: @fcolor;
      span {
        display: inline-block;
        height: 1.17333rem;
        line-height: 1.17333rem;
        color: #ff335b;
      }
    }
  }

  .swalAlert {
    background: rgba(97, 96, 96, 0.75);
    width: 100%;
    position: fixed;
    height: 100%;
    z-index: 1000;
    top: 0;
    display: block;
    .swalAlertT {
      width: 8.6rem;
      height: 5.173333rem;
      border-radius: 0.32rem;
      background: #fff;
      margin: 3rem auto;
      color: #333;
      font-size: @p30;
      .swalTitle {
        height: 1.36rem;
        line-height: 1.36rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid @ddd;
      }
      .swalCenter {
        height: 2.64rem;
        border-bottom: 1px solid @ddd;
      }
      .swalCenter {
        padding: .35rem .34rem;
        font-size: .38rem;
        .minus-btn, .add-btn {
          display: inline-block;
          border: 1px solid #ddd;
          width: .64rem;
          height: .64rem;
          line-height: .64rem;
          text-align: center;
          border-radius: 6px;
          color: #007aff;
        }
        .num-input {
          border: 1px solid #ddd;
          width: 2.3rem;
          margin: 0 .1rem;
          text-align: center;
          padding: .08rem 0;
          border-radius: 4px;
        }
        .item1 {
          margin-bottom: .46rem;

        }
        .img-icon {
          display: inline-block;
          margin-right: .3rem;
          width: .4rem;
          height: .4rem;
        }
      }
      .swalbottom {
        span {
          display: inline-block;
          width: 49.9%;
          float: left;
          line-height: 1.1733333rem;
          text-align: center;
          color: @blue;
          font-size: @f34;
        }
        span:nth-child(1) {
          border-right: 1px solid @ddd;
        }
      }
    }

  }
  .mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }


  .model {
    position: fixed;
    z-index: 1001;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.3rem;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    .model-header {
      padding: .75rem 0;
      color: #333;
      font-size: @f34;
      text-align: center;
      line-height: 0.7rem;
    }
    .model-footer {
      height: 1.173333rem;
      line-height: 1.173333rem;
      color: #037bff;
      font-size: 0;
      text-align: center;
      border-top: 1px solid #ddd;
      span {
        font-size: @f34;
        width: 50%;
        display: inline-block;
        box-sizing: border-box;
      }
    }
  }

  .cell{
    position: relative;
    display: flex;
    align-items: center;
    span{
      font-size: .5rem;
    }
    .first-title{
      margin-right: .29rem;
    }
  }
  .item-btn{
    width: .64rem;
    height:.64rem;
  }
</style>
