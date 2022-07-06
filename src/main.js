import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/icon/iconfont.css'
import './assets/css/global.css'
import SlideVerify from 'vue-monoplasty-slide-verify'
import moment from 'moment'

import QS from 'qs'

import uploader from 'vue-simple-uploader'
moment.locale('zh-cn')
Vue.use(uploader)
Vue.use(SlideVerify)

Vue.prototype.$moment = moment
Vue.prototype.$qs = QS

// 统一下载域名
Vue.prototype.downloadDomain = 'http://test.haifou.com:8088/' // stable、stable环境服务地址是43.37
// Vue.prototype.downloadDomain = 'http://tp.xlhmjc.com/' //  sit环境发版/正式上线 tp.xlhmjc.com
// 批量下载前缀
Vue.prototype.batchDownload = 'batch_download' // nginx配置批量下载前缀

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
