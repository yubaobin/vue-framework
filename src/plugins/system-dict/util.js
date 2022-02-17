const CACHE_DICT_NAME = 'khalasysdict'
/**
 * 保存字典信息到缓存
 * @param userInfo
 */
 export function setDictInfoToCache (dictList) {
    localStorage.setItem(CACHE_DICT_NAME, JSON.stringify(dictList))
}

/**
 * 从缓存获取字典信息
 */
 export function getDictInfoFromCache () {
    const dictInfoStr = localStorage.getItem(CACHE_DICT_NAME) || ''
    let dict = {}
    if (dictInfoStr) {
        try {
            dict = JSON.parse(dictInfoStr)
        } catch (e) {
            console.log('解析本地字典值失败')
        }
    }
    return dict
}

/**
 * 移除缓存中的字典信息
 */
export function removeDictInfoFromCache () {
    localStorage.removeItem(CACHE_DICT_NAME)
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
 * 空对象判断
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = obj => {
    if (obj) {
        for (const key in obj) return false
        return true
    } else {
        return true
    }
}

/**
 * 字典值转标签（单个）
 * @param list 数据字典
 * @param value 字典值列表字符串
 * @param valueKey 字典值key
 * @param nameKey 标签key
 * @param emptyText 默认返回值
 * @return {string|*|string}
 */
 export function formatDict (list = [], value, valueKey = 'code', nameKey = 'text', emptyText = '-') {
    if (value || value === 0) {
        const obj = list.find(item => String(item[valueKey]) === String(value))
        return obj ? obj[nameKey] : emptyText
    } else {
        return emptyText
    }
}

/**
 * 字典值转标签（多选）
 * @param list 数据字典
 * @param valueListStr 字典值列表字符串
 * @param valueListStrSeparator 字典值分隔符
 * @param retStrSeparator 返回标签分隔符
 * @param valueKey 字典值key
 * @param nameKey 标签key
 * @param emptyText 默认返回值
 * @return {string}
 */
 export function formatDictCheckbox (list = [], valueListStr, valueListStrSeparator = ',', retStrSeparator = ', ', valueKey = 'code', nameKey = 'name', emptyText = '-') {
    if (valueListStr) {
        let retStr = ''
        const valueList = valueListStr.split(valueListStrSeparator)
        for (const value of valueList) {
            retStr += formatDict(list, value, valueKey, nameKey, emptyText)
            retStr += retStrSeparator
        }
        if (retStr.length !== 0) {
            retStr = retStr.substring(0, retStr.length - retStrSeparator.length)
        }
        return retStr
    } else {
        return emptyText
    }
}
