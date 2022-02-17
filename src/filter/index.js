import Vue from 'vue'
export default {
    init () {
        const Fliter = {}
        Object.keys(Fliter).forEach((key) => {
            Vue.filter(key, Fliter[key])
        })
    }
}
