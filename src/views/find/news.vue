<template>
  <div class="content">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>资讯</span>
      <span class="img"></span>
    </div>
    <v-Content>
      <div class="loading-ct" v-show="LoadingTrue">
        <img src="../../img/loadingIcon.gif" alt="">
      </div>

      <ul class="news-list">
        <!--<li  v-for="item in newsList" class="base-list">-->
        <!--<img  class="icon"  src="../../img/news_point@2x.png"/>-->
        <!--<p class="time">2015-00</p>-->
        <!--<tr>-->
        <!--<th>{{item.content}}</th>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>前值:-0.9%</td>-->
        <!--<td>预期:-0.9%</td>-->
        <!--<td>实际:-0.9%</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>star:1</td>-->
        <!--<td></td>-->
        <!--<td>利空金银</td>-->
        <!--</tr>-->
        <!--</li>-->
        <li v-for="item in newsList" class="base-list">
          <template v-if="item.type == 1">
            <div class="start-list">
              <div class="start-ct">
                <img class="icon" src=""/>
                <p class="time">{{item.time}}</p>
                <tr class="title">
                  <th>{{item.content}}</th>
                </tr>
                <tr>
                  <td>前值:{{item.expected}}
                    <p><img class="star-icon" :src="'http://jy.cpkeys.cn/app/images/jin10/'+ item.star+ '.png'"/></p>
                  </td>
                  <td>预期:{{item.prefix}}</td>
                  <td>实际:<span class="state noboder" :class="color(item.evaluate)">{{item.published}}</span>
                    <div class="state" :class="color(item.evaluate)">{{item.evaluate | evaluateTo}}</div>
                  </td>
                  <td class="img-ct"><img
                          :src="'http://cdn.jin10.com/assets/img/commons/flag/flash/'+ item.country +'.png'" alt=""></td>
                </tr>

              </div>
            </div>
          </template>
          <template v-if="item.type != 1">
            <img class="icon" src=""/>
            <p class="time">{{item.time}}</p>
            <p class="info" v-html="item.content">{{item.content}}</p>
          </template>
        </li>
      </ul>
    </v-Content>
    <v-Footer></v-Footer>
  </div>

