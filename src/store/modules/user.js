import { LOGIN, LOGOUT, GET_USER_INFO } from '../mutation-types'
import { doAction } from '../util'

const state = {
  isLogin: false,
  userInfo: {}
}

const mutations = {
  [LOGIN] (state, userInfo) {
    state.isLogin = true
    state.userInfo = userInfo
  },
  [LOGOUT] (state) {
    state.isLogin = false
    state.userInfo = {}
  },
  [GET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  login (store = {}, params) {
    console.log(this._vm.api)
    return doAction({
      // api: api.login,
      params,
      mutationName: LOGIN
    })
  },
  logout () {
    return doAction({
      // api: api.logout,
      mutationName: LOGOUT
    })
  },
  getUserInfo () {
    return doAction({
      // api: api.getUserInfo,
      mutationName: GET_USER_INFO
    })
  }

}
export default {
  state,
  actions,
  mutations
}
