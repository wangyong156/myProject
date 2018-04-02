<template>

	<div class="wrap">
    <div class="header">
      <img @click="toIndex" src="../../img/newImg/nav_icon_back.png"/>
      <span>登录</span>
      <span class="img"></span>
    </div>
    <div class="main">
      <div class="icon">
        <img src="../../img/login_logo@2x.png"  alt="">
      </div>
      <div class="form input-item">
        <div class="list">
          <!--<img src="../../assets/login_icon_phone.png" alt="">-->
          <span class="lable">手机号 </span>
          <input type="tel" maxlength="11" v-model='mobile' placeholder='请输入手机号' @keyup='isCleanShow'>
          <img class="rIcon" src="../../assets/icon_clean.png" v-show="iconShow" alt="" @click='isPhoneClean'>
        </div>
        <div class="list">
          <!--<img src="../../assets/login_icon_pwd.png" alt="">-->
          <span class="lable">密 码 </span>
          <input v-if='ispassword' type="password" maxlength="16" v-model='password' placeholder='请输入登录密码' @keyup='isCleanShow'>
          <input v-if='!ispassword' type="text" maxlength="16" v-model='password' placeholder='请输入登录密码' @keyup='isCleanShow'>
          <img  class="lIcon" src="../../assets/icon_clean.png" v-show="passShow" @click='isPassWrodClean' alt="">
          <img class="rIcon" :src="passwordSrc" alt="" @click='checkTpye'>
        </div>
      </div>
      <!--<v-button buttonText='登录' :isActive='isActive' topNum='0.8rem' @toNext='login'></v-button>-->
      <!--<v-button class="register-btn" buttonText='注册' :isActive='isActive' topNum='0.4rem' @toNext='register1' ></v-button>-->
      <div class="register-btn login-btn" @click="toLogin">登录</div>
      <div class="register-btn"  @click="toRegister1">免费注册</div>
      <div class="tips">
        <a class="register" href="tel:057185857825">联系客服</a>
        <router-link class="repassword" to='/forget1'>忘记密码？</router-link>
      </div>
    </div>
	</div>
</template>
<script>
import login from '@/api/home/index'
import Button from '@/components/Button'
import { toast, isPhone, isPassWord } from '@/util/index'
export default {
	data() {
		return {
			mobile: '',
			iconShow: false,
			password: '',
			passShow: false,
			passwordSrc: require('../../assets/icon_hide_pwd.png'),
			ispassword: true,

		}
	},
	computed: {
		isActive: function () {
			if (isPhone(this.mobile) && isPassWord(this.password)) {
				return true
			} else {
				return false
			}
		}
	},
	components: {
		'v-button': Button
	},
	methods: {
    toLogin(){
      if (isPhone(this.mobile) && isPassWord(this.password)) {
        this.login()
      } else {
        toast('请输入正确的用户名和密码');
      }
    },
    toIndex(){
      this.$router.push({path:'/home'});
    },
    toRegister1(){
      this.$router.push({path: '/register1'})
    },
		isPhone() {
			if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length != 11) {
				return false
			} else if (/^1[34578]\d{9}$/.test(phone) && phone.length == 11) {
				return true;
			}
		},
		isCleanShow() {
			if (this.mobile != '') {
				this.iconShow = true
			} else {
				this.iconShow = false
			}
			if (this.password != '') {
				this.passShow = true
			} else {
				this.passShow = false
			}
		},
		isPhoneClean(){
			if (this.mobile != '') {
				this.mobile = ''
				this.iconShow = false
				return
			}
		},
		isPassWrodClean() {
			if (this.password != '') {
				this.password = ''
				this.passShow = false
				return
			}
		},
		checkTpye() {
			this.ispassword = !this.ispassword;
			if (!this.ispassword) {
				this.passwordSrc = require('../../assets/icon_show_pwd.png')
			} else {
				this.passwordSrc = require('../../assets/icon_hide_pwd.png')
			}
		},
        login() {
            console.log('login')
            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.$store.state.commonkey);
            let senddata = {
                userName: this.mobile,
                password: encrypt.encrypt(this.password)
            }
            if (this.isActive) {
                login.userLogin(senddata).then((data) => {
                    if (data.data.code == 200) {
                        //this.localStorage.setItem(this.mobile);
                        window.localStorage.setItem("phone", this.mobile);
                        this.$store.dispatch('saveRegisterPhone',this.mobile);
                        this.$store.dispatch('saveToken',data.data.hid);
                        console.log(this.$store.state.token);
                        window.localStorage.setItem("userId", data.data.data.id);
                        this.$router.push({ path: '/home' })
                    } else {
                        toast(data.data.message)
                    }
                })
            }
        }
    },
	watch: {

	},
	created() {

	},
  mounted(){

  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '登录'
    next()
  }
}
</script>
<style lang='less' scoped>
@import '../../less/config.less';


.register-btn{
 margin: 0 auto;
  width: 9.2rem;
  font-size: .48rem;
  height: 1.17333rem;
  line-height: 1.17333rem;
  color: @actColor;
  border-radius: 0.08rem;
  text-align: center;
  border: 2px solid @actColor;
}
.login-btn{
  margin-top: 0.8rem !important;
  margin-bottom: 0.53rem;
  border: none;
  background-color: #f8cc00;
  color: @newColor;
}
.lable{
  position: absolute;
  left: 0.4rem;
  top: 0.35rem;
}
.wrap {
  width: 100%;
	height: 100%;
	/*background-image: url('../../img/login_bg@2x.png');
	background-repeat: no-repeat;
	background-size: 100%;*/
  position: absolute;
}
.input-item{
  width: 94%;
  margin: 0 auto;

  border-radius: 5px;
  .list{
    height: 1.2rem;
    margin-bottom: 0;
    border-bottom: 1px solid @changeColor;
  }
}
.register-btn{
  margin-top: 0.2rem;
}
.icon {
	padding-top: 2.5rem;
	text-align: center;
	img {
		width: 5.28rem;
	}
}

.form {
	margin-top: 1rem;
}

.list {

	height: 1.1733rem;
	padding: 0 @p30;
	margin-bottom: 0.34667rem;
	position: relative;
	font-size: 0.42667rem;
	background-color: #FFF;
    color:@newColor;
	filter: alpha(opacity=70);


	img {
		width: 0.42667rem;
		line-height: 1.1733rem;
		vertical-align: middle
	}
	.rIcon {
		position: absolute;
		right: @p30;
		top: 0.45rem;
	}
  .lIcon{
    margin-right: .3rem;
    position: absolute;
    top: 0.45rem;
    right: .9rem;
  }
	input {
		margin-left: @p30;
        padding-left: 1.4rem;
		width: 6.8rem;
		color: @newColor;
		height:1.2rem;
        /*padding-top:0.3rem;*/
	}
	input::-webkit-input-placeholder {
		/* WebKit browsers*/
		color: @placeColor;
	}
	input::-moz-placeholder {
		/* Mozilla Firefox 4 to 18*/
		color: @placeColor;
	}
	input::-moz-placeholder {
		/* Mozilla Firefox 19+*/
		color: @placeColor;
	}
	input:-ms-input-placeholder {
		/* Internet Explorer 10+*/
		color:@placeColor;
	}
}

.tips {
	padding: 0 @p30;
	margin-top: @p30;
	font-size: 0.3733rem;
	position: relative;

	a {
		text-decoration: none;
	}
	.register {
		//position: absolute;
    float: left;
		right: @p30;
		color: @actColor;
	}
  .repassword{
    float: right;
    color: @nine;
  }
}
</style>

