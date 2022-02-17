// 应用具体配置
export default {
    sysName: 'khala',
    // session有效时间 ms
    sessionDuration: 30 * 60 * 1000,
    routeMode: 'hash',
    // 首页路由名称, 用于处理遭遇各种异常路由时的最终跳转路由
    indexPageName: 'Dashboard',
    setting: {
        fixedHeader: true,
        needTagsView: true,
        showLogo: true
    },
    topLevel: 'admin',
    authMock: true,
    useMock: true, // 是否使用mock数据
    formSize: 'mini', // element-ui form 的大小 medium / small / mini
    apiPath: process.env.VUE_APP_apipath ? process.env.VUE_APP_apipath : '', // 接口服务器路径
    authPath: process.env.VUE_APP_authpath ? process.env.VUE_APP_authpath : '', // 统一认证地址
    accessToken: 'token',
    userInfoKey: 'userInfo'
}
