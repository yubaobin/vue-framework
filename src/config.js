// 应用具体配置
const APP_CONFIG = {
  appName: 'demo',
  httpHeaders: {
    'Content-Type': 'application/json'
  },
  apiPath: {
    default: '/api' // 访问基础路径
  },
  // req切面配置
  requestInterceptor(req) {
    return req
  },
  envs: {
    development: {
      NODE_ENV: '"development"',
      SOMETHING: '"其它的值"'
    },
    test: {
      NODE_ENV: '"test"'
    },
    pre: {
      NODE_ENV: '"pre"'
    },
    production: {
      NODE_ENV: '"production"'
    }
  },
  // response切面配置
  responseInterceptor(res) {
    // 可以统一处理一些http层面的异常
    // 业务层面一些通用的异常可以在store/utils.js中处理，其余单独请求的异常请直接在接口api调用时catch就行
    return res.data
  },
  // 渲染错误处理
  errorHandler(e) {
    console.error('捕获到了错误：' + e)
  }
}

module.exports = APP_CONFIG
