<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
<style lang='less' scoped>
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1.30667rem;
    z-index: 10;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f5f5f5;
  }
</style>
