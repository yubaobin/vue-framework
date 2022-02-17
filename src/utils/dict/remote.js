// eslint-disable-next-line no-unused-vars
import fetch from '@/utils/fetch'
// 这里可以请求接口获取字典值
export default function remoteDict () {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve({
                status: [
                    { text: '正常', code: 1 },
                    { text: '错误', code: 0 }
                ]
            })
        }, 2000)
    })
}
