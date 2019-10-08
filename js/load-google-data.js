Vue.component('partner-list', {
  template: '<div class="fn-grid" >' +
    ' 999 ' +
    '</div>',
  data: function () {
    return {

    }
  },
  props: {

  },
  filters: {

  },
  methods: {

  },
  computed: {

  },
  created: function () {

  },
  mounted: function () {

  }
})

new Vue({
  el: '#root',
  data: {
    exhibits: []
  },
  components: {},
  methods: {

  },

  mounted: function () {
    var spreadsheetID = "1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y";
    var url = 'https://spreadsheets.google.com/feeds/cells/' + spreadsheetID + '/1/public/full?alt=json';
    $.getJSON(
      url,
      // 'data/exhibits-data.json',
      // 1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y
      // 'https://spreadsheets.google.com/feeds/lists/2PACX-1vSpLxw6AYhh8QMrzRP-AZKtlXvmC-iwkeIhYSxhdtxbsj-b89eSk4QB7SMBcqK-KlL_fQI9LS9Tliwo/public/values?alt=json',
      // 'https://spreadsheets.google.com/feeds/cells/1g4FBktkm7al3ZkDI8LuFXuztTqK4nY-eUYMLep6BRuw/1/public/full?alt=json',
      // 'https://spreadsheets.google.com/feeds/cells/1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y/1/public/full?alt=json',
      // 'https://sheetsu.com/apis/v1.0su/9d057488f931',
      // 'https://spreadsheets.google.com/feeds/cells/1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y/0/od6/public/values?alt=json',
      // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpLxw6AYhh8QMrzRP-AZKtlXvmC-iwkeIhYSxhdtxbsj-b89eSk4QB7SMBcqK-KlL_fQI9LS9Tliwo/pubhtml',
      function (_data) {
        var entry = _data.feed.entry;
        $(entry).each(function () {
          // Column names are name, age, etc.
          // $('.results').prepend('<h2>' + this.gsx$name.$t + '</h2><p>' + this.gsx$age.$t + '</p>');
          // console.log(this)
          // console.log(this.content.$t)
          // console.log(this.content)
          // console.log(this.id.$t);
          // console.log(this.title.$t);
          // console.log(this.content.$t);
          // ['gsx$content']['$t']

          console.log(this['gsx$content']['$t']);
        });
      }.bind(this)
    )

  },
  created: function () {
    //this.result = this.exhibits;
  },
})

