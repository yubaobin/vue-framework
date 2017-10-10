<template>
  <div class="book">
    <author :name="$attrs.name"></author>
    <div class="ui-input">
      <input v-model="name" />
    </div>
    <button class="btn" @click="addBook">
      <span>添加</span>
    </button>
    <div class="booklist">
      <p v-if="bookList.length === 0" class="tips">
        暂无书籍,请点击右上角的添加按钮添加书籍
      </p>
      <ul v-else>
        <li v-for="(book,index) in bookList" @click="gotoDetail(index)" :num="((index + 1) + '.')">
          <span class="bookName">{{ book.name }}</span>
          <span class="delete" @click.stop="deleteBook(index)"><icon name="close"></icon></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-awesome/icons/close'
import Author from '@/components/Author'

export default {
  name: 'book',
  inheritAttrs: false,
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'bookList'
    ])
  },
  components: {
    Author
  },
  methods: {
    addBook () {
      const book = {
        name: this.name
      }
      this.$store.dispatch('addBook', { book })
      this.name = ''
    },
    deleteBook (index) {
      this.$store.dispatch('deleteBook', { index: index })
    },
    gotoDetail (index) {
      this.$router.push(`/detail/${index}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.book {
  .ui-input {
    display: inline-block;
    input {
      border: 1px solid $blue;
      padding: 10px 15px;
      font-size: 30px/$ppr;
      &:focus {
        border: 2px solid #0586e6;
      }
    }
  }
  .btn {
    font-size: 30px/$ppr;
    cursor: pointer;
    border: 2px solid $blue;
    border-radius: 10px;
  }
  .booklist {
    margin-top: 20px;
    li {
      width: 50%;
      &:before {
        content: attr(num);
        width: 40px;
        display: inline-block;
        text-align: center;
      }
    }
    .tips {
      font-size: 30px/$ppr;
    }
    .delete {
      color: $red;
      cursor: pointer;
      .fa-icon {
        width: 30px/$ppr;
        height: 30px/$ppr;
      }
    }
    span {
      display: inline-block;
    }
    .num {
      width: 30px;
      text-align: center;
    }
    .bookName {
      width: 60%;
    }
  }
}
</style>
