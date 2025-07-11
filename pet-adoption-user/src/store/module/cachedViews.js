
export default {
  namespaced: true,
  state: {
    cachedViews: ['home']
  },
  getters: {

  },
  mutations: {
    ADD_CACHED_VIEW: (state, name) => {
      if (state.cachedViews.includes(name)) {
        return
      }
      state.cachedViews.push(name)
      // console.log('add', state.cachedViews)
    },

    DEL_CACHED_VIEW: (state, view) => {
      const { from = {}, flag = '' } = view
      if (flag === 'all') {
        // 返回首页，清除所有
        state.cachedViews = ['home']
      } else {
        const index = state.cachedViews.indexOf(from.name)
        index > -1 && state.cachedViews.splice(index, 1)
      }

      // console.log(`delete, 走${flag}`, state.cachedViews)
    }

  },
  actions: {

  }
}
