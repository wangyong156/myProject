<template>
    <div class="wrap">
    	<div class="header">
			<img @click="back" src="../../img/newImg/nav_icon_back.png"/>
			<span>资金明细</span>
			<span class="img"></span>
		</div>
        <div class="topTitle">
            <div v-for='(item,index) in tabs' @click='toActive(index)'>
                <span :class="{'active':falg==index}">{{item.name}}</span>
            </div>
        </div>
        <div class="listwrap">
            <v-all v-show="falg==0"></v-all>
            <v-recharge v-show="falg==1"></v-recharge>
            <v-withdrawals v-show="falg==2"></v-withdrawals>
        </div>
    </div>
</template>

<script>
import all from './all'
import recharge from './recharge'
import withdrawals from './withdrawals'
export default {
    data() {
        return {
            falg: 0,
            tabs: [
                { name: "全部" },
                { name: "充值" },
                { name: "提现" }
            ]
        }
    },
    components: {
        'v-all': all,
        'v-recharge': recharge,
        'v-withdrawals': withdrawals
    },
    methods: {
    	back:function () {
			this.$router.back(-1)
		},
        toActive(index) {
            this.falg = index
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.header{
	padding:0 @p30;
	display: flex;
	justify-content:space-between;
	align-items: center;
	height:@hwrap;
	color:#fff;
	font-size:.48rem;
	img,.img{
		width: 30px;
		height: 30px;
	}
}
.wrap {
    background-color: @bgColor;
    .topTitle {
        height: 1.09333rem;
        line-height: 1.09333rem;
        width: 100%;
        font-size: 0;
        margin-bottom: @fsize;
        background-color: @liBg;
        div {
            width: 33.3333%;
            display: inline-block;
            text-align: center;
            span {
                display: inline-block;
                width: 1.6rem;
                height: 1.09333rem;
                line-height: 1.09333rem;
                color: @fcolor;
                font-size: 0.37333rem;
            }
            .active {
                color: @actColor;
                border-bottom: 4px solid @actColor;
            }
        }
    }
}
</style>
