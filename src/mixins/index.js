import Vue from 'vue'
import config from '../config'
export default {
    init () {
        Vue.mixin({
            methods: {
                setTitle (title) {
                    const meta = this.$route && this.$route.meta ? this.$route.meta : {}
                    document.title = title || meta.title || config.sysName || ''
                },
                goBackWidthCloseTagView () {
                    this.$store
                        .dispatch('tagsView/delView', this.$route)
                        .then(() => {
                            this.$router.go(-1)
                        })
                },
                closeCurrentTagView () {
                    return this.$store.dispatch('tagsView/delView', this.$route)
                }
            }
        })
    }
}
