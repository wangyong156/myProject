<template>
  <div id="service">
    <div class="header">
      <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
      <span>24小时在线客服</span>
      <a class="img" href="tel:0571-85857825" >
        <img class="serve" src="../../img/newImg/nav_icon_phone.png"/>
      </a>
    </div>
    <div class="list" id="list">
      <!--<span class="white">11001</span>-->
      <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="false">
        <div class="item" v-for="(item,index) in askList">
          <div class="ask">
            <div class="avator">
              <img :src="photo"/>
              <!-- <img v-show="item.user.avatarUrl == ''" :src="photo"/>
               <img v-show="item.user.avatarUrl != ''" :src="imgUrl + item.user.avatarUrl"/>-->
            </div>
            <div class="content">
              <p>{{item.question}}</p>
              <p class="f24 black9">{{item.createTime}}</p>
            </div>
          </div>
          <div class="answer">
            <div class="black9"><span class="f28">客服回复：</span><span class="f24">{{item.returnTime}}</span></div>
            <p class="mt10" v-show="item.status == 1">请稍等。。。</p>
            <p class="mt10" v-show="item.status == 2">{{item.answer}}</p>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <footer>
      <input maxlength="200" type="text" @focus="focus()" @blur="blur()" v-model="question"/>
      <div @click="putQuestion">发送</div>
    </footer>
  </div>
</template>
<script>
    import my from '@/api/home/index'
    import ContentHead from '@/components/ContentHead'
    import {toast} from '@/util/index'
    import FundArrowList from '@/components/FundArrowList'
    import {Loadmore} from 'mint-ui'

    export default {
        data() {
            return {
                imgUrl: this.GLOBAL.ImgUrl,
                photo: require("../../img/account_avator_default@2x.png"),
                interval:'',
                time:'',
                question: "",
                askList: [],
                idList: [],
                star: 1,
                currentSize: 0,
                total: '',
                allLoaded: true,
                bottomText: '上拉加载更多...',
                scrollMode: "auto"   // iphone或安卓机存在问题
            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
            loadTop() {
                this.questionList();
                this.$refs.loadmore.onTopLoaded();
            },
            getNoanswer() {
                for (var i = 0; i < this.askList.length; i++) {
                    if (this.askList[i].status == 1) {
                        this.idList.push(this.askList[i].id);
                    }
                }

                if (this.idList.length != 0) {
                    var str = JSON.stringify(this.idList);
                    let senddata = {
                        HUIMI_SESSIONID: window.localStorage.getItem("token"),
                        HUIMI_USERID: window.localStorage.getItem("userId"),
                        ids: str.substring(1, str.length - 1)
                    }

                    my.getQuestions(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            var list = res.data.data;
                            for (var i = 0; i < list.length; i++) {
                                if (list[i].status == 2) {
                                    for (var j = 0; j < this.askList.length; j++) {
                                        if (list[i].id == this.askList[j].id) {
                                            this.askList[j].status = 2;
                                            this.askList[j].answer = list[i].answer;
                                        }
                                    }
                                }
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
                this.idList = [];
            },
            putQuestion() {

                var param = this.question;
                var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
                if(param.match(regRule)) {
                    param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
                    toast("不支持表情输入");
                    return false;
                }
                if (this.question != '') {
                    let senddata = {
                        HUIMI_SESSIONID: window.localStorage.getItem("token"),
                        HUIMI_USERID: window.localStorage.getItem("userId"),
                        question: this.question
                    }

                    my.putQuestion(senddata).then((res) => {
                        if (res.data.code == 200) {
                            window.localStorage.setItem('token',res.data.hid);
                            //location.reload();
                            var first = [{"id": res.data.data, "question": this.question, "status": 1}];
                            this.askList = this.askList.concat(first);
                            this.question = "";
                            var obj = document.getElementById("list");
                            setTimeout(function () {
                                obj.scrollTop = obj.scrollHeight;
                            }, 500);
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
            questionList() {
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    rows: 10,
                    star: this.star,
                    sort: '',
                    order: ''
                }

                my.questionList(senddata).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem('token',res.data.hid);
                        this.askList = res.data.data.rows.concat(this.askList);
                        this.total = res.data.data.totalPage;
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
                this.star = this.star + 1;
                /*if (this.star == this.total) {
                  this.allLoaded = true;
                }*/
            },
            firstList() {
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    rows: 10,
                    star: this.star,
                    sort: '',
                    order: ''
                }

                my.questionList(senddata).then((res) => {
                    if (res.data.code == 200) {
                        this.askList = res.data.data.rows.concat(this.askList);
                        this.total = res.data.data.totalPage;
                        var obj = document.getElementById("list");
                        setTimeout(function () {
                            obj.scrollTop = obj.scrollHeight;
                        }, 100);
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
                if (this.star == this.total) {
                    this.allLoaded = true;
                }else{
                    this.star = this.star + 1;
                }
            },
            focus(){
                this.time = setTimeout(function () {
                    document.body.scrollTop = document.body.scrollHeight;
                    // document.body.scrollTop = (parseInt(document.body.scrollHeight.split("px")[0])-50)+'px';
                }, 300)
            },
            blur(){
                // clearTimeout(this.time);
                //document.body.scrollTop = 0;
            }
        },
        components: {
            'v-FundArrowList': FundArrowList,
            'mt-loadmore': Loadmore,
            'v-ContentHead': ContentHead
        },
        mounted() {
            let senddata = {
                HUIMI_SESSIONID: window.localStorage.getItem("token"),
                HUIMI_USERID: window.localStorage.getItem("userId")
            }

            my.indexJson(senddata).then((res) => {
                if (res.data.code == 200) {
                    var data = res.data.data;
                    if (data.avatarUrl) {
                        this.photo = this.imgUrl + data.avatarUrl;
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
            this.firstList();
            var that = this;
            window.questionTime = setInterval(function () {
                that.getNoanswer();
            }, 1000);
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '24小时在线客服'
            next()
        },
        beforeRouteLeave(to,form,next){
            clearInterval(window.questionTime);
            document.activeElement.blur();
            next();
        }
    }
</script>
<style lang="less" scoped>
  @import '../../less/config.less';

  .list {
    position: absolute;
    top: 1.30667rem;
    left: 0;
    right: 0;
    bottom: 1.60667rem;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
    background-color: #f5f5f5;
  }

  .item {
    background-color: @changeColor;
    padding: 0.2667rem 0.4rem;
    margin-top: 0.2667rem;
    line-height: 0.5rem;
    font-size: @f26;
    color: @newColor;
    .ask {
      padding-bottom: 0.2667rem;
      display: flex;
      justify-content: space-between;
      .avator {
        width: 1.3333rem;
        img {
          width: 1.0667rem;
          height: 1.0667rem;
          border-radius: 1rem;
        }
      }
      .content {
        flex: 1;
        margin-top: 0.3rem;
      }
    }
    .answer {
      border: 1px solid #ddd;
      padding: 0.2rem 0.2667rem;
      .black9 {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.36rem;
    background-color: @changeColor;
    padding: 0.28rem 0.4rem;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    input {
      flex: 1;
      background-color: #fff;
      border-radius: 0.1rem;
      height: 0.8rem;
      font-size: .34rem;
      text-indent: .06rem;
      border:1px solid @ddd
    }
    div {
      width: 1.8rem;
      height: 0.8rem;
      background-color: @actColor;
      color: #000;
      border-radius: 0.1rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.4rem;
      margin-left: 0.4rem;
    }
  }
  .serve{
    width: .5rem;
    height: .5rem;
    margin-top: -.01rem;
  }

</style>
