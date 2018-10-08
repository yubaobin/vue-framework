<template>
  <div class='home'>
    <q-rcode></q-rcode>
  </div>
</template>

<script>
// @ is an alias to /src
import QRcode from '@/components/qrcode.vue'

export default {
  name: 'home',
  components: {
    QRcode
  },
  created () {
    this.api.test({}).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style scoped lang="less">
  .home {
    text-align: center;
  }
</style>
