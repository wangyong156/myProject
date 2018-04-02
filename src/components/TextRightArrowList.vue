<template>
    <div class="wrap" @click='toNext'>
        <div>
            <span class="main">{{item.text}}</span>
            <span>{{item.tips}}</span>
        </div>
        <img src="../assets/arrow_right.png" alt="">
    </div>
</template>
<script>
export default {
    props: {
        item: {}
    },
    methods: {
        toNext() {
            this.$emit('toNext')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../less/config.less';
.wrap {
    display: flex;
    justify-content: space-between;
    height: 1.1733333rem;
    padding: 0 @p30;
    font-size: @f32;
    align-items: center;
    background-color: @liBg;
    img {
        width: 0.42667rem;
        height: 0.42667rem;
        flex: 0 0 0.42667rem;
    }
    div {
        color: @fcolor;
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        span {
            color: @actColor;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .main {
            color: #fff;
        }
    }
}
</style>
