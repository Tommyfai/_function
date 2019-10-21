Vue.component('exhibit', {
  template: '<div>' +
    ' {{_lang}}' +
    '</div>',
  data: function () {
    return {
      pageNumber: 1,
    }
  },

  props: {
    _lang: {
      type: String,
      required: true
    }
  },

  methods: {

  },

  computed: {

  },

  created: function () {
    // this.result = this._result;    
  },

  mounted: function () {
    console.log(this.$parent.lang);
  }
})
