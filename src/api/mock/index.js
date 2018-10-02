import * as testApi from './test'
import Mock from 'mockjs'

Mock.mock(/\/test/, testApi.test)

export default Mock
