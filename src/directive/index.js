import Vue from 'vue'
import store from '@/store'
export default {
    init () {
        const Directive = {
            authBtn: {
                update: (el, binding) => {
                    const permissionBtns = store.getters.permissionBtns
                    const { value, arg } = binding
                    const valueType = typeof value
                    let match = null
                    switch (valueType) {
                        case 'string':
                            match = permissionBtns.find((item) => item.match === value)
                            break
                        case 'object':
                            if (value instanceof Array) {
                                const curPath = value.map((item) => item.name).join('.')
                                match = permissionBtns.find((item) => item.match === curPath)
                            }
                            break
                    }
                    const btns = match ? match.btns : []
                    const result = btns.includes(arg)
                    if (!result) {
                        el.parentNode && el.parentNode.removeChild(el)
                    }
                }
            },
            limitNum: {
                inserted: (el) => {
                    const input = el.querySelector('input')
                    input &&
                        input.addEventListener('keyup', () => {
                            const oldVal = input.value
                            let newVal = ''
                            if (input.value.length === 1) {
                                newVal = input.value.replace(/[^0-9]/g, '')
                            } else {
                                newVal = input.value.replace(/[^\d]/g, '')
                            }
                            if (newVal !== oldVal) {
                                input.value = newVal
                                input.dispatchEvent(new Event('input')) // 手动触发input
                            }
                        })
                },
                unbind: (el) => {
                    const input = el.querySelector('input')
                    input &&
                        input.removeEventListener('keyup', () => {
                            if (input.value.length === 1) {
                                input.value = input.value.replace(/[^0-9]/g, '')
                            } else {
                                input.value = input.value.replace(/[^\D]/g, '')
                            }
                        })
                }
            }
        }
        Object.keys(Directive).forEach((key) => {
            Vue.directive(key, Directive[key])
        })
    }
}
