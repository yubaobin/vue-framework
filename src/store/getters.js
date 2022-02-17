import lscache from 'lscache'
export const userInfo = state => state.user.userInfo
export const openSlidemenu = state => state.app.openSlidemenu
export const permissionRoutes = state => state.permission.permissionRoutes
export const roles = state => state.user.roles
export const routes = state => state.permission.routes
export const themeName = (state) => state.theme.themeName || lscache.get('themeName') || 'normal'
