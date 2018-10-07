import * as testApi from './test'
import Mock from 'mockjs'

/*
 *  Mock.mock( url, type, template )
 *  type 表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
 */

Mock.mock(/\/test1/, 'post', testApi.test1())

export default Mock
