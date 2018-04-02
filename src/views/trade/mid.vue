<template>
</template>

<script>
export default {
    data() {
        return {}
    },
    components: {
    },
    methods: {
        back() {
        	this.$router.back(-1);
        }
    },
    filters:{
   },
    mounted(){
      this.$router.push({ path: '/firmOffer',query: {
        id:this.$route.query.id,
        type:this.$route.query.type
      }})
  }
}
</script>

