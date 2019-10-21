

new Vue({
  el: '#rootApp',
  router: router,
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
    // searchData: function (_type, _value) {
    //   this.result = []
    //   if (_type == 'all') {
    //     this.result = this.exhibits
    //   } else {
    //     console.log(_value)
    //     this.result = this.exhibits.filter(function (value, index, array) {
    //       return value.category == _value;
    //     })
    //   }
    // },

    removeData: function (_num) {
      console.log(_num)
      this.exhibits.splice(_num - 1, 1)
      this.animaltypes.splice(_num - 1, 1)
    },

    setLang: function (_lang) {
      // console.log(_lang);
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

