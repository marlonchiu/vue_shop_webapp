<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/api/serviceAPI.config.js'
export default {
  name: 'Goods',
  data () {
    return {
      msg: 'Goods Page',
      goodsId: '00b417a0f3444bb6965f4ba2dbafbed0'
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
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
