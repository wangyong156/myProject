<template>
  <div class="wraps">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span class="headerTitle">
			<!--<span :class="{'active':Active}" @click="toActiveTitle">{{quoteTitle}}</span>-->
        <span :class="{'active':Active}">{{quoteTitle}}</span>
			  <span :class="{'active':!Active}" @click="toActiveTitles">{{holdTitle}}</span>
			</span>
      <span class="rule" @click="theRule">规则</span>
    </div>
    <v-ContentHead>
      <div class="wrap">
        <div class="topTitle" :class="QUOTE_DATA.changeValue<0?'actionGreen':'actionRed'">
          <span class="topTitleName" @click='toTab'>{{name + '' + code + '' + contract}}</span>
          <img v-show="falg==1" @click='toTab' src="../../img/trade_title_pupdown@2x.png"/>
          <img v-show="falg==0" @click='toTab' src="../../img/trade_title_pupup@2x.png"/>
          <span class="swing">{{QUOTE_DATA.changeQuote }}</span>
          <span class="swing">{{QUOTE_DATA.changeValue}}</span>
          <span class="swing">{{QUOTE_DATA.newPrice}}</span>
        </div>
        <ul class="topTitleList" v-show="falg==0">
          <li v-for='(item,index) in tabs' @click='toActive(item.code,item.id,item.contract,$event)'>{{item.name}}</li>
        </ul>
        <div class="mod-lines"
             :class="{'act-sline': currType=='sline','act-kline':currType=='kline','act-tline':currType=='tline'}">
          <div class="topTitleATab">
            <div class="topTitleTab">
              <span :class="{'active':currType=='sline'}" @click="switchPanel('sline')">分时</span>
              <span @click="switchPanel('kline')" :class="{'active':currType=='kline'}">
                  <i>{{klineInfo.name}}</i>
                  <img id="pointing" src="../../img/trade_dayline_pupdown@2x.png"/>
                </span>
              <span :class="{'active':currType=='tline'}" @click="switchPanel('tline')">闪电</span>
              <span :class="{'active':currType=='pline'}" @click="handicap">盘口</span>
            </div>
            <ul v-show="falgIndexshow" class="ktab">
              <li v-for='(item,index) in tabes' @click='typeTemp(index,$event)'>{{item.name}}</li>
            </ul>

            <ul class="handicapList" v-show="currType=='pline'">
              <li>
                <p class='handicapLeft'>
                  <span class="left">开盘</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.openPrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.openPrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.openPrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.openPrice}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">昨收</span>
                  <span class="right white">{{QUOTE_DATA.yesterdayPrice}}</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">涨跌</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.newPrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.newPrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.newPrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.changeValue}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">涨幅</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.newPrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.newPrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.newPrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.changeQuote}}</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">最高</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.highPrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.highPrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.highPrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.highPrice}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">最低</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.lowPrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.lowPrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.lowPrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.lowPrice}}</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">涨停</span>
                  <span class="right white">{{QUOTE_DATA.upperPrice}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">跌停</span>
                  <span class="right white">{{QUOTE_DATA.downPrice}}</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">今结</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.settlePrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.settlePrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.settlePrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.settlePrice}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">昨结</span>
                  <span class="right"
                        :class="{ red: (QUOTE_DATA.presettlePrice > QUOTE_DATA.yesterdayPrice || QUOTE_DATA.presettlePrice == QUOTE_DATA.yesterdayPrice) , green: QUOTE_DATA.presettlePrice < QUOTE_DATA.yesterdayPrice}">{{QUOTE_DATA.presettlePrice}}</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">持仓</span>
                  <span class="right white">{{QUOTE_DATA.holding}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">昨持仓</span>
                  <span class="right white">--</span>
                </p>
              </li>
              <li>
                <p class='handicapLeft'>
                  <span class="left">总手</span>
                  <span class="right white">{{QUOTE_DATA.total}}</span>
                </p>
                <p class='handicapRight'>
                  <span class="left">金额</span>
                  <span class="right white">{{QUOTE_DATA.amount}}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="line-content">
            <div class="quote-wrap">
              <ul class="clearfix">
                <li id="sline-wrap-chart"></li>
                <li id="tline-wrap-chart"></li>
                <li id="kline-wrap-chart"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bottom-buy">
          <div class="topTitle tc" style="background:#FFF;border-bottom:1px solid #ddd;" v-show="!isLogin"
               @click="goToLogin">
            <span class="isLogin">请先登录</span>
          </div>
          <div class="topTitle" style="background:#FFF;border-bottom:1px solid #ddd;" v-show="isLogin">
            <span class="commoProfit">持仓盈亏:&nbsp;&nbsp; <i :class="profitColorFn()">{{commoProfit}}</i>&nbsp;元</span>
            <span class="chartBom">{{holdingNumStr}}</span>
          </div>
          <div class="buySellNum">
            <span class="buySellred"><i></i></span>
            <span class="buyNum">{{this.futureInfo.buyNum}}</span>
            <span style="color:#CCC;">买卖量</span>
            <span class="sellNum">{{this.futureInfo.sellNum}}</span>
            <span class="buySellgreen"><i></i></span>
          </div>
          <div class="theTwoBtn">
        <span class="btn buyTop" @click="goBuy('rise')">
          <img src='../../img/arrow_up@2x.png'>
          <span>买涨</span>
          <span>{{bp1}}</span>
        </span>
            <span class='btn buyDown' @click="goBuy('minus')">
            <img src='../../img/arrow_down@2x.png'>
            <span>买跌</span>
            <span>{{ap1}}</span>
        </span>
          </div>
          <div class='usefulTime'>{{tips}}</div>
        </div>
      </div>
    </v-ContentHead>
    <div class="modal" v-show="falgIndexshow"></div>
  </div>
</template>

<script>
    import ContentHead from '@/components/ContentHead'
    import {toast} from '@/util/index'
    import trade from '@/api/home/index'
    import './otc.js'

    export default {
        data() {
            return {
                J: {},
                falg: 1,
                Active: true, // true 显示行情页面  false 显示下单页面
                isLogin: false, // true 已登录  false 未登录
                falgIndexshow: false,
                name: '',
                code: '',
                contract: '',
                currType: "sline",
                id: 0,
                tabs: [],
                outListTabs: [], //国际期货
                inListTabs: [],   //国内期货
                klineInfo: {
                    name: "日线",
                    type: "D1",
                    dt: "YMD",
                    timestamp: 0,
                    data: []
                },
                currKLineIndex: 0,
                tabes: [
                    {
                        name: "日线",
                        type: "D1",
                        dt: "YMD",
                        timestamp: 0,
                        data: []
                    },
                    {
                        name: "1分钟",
                        type: "M1",
                        dt: "hm",
                        timestamp: 6e4,
                        data: []
                    },
                    {
                        name: "3分钟",
                        type: "M3",
                        dt: "hm",
                        timestamp: 18e4,
                        data: []
                    },
                    {
                        name: "5分钟",
                        type: "M5",
                        dt: "hm",
                        timestamp: 3e5,
                        data: []
                    },
                    {
                        name: "15分钟",
                        type: "M15",
                        dt: "hm",
                        timestamp: 9e5,
                        data: []
                    },
                    {
                        name: "30分钟",
                        type: "M30",
                        dt: "hm",
                        timestamp: 9e5,
                        data: []
                    },
                    {
                        name: "60分钟",
                        type: "M60",
                        dt: "hm",
                        timestamp: 9e5,
                        data: []
                    }],
                holidays: {
                    CNY: {},
                    USD: {}
                },
                TRADEPERIOD: {},
                PERIOD: {},
                currencyType: "CNY",
                commodityTitles: {
                    /*MHI: "小恒指",
                    HSI: "恒指",
                    GC: "美黄金",
                    SI: "美白银",
                    CL: "美原油",
                    CN: "富时A50",
                    DAX: "德指"*/
                },
                isTrade: !1,
                tips: "",
                isFirstFuturesQuote: !0,
                isLoadFuturesQuote: !0,
                QUOTE_DATA: {},
                futureInfo: {},
                isInPeriods: !1,
                tChart: '',
                sChart: '',
                kChart: '',
                CACHE_KLINE: [],
//        uuid: 'akjsdiwewi82kj43i8xck',
                status: 1,
                ap1: '',
                bp1: '',
                commoProfit: '--',
                holdingNumStr: '',
                isReal: true, // 是否实盘 true 实盘  false 模拟盘
                quoteTitle: "实盘行情",
                holdTitle: "实盘持仓",
                timer: "" ,// 请求最新价定时器
                chartOptes :{},
            }
        },
        components: {
            'v-ContentHead': ContentHead
        },
        methods: {
            /** 工具方法 start */
            setCurrentCurrencyType(type) {
                this.currencyType = type
            },
            setHoliday(holiday) {
                this.holidays[this.currencyType] = holiday
            },
            setTradePeriod(period) {
                this.TRADEPERIOD = period
            },
            setQuotePeriod(period, type) {
                this.PERIOD[type] = period
            },
            isHoliday(time) {
                time && !this.J.isDate(time) && (time = new Date(time));
                let holiday = this.holidays[this.currencyType],
                    now = time || new Date(),
                    year = holiday[now.getFullYear()];
                if (!year) return !1;
                let month = year[now.getMonth() + 1];
                if (!month) return !1;
                let date = now.getDate();
                return month.indexOf(date) != -1
            },
            isWeekend(time) {
                time = time || new Date(),
                    time = this.J.isDate(time) ? time : new Date(time);
                let t = time.getDay();
                return 0 === t || 6 === t
            },
            parseHoliday(str) {
                if (str) {
                    let h = {},
                        arr = str.split(",");
                    return $.each(arr, function (i, dateStr) {
                        let dateArr = dateStr.split("-"),
                            year = dateArr[0] - 0,
                            month = dateArr[1] - 0,
                            day = dateArr[2] - 0;
                        h[year] ? h[year][month] ? h[year][month].push(day) : h[year][month] = [day] : (h[year] = {},
                            h[year][month] = [day])
                    }),
                        h
                }
            },
            parsePeriod(strPeriod) {
                if (strPeriod) {
                    let outer = strPeriod.split(";"),
                        retOuter = [];
                    return $.each(outer, function (i, str) {
                        let inner = str.split("|"),
                            retInner = [];
                        $.each(inner, function (i, time) {
                            let times = time.split(",");
                            4 == times[0].length && (times[0] = "0" + times[0]),
                            4 == times[1].length && (times[1] = "0" + times[1]),
                                retInner.push(times)
                        }),
                            retOuter.push(retInner)
                    }),
                    1 == retOuter.length && (retOuter = retOuter[0]),
                        retOuter
                }
            },
            getQueryPeriod(commNo, type) {
                return "trade" == type ? this.TRADEPERIOD : this.PERIOD[commNo]
            },
            getRealPeriod(commNo, time, type) {
                let prevTime, nextTime, period = this.getQueryPeriod(commNo, type),
                    i = 0;
                if (this.J.isArray(period[0][0])) for (; ;) {
                    if (prevTime = period[i], nextTime = period[i + 1], !nextTime) return prevTime;
                    let bbt = prevTime[0][0].replace(":", "") - 0,
                        ebt = nextTime[0][0].replace(":", "") - 0;
                    if (time >= bbt && time < ebt) return prevTime;
                    i++
                }
                return period
            },
            isInPeriod(commNo, type) {
                let now = new Date(),
                    day = now.getDay(),
                    isIn = !1;
                if (0 == day) return isIn;
                let prevDay = new Date().setDate(now.getDate() - 1),
                    prevIsHoliday = this.isHoliday(prevDay),
                    isHoliday = this.isHoliday(),
                    time = this.J.formatDate(now, "h:m"),
                    period = this.getRealPeriod(commNo, time.replace(":", "") - 0, type);
                return $.each(period, function (i, t) {
                    let bTime = t[0],
                        eTime = t[1];
                    "00:00" === bTime && time >= bTime && time < eTime ? prevIsHoliday || 1 == day || (isIn = !0) : 6 != day && time >= bTime && time < eTime && (isIn = !isHoliday)
                }),
                    isIn
            },
            getTipsForNextTime(commNo) {
                let that = this;

                function nextTradeDay() {
                    let day = 0;
                    do day++,
                        now.setDate(now.getDate() + 1);
                    while (that.isWeekend(now) || that.isHoliday(now));
                    nextTime = beginTime,
                        nextDay = day <= 1 ? "明天" : that.J.formatDate(now, "M月D日")
                }

                let now = new Date(),
                    time = that.J.formatDate(now, "h:m"),
                    _period = [],
                    period = that.getQueryPeriod(commNo, "trade");
                that.J.isArray(period[0][0]) ? $.each(period, function (i, arr) {
                    _period = _period.concat(arr)
                }) : _period = period;
                let i, nextTime, len = _period.length;
                for (i = 0; i < len; i++) {
                    let timePeriod = _period[i],
                        bt = timePeriod[0];
                    if ("00:00" !== bt && time < bt) {
                        nextTime = bt;
                        break
                    }
                }
                let beginTime = _period[0][0],
                    endTime = _period[_period.length - 1][1],
                    nextDay = "今天";
                return (that.isWeekend(now) || that.isHoliday(now) || endTime > beginTime && time >= endTime) && nextTradeDay(),
                "下次交易时间为" + nextDay + nextTime
            },
            getTipsForTradeStopTime(commNo) {
                let now = new Date(),
                    time = this.J.formatDate(now, "h:m"),
                    period = this.getRealPeriod(commNo, time.replace(":", "") - 0, "trade"),
                    stopTime = period[period.length - 1][1];
                return "持仓时间至" + stopTime
            },
            uuiddom(len) {
                let r = "0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3this.Jx4Yy5Zz6789",
                    l = r.length,
                    ret = "";
                for (len = len || 20; len--;) ret += r.charAt(Math.random() * l | 0);
                return ret
            },
            beyondTradeTimeTips(commNo) {
                let i, len, sc, _period = [],
                    str = [],
                    period = this.getQueryPeriod(commNo, "trade"),
                    head = "非交易时间不可交易<br><br>【{{COMMNO}}的买入时间】<br>",
                    /*commodity = {
                        HSI: "恒指",
                        GC: "美黄金",
                        SI: "美白银",
                        CL: "美原油",
                        CN: "富时A50",
                        DAX: "德指",
                        MHI: "小恒指"
                    };*/
                    commodity = this.commodityTitles;
                if (!this.J.isArray(period)) return "";
                for (this.J.isArray(period[0][0]) ? $.each(period, function (i, arr) {
                    _period = _period.concat(arr)
                }) : _period = period, len = _period.length, i = 0; i < len; i++) {
                    let timePeriod = _period[i],
                        bt = timePeriod[0],
                        et = timePeriod[1];
                    "24:00" == et && _period[i + 1] && "00:00" == _period[i + 1][0] ? (str.push(bt + " - " + _period[i + 1][1] + "<br>"), i++) : str.push(bt + " - " + et + "<br>")
                }
                return sc = head + str.join("") + "（周末及节假日休市）",
                    sc.replace("{{COMMNO}}", commodity[commNo])
            },
            allObject() {
                let chartOpts = this.chartOptes;
                return chartOpts;
            },
            isIntl(commNo) {
                return "GC" == commNo || "CL" == commNo || "SI" == commNo || "DAX" == commNo
            },
            resize() {
                let els = ["#sline-wrap-chart", "#kline-wrap-chart", "#tline-wrap-chart"],
                    height = $(window).height(),
                    isIOS = $("html").hasClass("platform-ios");
                var top1 = $(".header").height();
                var top2 = $(".topTitle").height();
                var top3 = $(".topTitleTab").height();
                var bottom = $(".bottom-buy").height();
                var h = height - top1 - top2 - top3 - bottom;
                els.forEach(function (id) {
                    /*var top = isIOS ? 145 : 125,
                      bottom = 144,
                      h = height - top - bottom - 5;*/
                    $(id).height(h)
                })
            },
            /** 共计方法 end */

            // 品种切换
            toActive(code, id, contract, event) {

                if (this.isReal) {
                    this.$router.push({path: '/mid', query: {id: id, type: 1}})
                } else {
                    this.$router.push({path: '/mid', query: {id: id, type: 0}})
                }
            },
            // 持仓盈亏字体颜色
            profitColorFn(){
                if(this.commoProfit == '--' || this.commoProfit == 0){
                    return "";
                }else if(this.commoProfit < 0){
                    return "down";
                }else if(this.commoProfit > 0){
                    return "up";
                }
            },

            toTab() {
                if (this.falg == 1) {
                    this.falg = 0;
                } else {
                    this.falg = 1;
                }
            },
            back() {
                //this.$router.back(-1)
                this.$router.push({"path": "/home"});
            },
            toActiveTitle(event) {
                if (event.target.innerText == '实盘行情' || event.target.innerText == '模拟行情') {
                    this.Active = false;
                }
                if (this.isReal) {
                    this.$router.push({path: '/firmOffer', query: {id: this.id, type: 1}})
                } else {
                    this.$router.push({path: '/firmOffer', query: {id: this.id, type: 0}})
                }
            },
            toActiveTitles(event) {
                if (event.target.innerText == '实盘持仓' || event.target.innerText == '模拟持仓') {
                    this.Active = true;
                }
                if (this.isReal) {// 跳转实盘持仓页面
                    this.$router.push({
                        path: '/trade_re',
                        query: {
                            'id': this.id,
                            'name': this.name,
                            'code': this.code,
                            'contract': this.contract
                        }
                    })
                } else { // 跳转模拟盘持仓页面
                    this.$router.push({
                        path: '/trade_sl',
                        query: {
                            'id': this.id,
                            'name': this.name,
                            'code': this.code,
                            'contract': this.contract
                        }
                    })
                }
            },
//      gernerateIds() {
//        return "sline-wrap-" + this.uuid;
//      },
//      gernerateIdt() {
//        return "tline-wrap-" + this.uuid;
//      },
//      gernerateIdk() {
//        return "kline-wrap-" + this.uuid;
//      },
            tradeName() {
                let that = this,
                    isReal = parseInt(this.$route.query.type);
                this.id = parseInt(this.$route.query.id);
                if (isReal == 0) {
                    that.isReal = false;
                    that.quoteTitle = "模拟行情";
                    that.holdTitle = "模拟持仓";
                } else {
                    that.isReal = true;
                    that.quoteTitle = "实盘行情";
                    that.holdTitle = "实盘持仓";
                }
            },
            // 初始化页面参数
            initBaseData() {
                this.resize();
                // 默认收起K线选项
                this.falg = 1;
                let params = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id,
                    'number': 120
                }
                trade.getRisk(params).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        let riskData = res.data;
                        this.name = riskData.data.name;
                        this.code = riskData.data.code;
                        this.contract = riskData.data.contract;
                        this.klineInfo = this.tabes[this.currKLineIndex];
                        trade.getFuturesQuote(params).then((res) => {
                            this.isLoadFuturesQuote = !0;
                            var data = res.data;
                            if (data.code == 200) {
                                window.localStorage.setItem("token", res.data.hid);
                                this.initRiskParam(riskData);
                                this.processQuoteData(data.data);
                                this.switchPanel("sline");
                                this.commoHolding();
                            } else {
                                toast(data.message);
                            }
                        })
                    } else {
                        toast(res.data.message);
                    }
                })
            },
            handicap() {

                this.falgIndexshow = false;
                document.getElementById('pointing').src = require('../../img/newImg/trade_dayline_pupdown_n@2x.png');
                this.currType = 'pline';
                var height = $(window).height();
                var top1 = $(".header").height();
                var top2 = $(".topTitle").height();
                var top3 = $(".topTitleTab").height();
                var bottom = $(".bottom-buy").height();
                var h = height - top1 - top2 - top3 - bottom;
                $(".handicapList").height(h);
            },
            /*切换k线*/
            typeTemp(index, event) {
                event.stopPropagation();
                this.falgIndexshow = false;
                this.currKLineIndex = index;
                let currKlineObj = this.tabes[index];
                this.klineInfo = currKlineObj,
                    currKlineObj.data.length ? this.kChart.draw(currKlineObj.data) : this.getFuturesKline();


                document.getElementById('pointing').src = require('../../img/trade_dayline_pupdown_s@2x.png');
                $('.ktab li').css('color', '#333');
                $('.ktab li').eq(index).css('color', '#f8cc00');

            },

            getFuturesQuote() {
                let paramsData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id
                }
                this.isTrade ? (this.isInPeriods = this.isInPeriod(this.code, "trade"), this.isInPeriods ? this.tips = "本时段" + this.getTipsForTradeStopTime(this.code) : this.tips = "已休市，" + this.getTipsForNextTime(this.code)) : (this.isInPeriods = !1, this.tips = "暂停交易");
                let isInQuoteTime = this.isInPeriod(this.code, "quote");
                /*flag || isInQuoteTime,*/
                this.isLoadFuturesQuote && isInQuoteTime && (this.isLoadFuturesQuote = !1, trade.getFuturesQuote(paramsData).then((res) => {
                    this.isLoadFuturesQuote = !0;
                    var data = res.data;
                    if (data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        this.processQuoteData(data.data);
                    } else {
                        toast(data.message);
                    }
                }))
            },
            showtt() {
                toast(Math.random())
                let paramsData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id
                }

                if (this.isTrade) {
                    this.isInPeriods = this.isInPeriod(this.code, "trade");
                    if (this.isInPeriods) {
                        this.tips = "本时段" + this.getTipsForTradeStopTime(this.code);
                    } else {
                        this.tips = "已休市，" + this.getTipsForNextTime(this.code);
                    }
                } else {
                    this.isInPeriods = !1;
                    this.tips = "暂停交易";
                }
                let isInQuoteTime = this.isInPeriod(this.code, "quote");
                if (this.isLoadFuturesQuote && isInQuoteTime) {
                    this.isLoadFuturesQuote = !1;

                    trade.getFuturesQuote(paramsData).then((res) => {
                        var data = res.data;
                        if (data.code == 200) {
                            window.localStorage.setItem("token", res.data.hid);
                            this.processQuoteData(data.data);
                        } else {
                            toast(data.message);
                        }
                    })

                }

            },
            // 初始化风控参数
            initRiskParam(datas) {
                let data = datas.data;
                this.isTrade = data.is_trade;
                let holiday = this.parseHoliday(data.holiday),
                    tradeTime = this.parsePeriod(data.trade_time),
                    quoteTime = this.parsePeriod(data.quote_time);
                this.setCurrentCurrencyType(data.currency_type);
                this.setHoliday(holiday);
                this.setTradePeriod(tradeTime);
                this.setQuotePeriod(quoteTime, this.code);
                this.getFuturesQuote();
                window.itemClock1 = setInterval(this.getFuturesQuote,500);
                window.itemClock2 = setInterval(this.commoHolding,3e3);
                /*this.J.engine.addTask(this.getFuturesQuote, 500);
                this.J.engine.addTask(this.commoHolding, 3e3);
                this.J.engine.start();*/
            },
            // 实时行情数据处理
            processQuoteData(data) {
                if (data) {
                    let baseNum = 50,
                        buyNum = this.J.toInt(data.bv1),
                        sellNum = this.J.toInt(data.av1),
                        buyNumRate = buyNum / baseNum * 100,
                        sellNumRate = sellNum / baseNum * 100;

                    buyNumRate > 100 && (buyNumRate = 100),
                    sellNumRate > 100 && (sellNumRate = 100),
                        this.QUOTE_DATA = {
                            commodityTitle: this.commodityTitles[data.ct],
                            contractNo: data.cc,
                            time: data.dt - 0,
                            openPrice: data.op,
                            yesterdayPrice: data.pp,
                            highPrice: data.hp,
                            lowPrice: data.lp,
                            total: this.J.sketchNumber(data.ba, 2), /*总手*/
                            holding: this.J.sketchNumber(data.po, 2), /*持仓*/
                            amount: this.J.sketchNumber(data.bb, 2), /*成交金额*/
                            newPrice: data.np,
                            buyPrice: data.bp1,
                            sellPrice: data.ap1,
                            buyNum: buyNum,
                            sellNum: sellNum,
                            buyNumRate: buyNumRate,
                            sellNumRate: sellNumRate,
                            upperPrice: data.up, /*涨停*/
                            downPrice: data.dp, /*跌停*/
                            settlePrice: data.sp, /*今结*/
                            presettlePrice: data.psp/*昨结*/
                        }
                    /*console.log(this.QUOTE_DATA.newPrice);
                    console.log(data.np,data.pp,'NP PP');
                    console.log((Number(data.np) - Number(data.pp))/Number(data.pp) * 100,'---');*/
                    let swing ,rise_pre;
                    if(data.pp == 0 ){
                        swing = (data.np - data.pp).toFixed(2),
                            rise_pre = 0 + '%';
                    }else{
                        swing = (data.np - data.pp).toFixed(2),
                            rise_pre = ((data.np - data.pp) / data.pp * 100).toFixed(2) + '%';
                    }

                    if (swing > 0) {
                        swing = '+' + swing;
                        rise_pre = '+' + rise_pre;
                    }
                    this.QUOTE_DATA.changeValue = swing;
                    this.QUOTE_DATA.changeQuote = rise_pre;

                    this.bp1 = data.bp1;// 买跌价格
                    this.ap1 = data.ap1;// 买涨价格
                    this.perDrawTick(this.QUOTE_DATA);
                    this.perDrawSline(this.QUOTE_DATA);
                    this.perDrawKline(this.QUOTE_DATA);
                    this.futureInfo = this.QUOTE_DATA;

                    $('.buySellred i').css('width', buyNumRate + '%');
                    $('.buySellgreen i').css('width', sellNumRate + '%');
                }
            },

            getFuturesSline() {
                let paramsData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id,
                    'number': 380
                }
                trade.getFuturesSlineData(paramsData).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        this.drawSline(res.data);
                    } else {
                        toast(res.data.message);
                    }
                })
            },
            perDrawSline(data) {
                let o = {
                    current: this.J.toFloat(data.newPrice),
                    volume: 0,
                    time: this.J.formatDate(data.time, "hm") - 0
                };

                this.sChart || (this.sChart = new this.J.Sline(this.allObject().sline[this.code]));

                this.sChart.perDraw(o, {
                    close: this.J.toFloat(data.yesterdayPrice),
                    high: this.J.toFloat(data.highPrice),
                    low: this.J.toFloat(data.lowPrice),
                    quoteTime: o.time,
                    code: this.code,
                    period: this.getRealPeriod(this.code, o.time),
                    isIntl: this.isIntl(this.code)
                })
            },
            drawSline(datas) {
                if (this.QUOTE_DATA) {
                    let lastTime, slineData = {}, that = this;
                    $.each(datas.data, function (i, v) {
                        lastTime = that.J.formatDate(v.dt, "hm") - 0;
                        slineData[lastTime] = {
                            current: that.J.toFloat(v.np),
                            volume: 0,
                            time: lastTime
                        }
                    })

                    this.sChart || (this.sChart = new that.J.Sline(this.allObject().sline[this.code]));
                    this.sChart.draw({
                        data: slineData,
                        close: that.J.toFloat(this.QUOTE_DATA.yesterdayPrice),
                        high: that.J.toFloat(this.QUOTE_DATA.highPrice),
                        low: that.J.toFloat(this.QUOTE_DATA.lowPrice),
                        quoteTime: lastTime,
                        code: this.code,
                        period: this.getRealPeriod(this.code, lastTime),
                        isIntl: this.isIntl(this.code)
                    })
                }
            },

            getFuturesKline() {
                let paramsData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id,
                    'type': this.klineInfo.type,
                    'number': 380
                }
                trade.getFuturesKline(paramsData).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        this.drawKline(res.data);
                    } else {
                        toast(res.data.message);
                    }
                })
            },
            perDrawKline(data) {
                if (0 !== data.newPrice) {
                    let that = this;
                    $.each(that.tabes, function (i, item) {
                        var last, nextTime, o;
                        item.data.length && (last = item.data[item.data.length - 1], "D1" === item.type ? (o = {
                            timestamp: data.time,
                            time: that.J.formatDate(data.time, item.dt),
                            open: data.openPrice,
                            high: data.highPrice,
                            low: data.lowPrice,
                            price: data.newPrice
                        },
                            last.time === o.time ? item.data[item.data.length - 1] = o : item.data.push(o)) : (nextTime = last.timestamp + item.timestamp, data.time <= nextTime ? item.data[item.data.length - 1] = {
                            timestamp: last.timestamp,
                            time: that.J.formatDate(data.time, item.dt),
                            open: last.open,
                            high: Math.max(data.newPrice, last.high),
                            low: Math.min(data.newPrice, last.low),
                            price: data.newPrice
                        } : item.data.push({
                            timestamp: data.time,
                            time: that.J.formatDate(data.time, item.dt),
                            open: data.newPrice,
                            high: data.newPrice,
                            low: data.newPrice,
                            price: data.newPrice
                        })))
                    });
                    let currKlineObj = this.tabes[this.currKLineIndex];
                    this.kChart && this.kChart.draw(currKlineObj.data);
                }
            },
            drawKline(dataStr) {
                let myKdata = [], that = this;
                $.each(dataStr.data, function (i, v) {
                    let o = {
                        time: that.J.formatDate(v.dt - 0, that.klineInfo.dt),
                        open: that.J.toFloat(v.op),
                        high: that.J.toFloat(v.hp),
                        low: that.J.toFloat(v.lp),
                        price: that.J.toFloat(v.cp)
                    };
                    myKdata.push(o);
                }),
                this.kChart || (this.kChart = new that.J.Kline(this.allObject().kline[this.code]));
                this.kChart.draw(myKdata);
                this.tabes[this.currKLineIndex].data = myKdata;
            },
            /*闪电*/
            drawTick() {
                this.tChart = new this.J.Tick(this.allObject().tline[this.code]);
                this.tChart.draw({
                    time: this.QUOTE_DATA.time,
                    price: this.J.toFloat(this.QUOTE_DATA.newPrice)
                })
            },
            perDrawTick(data) {
                this.tChart && this.tChart.draw({
                    time: data.time,
                    price: this.J.toFloat(data.newPrice)
                })
            },
            switchPanel(type) {
                if(  document.getElementById('pointing').src == require('../../img/trade_dayline_pupup_s@2x.png')){
                    this.falgIndexshow = false;
                    document.getElementById('pointing').src = require('../../img/trade_dayline_pupdown_s@2x.png');
                }else{
                    this.currType = type;
                    if ("kline" == type) {
                        this.falgIndexshow = true;
                        document.getElementById('pointing').src = require('../../img/trade_dayline_pupup_s@2x.png');
                    } else {
                        this.falgIndexshow = false;
                        document.getElementById('pointing').src =  require('../../img/newImg/trade_dayline_pupdown_n@2x.png');
                    }
                    "sline" != type ? "tline" != type ? "kline" != type || this.getFuturesKline() : this.drawTick() : this.getFuturesSline()
                }

            },

            theRule() {
                this.$router.push({
                    path: '/ruleA',
                    query: {
                        'id': this.id,
                        'name': this.name,
                        'code': this.code,
                        'contract': this.contract
                    }
                });
            },
            goBuy(index) {
                if (!this.isLogin) {
                    toast("请先登录");
                    var that = this;
                    setTimeout(function () {
                        that.$router.push({path: '/login'})
                    }, 1000);
                    return false;
                }
                if (index == 'rise') {
                    this.status = 1;
                } else {
                    this.status = 2;
                }
                if (this.isReal) { // 实盘下单
                    this.$router.push({
                        path: '/buyOnce',
                        query: {
                            'id': this.id,
                            'status': this.status
                        }
                    });
                } else { // 模拟盘下单
                    this.$router.push({
                        path: '/buyOnce_sl',
                        query: {
                            'id': this.id,
                            'status': this.status
                        }
                    });
                }
            },
            /*登录后可见*/
            goToLogin() {
                this.$router.push({path: '/login'});
            },
            isStart() {
                let getItemUser = window.localStorage.getItem("userId");
                if (getItemUser == null) {
                    this.isLogin = false;
                } else {
                    this.isLogin = true;
                }
            },
            commoHolding() {
                let prameData = {
                    'HUIMI_SESSIONID': window.localStorage.getItem("token"),
                    'HUIMI_USERID': window.localStorage.getItem("userId"),
                    'commoId': this.id
                }
                // 未登录不请求
                if(!this.isLogin){
                    return;
                }

                if (this.isReal) {// 实盘持仓情况
                    trade.commoHolding(prameData).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem("token", res.data.hid);
                            this.isLogin = true;
                            let data = res.data.data;
                            if (data.list.length != 0) {
                                this.commoProfit = 0;
                                let commoNum = 0, that = this;
                                $.each(data.list, function (i, v) {
                                    commoNum += v.n;
                                    if (v.d == 1) {
                                        that.commoProfit += (that.QUOTE_DATA.newPrice - v.p) / data.wp * data.pv * data.ex * v.n;
                                    } else {
                                        that.commoProfit += (v.p - that.QUOTE_DATA.newPrice) / data.wp * data.pv * data.ex * v.n;
                                    }
                                })
                                that.commoProfit = that.commoProfit.toFixed(2)*100/100;
                                that.holdingNumStr = '当前品种持仓数量：' + commoNum + '手';
                            } else {
                                this.holdingNumStr = '当前品种没有持仓数据';
                                this.commoProfit = '--';
                            }
                        } else if (res.data.code == 401) {
                            this.isLogin = false;
                        } else {
                            toast(res.data.message);
                        }
                    })
                } else {// 模拟盘持仓情况
                    trade.commoHolding_sl(prameData).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem("token", res.data.hid);
                            this.isLogin = true;
                            let data = res.data.data;
                            if (data.list.length != 0) {
                                this.commoProfit = 0;
                                let commoNum = 0, that = this;
                                $.each(data.list, function (i, v) {
                                    commoNum += v.n;
                                    if (v.d == 1) {
                                        that.commoProfit += (that.QUOTE_DATA.newPrice - v.p) / data.wp * data.pv * data.ex * v.n;
                                    } else {
                                        that.commoProfit += (v.p - that.QUOTE_DATA.newPrice) / data.wp * data.pv * data.ex * v.n;
                                    }
                                })
                                that.commoProfit = that.commoProfit.toFixed(2)*100/100;
                                that.holdingNumStr = '当前品种持仓数量：' + commoNum + '手';
                            } else {
                                this.holdingNumStr = '当前品种没有持仓数据';
                                this.commoProfit = '--';
                            }
                        } else if (res.data.code == 401) {
                            this.isLogin = false;
                        } else {
                            toast(res.data.message);
                        }
                    })
                }
            }
        },
        mounted() {
            this.chartOptes = JSON.parse(localStorage.getItem('chartOptes'));
            this.commodityTitles = this.chartOptes.commodityTitles;
            this.tabs = this.chartOptes.tabs;
            this.J = new a();
            this.isStart();
            /*判断当前用户是否登录*/
            this.tradeName();
            this.initBaseData();
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '交易';
            next();
        },
        beforeRouteLeave(to, from, next) {
            // 清除定时器
//      this.J.engine.destroy();
            clearInterval(window.itemClock1);
            clearInterval(window.itemClock2);
            next();
        },
        beforeDestroy(){
            clearInterval(window.itemClock1);
            clearInterval(window.itemClock2);
        }
    }
