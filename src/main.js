import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
