import Mock from 'mockjs'
export const test1 = () => {
  const random = Mock.Random
  random.email('@EMAIL()') // 随机生成email
  return {
    'total': 12,
    'array|10': [{ 'id|+1': 1, 'name': random.cname(), 'email': '@EMAIL' }]
  }
}
