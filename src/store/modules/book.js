/**
 * hello 模块
 */
const state = {
  books: []
}

const getters = {
  bookList: state => state.books
}

const actions = {
  addBook ({ commit }, option) {
    commit('addBook', option)
  },
  deleteBook ({ commit }, option) {
    commit('deleteBook', option)
  },
  setBooks ({ commit }, option) {
    commit('setBooks', option)
  }
}

const mutations = {
  addBook (state, { book }) {
    state.books.push(book)
  },
  deleteBook (state, { index }) {
    state.books.splice(index, 1)
  },
  setBooks (state, { books }) {
    state.books = [...books]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
