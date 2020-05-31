<template>
  <div class="page">
    <!--标题-->
    <Header title="刷新+分页2"></Header>
    <!--滑动区域-->
    <vue-mescroll
      :loadDataCallBack="loadData"
      :getData="getData"
      :dataHandle="dataHandle"
      :enableRefresh="true"
    >
      <div>
        <p class="notice">分页加载和刷新: 用刷新的方式加载第一页</p>
        <ul id="newsList" class="news-list">
          <li v-for="news in newArr" :key="news.id">
            <p class="new-title">{{news.title}}</p>
            <p class="new-content">{{news.content}}</p>
          </li>
        </ul>
      </div>
    </vue-mescroll>
  </div>
</template>

<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

export default {
  name: 'listNews',
  data () {
    return {
      newArr: [] // 数据列表
    }
  },
  methods: {
    loadData(query){
      return $.ajax({
        url:'/api/get-pagination',
        dataType:'json',
        data: query
      })
    
      // return $.ajax({
      //   url:'/api/get-data',
      //   dataType:'json',
      //   data: query
      // })
    },
    dataHandle(data){
      return data.data;
    },
    getData(data){
      this.newArr = data
    }
  }
}
</script>

<style scoped>
  /*以fixed的方式固定mescroll的高度*/
  .page {
    position: fixed;
    top: 0;
    bottom: 0;
    height: auto;
  }
  /*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 45px;
    bottom: 0;
    height: auto;
  }
  .mescroll .notice {
    font-size: 14px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    text-align: center;
    color: #555;
  }

  .news-list li {
    padding: 16px;
    border-bottom: 1px solid #eee;
  }
  .news-list .new-title {
    font-size: 16px;
    margin-bottom: 6px;
    color: #000;
  }
  .news-list .new-content {
    font-size: 14px;
    margin-top: 6px;
    line-height: 20px;
    /* margin-left: 10px; */
    color: #666;
  }
</style>
