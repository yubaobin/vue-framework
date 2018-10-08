<!--
    图片上传
-->

<template>
    <div>
        <el-button type="primary" @click="selectFile">请选择图片 </el-button>
        <input ref="input" type="file" @change="updateVal" />
    </div>
</template>
<script>
export default {
  props: {
    value: null, // v-modal 接受的值
    tip: ''
  },
  methods: {
    updateVal (e) {
      this.$emit('input', e)
    },
    selectFile () {
      this.$refs.input.click()
    }
  }
}
</script>
<style scoped lang="less">
    input[type=file] {
        display: none;
    }
</style>
