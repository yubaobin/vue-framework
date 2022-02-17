/**
 * 主题
 */
import ls from 'lscache'
const state = {
    themeName: ''
}
const mutations = {
    setThemeName: (state, payload) => {
        state.themeName = payload
        ls.set('themeName', payload)
    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
