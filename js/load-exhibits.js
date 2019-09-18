Vue.component('exhibit-list', {
  template: `<div class='list-x'>
    <ul v-for='animaltype in animaltypes'>
      <li> {{animaltype.Category}} {{animaltype.物種分類}}  
        <ul v-for='exhibit in exhibits' >
          <li v-if="animaltype.Category === exhibit.Category" >{{exhibit["English Common Name"]}}  {{exhibit.中文名稱}} </li> 
        </ul>
      </li>
    </ul>
  </div>
  `,
  props: ['animaltypes', 'exhibits']
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
    animaltypes: [],
    exhibits: [],
  },
  components: {

  },
  methods: {
    sorting: function (_type) {
      function _sortType(a, b) {
        if (a.Category < b.Category)
          return -1;
        if (a.Category > b.Category)
          return 1;
        return 0;
      }
      function _sortPrice(a, b) {
        if (a.物種分類 < b.物種分類)
          return -1;
        if (a.物種分類 > b.物種分類)
          return 1;
        return 0;
      }
      if (_type === 'name')
        this.animaltypes.sort(_sortType);
      if (_type === 'price')
        this.animaltypes.sort(_sortPrice);
    }
  },
  mounted() {
    $.getJSON('../data/exhibits-data.json', function (_data) {
      this.animaltypes = _data.AnimalTypes;
      this.exhibits = _data.Exhibits;
      console.log(_data.AnimalTypes[0].AnimalType + '==')
    }.bind(this));
  }

})