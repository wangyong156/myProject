<template>
  <div>
    <div class="header">
      <img @click="back" src="../../img/nav_icon_back@2x.png"/>
      <span>支付结果</span>
      <span class="img"></span>
    </div>
    <v-ContentHead>
      <div class="tc" style="margin-top:3rem;">
        <div class="line-scale" v-show="waiting">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="resultContent fulfill" v-show="accomplish" >
          <img :src="resultImg"/>
          <div class="white f32  title">充值成功</div>
          <p class="tips">{{dataMsg}}</p>
        </div>
        <div class="resultContent tips-error" v-show="error">
          <img :src="resultErrorImg"/>
          <div class="f32 title">充值失败</div>
          <p class="tips">{{dataMsg}}</p>
        </div>
        <div class="resultContent tips-waiting" v-show="timeCount == 60" >
          <img :src="resultwaitingImg"/>
          <div class="f32 title">充值处理中</div>
          <p class="tips">{{dataMsg}}</p>
        </div>
      </div>
      <v-button buttonText='完成' :isActive='true' topNum='1.5rem' @toNext='login'></v-button>
    </v-ContentHead>
  </div>
</template>

<script>
    import my from '@/api/home/index'
    import ContentHead from '@/components/ContentHead'
    import Button from '@/components/Button'
    import {toast} from '@/util/index'

    export default {
        data() {
            return {
                waiting: true,
                resultImg: require("../../img/tips_success@2x.png"),
                resultErrorImg: require("../../img/tips_failed@2x.png"),
                resultwaitingImg: require("../../img/tips_waiting@2x.png"),
                hmTk:'',
                resultClock : '',
                accomplish:false,
                error:false,
                dataMsg:'',
                timeCount:0,
            }
        },
        computed: {
            isActive: function () {

            }
        },
        methods: {
            back() {
                this.$router.push({path: '/my'})
            },
            login() {
                this.$router.push({path: '/my'});
            },
            getResult() {
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    hmTk : this.$route.query.hm_tk
                }
                my.getResult(senddata).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem('token',res.data.hid);
                        var data = res.data.data;
                        if(data){
                            if(data.result){
                                this.waiting = false;
                                this.accomplish = true;
                                this.dataMsg = data.message;
                                clearInterval(window.resultClock);
                            }else{
                                this.waiting = false;
                                this.error = true;
                                this.dataMsg = data.message;
                                clearInterval(window.resultClock);
                            }
                        }
                    } else if (res.data.code == 401) {
                        toast(res.data.message);
                    } else {
                        clearInterval(window.resultClock);
                        this.waiting = false;
                        this.timeCount == 60;
                    }
                })
            }
        },
        mounted() {

            var that = this;
            window.resultClock = setInterval(function () {
                that.getResult();
                that.timeCount += 1;
                if(that.timeCount == 60){
                    clearInterval(window.resultClock);
                    that.waiting = false;
                }
            }, 1000)
        },
        components: {
            'v-button': Button,
            'v-ContentHead': ContentHead
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '支付结果'
            next()
        }

    }

</script>

<style lang="less" scoped>
  @import '../../less/config.less';

  .resultContent {
    img {
      width: 2.5rem;
    }
    .white {
      margin-top: 0.8rem;
    }
  }

  @keyframes line-scale {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }

    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }

    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }

  .line-scale > div:nth-child(1) {
    -webkit-animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
    animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .line-scale > div:nth-child(2) {
    -webkit-animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
    animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .line-scale > div:nth-child(3) {
    -webkit-animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
    animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .line-scale > div:nth-child(4) {
    -webkit-animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
    animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .line-scale > div:nth-child(5) {
    -webkit-animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
    animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
  }

  .line-scale > div {
    background-color: @actColor;
    width: .05rem;
    height: 1.2rem;
    border-radius: 4px;
    margin: 12px 10px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }
  .tips-error .title{
    margin-top: 0.8rem;
    color: #f84d4d;
  }
  .fulfill .title{
    color: #39DC9D;
  }
  .tips-waiting .title{
    color: #fe993d;
    margin-top: .4rem;
  }
  .tips{
    color: #999999;
    font-size: @f24;
    margin-top: .4rem;
  }
</style>
