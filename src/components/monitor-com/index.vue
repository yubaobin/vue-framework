<!--
  组件名称：监控
  -->
<template>
    <div
        style="position: absolute;top: 0;left: 0;z-index: 0;width: 0;height: 0;"
    ></div>
</template>
<script>
export default {
    name: 'MonitorCom',
    data () {
        return {
            $script: null
        }
    },
    mounted () {
        this.insertScript()
    },
    beforeDestroy () {
        document.body.removeChild(this.$script)
        this.$script = null
    },
    methods: {
        insertScript () {
            const url = 'http://132.122.1.16/bundle.js'
            window.__ml || (window.__ml = {})
            window.__ml.config = {
                userId: '',
                appKey: 'khala_frontend_1',
                imgUrl:
                    'http://132.122.1.16:8092/insight-web/frontend/resource/up?',
                disableHook: false,
                disableJS: false,
                disableResource: false
            }
            this.$script = document.createElement('script')
            this.$script.setAttribute('crossorigin', 'anonymous')
            this.$script.setAttribute('src', url)
            document.body.insertBefore(this.$script, document.body.firstChild)
        }
    }
}
</script>
<style lang="scss" scoped></style>
