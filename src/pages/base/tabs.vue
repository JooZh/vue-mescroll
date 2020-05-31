<template>
  <div>
    <!--标题-->
    <Header title="Tabs">
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
    </Header>
    <div class="tabs-center">
      <template v-for="(tab,i) in tabs">
        <vue-mescroll
          :key="tab.tabId"
          v-show="i===curIndex"
          :autoInit="tab.isListInit"
          :viewItemComponent="Item"
          :queryParams="queryParams"
          :loadDataCallBack="loadData"
          :dataHandle="dataHandle"
          :enableRefresh="true"
        ></vue-mescroll>
      </template>
    </div>
  </div>
</template>

<script>
import Item from '../components/ProductItem.vue'
export default {
  name: 'mescrollSwiperNav',
  data () {
    return {
      Item:Item,
      tabs: [
        {name: '首页', tabId:1, isListInit: true}, 
        {name: '奶粉', tabId:2, isListInit: false}, 
        {name: '面膜', tabId:3, isListInit: false}, 
        {name: '图书', tabId:4, isListInit: false}
      ],
      tabWidth: 80, // 每个tab的宽度
      barWidth: 40, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      selectTab:null,
      queryParams:{
        type:1
      },
    }
  },
  computed: {
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
  /*菜单*/
  .tabs-warp{
    height: 42px;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
    overflow-y: hidden;
    box-sizing: content-box;
    text-align: center;
  }
  .tabs-warp .tabs-content{
    width: 100%;
    height: 100%;
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
  .tabs-center{
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
