<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$attrs.name)
  }
}
</script>
<style scoped lang="scss">
	
</style>
