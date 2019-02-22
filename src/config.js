// 应用具体配置
const APP_CONFIG = {
  appName: 'xhcp',
  httpHeaders: {
    'Content-Type': 'application/json'
  },
  // 是否需要一开始就校验权限
  needGetUserInfoFirst: false,
  // session有效时间 ms
  sessionDuration: 30 * 60 * 1000,
  // 每个路由默认的权限校验状态
  defaultAuth: false,
  // 首页路由名称, 用于处理遭遇各种异常路由时的最终跳转路由
  indexPageName: 'index',
  // 登录页路由名称
  loginPageName: 'login',
  apiPath: process.env.VUE_APP_apipath ? process.env.VUE_APP_apipath : '', // 接口服务器路径
  root: process.env.VUE_APP_publicPath ? process.env.VUE_APP_publicPath : '',
  accessToken: 'accessToken',
  // req切面配置
  requestInterceptor (req) {
    return req
  },
  // response切面配置
  responseInterceptor (res) {
    // 可以统一处理一些http层面的异常
    // 业务层面一些通用的异常可以在store/utils.js中处理，其余单独请求的异常请直接在接口api调用时catch就行
    return res.data
  },
  // 渲染错误处理
  errorHandler (e) {
    console.error('捕获到了错误：' + e)
  }
}

module.exports = APP_CONFIG
