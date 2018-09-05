<template>
  <div>
    <el-form class="form" ref="form" :model="form"
             @submit.native.prevent label-position="right">
      <el-form-item label="生成二维码的信息" label-width="140px">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">点击生成</el-button>
      </el-form-item>
      <img :src='src'>
    </el-form>
  </div>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  data () {
    return {
      form: {
        text: ''
      },
      src: logo
    }
  },
  methods: {
    onSubmit () {
      this.api.qrcode(this.form).then(res => {
        this.src = this.toImage(res.result.base64_image)
      })
    },
    toImage (base64) {
      return `data:image/jpeg;base64,${base64}`
    }
  }
}
</script>
<style scoped lang='less'>
  .form {
    width: 500px;
  }
</style>
