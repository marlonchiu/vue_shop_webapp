<template>
  <div>
    <swiper class="swiper" :options='swiperOption'>
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
          Slide {{item}}
        </swiper-slide>
        <!-- 添加分分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'SwiperDefault',
    data() {
      return {
        slide: [1, 2, 3, 4, 5, 6],
        swiperOption: {
          loop: true,  // 无线滚动
          pagination: {
            el: '.swiper-pagination',
            chickable: true
          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.swiper-slide {
  height 4rem
  text-align center
  line-height 4rem
}

.swiper{
  height 7rem
  border-top 1px solid #ccc
  border-bottom 1px solid #ccc
}

</style>
