<template>
    <div class="change">
        <div class="header">
            <img @click="back" src="../../img/newImg/nav_icon_back.png"/>
            <span>用户名</span>
            <span class="img"></span>
        </div>
        <v-ContentHead>
            <div class="input-ct">
                <input type="text" class="name-input" v-model="changeName"  maxlength='30'>
                <img class="rIcon" src="../../assets/icon_clean.png" alt="" @click="clearName" >
            </div>

            <v-button buttonText='保存' :isActive='isActive' topNum='0.8rem' @toNext="checkSendName"></v-button>


        </v-ContentHead>
    </div>
</template>

<script>
    import my from '@/api/home/index'
    import ContentHead from '@/components/ContentHead'
    import login from '@/api/home/index'
    import Button from '@/components/Button'
    import {toast, setwithdrawalPwd} from '@/util/index'

    export default {
        data() {
            return {
                isActive:true,
                changeName:''

            }
        },
        components: {
            'v-button': Button,
            'v-ContentHead': ContentHead
        },
        computed: {

            nextActive: function () {
                if (this.inputCode1 && this.newPhone && this.isPhone(this.newPhone)) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            back() {
                this.$router.back(-1)
            },
            clearName() {
                this.changeName = '';
            },
            checkSendName(){
                var isUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/;
                if(this.changeName == ''){
                    toast('请输入用户名');
                }else if(!isUserName.test(this.changeName)){
                    toast('用户名支持汉字英文数字');
                }else{
                    this.sendName()
                }

            },
            sendName(){
                let senddata = {
                    HUIMI_SESSIONID: window.localStorage.getItem("token"),
                    HUIMI_USERID: window.localStorage.getItem("userId"),
                    userName:this.changeName
                }
                my.changeUserName(senddata).then((res) => {
                    if (res.data.code == 200) {
                        window.localStorage.setItem("token", res.data.hid);
                        toast('修改成功');
                        var that = this;
                        setTimeout(function () {
                            that.$router.push({path: '/my'})
                        }, 1000);
                    } else if (res.data.code == 401) {
                        toast(res.data.message);
                        var that = this;
                        setTimeout(function () {
                            that.$router.push({path: '/login'})
                        }, 1000);
                    } else {
                        toast(res.data.message);
                    }
                })
            },

        },
        mounted() {
            let userName = this.$route.query.userName;
            console.log(userName);
            this.changeName = userName;
        },
        beforeRouteEnter(to, from, next) {
            document.querySelector('title').innerText = '用户名'
            next()
        }
    }


</script>

<style lang="less" scoped>
    @import '../../less/config.less';
    .input-ct{
        position: relative;
        .rIcon{
            position: absolute;
            right: 0.4rem;
            top: 0.8rem;
            width: 0.42667rem;
        }
    }
    .name-input{
        padding: 0.4rem 0.4rem;
        padding-right: 1.3rem;
        font-size: @f32;
        margin-top: 0.4rem;
        width: 100%;
        overflow: hidden;
        background: @FFF;
        border:none;
    }

</style>
