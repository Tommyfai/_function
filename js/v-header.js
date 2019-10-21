Vue.component('v-header', {
  template: `<div>
    <div class="change-language">
        <button v-on:click="setLang('en')">En</button>
      <button v-on:click="setLang('tc')">繁</button>
      <button v-on:click="setLang('sc')">簡</button>
    </div>
    <router-link to="/home">Home</router-link>
    <router-link to="/setting">Setting</router-link>
    <router-link to="/setting/user">User</router-link>
    <router-link to="/setting/role">Role</router-link>
    <router-link to="/setting/system">System</router-link>    
    <router-link to="/setting/exhibit">Exhibit</router-link>    
    <div>
      <router-link to="/product">Product</router-link>    
      <router-link to="/product/create">> Create</router-link>    
      <router-link to="/product/search">> Search</router-link>    
      <router-link to="/product/search/result">> Result</router-link>        
    </div>
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
  methods: {
    setLang: function (_lang) {
      this.$parent.setLang(_lang);
    }
  },
}) 