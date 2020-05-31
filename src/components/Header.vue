<template>
  <div class="header" :class="{'line':line}">
      <div class="hd">
        <router-link class="btn-left" to="/" v-show="leftBtn">返回</router-link>
        <span class="title">{{title}}</span>
        <span class="btn-right"></span>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        leftBtn:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
            default:'标题',
            required:true
        },
        line:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style scoped>
    .header {
        z-index: 9990;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: white;
    }
    .header.line{
        border-bottom: 1px solid #eee;
    }
    .header .hd{
        height: 44px;
        line-height: 44px;
        text-align: center;
        display: flex;
    }
    .header .hd .btn-left {
        flex: 50px 0 0 ;
    }
    .header .hd .title {
        flex:1;
        font-size: 16px;
    }
    .header .hd .btn-right {
        flex: 50px 0 0 ;
    }
</style>