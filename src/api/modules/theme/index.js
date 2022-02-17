/**
 * 地图数据
 */
import fetch from '@/utils/fetch'
const baseUrl = window.baseUrl + 'theme'
export default {
    // 获取地图数据
    getThemeList () {
        return fetch(`${baseUrl}/theme.json`, {}, { method: 'get', local: true }).then((res) => {
            return res.filter((item) => !item.hidden)
        })
    }
}
