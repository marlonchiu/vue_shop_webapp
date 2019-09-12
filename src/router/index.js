import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')

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
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
