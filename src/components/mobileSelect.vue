<template>
  <div>
    <div id="trigger">选择开户行</div>
  </div>
</template>

<script>
  import MobileSelect from 'mobile-select'

  export default {
//    props: ['datas'],
    data(){
      return{

      }
    },
    props: ['datas'],
    methods:{

      init() {

        var mobileSelect = new MobileSelect({
          trigger: "#trigger",
          title: "选择开户行",
          wheels: [
            {data:this.datas}
          ],
          callback:function(indexArr, data){
            console.log(data);
          }
        });
      },
    },
    mounted(){
      this.init();
    },
    /*computed: {
      getUserData() {
        return this.data=this.$store.state.bankList;
      }
    },
    watch: {
      getUserData(val) {
        this.data = val;
      }
    },*/

  }
</script>




<style lang="less" scoped>
  @import '../less/config.less';
  #trigger{
    font-size: 0.42667rem;
  }

</style>