</template>
<script>
    import news from '@/api/home/index'
    import Content from '@/components/Content'
    import Footer from '@/components/Footer'
    import Commission from '@/components/find/commission'
    import Recommend from '@/components/find/recommend'
    import Channel from '@/components/find/channel'
    import Level from '@/components/find/level'
    import ExtendList from '@/components/find/extendList'
    import {toast, isPhone, isPassWord} from '@/util/index'


    export default {
        data() {
            return {
                LoadingTrue:true, //loading加载中默认显示
                isA: true,
                isB: false,
                iconIndex: true,
                nowIndex: -100,
                commission: {
                    money: "1200",
                    scale: "0.06%",
                    people: "2"
                },
                newsList: [/*{
        title:'美国原油公告1',
        content:'这里是美国原油新闻,原油期货电子盘价格收盘上涨0.09美元,涨幅0.17%,报52.91美元/桶;ICE布伦特6月原油期货电子盘价格收盘',
        time:'2017-11-30'
      }*/],
                recommend: {
                    times: "12",
                    tolink: "http://www.baidu.com",
                    src: require('../../assets/QRcode.png'),
                },
                extendList: []

            }

        },
        components: {
            'v-Footer': Footer,
            'v-Content': Content,
            'v-Commission': Commission,
            'v-Recommend': Recommend,
            'v-Channel': Channel,
            'v-ExtendList': ExtendList,
            'v-Level': Level
        },
        filters: {
            evaluateTo(value) {
                if (value == '利空2') {
                    return '利空 金银';
                } else {
                    return '利多 金银';
                }
            }
        },
        methods: {
            color(val) {
                if (val.substring(1, 2) == '空') {
                    return "state-green";
                } else {
                    return "state-red";
                }
            },
            toActive(index) {
                this.falg = index
            },
            back() {
                this.$router.back(-1)
            },
            showNews(index) {
                this.nowIndex = index;
//        var a =  document.querySelectorAll('.news-ul li')[index];
//       var img =  a.querySelector('img')
//        img.src = '';
            }
        },

        mounted() {
            let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId")
            }
            var newsArr = [];
            news.getNews(senddata).then((res) => {
                if (res.data.code == 200) {
                    window.localStorage.setItem('token',res.data.hid);
                    this.LoadingTrue = false;
//        var newsString = res.data.data.toString();
//        var newsStringArr = newsString.split(',');
//        console.log(newsStringArr,newsStringArr.length,'newsStringArr');

                    $.each(res.data.data, function () {
                        filterData(this);
                    });


                    function filterData(data) {

                        data = data.split('#');
                        var type = data[0],
                            time,
                            content,
                            important,
                            star = 0,
                            websiteUrl = '',
                            videoUrl = '',
                            id,
                            imgIcon,
                            prefix = 0,
                            expected = 0,
                            published = 0,
                            country,
                            evaluate,
                            params = {};

                        if (type == 1) {
                            time = data[8].split(' ')[1];
                            content = data[2];
                            star = data[6];
                            important = star > 3 ? true : false;
                            id = data[12];
                            prefix = data[3];
                            expected = data[4];
                            published = data[5];
                            country = data[9];
                            evaluate = data[7];
                            params = {
                                id: id,
                                important: important,
                                type: 1,
                                time: time,
                                content: content,
                                country: country,
                                prefix: prefix,
                                expected: expected,
                                published: published,
                                star: star,
                                evaluate: star >= 3 ? evaluate : evaluate + '2'
                            };
                        } else {
                            time = data[2].split(' ')[1];
                            content = data[3];
                            important = data[1] == 0 ? true : false;
                            id = data[11];
                            websiteUrl = data[4];
//            imgIcon = data[6];
                            videoUrl = data[5];
                            if (id == '20160926143732319100') {
                                content = content.replace('<b>', '');
                            }
                            params = {
                                id: id,
                                important: important,
                                type: 0,
                                time: time,
                                content: content,
                                websiteUrl: websiteUrl,
                                showWebsiteIcon: websiteUrl ? true : false,
                                videoUrl: videoUrl,
                                showVideoIcon: videoUrl ? true : false,
                                showImgIcon: imgIcon ? true : false,
//              imgName: imgIcon,
//              imgUrl: imgIcon.replace('_lite', '')
                            };
                        }
                        newsArr.push(params);

                    }

                    this.newsList = newsArr;
                } else if (res.data.code == 103) {
                    //		this.$router.push({path:'/toAccountinformation'})
                } else {
                    toast(res.data.message)
                }
            })
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '资讯'
            next()
        },

    }

    /*var a = [
      "0#1#2017-11-19 10:47:29#迈阿密戴德县警方推特：防爆部队已经确定此前发现的可疑物品不会构成威胁。#####0###20171119104729073100",
      "0#1#2017-11-19 10:41:21#<b>据外媒：美国迈阿密国际机场发现“可疑物品” ，因此对机场部分区域进行了疏散。目前调查还在进行中。 ​​​</b>#####0###20171119104121028100",
      "0#1#2017-11-19 10:30:21#【原油价格大幅反弹 俄罗斯或不支持减产】咨询机构Macro-Advisory公司高级合伙人克里斯·威弗表示如果原油价格保持在60-65美元每桶的区间，则俄罗斯支持将减产协议延长至每年3月份是“非常不可能的”。当原油价格保持在50美元每桶以上的水平时，俄罗斯就可以从中赚取利润。但如果价格进一步升高，势必会引起全球其他页岩油生产商产量的增加。这一价格将激励俄罗斯经济从单一的石油产业转向多元化产业发展，这也是该国的一大长期利益。（凤凰网）#####0###20171119103021765100",
      "0#1#2017-11-19 10:11:16#<a href=\"http://app.jin10.com/\" target=\"_blank\"><img src=\"https://image.jin10.com/1510308008.gif\" width=\"754\" height=\"120\" /></a>#####0###20171119101116816100",
      "0#1#2017-11-19 10:03:07#<b>【上期所铜期货期权立项获批】</b>上期所发布消息称，上期所铜期货期权的立项申请近日已获得中国证监会批复同意。这将是我国首个工业品期权品种，将进一步丰富国内有色金属衍生品市场的风险管理工具。铜期货交易的法人客户位居国内品种前列。2017年上半年，国内铜期货双边成交量为5278.56万手，双边成交额为12.35万亿元，法人客户成交量占比为25.62%，持仓量占比为65.45%。（中国证券网）#####0###20171119100307365100",
      "0#1#2017-11-19 09:21:49#<b>中国地震台网正式测定：11月19日09时15分在四川绵阳市平武县发生3.2级地震，震源深度11千米。 ​​</b>#####0###20171119092149150100",
      "0#1#2017-11-19 09:17:17#<b>中国地震台网自动测定：11月19日09时15分在四川绵阳市平武县附近（北纬32.20度，东经104.61度）发生3.6级左右地震，最终结果以正式速报为准。</b>#####0###20171119091717841100",
      "0#1#2017-11-19 09:03:09#【粤港合作联席会议在港举办】香港特区行政长官林郑月娥提出粤港澳大湾区建设3个重点：建设粤港澳大湾区国际科技创新中心；实现大湾区内人流、物流、资讯流和资金流的互联互通；将香港的优势产业落户大湾区。未来12到18个月，港珠澳大桥、广深港高铁、莲塘/香园围口岸3个重大跨境基建项目将陆续开通。（新华社）#####0###20171119090309610100",
      "0#1#2017-11-19 09:00:59#【脱欧分手费谈不拢致进展缓慢 欧盟要英国2周内表态】据外媒，欧洲理事会主席图斯克表示，英国若想谈判进入讨论下一阶段，也就是双方开始讨论未来贸易关系安排，那么英国必须在12月初之前有更多进展，他才能提出进一步指示。欧盟目前与英国的谈判3大核心议题为分手费、公民权利及爱尔兰边界，其中分手费问题双方差距大，欧盟态度是双方若要在12月的会议前达成“足够的进展”，英国需在未来2周内说明立场，否则就得做出让步。（中新网）#####0###20171119090059436100",
      "0#1#2017-11-19 08:29:05#【林毅夫：中国将在2025年成为世界最大经济体】前世界银行首席经济学家林毅夫表示，只要中国继续保持稳定发展，按照市场汇率计算，很有可能在2025年成为世界最大经济体。目前中国经济规模占全世界的18%，他预测，2025年会超过20%，2050年将占25%-30%，世界经济学的研究中心也有可能从美国转移到中国。（新浪）#####0###20171119082905303100",
      "0#1#2017-11-19 08:15:06#阿根廷国防部：侦测到失踪的潜艇上曾七次试图拨通卫星电话，均失败。#####0###20171119081506463100"]

    $.each(a,function () {
      filterData(this);
    });
    //var newsArr = [];
    function filterData(data){

      data = data.split('#');

      var type = data[0],
        time,
        content,
        important,
        star = 0,
        websiteUrl = '',
        videoUrl = '',
        id,
        imgIcon,
        prefix = 0,
        expected = 0,
        published = 0,
        country,
        evaluate,
        params = {};

      if(type == 1){
        time = data[8].split(' ')[1];
        content = data[2];
        star = data[6];
        important = star > 3 ? true : false;
        id = data[12];
        prefix = data[3];
        expected = data[4];
        published = data[5];
        country = data[9];
        evaluate = data[7];
        params = {
          id: id,
          important: important,
          type: 1,
          time: time,
          content: content,
          country: country,
          prefix: prefix,
          expected: expected,
          published: published,
          star: star,
          evaluate: star >= 3 ? evaluate : evaluate + '2'
        };
      }else{
        time = data[2].split(' ')[1];
        content = data[3];
        important = data[1] == 0 ? true : false;
        id = data[11];
        websiteUrl = data[4];
        imgIcon = data[6];
        videoUrl = data[5];
        if(id == '20160926143732319100'){
          content = content.replace('<b>', '');
        }
        params = {
          id: id,
          important: important,
          type: 0,
          time: time,
          content: content,
          websiteUrl: websiteUrl,
          showWebsiteIcon: websiteUrl ? true : false,
          videoUrl: videoUrl,
          showVideoIcon: videoUrl ? true : false,
          showImgIcon: imgIcon ? true : false,
          imgName: imgIcon,
          imgUrl: imgIcon.replace('_lite', '')
        };
      }


      return params;

    }*/
    //console.log(newsArr);
