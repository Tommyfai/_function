var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue! - ',
    products: [
      { id: 1, title: 'Blogging with Vue' },
      { id: 2, title: 'My journey with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  },
  methods: {
    btn: function () {
      this.message = this.message + 'asdf - '
    }
  }
})
