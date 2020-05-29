import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import Refresh from '@/pages/base/refresh'
import Pagination from '@/pages/base/pagination'
import RefreshPagination from '@/pages/base/refresh-pagination'
import RefreshPagination2 from '@/pages/base/refresh-pagination2'
import Tabs from '@/pages/base/tabs'
import TabsSwiper from '@/pages/base/tabs-swiper'

import mescrollOptions from '@/pages/base/mescroll-options'
import listProducts from '@/pages/base/list-products'
import mescrollComponent from '@/pages/base/mescroll-component'
import mescrollMore from '@/pages/base/mescroll-more'

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
    }, {
      path: '/mescrollOptions',
      name: 'mescrollOptions',
      component: mescrollOptions
    }, {
      path: '/listProducts',
      name: 'listProducts',
      component: listProducts
    }, {
      path: '/mescrollComponent',
      name: 'mescrollComponent',
      component: mescrollComponent
    }, {
      path: '/mescrollMore',
      name: 'mescrollMore',
      component: mescrollMore
    }
  ]
})
