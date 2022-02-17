<!--
    404页面
-->
<template>
  <div style="text-align: center">
    <p>T_T</p>
    <p>404</p>
    <el-button @click="goBack">返回</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goBack () {
      this.$router.replace('/')
    }
  }
}
</script>
<style scoped lang="scss">
  p {
    font-size: 120px;
    margin: 20px 0;
  }
</style>
