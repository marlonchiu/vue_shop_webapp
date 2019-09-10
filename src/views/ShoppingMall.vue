<template>
  <div class="shopping-mall-page">
    <!--search-bar-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img class="location-icon" :src="locationIcon" alt="locationIcon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swipe-area">
      <van-swipe :autoplay="1500">
        <van-swipe-item v-for="(banner, index) in bannerArray" :key="index">
          <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div class="type-bar-item" v-for="(cate, index) in category" :key="index">
        <img width="90%" v-lazy="cate.image" alt=""/>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!-- recommend  goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src='item.image' width="80%"/>
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import url from '@/api/serviceAPI.config.js'
  export default {
    name: 'ShoppingMall',
    data () {
      return {
        swiperOption:{
          slidesPerView:3
        },
        locationIcon: require('../assets/images/aui-icon-location.png'),
        bannerArray: [
          {image: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
          {image: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg'},
          {image: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'}
        ],
        category: [],
        adBanner: {},
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods: [],  //热卖商品
      }
    },
    created () {
      axios({
        //  url: 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/index',
         url: url.getShopingMallInfo,
         method: 'get'
      }).then(response => {
        console.log(response)
        if(response.status === 200) {
          const result = response.data.data
          this.category = result.category
          this.adBanner = result.advertesPicture //获得广告图片
          this.bannerArray = result.slides   //轮播图片
          this.recommendGoods = result.recommend  //推荐商品
          this.floor1 = result.floor1
          this.floor2 = result.floor2
          this.floor3 = result.floor3
          this.floorName = result.floorName
          this.hotGoods = result.hotGoods  // 热门商品
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.shopping-mall-page
  .search-bar
    height 2.2rem
    line-height 2.2rem
    background #e5017d
    overflow hidden
    .van-row
      text-align center
      display flex
      align-items center
      .location-icon
        display flex
        align-items center
        padding-left .3rem
      .search-input
        width 100%
        height 1.3rem
        border 0
        border-bottom 1px solid #fff !important
        background #e5017d
        color #fff
  .swipe-area
    // width 20rem
    max-height 15rem
    overflow hidden
    clear both
  .type-bar
    background #ffffff
    margin 0 .3rem .3rem .3rem
    border-radius .3rem
    font-size 14px
    display flex
    flex-direction row
    flex-wrap nowrap
    .type-bar-item
      padding 0.3rem
      font-size 12px
      text-align center
      flex 1
  .recommend-area
    background #fff
    margin-top .3rem
    .recommend-title
      border-bottom 1px solid #eee
      font-size 14px
      padding .2rem
      color #e5017d
    .recommend-body
      border-bottom 1px solid #eee
      .recommend-item
        width 99%
        border-right 1px solid #eee
        font-size 12px
        text-align center
</style>
