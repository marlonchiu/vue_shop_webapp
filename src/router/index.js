import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')
const Register = () => import('@/views/Register.vue')

const routes = [
  {
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
