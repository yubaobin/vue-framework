<template>
  <div id="app">
    <q-rcode></q-rcode>
  </div>
</template>

<script>
import QRcode from './components/qrcode.vue'

export default {
  name: 'app',
  components: {
    QRcode
  }
}
</script>

<style lang="less" src="./styles/index.less"></style>
