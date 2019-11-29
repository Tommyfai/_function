
const Foo = { template: '<div>foo{{ $route.params.id }}</div>' }
const Bar = { template: '<div>bar{{$route.params.id}}</div>' }

const Home = { template: '<homepage/>' }
const Product = { template: '<div>Product<router-view/></div>' }
const ProductCreate = { template: '<div>ProductCreate</div>' }
const ProdcutSeach = { template: '<div>ProductSearch<router-view/></div>' }
const ProductSearchResult = { template: '<div>ProductSearchResult</div>' }

const Setting = { template: '<div>Setting <div><router-view/></div> </div>' }
const Exhibit = { template: '<div>Exhibit  <exhibit :_lang="\'en\'" ></exhibit> </div>' }
const User = { template: '<div>User</div>' }
const Role = { template: '<div>Role</div>' }
const System = { template: '<div>System</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  {
    path: '/product', 
    component: Product,
    children: [
      { path: 'create', component: ProductCreate },
      {
        path: 'search',
        component: ProdcutSeach,
        children: [
          { path: 'result', component: ProductSearchResult }
        ]
      }
    ]
  },
  {
    path: '/setting',
    component: Setting,
    children: [
      { path: 'user', component: User },
      { path: 'role', component: Role },
      { path: 'exhibit', component: Exhibit },
      { path: 'system', component: System }
    ]
  },
  { path: '/setting/user', component: User },
  { path: '/setting/role', component: Role },
  { path: '/setting/system', component: System }

  // { path: '/foo/:username', component: Foo },
  // { path: '/bar/:username', component: Bar }
]

const router = new VueRouter({
  routes: routes
})

// const app = new Vue({
//   router
// }).$mount('#rootApp')
