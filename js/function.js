$(function () {
  $(this).mousedown(function (e) {
    if (e.ctrlKey) {
      if (e.which == 3) {
        window.location.reload()
      }
    }
  })
})
function scriptLoader(path, callback) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.async = true;
  script.src = path;
  script.onload = function () {
    if (typeof (callback) == "function") {
      callback();
    }
  }
  try {
    var scriptOne = document.getElementsByTagName('script')[0];
    scriptOne.parentNode.insertBefore(script, scriptOne);
  }
  catch (e) {
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
function _getGsData(_id, _sheet, _callBack) {
  // var id = "1NcYqzx397HXmFwWhc5ro9N4-tzcbFKtqmLd6kIghh8Y";
  // https://docs.google.com/spreadsheets/d/e/2PACX-1vSuxzAWtaWqOZCwHgqmU8kGAFHEUKbZz5Qssx1fykW0NgikopV74p-jcZQFAAOExCGNqRcwpIsmCwMX/pubhtml
  // var id = "2PACX-1vSuxzAWtaWqOZCwHgqmU8kGAFHEUKbZz5Qssx1fykW0NgikopV74p-jcZQFAAOExCGNqRcwpIsmCwMX";
  // http://cors.io/spreadsheets.google.com/feeds/list/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/od6/public/values?alt=json
  var id = _id;
  var sheet = _sheet;
  // var url = 'https://spreadsheets.google.com/feeds/list/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/od6/public/values?alt=json-in-script&callback=x';
  var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';
  // var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
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
              // alert(name);
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
      _callBack(responseObj['rows'])
    }.bind(this)
  )
}