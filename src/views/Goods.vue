<template>
  <div class="goods-page">
    <div class="navbar-div">
      <van-nav-bar
          title="商品详情"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}} </div>
    <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div class="goods-detail">
      <van-tabs swipeable  sticky>
        <van-tab title="商品详情">
          <div class="tab-goods-detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="商品评价">
          评论制作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div class="goods-handle-btn">
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div class="goods-handle-btn">
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import storage from 'good-storage'
import url from '@/api/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'Goods',
  data () {
    return {
      goodsId: '',
      goodsInfo: {} // 商品详细信息
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    this.getGoodsInfo(this.goodsId)
  },
  methods: {
    getGoodsInfo (goodsId) {
      axios({
        url: url.getDetailGoodsInfo,
        method: 'post',
        data: {
          goodsId
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.message) {
          this.goodsInfo = response.data.message
        } else {
          Toast('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    addGoodsToCart () {
      // 取出购物车中的商品数据
      let cartInfo = storage.get('cartInfo') || []
      // 判断购物车内是否已经有这个商品
      // 如果没有返回undeifnd，如果有返回第一个查找到的数据
      let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId)
      // console.log(isHaveGoods)
      if (!isHaveGoods) {
        // 没有商品直接添加到数组中
        // 重新组成添加到购物车的信息
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }

        cartInfo.push(newGoodsInfo) // 添加到购物车
        storage.set('cartInfo', cartInfo) // 操作本地数据
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }
      this.$router.push({ name: 'Cart' }) // 进行跳转
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
.goods-page
  .goods-name
    background-color #fff
  .goods-price
    background-color #fff
  .goods-bottom
    position fixed
    width 100%
    bottom 0px
    left 0px
    background-color #fff
    display flex
    flex-direction row
    flex-flow nowrap
    .goods-handle-btn
      flex 1
      padding 5px

.tab-goods-detail {
  font-size:0px;  // 解决图片有空隙问题
}
</style>
