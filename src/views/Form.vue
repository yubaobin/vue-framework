<!--
    表单
-->

<template>
    <el-form ref="form" :model="form" label-width="80px"
             :style="style" :rule="rules">
        <el-form-item label="文件名称" required prop="filename">
            <el-input v-model="form.filename"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" required prop="files">
            <m-upload v-model="form.files"></m-upload>
            <span>{{ form.files }}</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import MUpload from '@/components/mupload.vue'
export default {
  data () {
    return {
      rules: {
        filename: [{ required: true }],
        file: [{ required: true }]
      },
      form: {
        filename: '123',
        files: null
      }
    }
  },
  components: {
    MUpload: MUpload
  },
  computed: {
    style () {
      return {
        width: '500px'
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        console.log(this.form)
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
