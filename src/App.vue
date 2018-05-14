<template>
  <div id="app">
    <transition :name="animSwitch">
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script>
  import mixins from '@/mixins'
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    data() {
      return {}
    },
    mixins: [mixins],
    created(){
      this.setTitle()
    },
    watch: {
      '$route': function () {
        this.setTitle()
      }
    },
    computed: {
      ...mapGetters([
        'animSwitch'
      ])
    }
  }
</script>

<style lang="less" src="./styles/index.less"></style>
