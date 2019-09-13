<template>
  <div class="main-page">
    <div class="main-content">
      <router-view/>
    </div>
    <van-tabbar v-model="active"  @change="changeTabbar(active)">
      <van-tabbar-item icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">列表页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    changeTabbar (active) {
      this.active = active
      switch (active) {
        case 0:
          this.$router.push({ name: 'ShoppingMall' })
          break
        case 1:
          this.$router.push({ name: 'CategoryList' })
          break
        case 2:
          this.$router.push({ name: 'Cart' })
          break
        case 3:
          this.$router.push({ name: 'Member' })
          break
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
