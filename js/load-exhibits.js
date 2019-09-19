Vue.component('exhibit-list', {

  template: `<div class='list-x'>  
    <ul v-for='animaltype in animaltypes'>
    {{lan}}
      <li> {{animaltype.Category}} {{animaltype.物種分類}}  
        <ul v-for='exhibit in exhibits' >
          <li v-if="animaltype.Category === exhibit.Category" >          
          {{exhibit["Location"]}}
          </li> 
        </ul>
      </li>
    </ul>
  </div>
  `,
  props: ['animaltypes', 'exhibits', 'lan']
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
    lang: 'tc'

  },
  components: {},
  methods: {
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
      alert(this.lang);
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
        this.attrNames = _data.attrNameByLang
        console.log(_data.attrNameByLang[0].tc + '==')
      }.bind(this)
    )
  }
})
