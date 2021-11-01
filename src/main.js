import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/icon/iconfont.css'
import './assets/css/global.css'

import QS from 'qs'

import uploader from 'vue-simple-uploader'
import VueParticles from 'vue-particles'
Vue.use(uploader)
Vue.use(VueParticles)

Vue.prototype.$qs = QS

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
