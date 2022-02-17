import { setDictInfoToCache, getDictInfoFromCache, removeDictInfoFromCache, firstLowerCase, camelCase, isEmpty, formatDict, formatDictCheckbox } from './util'
const NAME_SPACE = 'dict'
/**
 * 字典值
 */
export default class SystemDict {
    namespace = NAME_SPACE
    dictList = {}
    isDictDone = false
    remote = null
    promiseArr = []

    initDict (opt) {
        const { namespace, staticDict, remote } = opt
        if (namespace) {
            this.namespace = namespace
        }
        this.isDictDone = false
        this.remote = remote
        this.clear()
        this.setDict(staticDict)
        this.setDictRemote(remote)
    }

    /**
     * 设置字典值
     * @param {object|function} dictObj
     */
    setDict (dictObj) {
        if (typeof dictObj === 'function') {
            this.setDictRemote(dictObj)
        } else {
            this.setDictStatic(dictObj)
        }
    }

    /**
     * 设置静态字典值
     * @param {*} dictObj
     */
    setDictStatic (dictObj) {
        if (!isEmpty(dictObj)) {
            for (const key in dictObj) {
                if (Object.prototype.hasOwnProperty.call(dictObj, key)) {
                    const dictName = firstLowerCase(camelCase(key))
                    this.dictList[dictName] = dictObj[key]
                }
            }
        }
    }

    /**
     * 设置远程字典值
     * @param {function} remote
     * @param {*} config.refresh 是否刷新
     * @param {*} config.cache 是否存本地
     */
    async setDictRemote (remote, config = {}) {
        const { refresh = false, cache = true } = config
        if (refresh) {
            this.isDictDone = false
            removeDictInfoFromCache()
        }
        const cacheDict = getDictInfoFromCache()
        if (isEmpty(cacheDict)) {
            const remoteUrl = remote || this.remote
            if (typeof remoteUrl === 'function') {
                console.log('正在加载字典值..')
                const result = remoteUrl()
                let dict = {}
                try {
                    if (result instanceof Promise) {
                        dict = await result
                    } else {
                        dict = result
                    }
                    this.isDictDone = true
                    this.setDone()
                    this.setDictStatic(dict)
                    if (cache) {
                        setDictInfoToCache(dict)
                    }
                } catch (error) {
                    console.error('加载字典值失败', error)
                    this.setDone()
                }
            }
        } else {
            this.isDictDone = true
            this.setDictStatic(cacheDict)
            console.warn('检测到本地已缓存字典值, 已读取本地缓存')
        }
    }

    setDone () {
        if (this.promiseArr.length) {
            this.promiseArr.forEach(resolve => {
                resolve(true)
            })
            this.promiseArr = []
        }
    }

    formatDict (...p) {
        return formatDict(...p)
    }

    formatDictCheckbox (...p) {
        return formatDictCheckbox(...p)
    }

    /**
     * 检查是否完成字典请求
     * @returns
     */
    async checkDictDone () {
        if (this.remote) {
            if (this.isDictDone) {
                return this.dictList
            } else {
                return await new Promise(resolve => {
                    this.promiseArr.push(resolve)
                })
            }
        } else {
            return this.dictList
        }
    }

    /**
     * 清空字典值
     * @param {*} cache 是否清空本地缓存
     */
    clear (cache) {
        this.dictList = {}
        if (cache) {
            removeDictInfoFromCache()
        }
    }
}
