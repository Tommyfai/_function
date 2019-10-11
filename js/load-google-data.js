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
    var id = "1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y";
    var sheet = 1;
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';
    // var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';
    // var url = 'https://spreadsheets.google.com/feeds/cells/' + spreadsheetID + '/1/public/full?alt=json';
    var showRows = true;
    var showColumns = true;
    // var query = '&q=漁農自然護理署';
    var query = '';
    var useIntegers = true;
    $.getJSON(
      url,
      function (data) {
        var responseObj = {};
        var rows = [];
        var columns = {};
        if (data && data.feed && data.feed.entry) {
          // console.log(data.feed.entry);
          for (var i = 0; i < data.feed.entry.length; i++) {
            var entry = data.feed.entry[i];
            var keys = Object.keys(entry);
            var newRow = {};
            var queried = false;
            for (var j = 0; j < keys.length; j++) {
              // var gsxCheck = keys[j].indexOf('gs$'); // cells
              var gsxCheck = keys[j].indexOf('gsx$'); // for list              
              if (gsxCheck > -1) {
                var key = keys[j];
                var name = key.substring(4);
                var content = entry[key];
                var value = content.$t;
                // console.log(content);
                if (value.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                  queried = true;
                }
                if (useIntegers === true && !isNaN(value)) {
                  value = Number(value);
                }
                newRow[name] = value;
                if (queried === true) {
                  if (!columns.hasOwnProperty(name)) {
                    columns[name] = [];
                    columns[name].push(value);
                  } else {
                    columns[name].push(value);
                  }
                }
              }
            }
            if (queried === true) {
              rows.push(newRow);
            }
          }
        }
        if (showColumns === true) {
          responseObj['columns'] = columns;
        }
        if (showRows === true) {
          responseObj['rows'] = rows;
        }
        // response.json(responseObj);
        console.log(responseObj['rows']);
        // return res.status(200).json(responseObj);
      }.bind(this)
    )
  },
  created: function () {
    //this.result = this.exhibits;
  },
})

