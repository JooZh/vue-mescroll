<template>
    <Content>
    <!--标题-->
    <Header title="下拉刷新"></Header>
    <!--滑动区域-->
    <vue-mescroll
      :loadDataCallBack="loadData"
      :getData="getData"
      :dataHandle="dataHandle"
      :enableRefresh="true"
      :autoRefresh="true"
      :enablePagination="false"
      :autoLoad="false"
    >
      <!-- <div slot="header">13123</div> -->
      <div class="slot">
        <p class="notice">下拉刷新: 用刷新的方式加载数据</p>
        <ul id="newsList" class="news-list">
          <li v-for="news in newArr" :key="news.id">
            <p class="new-title">{{news.title}}</p>
            <p class="new-content">{{news.content}}</p>
          </li>
        </ul>
      </div>
      <!-- <div slot="footer">13123</div> -->
    </vue-mescroll>
  </Content>
</template>

<script>
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
        url:'/api/get-data',
        dataType:'json',
        data: query
      })
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
  .mescroll {
    position: absolute;
    top: 45px;
    bottom: 0;
    width: 100%;
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
