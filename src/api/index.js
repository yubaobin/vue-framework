/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/24
 */
import fetch from '@/utils/fetch'

export default {
  test(params) {
    return fetch('/about', params)
  }
}
