<template>
  <Content>
    <!--标题-->
    <Header title="Vue-Mescroll" :leftBtn="false" :rightBtn="false"></Header>
    <div class="content">
      <router-link to="refresh">Refresh<span class="tip">下拉刷新，自动加载数据</span></router-link>
      <router-link to="pagination">Pagination<span class="tip">分页加载更多数据,自动加载第一页</span></router-link>
      <router-link to="refresh-pagination">Refresh+Pagination<span class="tip">分页和刷新配合，用刷新加载第一页</span></router-link>
      <router-link to="refresh-pagination2">Refresh+Pagination<span class="tip">分页和刷新配合，用分页加载第一页</span></router-link>
      <router-link to="tabs">Tabs <span class="tip">Tab菜单隐现显示，多个mescroll</span></router-link>
      <router-link to="tabs-swiper">Tabs+Swiper <span class="tip">菜单和轮播配合，多个mescroll</span></router-link>
      <router-link to="sticky">Sticky<span class="tip">菜单和轮播配合，刷新加载第一页</span></router-link>
    </div>
  </Content>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  .content {
    padding-top: 44px;
  }
  .content a {
    display: block;
    padding: 15px 12px;
    border-bottom: 1px solid #eee;
  }
  .content .tip {
    float: right;
    margin-top: 2px;
    font-size: 12px;
    color: gray;
  }
</style>
