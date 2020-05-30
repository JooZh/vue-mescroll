import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/css/normalize.css'
import './assets/css/reset.css'
// 引入mescroll的css文件
import './assets/mescroll-config/mescroll-option.css'

Vue.config.productionTip = false

import mescroll from './components/index.js'
// 引入mescroll的js文件
import mescrollConfig from './assets/mescroll-config/mescroll-option.js'

import service from './service/mock.js'

Vue.use(mescroll,mescrollConfig)

new Vue({
	router,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')
