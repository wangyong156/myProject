<template>
  <div>
    <div id="trigger">请选择开户银行</div>
  </div>
</template>
<script>
  import MobileSelect from 'mobile-select'
  export default {
    data(){
      return{
        data:["周日","周一","周二","周三","周四","周五","周六"]
      }
    },
    methods:{

      init() {

        var mobileSelect = new MobileSelect({
          trigger: "#trigger",
          title: "选择开户行",
          wheels: [
            {data:this.data }
          ],
          callback:function(indexArr, data){
            console.log(data);
          }
        });
      }
    },
    mounted(){
      this.init();
    },

    computed: {
      getUserData() {
        return this.data=this.$store.state.bankList;
      }
    },
    watch: {
      getUserData(val) {
        this.data = val;
      }
    }

  }
</script>
<style>
  #trigger{
    font-size: 0.42667rem;
  }
</style>
