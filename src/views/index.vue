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
  created () {
    this.axios.get('/api/book').then((res) => {
      const books = JSON.parse(res.data).list
      this.$store.dispatch('setBooks', { books })
    })
  },
  components: {
    Book
  }
}
</script>
<style scoped lang="scss">
	
</style>
