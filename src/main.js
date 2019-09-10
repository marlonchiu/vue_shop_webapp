import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)

// 只有在生产环境下使 用mock
// if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
