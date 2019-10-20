Vue.component('exhibit-list', {
  template: '<div>' +
    'a {{username}} a' +
    ' <div class="paging" >' +
    '  <div class="page-of">Size' +
    '  <select class="page-size" v-model="size" >' +
    '   <option>5</option>' +
    '   <option>10</option>' +
    '   <option>15</option>' +
    '   <option>20</option>' +
    '  </select>' +
    '   Page ' +
    '  <select class="page-current" v-model="pageNumber" >' +
    '   <template v-for="(page, index) in pageCount" >' +
    '    <option>{{index + 1}}</option>' +
    '   </template>' +
    '  </select>' +
    ' of {{pageCount}}, Total: {{this.records.length}} </div>' +
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
      records: [],
      size: 5
    }
  },
  props: {
    animalTypes: {
      type: Array,
      required: true
    },
    _exhibits: {
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
    firstPage() {
      this.pageNumber = 1;
    },
    previousPage() {
      this.pageNumber--;
    },
    nextPage() {
      this.pageNumber++;
    },
    lastPage() {
      this.pageNumber = this.pageCount;
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
      this.records.sort(function (a, b) {
        if (a[_col] < b[_col]) return _dir * -1
        if (a[_col] > b[_col]) return _dir
        return 0
      })
    }
  },
  computed: {
    username() {
      // console.log(this.$route.params.username)
      return this.$route.params.username
    },
    pageCount() {
      let l = this.records.length;
      let s = this.size;
      var _return = Math.ceil(l / s);
      if (this.pageNumber > _return) {
        this.pageNumber = 1;
      }
      return _return;
    },
    paginatedData() {
      this.records = this._exhibits;
      var _category = this.filters.category;
      var _taxacode = this.filters.taxacode;
      if (_category != '') {
        _keyName = this.getAttrByLang('Category');
        this.records = this.records.filter(function (value, index, array) {
          return (value[_keyName].toLowerCase().indexOf(_category.toLowerCase()) != -1);
        })
      }
      if (_taxacode != '') {
        _keyName = this.getAttrByLang('Taxa Code');
        this.records = this.records.filter(function (value, index, array) {
          return (value[_keyName].toLowerCase().indexOf(_taxacode.toLowerCase()) != -1);
        })
      }
      const start = (this.pageNumber - 1) * this.size;
      // console.log(start)
      const end = start + Number(this.size);
      // console.log(end)
      return this.records.slice(start, end);
    }
  },

  created: function () {
    // this.result = this._result;    
  },

  mounted: function () {
    // console.log(this.result);
  }
})

new Vue({
  el: '#rootApp',
  router,
  data: {
    animaltypes: [],
    exhibits: [],
    result: [],
    attrnames: [],
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
    }
  },
  computed: {

  },
  mounted: function () {

    // var _id = '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ';
    // var _sheet = 1;
    // var _url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/od6/public/values?alt=json';
    // //var _url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/od6/public/values?alt=json';
    // //var _url = 'https://spreadsheets.google.com/feeds/list/' + _id + '/' + _sheet + '/public/values?alt=json';
    // console.log(_url);
    // $.getJSON(
    //   // 'data/exhibits-data.json',
    //   _url,
    //   function (_data) {
    //     // this.animaltypes = _data.AnimalTypes
    //     // this.exhibits = _data.Exhibits
    //     console.log(_data);
    //     // this.attrnames = _data.attrNameByLang
    //     // console.log(this.attrNameByLangs)
    //     // console.log(_data.attrNameByLang[0].tc + '==')
    //     // this.result = this.exhibits;
    //   }.bind(this)
    // )
    // console.log(this.animaltypes);

    // _getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 1)
    // this.exhibits.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 1));
    // this.animaltypes.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 2));
    // this.attrnames.push(_getGsData('1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ', 3));










    var _id = '1Mx5Tbh0TFygWJyczTlYxP1EaOHm-5X8Vm9NLfzQ60qQ';

    _getGsData(_id, 2, function (_data) {
      this.animaltypes = _data;
      // console.log(_data);
    }.bind(this));

    _getGsData(_id, 3, function (_data) {
      this.attrnames = _data;
      // console.log(_data);
    }.bind(this));

    _getGsData(_id, 1, function (_data) {
      // console.log(_data);
      this.exhibits = _data;
      this.result = this.exhibits;
    }.bind(this))
  },
  created: function () {

  },
})

