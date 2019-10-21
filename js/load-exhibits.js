Vue.component('exhibit-list', {
  template: '<div class="fn-grid">' +
    // '{{username}}' +
    ' <div class="paging" >' +
    '  <div class="page-of">Size' +
    '   <select class="page-size" v-model="size" >' +
    '    <option>5</option>' +
    '    <option>10</option>' +
    '    <option>15</option>' +
    '    <option>20</option>' +
    '   </select>' +
    '    Page ' +
    '   <select class="page-current" v-model="pageNumber" >' +
    '    <template v-for="(page, index) in pageCount" >' +
    '     <option>{{index + 1}}</option>' +
    '    </template>' +
    '   </select>' +
    ' of {{pageCount}}, Total: {{resultSet.length}} ' +
    '  </div>' +
    '  <div class="btns">' +
    '   <button class="first" :disabled="pageNumber <= 1" @click="firstPage"></button>' +
    '   <button class="previous" :disabled="pageNumber <= 1" @click="previousPage"></button>' +
    '   <button class="next" :disabled="pageNumber >= pageCount" @click="nextPage"></button>' +
    '   <button class="last" :disabled="pageNumber >= pageCount" @click="lastPage"></button>' +
    '  </div>' +
    ' </div>' +
    ' <div class="table" >' +
    '  <template v-if="paginatedData.length > 0" >' +
    '   <div class="row sorting" >' +
    '     <div class="cell" >' +
    '     </div> ' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'Exhibit Code\', dir)">Sort</button>' +
    '     </div> ' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'Taxa Code\', dir)">Sort</button>' +
    '     </div> ' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'Category\', dir)">Sort</button>' +
    '     </div> ' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'English Common Name\', dir)">Sort</button>' +
    '     </div>' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'Family\', dir)">Sort</button>' +
    '     </div>' +
    '     <div class="cell" >' +
    '       <button v-on:click="sorting(\'Location\', dir)">Sort</button>' +
    '     </div>' +
    '   </div>' +
    '  </template>' +
    '  <div class="row filter" >' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" v-model="filters.taxacode" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" v-model="filters.category" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" />' +
    '   </div>' +
    '   <div class="cell" >' +
    '    <input class="filter" type="text" />' +
    '   </div>' +
    '  </div>' +
    '  <div class="row hd" >' +
    '   <div class="cell " >' +
    '    {{getAttrByLang(\'header-item-num\')}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-exhibit-code\')}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-taxa-code\')}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-category\')}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-common-name\')}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-family\') | capitalize}}' +
    '   </div>' +
    '   <div class="cell" >' +
    '    {{getAttrByLang(\'header-location\')}}' +
    '   </div>' +
    '  </div>' +
    '  <template v-for="(exhibit, index) in paginatedData" >' +
    '   <div class="row" >' +
    '    <div class="cell" >' +
    '     {{(pageNumber - 1) * size  + index + 1}}' +
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

    ' </div>' +

    ' <div>' +
    '  <button v-on:click="searchData(\'reset\')">Reset</button>' +
    '  <button v-on:click="searchData(\'all\')">Show All</button>' +
    '  <button v-on:click="searchData(\'animaltype\',\'Herptile\')">Search 兩棲及爬行類</button>' +
    ' </div>' +

    '</div>',
  data: function () {
    return {
      pageNumber: 1,
      sortColumn: '',
      dir: 1,
      typeSelected: 'all',
      filters: {
        category: '',
        taxacode: ''
      },
      resultSet: [],
      exhibits: [],
      attrnames: [],
      size: 5
    }
  },
  props: {
    // animalTypes: {
    //   type: Array,
    //   required: true
    // },
    // _exhibits: {
    //   type: Array,
    //   required: true
    // },
    // _attrnames: {
    //   type: Array,
    //   required: true
    // },
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
    firstPage: function () {
      this.pageNumber = 1;
    },
    previousPage: function () {
      this.pageNumber--;
    },
    nextPage: function () {
      this.pageNumber++;
    },
    lastPage: function () {
      this.pageNumber = this.pageCount;
    },
    getKeyById: function (_obj, _name) {
      return _obj[this.getAttrByLang(_name)]
    },
    getAttrByLang: function (_name) {
      var _lang = this._lang
      var _return;
      this.attrnames.map(function (value) {
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
      this.resultSet.sort(function (a, b) {
        if (a[_col] < b[_col]) return _dir * -1
        if (a[_col] > b[_col]) return _dir
        return 0
      })
    },
    searchData: function (_type, _value) {
      this.resultSet = []
      if (_type == 'all') {
        this.resultSet = this.exhibits
      } else {
        console.log(_value)
        this.resultSet = this.exhibits.filter(function (value, index, array) {
          return value.category == _value;
        })
      }
    },
  },
  computed: {
    username: function () {
      // console.log(this.$route.params.username)
      return this.$route.params.username
    },
    pageCount: function () {
      let l = this.resultSet.length;
      let s = this.size;
      var _return = Math.ceil(l / s);
      if (this.pageNumber > _return) {
        this.pageNumber = 1;
      }
      return _return;
    },
    paginatedData: function () {
      // this.resultSet = this._exhibits;
      var _category = this.filters.category;
      var _taxacode = this.filters.taxacode;
      if (_category != '') {
        _keyName = this.getAttrByLang('Category');
        this.resultSet = this.resultSet.filter(function (value, index, array) {
          return (value[_keyName].toLowerCase().indexOf(_category.toLowerCase()) != -1);
        })
      }
      if (_taxacode != '') {
        _keyName = this.getAttrByLang('Taxa Code');
        this.resultSet = this.resultSet.filter(function (value, index, array) {
          return (value[_keyName].toLowerCase().indexOf(_taxacode.toLowerCase()) != -1);
        })
      }
      const start = (this.pageNumber - 1) * this.size;
      // console.log(start)
      const end = start + Number(this.size);
      // console.log(end)
      return this.resultSet.slice(start, end);
    }
  },

  created: function () {
    // this.result = this._result;    
  },

  mounted: function () {
    console.log('this.result');
    var _id = '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ';

    _getGsData(_id, 2, function (_data) {
      this.animaltypes = _data;
      // console.log(_data);
    }.bind(this));

    _getGsData(_id, 3, function (_data) {
      this.attrnames = _data;
      // this.attrnames = _data;
      // console.log(_data);
    }.bind(this));

    _getGsData(_id, 1, function (_data) {
      // console.log(_data);
      this.resultSet = _data
      this.exhibits = _data;
      // this.result = this.exhibits;
    }.bind(this))
  }
})
