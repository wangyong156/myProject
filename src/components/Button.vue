<template>
<div :style="{marginTop:topNum}" @click='toNext'>
    <span :class="{active:isActive}" >{{buttonText}}</span>
</div>
</template>

<script>
export default {
  props:{
      buttonText:{
          type:String
      },
      isActive:{
          type:Boolean
      },
      topNum:''
  },
  methods:{
      toNext(){
          this.$emit('toNext')
      }
  }
}
</script>

<style lang="less" scoped>
@import '../less/config.less';
div{
    width: 100%;
    text-align: center;
    font-size:.48rem;
    span{
        display: inline-block;
        width: 9.2rem;
        height: 1.17333rem;
        line-height: 1.17333rem;
        background-color:@actColor;
        color:@newColor;

        border-radius: 0.08rem;
    }
    .active{
        border: none;
        background-color:@actColor;
        color:@newColor;
    }
}
</style>
