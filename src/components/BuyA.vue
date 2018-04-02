<template>
    <div class="wrap">
        <router-link to='/tAdd1' class="list" tag='div'>
            <span>点买A股&nbsp;&nbsp;</span>
            <img src="../assets/T+1.png" alt="">&nbsp;&nbsp;
            <img class="icon" src="../assets/icon_hot.png" alt="">
            <p>今天买&nbsp;&nbsp;明天卖&nbsp;&nbsp;交易灵活</p>
        </router-link>
        <router-link to='/tAddD' class="list" tag='div'>
            <span>点买A股&nbsp;&nbsp;</span>
            <img src="../assets/T+D.png" alt="">&nbsp;&nbsp;
            <img class="icon" src="../assets/icon_recommend.png" alt="">
            <p>今天买&nbsp;&nbsp;明天卖&nbsp;&nbsp;交易灵活</p>
        </router-link>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import '../less/config.less';
.wrap {
    background-color: @liBg;
    color: @fcolor;
    width: 100%;
    height: 1.8667rem;
    padding: 0 @p30;
    display: flex;
    align-items: center;
     margin-bottom:0.26667rem;
    .list {
        width: 50%;
        display: inline-block;
        font-size: 0.37333rem;
        line-height: 2;
        img{
            vertical-align: text-bottom;
            width: 1.01333rem;
            height: 0.42667rem;
        }
        .icon{
            width:0.5333rem;
            height: 0.5333rem;
        }
        p{
            color:@Color;
            font-size: 0.32rem;
        }
    }
}
</style>
