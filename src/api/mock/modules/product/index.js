import Mock from 'mockjs'
import * as json from './json.js'
const baseUrl = '/api/product'
Mock.mock(`${baseUrl}/page`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.getList(data)
})
Mock.mock(`${baseUrl}/save`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.save(data)
})
Mock.mock(`${baseUrl}/update`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.update(data)
})
Mock.mock(`${baseUrl}/get`, 'post', (options) => {
    const data = JSON.parse(options.body)
    console.log('get', data)
    return json.get(data)
})
Mock.mock(`${baseUrl}/getCascade`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.get(data)
})
Mock.mock(`${baseUrl}/productCascadePage`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.getList(data)
})
Mock.mock(RegExp(`${baseUrl}/([^d]*)+`), 'delete', (options) => {
    const match = RegExp(`${baseUrl}/([^d]*)+`).exec(options.url)
    const id = match.length > 1 ? Number(match[1]) : null
    return json.deleteItem(id)
})
export default Mock
