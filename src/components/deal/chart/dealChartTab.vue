<template>
    <div class="wrap">
        <div class="topTitle" >
            <div v-for='(item,index) in tabs' @click='toActive(index)'>
                <span :class="{'active':falg==index}">{{item.name}}</span>
            </div>
        </div>
        <div class="listwrap">
            <v-chartTime v-show="falg==0"></v-chartTime>    
            <v-chartK v-show="falg==1"></v-chartK>   
            <v-handiCap v-show="falg==2"></v-handiCap>   
        </div>
    </div>
</template>

<script>
import chartTime from './chartTime'
import chartK from './chartK'
import handiCap from './handiCap'
import dealSell from '../dealSell'
import dealSettlement from '../dealSettlement'
export default {
    data() {
        return {
            falg: 0,
            tabs:[
                {name:'分时'},
                {name:'日K'},
                {name:'盘口'}
            ]
        }
    },
    components:{
        'v-chartTime':chartTime,
        'v-chartK':chartK,
        'v-handiCap':handiCap,
        'v-dealSell':dealSell,
        'v-dealSettlement':dealSettlement
    },
    methods: {
        toActive(index) {
           this.falg=index
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.wrap {
    width: 100%;
    background-color: @bgColor;
    .topTitle {
        height: 1.09333rem;
        width: 100%;
        font-size: 0;
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
                
            }
        }
    }
    
}
</style>
