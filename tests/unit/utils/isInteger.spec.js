import { isInteger } from '@/utils'

describe('测试isInteger方法', () => {
    it('判断非负整数', () => {
        const obj1 = {}
        const obj2 = ''
        const obj3 = undefined
        const obj4 = null
        const obj5 = '1'
        const obj6 = '0'
        const obj7 = '-1'
        const obj8 = '-1.1'
        const obj9 = 1.1
        const obj10 = '1.1a'
        const obj11 = 'a'
        const obj12 = '0a'
        expect(isInteger(obj1)).toBeFalsy()
        expect(isInteger(obj2)).toBeFalsy()
        expect(isInteger(obj3)).toBeFalsy()
        expect(isInteger(obj4)).toBeFalsy()
        expect(isInteger(obj5)).toBeTruthy()
        expect(isInteger(obj6)).toBeTruthy()
        expect(isInteger(obj7)).toBeFalsy()
        expect(isInteger(obj8)).toBeFalsy()
        expect(isInteger(obj9)).toBeFalsy()
        expect(isInteger(obj10)).toBeFalsy()
        expect(isInteger(obj11)).toBeFalsy()
        expect(isInteger(obj12)).toBeFalsy()
    })
})
