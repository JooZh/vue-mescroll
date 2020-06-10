<template>
    <div class="data-li">
        <img class="pd-img" :src="item.img"/>
        <div class="pd-name">{{item.name}}</div>
        <p class="pd-price">{{item.price}} 元</p>
        <p class="pd-sold">已售{{item.sold}}件</p>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
            default:()=>{return {}}
        }
    }
}
</script>

<style scoped>
/*展示上拉加载的数据列表*/
  .data-li{
    position: relative;
    height: 80px;
    padding: 10px 8px 10px 120px;
    border-bottom: 1px solid #eee;
  }
  .data-li .pd-img{
    position: absolute;
    left: 18px;
    top: 10px;
    width: 80px;
    height: 80px;
  }
  .data-li .pd-name{
    font-size: 13px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .data-li .pd-price{
    font-size: 13px;
    color: red;
  }
  .data-li .pd-sold{
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
</style>