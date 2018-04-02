<template>
    <div class="content">
    	<span class="name">{{item.title}}</span>
        <span class="time">{{item.createTime}}</span>
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
    height: 2rem;
    font-size: @f32;
    display: flex;
    justify-content: center;
   	align-items: space-between;
    flex-direction: column;
    background-color: @liBg;
    margin: @fsize @p30;
    padding:0 @f28;
    border-radius: 0.13333rem;
    .name{
    	font-size: @f28;
    	color: white;
    }
    
    .time{
    	font-size: @f24;
    	color: #56627C;
    	margin-top: @f28;
    }
    
}
</style>
