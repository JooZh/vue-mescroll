import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/css/normalize.css'
import './assets/css/reset.css'

Vue.config.productionTip = false

import scroll from './components/index.vue'

import service from './service/mock.js'

Vue.component('mescroll',scroll)

new Vue({
	router,
	render: function(h) {
		return h(App)
	}
}).$mount('#app')
