
export default {
  namespaced: true,
  state: {
    role: '',
    userInfo: {
      userImg: '@/assets/img/avatar-default.gif'
    }, // 用户数据
    pageRef: null,
  },
  getters: {

  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = {}
      state.userInfo = {
        ...state.userInfo,
        ...data
      }
    },
  },
  actions: {

  }
}
