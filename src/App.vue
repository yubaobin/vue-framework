<template>
  <div id="app">
    <el-button-group>
      <el-button size="small" type="primary" @click="toLink('/')">二维码</el-button>
      <el-button size="small" type="primary" @click="toLink('/form')">表单</el-button>
    </el-button-group>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    toLink (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="less" src="./styles/index.less"></style>
