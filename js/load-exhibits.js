Vue.component('exhibit-list', {
  template: `<div class='list-x'>  
    <ul v-for='exhibit in _result' >
      <li>
        {{exhibit["Exhibit Code"]}}
      </li> 
    </ul>
  </div>
  `,
  props: ['_animaltypes', '_result', '_lan']
})

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0
  } else {
    return a[0] < b[0] ? -1 : 1
  }
}
new Vue({
  el: '#root',
  data: {
    active: true,
    animaltypes: [],
    exhibits: [],
    attrNames: [],
    result: [],
    lang: 'tc'

  },
  components: {},
  methods: {
    searchData: function (_type, _value) {
      this.result = [];
      if (_type == 'all') {
        this.result = this.exhibits;
      } else {
        this.exhibits.forEach(element => {
          if (element.Category == _value) {
            this.result.push(element);
          }
        })
      }
    },
    removeData: function (_num) {
      console.log(_num);
      this.exhibits.splice(_num - 1, 1);
      this.animaltypes.splice(_num - 1, 1);
    },
    setLang: function (_lang) {
      this.lang = _lang;
    },
    getAttrByLang: function (_name) {
      this.attrNames.forEach(element => {
        if (element.en.toLowerCase() == _name) {
          console.log(element[this.lang]);
          return element[this.lang];
        }
      });
    },
    sorting: function (_type) {
      function _sortType(a, b) {
        if (a.Category < b.Category) return -1
        if (a.Category > b.Category) return 1
        return 0
      }
      function _sortPrice(a, b) {
        if (a.物種分類 < b.物種分類) return -1
        if (a.物種分類 > b.物種分類) return 1
        return 0
      }
      if (_type === 'name') this.animaltypes.sort(_sortType)
      if (_type === 'price') this.animaltypes.sort(_sortPrice)
    }
  },
  mounted() {
    $.getJSON(
      '../data/exhibits-data.json',
      function (_data) {
        this.animaltypes = _data.AnimalTypes
        this.exhibits = _data.Exhibits
        // this.result = _data.Exhibits
        this.attrNames = _data.attrNameByLang
        console.log(_data.attrNameByLang[0].tc + '==')
      }.bind(this)
    )
  }
})

/*
<ul v-for='animaltype in _animaltypes'>
  <li> {{animaltype.Category}} {{animaltype.物種分類}}
    <ul v-for='exhibit in _result' >
      <li v-if="animaltype.Category === exhibit.Category" >
        {{exhibit["Exhibit Code"]}}
      </li>
    </ul>
  </li>
</ul>
*/