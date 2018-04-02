<template>
	<div>
		<p class="top">复制推广链接发给朋友</p>
		<li><span id="copy-text">{{item.tolink}}</span><button class="copy" id="copy"   data-clipboard-action="copy" data-clipboard-target="#copy-text">复制</button></li>
		<p>推荐朋友扫码，成为你的用户</p>
    <div id="qrcode" style=" margin:25px 0;"></div>
	</div>
</template>

<script>
  import home from '@/api/home/index'
  import { toast } from '@/util/index'
  import "../../components/clipboard/clipboard.min.js"

  export default {
      url:'',
	    props: {
	        item: {}
	    },
	    methods: {
        init(){
          var clipboard = new Clipboard('.copy');
          clipboard.on('success', function (e) {
            console.log(e);
            toast('复制到剪切板成功');
          });
          clipboard.on('error', function (e) {
            console.log(e);
            toast('复制到剪切板失败，请手动复制');
          });
        },
	        toNext() {
	            this.$emit('toNext');
	        },

        _getQart(data) {   //二维码生成定义
          var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 160,
            height : 160
          });
          qrcode.makeCode(data);
        },
	    },
    mounted() {
      this.init();
      let senddata = {
        HUIMI_SESSIONID: window.localStorage.getItem("token"),
        HUIMI_USERID: window.localStorage.getItem("userId")
      }
      //请求邀请链接
      home.getInviteUrl(senddata).then((res) => {
        if (res.data.code == 200) {
            window.localStorage.setItem("token", res.data.hid);
          this._getQart(res.data.data.popularizeUrl);
        }else if (res.data.code == 401) {
          toast(res.data.message);
          var that = this;
          setTimeout(function () {
            that.$router.push({path: '/login'})
          }, 1000);
        }else {
          toast(res.data.message)
        }
      })
    }
	}

</script>

<style lang="less" scoped>
@import '../../less/config.less';
  #qrcode{
    border: 8px solid #ffffff;
  }
  #text{
    color: red;
  }
	div{
		color: @newColor;
		font-size:@f28;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		p{
			margin-top:.8rem;
			span{
				color:#56627c;
			}

		}
		li{
			list-style: none;
			margin-top:.8rem;
			color: #007fff;
			font-size: @p30;
		}
		img{
			margin:.4rem auto;
      width: 3.8rem;
      height:3.8rem;
		}
	}
  #copy-text{
    width:6rem;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    vertical-align: middle
  }
  #copy{
    background: #f5f5f5;
    border: none;
    color: #007fff;
    vertical-align: middle;
  }
</style>
