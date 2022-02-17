import { isEmpty } from '@/utils'
describe('测试isEmpty方法', () => {
    it('判断空对象', () => {
        const obj1 = {}
        const obj2 = ''
        const obj3 = undefined
        const obj4 = null
        expect(isEmpty(obj1)).toBeTruthy()
        expect(isEmpty(obj2)).toBeTruthy()
        expect(isEmpty(obj3)).toBeTruthy()
        expect(isEmpty(obj4)).toBeTruthy()
    })
})
