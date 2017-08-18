<template>
  <div>
    <Book :name="name"></Book>
  </div>
</template>
<script>
import Book from '@/components/Book'
export default {
  data () {
    return {
      name: 'ybb'
    }
  },
  components: {
    Book
  }
}
</script>
<style scoped lang="scss">
	
</style>
