Vue.component('homepage', {
  template: `<div>
  hompage
  </div>`,
  data: function () {
    // <div class="header-content" >
    //   <router-view></router-view>
    // </div>
    return {
      count: 0
    }
  },
  props: {
    title: 'title En'
  },
}) 