</script>

<style>
  b {
    color: #f25b57 !important;
  }
</style>
<style lang="less" scoped>
  @import '../../less/config.less';
  .loading-ct{
    margin-top: 4.5rem;
    text-align: center;
    color: #fefefe;
    img{
      width: .8rem;
    }
  }
  .content {
    background: @FFF !important;

    .news-list {
      color: @newColor;
      font-size: @f24;
      padding: 0 .3rem;
      .base-list {
        padding: @p30;
        position: relative;

      }
      .base-list:after {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 1px;
        background: @ddd;
        left: 0;
        top: .7rem;

      }
      .icon {
        content: '';
        display: block;
        position: absolute;
        width: .3rem;
        height: .3rem;
        margin-top: .15rem;
        margin-left: -.15rem;
        left: 0;
        z-index: 10000;
        background-image:  url("../../img/news_point@2x.png");
        background-size: cover;
        /*border-radius: 50%;*/
      }
      .time {
        /*margin-top: .64rem;*/
        display: inline-block;
        padding: .1rem .3rem;
        background: #bbb;
        border-radius: 30px;
        margin-left: .2rem;
        color:@FFF;
        line-height: 1;
      }
      .time:after {
        content: '';
        display: block;
        position: absolute;
        width: .6rem;
        height: 1px;
        border-bottom: 0;
        background: @ddd;
        top: .66rem;
        left: 0;
      }
      .info {
        padding-top: .26rem;
        font-size: @f28;
        color: @newColor;
        line-height: 1.3;

      }
    }
    .start-list {
      .time {
        color: #eeeeee;
        font-size: @f24;
      }
      color: @newColor;
      font-size: .37rem;
      .title {
        padding-top: .26rem;
      }
      tr {
        line-height: 1.6;
        display: flex;
        td {
          flex: 1;
          text-align: left;
          .star-icon {
            width: 1.6rem;
            height: .28rem;
          }
        }
        .state {
          border: 1px solid @ddd;
          font-size: .3rem;
          color: @newColor;
          display: inline-block;
          /* width: 60%;*/
          text-align: center;
        }
        .state-red {
          color: @red;
          border: 1px solid @red;
        }
        .state-green {
          border: 1px solid @green;
          color: @green;
        }
        .img-ct {
          flex: 0 0 0;
          width: .8rem;
          height: 1.4rem;
          img {
            display: inline-block;
            width: 1.1rem;
          }
        }
      }
    }
    .noboder {
      border: none !important;
      text-align: left !important;
      font-size: @f28 !important;
    }
  }

</style>


