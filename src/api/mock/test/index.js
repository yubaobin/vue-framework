import Mock from 'mockjs'
export const test1 = () => {
  const random = Mock.Random
  random.email('@EMAIL()') // 随机生成email
  return {
    'string1|1-10': '★',
    'array|10': [{ 'id|+1': 1, 'name': random.cname(), 'email': '@EMAIL' }]
  }
}
