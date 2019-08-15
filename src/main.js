import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/styles/base.less'

import App from './App.vue'
import router from './router'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
import http from '@/lib/http'
import filter from '@/lib/filter'

Vue.use(Vant)
Vue.use(VueWechatTitle)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = http
Vue.config.productionTip = false
// 设置全局 filter
Object.keys(filter).forEach(name => Vue.filter(name, filter[name]))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
