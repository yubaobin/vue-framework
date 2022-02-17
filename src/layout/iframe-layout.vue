<!--
  使用iframe嵌入其他系统
-->
<template>
    <div class="iframe-container">
        <iframe
            ref="iframe"
            :src="src"
            width="100%"
            height="100%"
            frameborder="0"
            @load="onLoad"></iframe>
    </div>
</template>
<script>
export default {
    name: 'iframeLayout',
    data () {
        return {
            src: ''
        }
    },
    created () {
        this.src = this.$route.meta.iframe
    },
    methods: {
        onLoad () {
            this.$emit('load', this.$refs.iframe)
        }
    },
    watch: {
        $route (newVal) {
            this.src = newVal.meta.iframe
        }
    }
}
</script>
<style scoped lang="scss">
.iframe-container {
    width: 100%;
    height: 100%;
}
</style>
