<template>
    <div class="wrap" @click='toNext'>
        <div>
            <span class="main">{{item.text}}</span>
            <span class="value" :style="{color:item.color}">{{item.tips}}</span>
        </div>
        <img v-show="!item.hide" src="../img/arrow_right@2x.png" alt="">
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
    height: 1.28rem;
    padding: 0 @p30;
    font-size: @f32;
    align-items: center;
    background-color: @FFF;
    img {
        width: 0.42667rem;
        height: 0.42667rem;
        flex: 0 0 0.42667rem;
        margin-left:0.2rem;
    }
    div {
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        span {
            color: @actColor;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .value{
            max-width: 5.8rem;
        }
        .main {
            color: @newColor;
        }
    }
}
</style>
