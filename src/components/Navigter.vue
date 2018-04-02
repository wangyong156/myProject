<template>
  <div class="wrap">
    <div class="list">
      <h3>上证指数</h3>
      <div>
        <h5>
          3228.66
          <img src="../assets/fall.png" alt="">
        </h5>
        <span>-24.77 </span>
        <span>-0.76%</span>
      </div>
    </div>
    <div class="list minddle">
      <h3>深证指数</h3>
      <div>
        <h5>
          10373.17
          <img src="../assets/rise.png" alt="">
        </h5>
        <span>-24.77 </span>
        <span>-0.76%</span>
      </div>
    </div>
    <div class="list right">
      <h3>上证指数</h3>
      <div>
        <h5>
          1926.77
          <img src="../assets/fall.png" alt="">
        </h5>
        <span>-24.77 </span>
        <span>-0.76%</span>
      </div>
    </div>
  </div>
</template>
<style lang='less' scoped>
@import '../less/config.less';
.wrap{
    height:2.6667rem;
    width: 100%;
    background-color: @liBg;
    padding: 0 @p30;
    margin-bottom:0.26667rem;
     color:@fcolor;
     font-size: 0.32rem;
     display: flex;
     align-items: center;
    .list{
      display:inline-block;
      width: 33.33333%;
      text-align: left;
      line-height: 1.4;
      div{
        color: #33ffc3;
        line-height: 1.6;
        h5{
          font-size: 0.45333rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          img{
            width: 0.21333rem;
            height: 0.26667rem;
          }
        }
        span{
          padding-right: 0.2rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .right{
      padding-left: 0.6rem;
    }
    .minddle{
      padding-left: 0.4rem;
      div{
        color:#ff335b;
      }
    }
}
</style>
