Vue.component('exhibit-list', {
  template: `<div class='fn-grid' >  
    <template v-for='exhibit in _result'>
      <div class="row">
        <div class="cell" :style="{width: '50px'}" >
          {{exhibit["Exhibit Code"]}}
        </div> 
        <div class="cell" :style="{width: '50px'}" >
          {{exhibit["Taxa Code"]}}
        </div> 
        <div class="cell" :style="{width: '100px'}" >
          {{exhibit["Category"]}}
        </div> 
        <div class="cell">
          {{exhibit["English Common Name"]}}
        </div>        
      </div>      
    </template>
    <div class="row" >
        <div class="cell" :style="{width: '50px'}" >        
          <button v-on:click="sorting('Exhibit Code', dir)">Sort</button>
        </div> 
        <div class="cell" :style="{width: '50px'}" >
          <button v-on:click="sorting('Taxa Code', dir)">Sort</button>
        </div> 
        <div class="cell" :style="{width: '100px'}" >
          <button v-on:click="sorting('Category', dir)">Sort</button>
        </div> 
        <div class="cell">
          <button v-on:click="sorting('English Common Name', dir)">Sort</button>
        </div>        
      </div>
  </div>
  `,
  data: function () {
    return {
      sortType: '',
      dir: 1
    }
  },
  props: ['_animaltypes', '_result', '_lan'],
  methods: {
    sorting: function (_type) {
      var _dir = this.dir;
      // console.log(_type + '___' + this.sortType);
      if (_type == this.sortType) {
        _dir = (_dir * -1)
        this.dir = _dir;
      } else {
        this.sortType = _type;
        this.dir = 1;
        _dir = 1;
      }
      this._result.sort(function (a, b) {
        if (a[_type] < b[_type]) return (_dir * -1)
        if (a[_type] > b[_type]) return _dir
        return 0
      })
    }
  },
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
    lang: 'tc',
    sortType: '',
    dir: 1
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
      var _dir = this.dir;
      console.log(_type + '___' + this.sortType);
      if (_type == this.sortType) {
        _dir = (_dir * -1)
        this.dir = _dir;
      } else {
        this.sortType = _type;
      }
      this.result.sort(function (a, b) {
        if (a[_type] < b[_type]) return (_dir * -1)
        if (a[_type] > b[_type]) return _dir
        return 0
      })
    }
  },
  mounted() {
    $.getJSON(
      'data/exhibits-data.json',
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