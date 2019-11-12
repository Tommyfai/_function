Vue.component('v-footer', {
  template: '<div class="vs-footer" >' +
    ' V-footer ' +
    ' <button @click="buttonB" >fs.write</button> ' +
    '</div>',
  data: function () {
    return {
      count: 0
    }
  },
  props: {
    title: 'title En'
  },
  methods: {
    buttonB: function () {
      alert('b')

      // var fs = require('fs');

      // fs.writeFile("writefile.txt", "Hey there!", function (err) {

      //   if (err) {
      //     return console.log(err);
      //   }

      //   console.log("The file was saved!");
      // });

    }
  },
}) 