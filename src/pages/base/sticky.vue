<template>
  <div>
    <!--标题-->
    <Header title="Swiper"></Header>
    <div class="tabs-center">
      <vue-mescroll
        :enableRefresh="false"
        :enablePagination="false"
        :stickyConfig="stickyConfig"
      >
        <div class="slot-header" slot="header">
          <img class="swiper" src="../../assets/img/swiper.jpg"/>
        </div>
        <div class="tabs-warp" slot="sticky">
          <!--菜单. 如果up配置了isBounce为false,则需加上mescroll-touch-x,原因: http://www.mescroll.com/qa.html#q10 -->
          <div class="tabs-content">
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
        <!--轮播-->
        <swiper class="mescroll-content" ref="mySwiper" :options="swiperOption">
          <swiper-slide v-for="tab in tabs" :key="tab.tabId">
            <vue-mescroll
              :enableRefresh="false"
              :loadDataCallBack="loadData"
              :dataHandle="dataHandle"
              :viewItemComponent="Item"
            >
            </vue-mescroll>
          </swiper-slide>
        </swiper>
      </vue-mescroll>
    </div>
  </div>
</template>

<script>
// 轮播组件: https://github.com/surmon-china/vue-awesome-swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Item from '../components/ProductItem.vue'

export default {
  name: 'mescrollSwiperNav',
  components:{
    swiper, // 轮播组件
    swiperSlide, // 轮播组件
    Item
  },
  data () {
    return {
      Item:Item,
      stickyConfig:{
        el:'.tabs-warp',
        className:'nav-sticky'
      },
      tabs: [
        {name: '首页', tabId:1, isListInit: true}, 
        {name: '奶粉', tabId:2, isListInit: false}, 
        {name: '面膜', tabId:3, isListInit: false}
      ],
      tabWidth: 80, // 每个tab的宽度
      barWidth: 40, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      listData:[],
      selectTab:null,
      queryParams:{
        type:1
      },
      swiperOption: { // 轮播配置
        on: {
          slideChange:()=>{
            this.curIndex = this.swiper.activeIndex
            this.selectTab = this.tabs[this.curIndex]
          }
        }
      },
    }
  },
  mounted(){

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
    // 切换菜单
    changeTab (tab,tabIndex) {
      if (this.curIndex === tabIndex) return; // 避免重复调用
      this.curIndex = tabIndex; // 切换菜单
      this.selectTab = tab
      this.queryParams.type = this.selectTab.tabId
      this.swiper.slideTo(tabIndex);
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
    },
    getData(data){
      this.tabs[this.curIndex].listData = data;
      // this.listData = data
    }
  }
}
</script>

<style scoped>
  /*模拟的轮播*/
  .swiper{
    width: 100%;
    vertical-align: bottom;
  }
  /*ios使用sticky样式实现*/
  .nav-sticky-ios{
    z-index: 9999;/*需设置zIndex,避免在悬停时,可能会被列表数据遮住*/
    position: -webkit-sticky;
    position: sticky;
    top: 0;/*相对mescroll的div悬停的位置*/
  }
  /*android和pc端悬停*/
  .nav-sticky-android{
    z-index: 9999;
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
  }
  /*模拟的标题*/
  /*菜单*/
  .tabs-warp{
    height: 43px;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
    overflow-y: hidden;
    box-sizing: content-box;
    text-align: center;
    background: #fff;
  }
  .tabs-warp .tabs-content{
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #eee;
    overflow-x: auto;
    background: #fff;
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
  .tabs-center{
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
