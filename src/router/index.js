import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')
const Goods = () => import('@/views/Goods.vue')
const CategoryList = () => import('@/views/CategoryList.vue')

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
  },
  {
    path: '/categoryList',
    name: 'CategoryList',
    component: CategoryList
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
