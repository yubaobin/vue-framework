import Mock from 'mockjs'
export const test1 = () => {
  const random = Mock.Random
  random.email('@EMAIL()') // 随机生成email
  return {
    'total': 12,
    'array|10': [{
      'id|+1': 1,
      'video': { 'img': random.image('64x48'), 'name': random.csentence(11), 'date': random.date('yyyy-mm-dd') },
      'name': random.cname(),
      'status': random.boolean,
      'email': '@EMAIL' }]
  }
}
