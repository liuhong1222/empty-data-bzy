'use strict'

import Vue from 'vue'
import axios from 'axios'
import { ss } from '../utils/storage'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.domain = 'test.xunlong.com'

const config = {
  baseURL: process.env.VUE_APP_URL
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    if (ss.get('token')) {
      // 在请求头中设置Authorization属性，发送token,'Bearer'表示类型(必须加)
      config.headers.token = ss.get('token')
    }
    // debugger
    config.headers.domain = window.location.hostname
    // config.headers.domain = 'test.buzhen.com'

    // 统一为get请求URL，添加
    if (config.method === 'get') {
      let time = new Date().getTime()
      config.url += '?time=' + time
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (
      response.data.code === 5104 ||
      response.data.code === 5103 ||
      response.data.code === 400007 ||
      (response.data.code === 500 && response.data.msg === 'token验证信息异常')
    ) {
      ss.remove('token')
      ss.remove('customer')
      ss.remove('personalInfo')
      window.location.reload()
    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $http: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
