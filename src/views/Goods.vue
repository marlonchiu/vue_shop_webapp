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
          正在制作中
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
import url from '@/api/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'Goods',
  data () {
    return {
      goodsId: '00b417a0f3444bb6965f4ba2dbafbed0',
      goodsInfo: {} // 商品详细信息
    }
  },
  created () {
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
