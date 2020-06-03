import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/css/normalize.css'
import './assets/css/index.css'

Vue.config.productionTip = false

// 引入mescroll的文件
import mescroll from './mescroll/index.js'
// import './assets/mescroll-config/mescroll-option.css'
// import mescrollConfig from './assets/mescroll-config/mescroll-option.js'

import service from './service/mock.js'

Vue.use(mescroll,{})

import Header from './components/Header.vue'
import Content from './components/Content.vue'
Vue.component('Header',Header)
Vue.component('Content',Content)


new Vue({
	router,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')
