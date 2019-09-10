<template>
  <!-- floor one area -->
  <div class="floor-area">
    <div class="floor-anomaly">
      <div class="floor-left">
        <img :src="floorData0.image" width="100%" />
      </div>
      <div class="floor-right">
        <div class="floor-two"><img :src="floorData1.image" width="100%" /></div>
        <div class="floor-three"><img :src="floorData2.image" width="100%" /></div>
      </div>
    </div>
    <div class="floor-rule">
      <div class="floor-rule-item" v-for="(item ,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FloorComponent',
    props: {
      floorData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {}
      }
    },
    watch: {
      floorData: function(val) {
        console.log(this.floorData)
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .floor-area
    background #ffffff
    .floor-anomaly
      display flex
      flex-direction row
      background #ffffff
      border-bottom 1px solid #ddd
      .floor-left
        width 10rem
        box-sizing border-box
        border-right 1px solid #dddddd
      .floor-right
        width 10rem
        box-sizing border-box
        .floor-two
          border-bottom 1px solid #dddddd
    .floor-rule
      display flex
      flex-direction row
      flex-wrap wrap
      background #ffffff
      .floor-rule-item
        border-bottom 1px solid #dddddd
        width 10rem
        box-sizing border-box
      .floor-rule-item:nth-child(odd)
        border-right 1px solid #dddddd
</style>
