<template>
    <div class="select">
        <span class="show" v-show='!isShow' @click='select'>
            {{tadd1}}
        </span>
        <span class='default' @click='changPaly'>
            {{showText}}
            <img :src="arrowSrc" alt="">
        </span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: true,
            tadd1: 'T+1 点买A股 ',
            showText: 'T+D 点买A股 ',
            arrowSrc: require('../../assets/pup_down.png'),
        }
    },
    methods: {
        select(event) {
            this.isShow = !this.isShow;
            this.tadd1=this.showText;
            this.showText=event.target.innerText;
            this.arrowSrc = this.arrowSrc == require('../../assets/pup_down.png') ? require('../../assets/pup_up.png') : require('../../assets/pup_down.png')
        },
        changPaly(event) {
              this.isShow = !this.isShow;
            this.arrowSrc = this.arrowSrc == require('../../assets/pup_down.png') ? require('../../assets/pup_up.png') : require('../../assets/pup_down.png')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.select {
    font-size: @f32;
    color: @fcolor;
    position: relative;
    img {
        width: 0.33333rem;
        height: 0.2rem;
        vertical-align: middle;
    }
    .default {
        height: 1.173333rem;
        line-height: 1.173333rem;
        padding: 0 @p30;
        display: block;
        background-color: @liBg;
        border-top: 1px solid @border;
    }
    .show {
        height: 1.173333rem;
        line-height: 1.173333rem;
        padding: 0 @p30;
        display: block;
        color: @actColor;
        background-color: @bgColor;
        position: absolute;
        top: -1.17333rem;
        width: 100%;
    }
}
</style>

