import { removeTokenFromCache, removeUserInfoFromCache } from '@/utils'
const state = {
    userInfo: {},
    roles: []
}

const mutations = {
    LOGOUT (state) {
        state.userInfo = {}
        removeUserInfoFromCache()
        removeTokenFromCache()
    },
    GET_USER_INFO (state, userInfo) {
        state.userInfo = userInfo
    },
    SET_ROLES (state, roles) {
        state.roles = roles
    }
}

const actions = {
    logout ({ commit }) {
        commit('LOGOUT')
    },
    getUserInfoByMock ({ commit }) {
        return new Promise((resolve) => {
            const user = { id: 1, roles: ['admin'], name: '测试' }
            console.log('当前用户信息', user)
            resolve(user)
            commit('SET_ROLES', user.roles || [])
            commit('GET_USER_INFO', user)
        })
    },
    changeRoles ({ commit }, roles) {
        commit('SET_ROLES', roles)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
