<template>
  <div class="cart-page">
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <!--清空购物车-->
    <div class="cart-clear">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="pang-text">
            <div class="pang-goods-name">{{item.Name}}</div>
              <div class="pang-control">
              <van-stepper v-model="item.count" />
            </div>
        </div>
        <div class="pang-goods-price">
          <div>
            ￥{{item.price | moneyFilter}}
          </div>
          <div>
            x{{item.count}}
          </div>
          <div>
            ￥{{item.price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!--显示总金额-->
    <div class="cart-total-moeny">
      商品总价:￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import storage from 'good-storage'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'Cart',
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false // 购物车是否为空，不为空则显示true，为空显示false
    }
  },
  created () {
    this.getCartInfo()
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count
      })
      // 修改数量的时候缓存数据
      storage.set('cartInfo', this.cartInfo)
      return allMoney
    }
  },
  methods: {
    // 得到购物车中的商品信息
    getCartInfo () {
      // 如果有数据，我们去除并赋值给cartInfo
      if (storage.get('cartInfo')) {
        this.cartInfo = storage.get('cartInfo')
      }
      // 打印到控制台查看效果
      console.log(this.cartInfo)
      // console.log(this.cartInfo.length > 0)
      this.isEmpty = this.cartInfo.length > 0
    },
    clearCart () {
      Dialog.confirm({
        message: '确认清空购物车吗？'
      }).then(() => {
        storage.set('cartInfo', [])
        this.cartInfo = []
      }).catch(() => {
        // on cancel
      })
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cart-page
  background #fff
  .cart-clear
    height 2rem
    line-height 2rem
    background-color #fff
    border-bottom 1px solid #E4E7ED
    padding 5px
    text-align: right
  .cart-list
    background-color #fff
    .pang-row
      display flex
      flex-direction row
      flex-wrap nowrap
      padding 0.5rem
      font-size 0.85rem
      border-bottom 1px solid #E4E7ED
      .pang-img
        flex 6
      .pang-text
        flex 14
        padding-left 10px
        .pang-control
          padding-top 10px
      .pang-goods-price
        flex 4
        text-align right
  .cart-total-moeny
      text-align right
      background-color #fff
      border-bottom 1px solid #E4E7ED
      padding 5px
</style>
