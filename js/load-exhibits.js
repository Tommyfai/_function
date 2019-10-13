Vue.component('exhibit-list', {
  template: '<div>' +
    ' <div class="paging" >' +
    '  <div class="page-of">Page {{this.pageNumber}} of {{pageCount}}, Total: {{this._result.length}} </div>' +
    '  <div class="btns">' +
    '   <button :disabled="pageNumber === 0" @click="prevPage">Previous</button>' +
    '   <button :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>' +
    '  </div>' +
    ' </div>' +
    ' <div class="table" >' +
    '   <div class="row" >' +
    '    <div class="cell" >' +
    '     No.' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'Exhibit Code\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'Taxa Code\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'Category\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'English Common Name\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'Family\') | capitalize}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getAttrByLang(\'Location\')}}' +
    '    </div>' +
    '   </div>' +
    '  <template v-for="(exhibit, index) in paginatedData" >' +
    '   <div class="row" >' +
    '    <div class="cell" >' +
    '     {{size * pageNumber + index + 1}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'Exhibit Code\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'Taxa Code\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'Category\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'English Common Name\')}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'Family\') | capitalize}}' +
    '    </div>' +
    '    <div class="cell" >' +
    '     {{getKeyById(exhibit, \'Location\')}}' +
    '    </div>' +
    '   </div>' +
    '  </template>' +
    ' <template v-if="paginatedData.length > 0" >' +
    '  <div class="row" >' +
    '    <div class="cell" >' +
    // '     {{this._result.length}}' +
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
    '      <button v-on:click="sorting(\'Family\', dir)">Sort</button>' +
    '    </div>' +
    '    <div class="cell" >' +
    '      <button v-on:click="sorting(\'Location\', dir)">Sort</button>' +
    '    </div>' +
    '  </div>' +
    ' </template>' +
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
    getKeyById: function (_obj, _name) {
      return _obj[this.getAttrByLang(_name)]
    },
    getAttrByLang: function (_name) {
      var _lang = this._lang
      var _return;
      this._attrnames.map(function (value) {
        if (value.id.toLowerCase() == _name.toLowerCase()) {
          _return = value[_lang]
        }
      })
      return _return
    },
    sorting: function (_col) {
      _col = this.getAttrByLang(_col)
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
      let l = this._result.length, s = this.size;
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

new Vue({
  el: '#root2',
  data: {
    animaltypes: [],
    exhibits: [],
    attrnames: [],
    result: [],
    lang: 'en',
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
        console.log(_value)
        this.result = this.exhibits.filter(function (value, index, array) {
          return value.category == _value;
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
    }
  },

  mounted: function () {
    // $.getJSON(
    //   'data/exhibits-data.json',
    //   function (_data) {
    //     this.animaltypes = _data.AnimalTypes
    //     this.exhibits = _data.Exhibits
    //     console.log(_data.Exhibits);
    //     this.attrnames = _data.attrNameByLang
    //     // console.log(this.attrNameByLangs)
    //     // console.log(_data.attrNameByLang[0].tc + '==')
    //     this.result = this.exhibits;
    //   }.bind(this)
    // )
    // console.log(this.animaltypes);

    // _getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 1)
    // this.exhibits.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 1));
    // this.animaltypes.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 2));
    // this.attrnames.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 3));

    // console.log(this.animaltypes);
    _getGsData(
      '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ',
      2,
      function (_data) {
        this.animaltypes = _data;
        console.log(_data);
      }.bind(this)
    );
    _getGsData(
      '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ',
      3,
      function (_data) {
        this.attrnames = _data;
        console.log(_data);
      }.bind(this)
    );
    _getGsData(
      '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ',
      1,
      function (_data) {
        // console.log(_data);
        this.exhibits = _data;
        console.log(_data);
        this.result = this.exhibits;
      }.bind(this)
    )

    // console.log(this.exhibits);
  },
  created: function () {
    //this.result = this.exhibits;
  },
})

