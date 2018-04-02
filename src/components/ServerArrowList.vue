<template>
	<div class="select">
		<div class="wrap" @click='change'>
	        <div>
	            <span class="main">{{item.text}}</span>
	        </div>
	        <img :src="arrowSrc" alt="">
	    </div>
	    <div class="show" v-show='!isShow'>
           	{{item.hidden}}
        </div>
	</div>
    
</template>
<script>
export default {
    props: {
        item: {}
    },
    data(){
    	return{
    		isShow:true,
    		arrowSrc: require('../assets/arrow_fold.png'),
    	}
    },
    methods: {
        change() {
        	this.isShow = !this.isShow;
            this.arrowSrc = this.arrowSrc == require('../assets/arrow_fold.png') ? require('../assets/arrow_unfold.png') : require('../assets/arrow_fold.png')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../less/config.less';
.wrap {
    display: flex;
    justify-content: space-between;
    border-top: #262934 1px solid;
    height: 1.28rem;
    padding: 0 @p30;
    font-size: @f28;
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
.show{
	color: #FFFFFF;
	font-size: @f28;
	padding: @p30;
	line-height: .8rem;
	height: auto;
	background: #1a1e29;
}
</style>
