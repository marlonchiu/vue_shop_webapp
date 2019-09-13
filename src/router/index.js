import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')
const Goods = () => import('@/views/Goods.vue')

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
