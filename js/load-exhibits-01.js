Vue.component('exhibit-list', {
  template: '<div>' +
    ' <div class="table" >' +
    '  <template v-for="(exhibit, index) in paginatedData" >' +
    '   <div class="row" >' +
    '    <div class="cell" >' +
    '     {{size * pageNumber + index + 1}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{exhibit["Exhibit Code"]}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{exhibit["Taxa Code"]}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{showText(exhibit, \'Category\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{showText(exhibit, \'English Common Name\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{showText(exhibit, \'Description\') | capitalize}}' +
    '    </div>' +
    '   </div>' +
    '  </template>' +
    ' </div>' +
    '</div>',
  data: function () {
    return {
      pageNumber: 0,
      sortColumn: '',
      dir: 1,
      typeSelected: 'all',
      result: [],
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
    animalTypes: {
      type: Array,
      required: true
    },
    _exhibits: {
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
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
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
    },
    searchData: function (_type, _value) {
      alert(this.result);
      this._result = []
      if (_type == 'all') {
        this._result = this._exhibits
      } else {
        this._result = this._exhibits.filter(function (value, index, array) {
          return value.Category == _value;
        })
      }
    }
  },
  computed: {
    pageCount() {
      let l = this._result.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this._result
        .slice(start, end);
    }
  },
  created: function () {
    // this.result = this._result;
    // alert('d');
    // alert(this._lang);
  },
  mounted: function () {
    // this.result = this._result;
    // alert('d');
    // alert(this._result);
    // alert(this._attrNames);
    // alert(this._result);
  }
})
Vue.component('list-paging', {
  template: '<div>' +
    ' <div class="paging" >' +
    '  <div class="btns">' +
    '   <button :disabled="pageNumber === 0" @click="prevPage">Previous</button>' +
    '   <button :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>' +
    '  </div>' +
    ' </div>' +
    '</div>',
  data: function () {
    return {
      pageNumber: 0,
    }
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 5
    },
    animalTypes: {
      type: Array,
      required: true
    },
    _exhibits: {
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
      // this.pageNumber++;
      const start = this.pageNumber * this.size,
        end = start + this.size;
      // return this._result.slice(start, end);
      // alert(end);
      this._resul = this._result
        .slice(start, end)
      alert(this._resul);
      // alert(this.paginatedData());
    },
    prevPage() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this._result.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this._result
        .slice(start, end);
    }
  }
})
Vue.component('list-sort', {
  template: '<div>' +
    ' <template v-if="_result.length > 0" >' +
    '  <div class="row" >' +
    '    <div class="cell" >' +
    '     {{this._result.length}}' +
    '    </div> ' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'Exhibit Code\', dir)">Sort</button>' +
    '    </div> ' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'Taxa Code\', dir)">Sort</button>' +
    '    </div> ' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'Category\', dir)">Sort</button>' +
    '    </div> ' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'English Common Name\', dir)">Sort</button>' +
    '    </div>' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'Description\', dir)">Sort</button>' +
    '    </div>' +
    '  </div>' +
    ' </template>' +
    '</div>',
  data: function () {
    return {
      sortColumn: '',
      dir: 1,
    }
  },
  props: {
    _result: {
      type: Array,
      required: true
    }
  },
  methods: {
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
  }
})
new Vue({
  el: '#root2',
  data: {
    animaltypes: [],
    exhibits: [],
    attrnames: [],
    result: [],
    lang: 'tc',
    sortColumn: '',
    dir: 1
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
        this.attrnames = _data.attrNameByLang
        // console.log(this.attrNameByLangs)
        console.log(_data.attrNameByLang[0].tc + '==')
        this.result = this.exhibits;
      }.bind(this)
    )

  },
  created: function () {
    //this.result = this.exhibits;
  },
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
