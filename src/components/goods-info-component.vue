<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'GoodsInfoComponent',
  props: {
    goodsImage: {
      type: String,
      default: ''
    },
    goodsName: {
      type: String,
      default: ''
    },
    goodsPrice: {
      type: Number,
      default: 0
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
  .goods-name
    padding 0 8px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
