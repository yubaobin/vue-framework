<template>
  <div class="bookDetail">
  	<div v-if="bookList.length !== 0">
  	  书名: {{ bookList[id].name }}
    </div>
    <p v-else>
      暂无此书本信息
    </p>
  	<div class="btn-group">
  	  <button class="btn" @click="back">返回</button>
  	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'bookDetail',
  data () {
    return {
      id: this.$route.params.index ? this.$route.params.index : ''
    }
  },
  computed: {
    ...mapGetters([
      'bookList'
    ])
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
$ppr: 750px/16/1rem;
.bookDetail {
  .btn-group {
  	width: 100%;
  	text-align: center;
    .btn {
	  font-size: 30px/$ppr;
    }
  }
}
</style>
