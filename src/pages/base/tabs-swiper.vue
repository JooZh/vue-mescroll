<template>
  <div>
    <!--标题-->
    <div class="header">
      <router-link class="btn-left" to="/">返回</router-link>
      <p class="title">Tabs-Swiper</p>
      <!--菜单. 如果up配置了isBounce为false,则需加上mescroll-touch-x,原因: http://www.mescroll.com/qa.html#q10 -->
      <div class="tabs-warp">
        <div ref="tabsContent" class="tabs-content mescroll-touch-x">
          <div style="display: inline-block"> <!--PC端运行,加上这个div可修复tab-bar错位的问题 -->
            <ul class="tabs" ref="tabs">
              <li 
                class="tab" 
                v-for="(tab,i) in tabs" 
                :class="{active: i===curIndex}" 
                :style="{width: tabWidth+'px'}" 
                :key="tab.id"
                @click="changeTab(tab,i)">{{tab.name}}</li>
            </ul>
            <div class="tab-bar" :style="{width: barWidth+'px', left: barLeft}"></div>
          </div>
        </div>
      </div>
    </div>
    <!--轮播-->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="tab in tabs" :key="tab.tabId">
        <vue-mescroll
          :autoInit="tab.isListInit"
          :viewItemComponent="Item"
          :queryParams="queryParams"
          :loadDataCallBack="loadData"
          :dataHandle="dataHandle"
          :enableRefresh="true"
          :autoRefresh="true"
          :autoLoad="false"
        ></vue-mescroll>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// 轮播组件: https://github.com/surmon-china/vue-awesome-swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Item from '../components/ProductItem.vue'
export default {
  name: 'mescrollSwiperNav',
  components: {
    swiper, // 轮播组件
    swiperSlide, // 轮播组件
  },
  data () {
    return {
      Item:Item,
      tabs: [
        {name: '首页', tabId:1, isListInit: true}, 
        {name: '奶粉', tabId:2, isListInit: false}, 
        {name: '面膜', tabId:3, isListInit: false}, 
        {name: '图书', tabId:4, isListInit: false},
        {name: '果汁', tabId:5, isListInit: false}, 
        {name: '奶瓶', tabId:6, isListInit: false}, 
        {name: '美素', tabId:7, isListInit: false}, 
        {name: '璐拉', tabId:8, isListInit: false}, 
        {name: '启赋', tabId:9, isListInit: false}, 
        {name: '雅培', tabId:10, isListInit: false}, 
        {name: '花王', tabId:11, isListInit: false}, 
        {name: '韩蜜', tabId:12, isListInit: false}
      ],
      tabWidth: 80, // 每个tab的宽度
      barWidth: 40, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      selectTab:null,
      swiperOption: { // 轮播配置
        on: {
          slideChange:()=>{
            this.curIndex = this.swiper.activeIndex
            this.selectTab = this.tabs[this.curIndex]
            this.initMescroll();
          }
        }
      },
      queryParams:{
        type:1
      },
    }
  },
  computed: {
    swiper () { // 轮播对象
      return this.$refs.mySwiper.swiper
    },
    barLeft () { // 红线的位置
      return (this.tabWidth * this.curIndex + (this.tabWidth - this.barWidth) / 2) + 'px'
    }
  },
  methods: {
    initMescroll(){
      this.queryParams.type = this.selectTab.tabId
      let timer = setTimeout(()=>{
        if(!this.tabs[this.curIndex].isListInit){
          this.tabs[this.curIndex].isListInit = true
        }
        clearTimeout(timer)
      },200)
    },
    // 切换菜单
    changeTab (tab,tabIndex) {
      if (this.curIndex === tabIndex) return; // 避免重复调用
      this.curIndex = tabIndex; // 切换菜单
      this.selectTab = tab
      this.swiper.slideTo(tabIndex);
      this.initMescroll();
    },
    loadData(query){
      return $.ajax({
        url:'/api/get-products',
        dataType:'json',
        data: query
      })
    },
    dataHandle(data){
      return data.data;
    }
  }
}
</script>

<style scoped>
  /*模拟的标题*/
  .header{
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    line-height: 16px;
    text-align: center;
    background-color: white;
  }
  .header .btn-left{
    position: absolute;
    top: 0;
    left: 0;
    padding:12px 12px 0 12px;
  }
  .header .title{
    margin-top: 12px;
  }
  /*菜单*/
  .tabs-warp{
    height: 42px;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
    overflow-y: hidden;
    border-bottom: 1px solid #eee;
    box-sizing: content-box;
  }
  .tabs-warp .tabs-content{
    width: 100%;
    height: 50px;
    overflow-x: auto;
  }
  .tabs-warp .tabs-content .tabs{
    width: 100%;
    white-space: nowrap;
  }
  .tabs-warp .tabs-content .tabs li{
    display: inline-block;
    height: 40px;
    line-height: 45px;
    vertical-align: middle;
  }
  .tabs-warp .tabs-content .tabs .active{
    color: #FF6990;
  }
  /*菜单进度*/
  .tabs-warp .tab-bar{
    position: relative;
    height: 2px;
    background-color: #FF6990;
    transition: left 300ms;
  }
  /*列表*/
  .swiper-container{
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  
</style>
