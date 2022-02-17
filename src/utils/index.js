import config from '../config'

/**
 * 空对象判断
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
    if (obj) {
        for (var key in obj) return false
        return true
    } else {
        return true
    }
}

/**
 * 保存用户信息到缓存
 * @param userInfo
 */
export const setUserInfoToCache = (user) => {
    const userInfoStr = JSON.stringify(user)
    localStorage.setItem(config.userInfoKey, userInfoStr)
}

/**
 * 从缓存获取用户信息
 */
export const getUserInfoFromCache = () => {
    const userInfoStr = localStorage.getItem(config.userInfoKey) || ''
    let user = {}
    if (userInfoStr) {
        try {
            user = JSON.parse(userInfoStr)
        } catch (e) {
            console.log('解析用户信息失败')
        }
    }
    return user
}

/**
 * 移除缓存中的用户信息
 */
export const removeUserInfoFromCache = () => {
    localStorage.removeItem(config.userInfoKey)
}

/**
 * 保存token到缓存
 * @param userInfo
 */
export const setTokenToCache = (st) => {
    localStorage.setItem(config.accessToken, st)
}

/**
 * 从缓存获取token
 */
export const getTokenFromCache = () => {
    return localStorage.getItem(config.accessToken) || null
}

/**
 * 移除缓存中的token
 */
export const removeTokenFromCache = () => {
    localStorage.removeItem(config.accessToken)
}

/**
 * 参数对象转换成请求参数字符串
 * @param params
 * @returns {*}
 */
export const params2query = (params) => {
    if (typeof params !== 'object') return ''
    const queries = []
    for (const i in params) {
        if (Object.prototype.hasOwnProperty.call(params, i)) {
            params[i] && queries.push(i + '=' + params[i])
        }
    }
    return queries.join('&')
}
export const query2params = (query) => {
    if (typeof query !== 'string') return {}
    const param = {}
    const params = query.split('&')
    let kv
    for (let i = 0, len = params.length; i < len; i++) {
        if (!params[i]) continue
        kv = params[i].split('=')
        if (kv[0] && kv[1]) param[kv[0]] = kv[1]
    }
    return param
}
/**
 * 判断是否是链接
 * @param path
 * @returns {boolean}
 */
export const isExternal = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 判断是否存在class
 * @param ele
 * @param cls
 * @returns {boolean}
 */
export const hasClass = (ele, cls) => {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * 添加class
 * @param ele
 * @param cls
 */
export const addClass = (ele, cls) => {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
/**
 * 删除class
 * @param ele
 * @param cls
 */
export const removeClass = (ele, cls) => {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * 深拷贝
 * @param source
 * @returns {*}
 */
export const deepClone = (source) => {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}
/**
 * 判断非负整数
 * @param num
 * @returns {boolean}
 */
export const isInteger = (num) => {
    if ((num + '').indexOf('.') > -1) {
        return false
    } else {
        return /^[1-9]\d*|0$/.test(num)
    }
}
/**
 * 判断b的值是否和a相等
 * @param a
 * @param b
 * @returns {boolean}
 */
export const valueEquals = (a, b) => {
    if (a === b) return true
    if (!(a instanceof Array)) return false
    if (!(b instanceof Array)) return false
    if (a.length !== b.length) return false
    for (let i = 0; i !== a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}
/**
 * 获取URL的query参数
 * @returns {{}}
 */
export function parseUrl (uri) {
    let url = uri || window.location.href
    const i = url.indexOf('?')
    const indexHash = url.indexOf('#')
    if (i === -1) return {}
    if (i < indexHash) url = url.slice(0, indexHash)
    const querystr = url.substr(i + 1)
    const arr1 = querystr.split('&')
    const arr2 = {}
    for (const key in arr1) {
        const ta = arr1[key].split('=')
        arr2[ta[0]] = ta[1]
    }
    return arr2
}

/**
 * 根据字符串加载组件
 * @param file
 * @returns {function(): (Promise.<TResult>|*)}
 * () => import(`@/${file}.vue`).then(m => m.default)
 */
export function importComponent (file) {
    return (resolve) => require([`@/${file}.vue`], resolve)
}

/**
 * 获取blod对象下载
 * @param blod
 * @param filename
 */
export function getFileFormBlod (blod, filename) {
    const href = window.URL.createObjectURL(blod)
    const downloadElement = document.createElement('a')
    downloadElement.href = href
    downloadElement.download = filename
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
}

/**
 * 动态添加link
 */
export function addCssByLink (url, callback) {
    const heads = document.getElementsByTagName('head')
    const link = document.createElement('link')
    link.id = 'css-theme'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    heads.length
        ? heads[0].appendChild(link)
        : document.documentElement.appendChild(link)
    link.onload = function () {
        if (callback && typeof callback === 'function') callback()
    }
}

/**
 * 清空主题
 */
export function clearTheme () {
    const cssLink = document.getElementById('css-theme')
    const heads = document.getElementsByTagName('head')
    if (cssLink) {
        heads[0].removeChild(cssLink)
    }
    const bodyClass = document.body.className.split(' ')
    const filterClass = bodyClass.filter((item) => {
        return item.indexOf('-theme') === -1
    })
    document.body.className = filterClass.join(' ')
}

/**
 * 使用Promise.race终止promise
 * @param {*} promise 需要终止的promise
 * @param {*} control promise控制器, 在外部 调用control.cancel()终止promise
 * let control = {}
 * cancelPromise(promise, control)
 * control.cancel && control.cancel()
 */
 export function cancelPromise (promise, control) {
    if (promise instanceof Promise) {
        return Promise.race([
            promise,
            new Promise((resolve, reject) => {
                control.cancel = () => {
                    reject(new Error('cancel'))
                }
            })
        ])
    } else {
        return Promise.reject(new Error('promise is not Promise'))
    }
}

/**
 * 去掉url中query的某个参数
 * @param url 地址
 * @param str 需要去掉参数
 * @returns 去掉后的地址
 */
 export const removeParams = (url, str) => {
	let result = url
    if (str) {
		const reg = new RegExp('(\\/?\\?|&)' + str + '=[0-9a-zA-Z]*[^(&|#)]*[&|#|?]?', 'g')
		if (url) {
			result = url.replace(reg, (p0, p1, p2) => {
				const len = p0.length
				if (p1 === '/?' || p2) {
					if (p0[len - 1] === '#') {
						return '/#'
					}
					if (p0[len - 1] === '&') {
						return p1
					}
				}
				return ''
			})
		}
	}
	return result
}

/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export const camelCase = (name) => {
	if (name) {
		const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
		const MOZ_HACK_REGEXP = /^moz([A-Z])/
		return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
			return offset ? letter.toUpperCase() : letter
		}).replace(MOZ_HACK_REGEXP, 'Moz$1').replace(/^\w/, (p1) => p1.toUpperCase())
	} else {
		return name
	}
}

/**
 * 首字母小写
 * @param camelCase 驼峰值
 * @returns 转后的字符串
 */
export const firstLowerCase = (name) => {
	return name.slice(0, 1).toLowerCase() + name.slice(1)
}

/**
 * 获取ref对象
 * @param vm Vue组件
 * @param name ref
 * @returns promise
 */
 export const getRefPromise = (vm, name) => {
    return new Promise(resolve => {
        ;(function next () {
            const ref = vm.$refs[name]
            if (ref) {
                resolve(ref)
            } else {
                setTimeout(() => {
                    next()
                }, 10)
            }
        })()
    })
}
