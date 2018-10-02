<template>
  <div class='home'>
    <q-rcode ></q-rcode>
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
    this.api.qrcode({}).then((res) => {
      console.log(res)
    })
  }
}
</script>
