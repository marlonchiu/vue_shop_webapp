import Vue from 'vue'
import Router from 'vue-router'
const ShoppingMall = () => import('@/views/ShoppingMall.vue')

const routes = [
  {
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall
  }
]

Vue.use(Router)

export default new Router({
  routes: routes
})
