import {doAction} from '../util'
import * as types from '../mutation-types'
const state = {
  hasPermission: false,
  animSwitch: 'left-out'
}

const getters = {
  hasPermission: state => state.hasPermission,
  animSwitch: state => state.animSwitch
}

const mutations = {
  [types.ANIM_SWITCH](state, { animtype }) {
    state.animSwitch = (animtype === 'left' ?  'left-out' : 'right-out')
  }
}


const actions = {
  animSwitch({ commit }, option) {
    commit(types.ANIM_SWITCH, option)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
