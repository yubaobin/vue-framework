/**
* 可以采用mockjs来自动生成mock数据
*/
const Mock = require('mockjs')
const data = Mock.mock({
  test: 'about'
})
module.exports = () => {
  return {
    ret: 'success',
    code: 0,
    msg: '接口提示信息',
    data: data
  }
}
