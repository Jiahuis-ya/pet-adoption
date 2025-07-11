import Vue from 'vue'
import Vuex from 'vuex'

import global from './module/global.js'
import cachedViews from './module/cachedViews.js'// 组件缓存（keep-alive）


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    global,
    cachedViews, // 组件缓存（keep-alive）
  },
  plugins: [

  ]
})
