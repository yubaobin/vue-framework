import * as types from '../mutation-types'
const state = {
  hasPermission: false
}

const getters = {
  hasPermission: state => state.hasPermission
}

const mutations = {
  [types.PERMISSION] (state, { permission }) {
    state.hasPermission = permission
  }
}

const actions = {
  animSwitch ({ commit }, option) {
    commit(types.PERMISSION, option)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
