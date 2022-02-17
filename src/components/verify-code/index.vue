<!--
  组件名称：
  -->
<template>
  <el-button slot="suffix" style="right: 0;" :disabled="disabled" @click="handleClick">{{ codeText }}</el-button>
</template>
<script>
export default {
  name: 'VerifyCode',
  props: {
    text: String,
    time: {
      type: Number,
      default: 60
    },
    handle: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      codeText: '',
      current: 0,
      timer: null,
      disabled: false
    }
  },
  created () {
  },
  destroyed () {
    this.clearTimer()
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        if (this.handle && typeof this.handle === 'function') {
          this.handle(() => {
            this.run()
          })
        }
      }
    },
    run () {
      this.clearTimer()
      this.current = this.time
      this.disabled = true
      this.timer = window.setInterval(() => {
        this.current -= 1
        this.codeText = this.current + '秒'
        if (this.current < 1) {
          this.disabled = false
          this.clearTimer()
          this.codeText = this.text
        }
      }, 1000)
    },
    clearTimer () {
      if (this.timer) window.clearInterval(this.timer)
    },
    resetTime () {
        this.disabled = false
        this.clearTimer()
        this.codeText = this.text
    }
  },
  watch: {
    text: {
      immediate: true,
      handler (newVal) {
        this.codeText = newVal
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
