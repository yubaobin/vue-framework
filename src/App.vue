<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    this.setTitle()
  },
  watch: {
    '$route': function () {
      this.setTitle()
    }
  }
}
</script>

<style lang="less" src="./styles/index.less"></style>
