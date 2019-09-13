import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Row, Col, Swipe, SwipeItem,
  Lazyload, List, Field, NavBar, Toast,
  Tabs, Tab, pullRefresh, Stepper, Dialog,
  Tabbar, TabbarItem, Cell, CellGroup
} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
  .use(Lazyload).use(List).use(Field).use(NavBar).use(Toast)
  .use(Tabs).use(Tab).use(pullRefresh).use(Stepper).use(Dialog)
  .use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)

// 只有在生产环境下使 用mock
// if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