</script>


<style lang="less" scoped>
  @import '../../less/config.less';

  .up{
    color:#ff335b !important;
  }
  .down{
    color: @downColor !important;
  }
  .white{
    color: @newColor;
  }
  .wraps {
    width: 100%;
    height: 100%;
    background: #ddd;
    .header {
      background-color: @FFF;
      padding: 0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.30667rem;
      color: @newColor;
      font-size: .48rem;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 333;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      .headerTitle {
        display: block;
        font-size: @f26;
        width: 3.68rem;
        height: 0.69333rem;
        line-height: 0.69333rem;
        border-radius: 0.08rem;
        span {
          display: inline-block;
          width: 50%;
          height: 100%;
          float: left;
          text-align: center;
          color:@newColor;
          border: 1px solid @ddd;
          border-left: none;
          border-radius: 0 .08rem .08rem 0;
        }
        .active {
          color: @newColor;
          background: @actColor;
          border: 1px solid @actColor;
          border-radius: .08rem 0  0 .08rem;
        }
      }
      .rule {
        font-size: @f26;
      }
    }
    .wrap {
      position: relative;
      background: @changeColor;
      .actionGreen {
        background-color: @green;
      }
      .actionRed {
        background-color: @titleColor;
      }
      .topTitle, .action {
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.4rem;
        color: @FFF;
        .topTitleName {
          display: inline-block;
          font-size: @f28;
        }
        img {
          display: inline-block;
          margin-left: 0.1rem;
          width: 0.26666rem;
          height: 0.26666rem;
        }
        .swing {
          float: right;
          margin-right: 0.2rem;
        }
        .active {
          color: @actColor;
          /*border-bottom: 4px solid @actColor;*/
        }
      }
      .mod-lines.act-sline .line-content .quote-wrap {
        margin-left: 0;
      }

      .mod-lines.act-tline .line-content .quote-wrap {
        margin-left: -100%;
      }

      .mod-lines.act-kline .line-content .quote-wrap {
        margin-left: -200%;
      }
      .line-content {
        width: 100%;
        /*height: 10.2rem;*/
        overflow: hidden;
        background-color: @ddd;
        .quote-wrap {
          width: 300%;
          /*height: 10.2rem;*/
          .clearfix {
            width: 100%;
            /*height: 10.2rem;*/
            li {
              width: 33.333333333333%;
              float: left;
              /*height: 10.2rem;*/
            }
          }
        }
      }
      .topTitleList {
        position: absolute;
        /*top: 2.12rem;*/
        width: 100%;
        height: 6.92rem;
        overflow: auto;
        background: @FFF;
        z-index: 1000;
        li {
          width:49%;
          line-height: 1.173333rem;
          text-align: center;
          font-size: @f32;
          color: @newColor;
          float:left;
          border-bottom: 1px solid #ddd;
        }
        li:nth-child(odd){
          border-right:1px solid #ddd;
        }
        .active {
          color: @changeColor;
          background: @fcolor;
        }
      }
      .topTitleATab {
        position: relative;
        #pointing {
          display: inline-block;
          width: 0.3733333rem;
          height: 0.373333rem;
        }
        .ktab:after{
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background: @fColor;
          transform: scaleY(0.5);
        }
        .ktab {
          position: relative;
          width: 100%;
          height: 0.88rem;
          line-height: 0.88rem;
          background: @FFF;
          padding: 0 0.4rem;
          font-size: @f28;
          color: @newColor;
          position: absolute;
          // top: 1.15rem;
          z-indx: 123;
          li {
            float: left;
            margin-right: 0.25rem;
          }
          li:nth-child(1) {
            color: @actColor;
          }
        }
      }
      .handicapList {
        position: absolute;
        top: 1.15rem;
        width: 100%;
        /*height: 10.2rem;*/
        background: @FFF;
        overflow: scroll;
        li:first-child{
          border-top: 1px solid @ddd;
        }
        li {
          width: 100%;
          height: 1.33333rem;
          line-height: 1.33333rem;
          border-bottom: 1px solid @ddd;
          float: left;
          color: @huiColor;
          p {
            width: 49.5%;
            height: 100%;
            float: left;
          }
          .handicapLeft {
            border-right: 1px solid @ddd;
          }
          span {
            display: inline-block;
          }
          .left {
            float: left;
            font-size: @f24;
            color:@newColor;
            margin-left: 0.4rem;
          }
          .right {
            float: right;
            font-size: @f32;
            margin-right: 0.4rem;

          }
        }
      }
      .topTitleTab {
        padding: 0 0.4rem;
        height: 1.15rem;
        background: @FFF;
        /*border-bottom: 1px solid @ddd;*/
        span {
          display: inline-block;
          margin-right: 0.3rem;
          height: 1.09333rem;
          line-height: 1.09333rem;
          color: @newColor;
          font-size: 0.37333rem;
        }
        .active {
          color: @actColor;
          border-bottom: 2px solid @actColor;
          line-height: 2.3;
        }
      }
      .chartBom {
        color: @nine;
        float: right;
      }
      .isLogin {
        color: @actColor;
      }
      .buySellNum {
        line-height: 0.88rem;
        text-align: center;
        background: @FFF;
        span {
          display: inline-block;
        }
        .buySellred, .buySellgreen {
          width: 3rem;
          height: 0.1rem;
        }
        .buySellred i {
          display: block;
          height: 90%;
          width: 30%;
          background: @red;
          float: right;
          margin-top: -2%;
        }
        .buyNum {
          color: @red;
          margin-right: 0.2rem;
        }
        .sellNum {
          color: @green;
          margin-left: 0.2rem;
        }
        .buySellgreen i {
          display: block;
          height: 90%;
          width: 20%;
          background: @green;
          margin-top: -2%;
        }
      }
      .theTwoBtn {
        display: flex;
        padding: 0 0.6rem;
        .btn {
          display: inline-block;
          flex: 1;
          height: 1.06666rem;
          line-height: 1.06666rem;
          border-radius: 0.08rem;
          text-align: center;
          font-size: @f28;
          color: @fcolor;
        }
      }
      .buyTop {
        background: @red;
        margin-right: 0.666666rem;
        img {
          width: 0.32rem;
          height: 0.32rem;
        }
      }
      .buyDown {
        background: @green;
        img {
          width: 0.32rem;
          height: 0.32rem;
        }
      }
      .usefulTime {
        font-size: @f24;
        color: @nine;
        text-align: center;
        //margin: 0.2666rem 0;
        height: 0.9rem;
        line-height: 0.9rem;
      }
    }
    .bottom-buy {
      background-color: @FFF;
      margin-top: .15rem;
      /*position:fixed;
      bottom:0rem;
      left:0;
      right:0;*/
      .topTitle{
        height: .8rem;
        line-height: .8rem;
      }
    }
  }
  .commoProfit{
    color: @nine;
  }
  .modal{
    background: rgba(97, 96, 96, 0.6);
    width: 100%;
    position: fixed;
    height: 100%;
    z-index: 1000;
    top: 4.3rem;
    display: block;
  }
</style>
