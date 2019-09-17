Vue.component('products-list', {
  template: `<div class='x'>
    <ul v-for='product in products'>
      <li> {{product.name}} {{product.price}}  </li>
    </ul>
  </div>
  `,
  props: ['products']
})
function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}
new Vue({
  el: "#root",
  data: {
    active: true,
    products: [],
  },
  components: {

  },
  methods: {
    sorting: function (_type) {
      // alert(this.products[1].name);
      function _sortName(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      function _sortPrice(a, b) {
        if (a.price < b.price)
          return -1;
        if (a.price > b.price)
          return 1;
        return 0;
      }
      if (_type === 'name')
        this.products.sort(_sortName);
      if (_type === 'price')
        this.products.sort(_sortPrice);
    }
  },
  mounted() {
    $.getJSON('../data/products.json', function (_data) {
      this.products = _data.products;
      console.log(_data.products[0].name + '==')
    }.bind(this));
  }

})