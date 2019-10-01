Vue.component('paginated-list', {
  data() {
    return {
      pageNumber: 0
    }
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.listData.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.listData
        .slice(start, end);
    }
  },
  template:
    `<div>
      <ul>
        <li v-for="p in paginatedData">
          {{p.first}} 
          {{p.last}}  
          {{p.suffix}}
        </li>
      </ul>
    <button 
        :disabled="pageNumber === 0" 
        @click="prevPage">
        Previous
    </button>
    <button 
        :disabled="pageNumber >= pageCount -1" 
        @click="nextPage">
        Next
    </button>
    </div>`
});


Vue.component('exhibit-list', {
  template: '<div class="fn-grid" >' +
    '<template v-for=\'(exhibit, index) in paginatedData\' >' +
    '  <div class="row" >' +
    '    <div class="cell" >' +
    '      {{index + 1}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '      {{exhibit["Exhibit Code"]}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '      {{exhibit["Taxa Code"]}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '      {{showText(exhibit, \'Category\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '      {{showText(exhibit, \'English Common Name\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '      {{showText(exhibit, \'Description\')}}' +
    '    </div>' +
    '  </div>' +
    '</template>' +
    '<template v-if="_result.length > 0" >' +
    ' <div class="row" >' +
    '   <div class="cell" >' +
    '{{_result.length}}' +
    '   </div> ' +
    '   <div class="cell" >' +
    '     <button v-on:click="sorting(\'Exhibit Code\', dir)">Sort</button>' +
    '   </div> ' +
    '   <div class="cell" >' +
    '     <button v-on:click="sorting(\'Taxa Code\', dir)">Sort</button>' +
    '   </div> ' +
    '   <div class="cell" >' +
    '     <button v-on:click="sorting(\'Category\', dir)">Sort</button>' +
    '   </div> ' +
    '   <div class="cell" >' +
    '     <button v-on:click="sorting(\'English Common Name\', dir)">Sort</button>' +
    '   </div>' +
    '   <div class="cell" >' +
    '     <button v-on:click="sorting(\'Description\', dir)">Sort</button>' +
    '   </div>' +
    ' </div>' +
    '</template>' +

    '<button ' +
    '    :disabled="pageNumber === 0" ' +
    '    @click="prevPage">' +
    '    Previous' +
    '</button>' +
    '<button ' +
    '    :disabled="pageNumber >= pageCount -1" ' +
    '    @click="nextPage">' +
    '    Next' +
    '</button>' +

    '</div>',
  data: function () {
    return {
      pageNumber: 0,
      sortColumn: '',
      dir: 1
      // ,
      // getAttrLang: function (_attrName) {
      //   return this.rawHtml();
      // }
    }
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 5
    },
    _animaltypes: {
      type: Array,
      required: true
    },
    _result: {
      type: Array,
      required: true
    },
    _attrnames: {
      type: Array,
      required: true
    },
    _lang: {
      type: String,
      required: true
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    showText: function (_obj, _name) {
      return _obj[this.getAttrByLang(_name)]
    },
    getAttrByLang: function (_name) {
      var _lang = this._lang
      var _return;
      this._attrnames.map(function (value) {
        if (value.en.toLowerCase() == _name.toLowerCase()) {
          _return = value[_lang]
        }
      })
      return _return
    },
    sorting: function (_col) {
      var _dir = this.dir
      if (_col == this.sortColumn) {
        _dir = _dir * -1
        this.dir = _dir
      } else {
        this.sortColumn = _col
        this.dir = 1
        _dir = 1
      }
      this._result.sort(function (a, b) {
        if (a[_col] < b[_col]) return _dir * -1
        if (a[_col] > b[_col]) return _dir
        return 0
      })
    }
  },
  computed: {
    pageCount() {
      let l = this.listData.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.listData
        .slice(start, end);
    }
  },
  mounted: function () {
    // alert(this._attrNames);
  }
})



function createFakeData() {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      first: 'John',
      last: 'Doe',
      suffix: '#' + i
    });
  }
  return data;
}


new Vue({
  el: '#root2',
  data: {
    animaltypes: [],
    exhibits: [],
    attrnames: [],
    result: [],
    lang: 'tc',
    sortColumn: '',
    dir: 1,
    people: createFakeData()
  },
  components: {},
  methods: {
    searchData: function (_type, _value) {
      this.result = []
      if (_type == 'all') {
        this.result = this.exhibits
      } else {
        this.result = this.exhibits.filter(function (value, index, array) {
          return value.Category == _value;
        })
      }
    },

    removeData: function (_num) {
      console.log(_num)
      this.exhibits.splice(_num - 1, 1)
      this.animaltypes.splice(_num - 1, 1)
    },

    setLang: function (_lang) {
      this.lang = _lang
    },

    getAttrByLang: function (_name) {
      var _lang = this.lang
      this.attrNames.map(function (value) {
        if (value.en.toLowerCase() == _name) {
          console.log(value[_lang])
          return value[_lang]
        }
      })
    },

    // sorting: function (_col) {
    //   var _dir = this.dir
    //   console.log(_col + '___' + this.sortColumn)
    //   if (_col == this.sortColumn) {
    //     _dir = _dir * -1
    //     this.dir = _dir
    //   } else {
    //     this.sortColumn = _col
    //   }
    //   this.result.sort(function (a, b) {
    //     if (a[_col] < b[_col]) return _dir * -1
    //     if (a[_col] > b[_col]) return _dir
    //     return 0
    //   })
    // }
  },

  mounted: function () {
    $.getJSON(
      'data/exhibits-data.json',
      function (_data) {
        this.animaltypes = _data.AnimalTypes
        this.exhibits = _data.Exhibits
        // this.result = _data.Exhibits
        this.attrnames = _data.attrNameByLang
        // console.log(this.attrNameByLangs)
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
