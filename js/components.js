Vue.component('button-a', {
  data: function () {
    return {
      count: 0
    }
  },
  props: ['title'],
  template: `
  <div>
    <button v-on:click="count++"> {{ title }}  me {{ count }} xx.</button>
  </div>
  `
})
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  props: ['product'],
  template: `
  <div>
    <button-a v-bind:title="product.id" ></button-a>
    <button class="buttonA" v-on:click="count++">{{ product.title }} clicked me {{ count }} times.</button>
  </div>
  `
})
