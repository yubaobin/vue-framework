<template>
  <div id="app">
    <p class="appName" :style="{'left': positionX, 'opacity': opacity}">{{ nameWithTime }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      x: 0,
      opacity: 1,
      width: document.documentElement.getBoundingClientRect().width
    }
  },
  mounted () {
    this.changeX()
  },
  methods: {
    changeX () {
      window.setTimeout(() => {
        this.$store.dispatch('changePositionX', { x: this.x })
        if (this.x < this.width) {
          this.x += 5
        } else {
          this.x = -350
        }
        if (this.x < -300) {
          this.opacity = 0
        } else {
          this.opacity = 1
        }
        this.changeX()
      }, 100)
    }
  },
  computed: {
    ...mapGetters([
      'nameWithTime',
      'positionX'
    ])
  }
}
</script>

<style scoped lang="scss">
#app {
  padding: 0 10px;
  overflow: hidden;
  .appName {
    position: relative;
    transition: all .1s;
    width: 100%;
  }
}
</style>
