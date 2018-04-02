<template>
	<div class="dealwrap">
		<v-fundTab></v-fundTab>
	</div>
</template>

<script>
	import fundTab from '@/components/fund/funddetail'
	export default {
		data() {
		    return {
		      isActive: false,
		    }
  		},
		components: {
		   'v-fundTab': fundTab,
		},
		methods: {

		},
		beforeRouteEnter(to,from,next){
		    document.querySelector('title').innerText='资金明细'
		     next()
		}
	}
</script>

<style lang="less" scoped>
	@import '../../less/config.less';
	.dealwrap{
	  width: 100%;
	  height: 100%;
	  position: relative;
	  overflow: auto;
	  -webkit-overflow-scrolling: touch
	}
</style>
