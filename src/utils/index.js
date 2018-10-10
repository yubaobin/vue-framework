
import cookie from 'js-cookie'
import lscache from 'lscache'
import config from '../config'

export default (() => {
  const TOKEN = config.accessToken || 'AccessToken'
  const LOGIN_TIME = 'UserLoginTime'
  const USER_INFO = 'UserInfo'
  return {
    cookie,
    /**
     * 空对象判断
     * @param obj
     * @returns {boolean}
     */
    isEmpty (obj) {
      for (var key in obj) return false
      return true
    },
    /**
     * 获取登录剩余时间秒数
     * @returns {number}
     */
    getLoginRemainingTime () {
      let loginTime = Math.ceil(+lscache.get(LOGIN_TIME) / 1000)
      return (config.sessionDuration || 30 * 60 * 1000) / 1000 - (Math.ceil(Date.now() / 1000) - loginTime)
    },
    /**
     * 从缓存获取用户信息
     */
    getUserInfoFromCache () {
      return JSON.parse(lscache.get(USER_INFO) || '""')
    },
    getAccessToken () {
      return lscache.get(TOKEN)
    },
    /**
     * 保存用户信息到缓存
     * @param userInfo
     */
    setUserInfoToCache (userInfo) {
      lscache.set(USER_INFO, JSON.stringify({
        name: userInfo.name
      }))
      lscache.set(LOGIN_TIME, Date.now())
      lscache.set(TOKEN, userInfo.accessToken)
    },
    /**
     * 移除缓存中的用户信息
     */
    removeUserInfoFromCache () {
      lscache.remove(USER_INFO)
      lscache.remove(LOGIN_TIME)
      lscache.remove(TOKEN)
    },
    /**
     * 参数对象转换成请求参数字符串
     * @param params
     * @returns {*}
     */
    params2query (params) {
      if (typeof params !== 'object') return ''
      var queries = []
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          params[i] && queries.push(i + '=' + params[i])
        }
      }
      return queries.join('&')
    },
    query2params (query) {
      if (typeof query !== 'string') return {}
      let param = {}
      let params
      let kv
      params = query.split('&')
      for (let i = 0, len = params.length; i < len; i++) {
        if (!params[i]) continue
        kv = params[i].split('=')
        if (kv[0] && kv[1]) param[kv[0]] = kv[1]
      }
      return param
    }
  }
})()
