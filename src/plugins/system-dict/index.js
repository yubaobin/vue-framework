import { isEmpty, formatDict } from './util'
import SystemDict from './instance'
const FILTER_NAME = 'filterDict'

let systemDict = null

const initInstance = (opt = {}) => {
    if (!systemDict) {
        systemDict = new SystemDict(opt)
    }
    if (!isEmpty(opt)) {
        systemDict.initDict(opt)
    }
}

initInstance()

function install (Vue, opt) {
    initInstance(opt)
    Object.defineProperty(Vue.prototype, '$systemDict', {
        get () {
            return systemDict
        }
    })
    Object.defineProperty(Vue.prototype, '$dictList', {
        get () {
            return systemDict.dictList
        }
    })
    Vue.filter(FILTER_NAME, (value, params, valueKey, nameKey) => {
        let list = []
        if (systemDict && !isEmpty(systemDict.dictList)) {
            list = systemDict.dictList[params]
        }
        return formatDict(list, value, valueKey, nameKey)
    })
}

export {
    systemDict
}

export default {
    install
}
