import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import Refresh from '@/pages/base/refresh'
import Pagination from '@/pages/base/pagination'
import RefreshPagination from '@/pages/base/refresh-pagination'
import RefreshPagination2 from '@/pages/base/refresh-pagination2'
import Tabs from '@/pages/base/tabs'
import TabsSwiper from '@/pages/base/tabs-swiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
      path: '/pagination',
      name: 'Pagination',
      component: Pagination
    }, {
      path: '/refresh',
      name: 'Pagination',
      component: Refresh
    }, {
      path: '/refresh-pagination',
      name: 'RefreshPagination',
      component: RefreshPagination
    }, {
      path: '/refresh-pagination2',
      name: 'RefreshPagination2',
      component: RefreshPagination2
    }, {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    }, {
      path: '/tabs-swiper',
      name: 'TabsSwiper',
      component: TabsSwiper
    }
  ]
})
