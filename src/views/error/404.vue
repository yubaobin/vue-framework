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
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
    p {
        font-size: 120px;
    }
</style>
