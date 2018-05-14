<template>
  <div>
    <div class="logo">
      <img src="~@/assets/logo.jpg"/>
    </div>
    <div>
      <mt-cell title="demo" to="/demo" is-link></mt-cell>
      <mt-cell title="关于" to="/about" is-link></mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return { }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .logo {
    height: 100px;
    width: 100px;
    display: block;
    margin: 10px auto;
    text-align: center;
    img {
      width: auto;
      height: 100%;
    }
  }
</style>
