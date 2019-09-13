import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')
const Goods = () => import('@/views/Goods.vue')
const CategoryList = () => import('@/views/CategoryList.vue')
const Cart = () => import('@/views/Cart.vue')
const Member = () => import('@/views/Member.vue')
const Main = () => import('@/views/Main.vue')

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'ShoppingMall',
        component: ShoppingMall
      },
      {
        path: '/categoryList',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/member',
        name: 'Member',
        component: Member
      }
    ]
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
    path: '/goods/:goodsId',
    name: 'Goods',
    component: Goods
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
