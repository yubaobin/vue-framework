/**
 * 校验
 */
// 身份证
export const checkIdNum = (rule, value, callback) => {
    let pass = true
    const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
    }
    if (
        !value ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
            value
        )
    ) {
        callback(new Error('身份证号格式错误'))
        pass = false
    } else if (!city[value.substr(0, 2)]) {
        callback(new Error('地址编码错误'))
        pass = false
    } else {
        if (value.length === 18) {
            value = value.split('')
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = value[i]
                wi = factor[i]
                sum += ai * wi
            }
            if (`${parity[sum % 11]}` !== value[17]) {
                callback(new Error('校验位错误'))
                pass = false
            }
        }
    }
    if (pass) {
        callback()
    }
}

// 电话号码
export const checkPhone = (rule, value, callback) => {
    const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!value) {
        callback(new Error('电话号码不能为空'))
    } else if (phoneReg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确电话号码'))
    }
}

// 固话
export const checkTel = (rule, value, callback) => {
    const areaReg = /(^[0-9]{3,4}-[0-9]{7,8}$)/
    if (!value) {
        callback()
    } else if (areaReg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确固定电话号码'))
    }
}

// 固话和手机号码
export const checkTwoPhone = (rule, value, callback) => {
    // const phoneReg = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/
    const phoneReg = /^(\d{11})$/
    const phoneTwoTeg = /^(\d{8})$/
    const areaReg = /(^[0-9]{3,4}-[0-9]{3,8}$)/
    if (!value) {
        callback()
    } else if (
        phoneReg.test(value) ||
        phoneTwoTeg.test(value) ||
        areaReg.test(value)
    ) {
        callback()
    } else {
        callback(new Error('请输入正确电话号码'))
    }
}

// 中文
export const checkFont = (rule, value, callback) => {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
    if (reg.test(value)) {
        callback(new Error('不能包含中文'))
    } else {
        callback()
    }
}

// 密码复杂度 1最简单
export const passwordLevel = (rule, value, callback) => {
    let Modes = 0
    for (let i = 0; i < value.length; i++) {
        Modes |= CharMode(value.charCodeAt(i))
    }
    const level = bitTotal(Modes)
    if (level > 3) {
        callback()
    } else {
        callback(new Error('密码需由数字、字母大小写、符号组成'))
    }
    function CharMode (iN) {
        if (iN >= 48 && iN <= 57) {
            // 数字
            return 1
        }
        if (iN >= 65 && iN <= 90) {
            // 大写字母
            return 2
        }
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) {
            // 大小写
            return 4
        } else {
            return 8 // 特殊字符
        }
    }
    function bitTotal (num) {
        let modes = 0
        for (let i = 0; i < 4; i++) {
            if (num & 1) modes++
            num >>>= 1
        }
        return modes
    }
}

// 特殊字符
export const checkSpChar = (rule, value, callback) => {
    /* eslint-disable no-useless-escape */
    const reg = /[`~!@#$^&*()=|{}':;',\[\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/
    if (reg.test(value)) {
        callback(new Error('不能包含特殊符号'))
    } else {
        callback()
    }
}
