import Vue from 'vue'
import VueRouter from 'vue-router'
import VueJsonp from 'vue-jsonp'
import App from './App.vue'
import Common from '../../services/common.js'


if (!window.Promise) {  
  window.Promise = Promise;  
}  

Vue.use(VueRouter)

Vue.use(VueJsonp)
Vue.use(Common);

const routes = [
  // { path: '/', redirect:'/userInfo' },
  // { path: '/userInfo', component: userInfo }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})