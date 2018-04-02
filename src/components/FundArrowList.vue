<template>
    <div class="content">
        <div>
            <span class="name">{{item.name}}</span>
            <span class="money">{{item.money}}</span>
        </div>
         <div>
            <span class="time">{{item.time}}</span>
            <span class="balance">{{item.balance}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {}
    },
    methods: {
       
    }
}
</script>

<style lang="less" scoped>
@import '../less/config.less';
.content {
    height: 1.41333333333rem;
    padding: 0 @p30;
    font-size: @f32;
    display: flex;
    justify-content: center;
   	align-items: space-between;
    flex-direction: column;
    background-color: @FFF;
    border-top: 1px solid #262934;
    div {
        color: @fcolor;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name{
        	font-size: @f32;
        	color: @newColor;
           
        }
        .money{
        	color: #ff335b;
        	font-size: @p30;
        }
         .money1{
        	color: #33FFC3;
        	font-size: @p30;
        }
        .time,.balance{
        	font-size: @f24;
        	color: #56627C;
        }
       
    }
}
</style>
