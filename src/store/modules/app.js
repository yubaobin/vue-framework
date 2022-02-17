import lscache from 'lscache'
const state = {
    openSlidemenu:
        lscache.get('sidemenuStatus') + ''
            ? !!+lscache.get('sidemenuStatus')
            : true,
    redirectUrl: ''
}
const mutations = {
    TOGGLE_MENU: (state) => {
        state.openSlidemenu = !state.openSlidemenu
        lscache.set('sidemenuStatus', state.openSlidemenu ? 1 : 0)
    },
    CLOSE_MENU: (state) => {
        state.openSlidemenu = false
        lscache.set('sidemenuStatus', 0)
    },
    SET_REDIRECTURL: (state, redirectUrl) => {
        state.redirectUrl = redirectUrl
        lscache.set('redirectUrl', redirectUrl)
    }
}
const actions = {
    toggleMenu ({ commit }) {
        commit('TOGGLE_MENU')
    },
    closeMenu ({ commit }) {
        commit('CLOSE_MENU')
    },
    setRedirectUrl ({ commit }, redirectUrl) {
        commit('SET_REDIRECTURL', redirectUrl)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
