Vue.component('v-header', {
  template: '<div>' +
    ' <button v-on:click="count++"> {{ title }}  me {{ count }} xx.</button>' +
    '</div>',
  data: function () {
    return {
      count: 0
    }
  },
  props: {
    title: 'title En'
  },
}) 