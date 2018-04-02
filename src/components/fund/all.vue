<template>
	<div class="all" style="color: white;">
		<div class="" v-for="(i,index) in lists">
			<v-FundArrowList :item=i></v-FundArrowList>
		</div>
	</div>
</template>

<script>
	import FundArrowList from '@/components/FundArrowList'
	import my from '@/api/home/index'
  import ContentHead from '@/components/ContentHead'
	export default{
		data(){
			return{
				lists:[
					{
						name:"充值",
						time:"2017-12-03 13:20:04",
						money:"+130.00",
						balance:"3000.00"
					},
					{
						name:"提现",
						time:"2017-12-03 11:20:04",
						money:"-1240.00",
						balance:"3000.00"
					},
					{
						name:"结算",
						time:"2017-12-03 15:20:04",
						money:"+1030.00",
						balance:"3000.00"
					},
					{
						name:"买入",
						time:"2017-12-03 13:20:04",
						money:"-1030.00",
						balance:"3000.00"
					},
					{
						name:"充值手续费",
						time:"2017-12-03 14:27:04",
						money:"-1030.00",
						balance:"3040.00"
					},
					{
						name:"冻结",
						time:"2017-12-03 09:20:34",
						money:"-103.00",
						balance:"7600.00"
					},
					{
						name:"充值",
						time:"2017-12-03 13:20:04",
						money:"+130.00",
						balance:"3000.00"
					},
					{
						name:"提现",
						time:"2017-12-03 11:20:04",
						money:"-1240.00",
						balance:"3000.00"
					},
					{
						name:"结算",
						time:"2017-12-03 15:20:04",
						money:"+1030.00",
						balance:"3000.00"
					},
					{
						name:"提现",
						time:"2017-12-03 11:20:04",
						money:"-1240.00",
						balance:"3000.00"
					},
					{
						name:"结算",
						time:"2017-12-03 15:20:04",
						money:"+1030.00",
						balance:"3000.00"
					},
					{
						name:"买入",
						time:"2017-12-03 13:20:04",
						money:"-1030.00",
						balance:"3000.00"
					},
					{
						name:"充值手续费",
						time:"2017-12-03 14:27:04",
						money:"-1030.00",
						balance:"3040.00"
					},
					{
						name:"冻结",
						time:"2017-12-03 09:20:34",
						money:"-103.00",
						balance:"7600.00"
					},
				]
			}
		},
		components: {
	        'v-FundArrowList': FundArrowList
    	},
    	mounted(){
	  		let senddata = {
				page:1,
				type:5,
				userId:window.localStorage.getItem("token")
			}
			my.accountLogJson(senddata).then(res=>{
	            if(res.data.code==200){
                    window.localStorage.setItem("token", res.data.hid);
	            } else if(res.data.code==222){
	                this.$router.push({path:'/'})
	            }else{
	            	 console.log(res);
	            }
	      	})
		}
	}
</script>

<style>
</style>
