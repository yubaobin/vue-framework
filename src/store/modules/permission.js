import { baseRouter, permissionRouter } from '@/router/route.config'
import { importComponent } from '@/utils'
// 根据用户角色判断路由是否有权限
function hasPermission (roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role))
    } else {
        return true
    }
}

// 根据用户角色过滤掉无权限的路由配置
export function filterRoutes (routes, roles, parentPath = '') {
    const router = [] // 路由
    routes.forEach((route) => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                let ppath = parentPath
                if (tmp.path) {
                    // 当前路由有path，有时路由设置 '' 作为默认路由
                    ppath = `${parentPath}/${tmp.path}` // 默认相对路径，和父路径拼接
                    if (tmp.path[0] === '/') {
                        // 如果有/绝对路径直接赋值
                        ppath = tmp.path
                    }
                }
                tmp.children = filterRoutes(tmp.children, roles, ppath)
                if (tmp.children.length) {
                    const childPath = tmp.children[0].path
                    if (childPath && Object.prototype.hasOwnProperty.call(tmp, 'redirect')) {
                        // 当前第一个子路由有path，设置重定向
                        if (childPath[0] === '/') {
                            tmp.redirect = childPath
                        } else {
                            tmp.redirect = `${ppath}/${childPath}`
                        }
                    }
                }
            }
            if (typeof tmp.component === 'string') {
                // 扫描，如果是字符串，通过拼接找到对应的组件
                tmp.component = importComponent(tmp.component)
            }
            router.push(tmp)
        }
    })
    return router
}

const state = {
    routes: baseRouter,
    permissionRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.permissionRoutes = routes
    }
}

const actions = {
    // 根据角色添加路由
    generateRoutes ({ commit }, roles) {
        return new Promise((resolve) => {
            // 可以发请求获取菜单 permission 的值
            // const permission = [{
            //   path: '/dashboard',
            //   name: 'Dashboard',
            //   component: '字符串', 通过字符串拼接组件获取
            //   meta: { title: '首页', icon: 'home', noCache: true }
            // }]
            const accessedRoutes = filterRoutes(permissionRouter, roles)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
    updateRoutes ({ commit }) {
        commit('SET_ROUTES', [])
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
