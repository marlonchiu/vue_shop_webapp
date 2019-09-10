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
          <img v-lazy="banner.imgUrl" width="100%"/>
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

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ShoppingMall',
    data () {
      return {
        locationIcon: require('../assets/images/aui-icon-location.png'),
        bannerArray: [
          {imgUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
          {imgUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg'},
          {imgUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'}
        ],
        category: []
      }
    },
    created () {
      axios({
         url: 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/',
         method: 'get'
      }).then(response => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
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
    width 20rem
    max-height 12rem
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
</style>
