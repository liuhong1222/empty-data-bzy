import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    zhxx: {}, // 账户信息数据
    result: [],
    realtimeResult: []
  },
  mutations: {
    setZhxx(state, obj) {
      state.zhxx = obj
    },
    setResult(state, result) {
      state.result = result
    },
    setRealtimeResult(state, realtimeResult) {
      state.realtimeResult = realtimeResult
    }
  },
  actions: {
  },
  modules: {
  }
})
