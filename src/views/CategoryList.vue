<template>
  <div class="category-list-page">
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div class="category-list-content">
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index, item.ID)"
                :class="{ categoryActive: categoryIndex === index}"
                v-for="(item, index) in category" :key="index">
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodsList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div class="list-item-name">{{item.NAME}}</div>
                    <div class="list-item-price">￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/api/serviceAPI.config.js'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'CategoryList',
  data () {
    return {
      category: [], // 商品大类信息
      categoryIndex: 0, // 大类激活选择
      categorySub: [], // 商品小类信息
      active: 0, // 激活标签的值
      loading: false, // 上拉加载使用
      finished: false, // 下拉加载是否没有数据了
      isRefresh: false, // 下拉加载
      page: 1, // 商品列表的页数
      goodsList: [], // 商品信息
      categorySubId: '', // 商品子分类ID
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"' // 错误图片显示路径
    }
  },
  created () {
    this.getCategory()
    console.log(this.errorImg)
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    // 获取商品大类信息
    getCategory () {
      axios({
        url: url.getCategoryList,
        method: 'get'
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.message) {
          this.category = response.data.message
          this.getCategorySubByCategoryId(this.category[0].ID)
        } else {
          Toast('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 根据大类ID读取小类类别列表
    getCategorySubByCategoryId (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {
          categoryId
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.message) {
          this.categorySub = response.data.message
          // 切换大类 ID
          this.active = 0
          this.categorySubId = this.categorySub[0].ID
          this.onLoad()
        } else {
          Toast('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取商品列表
    getGoodsList (categorySubId, page) {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId,
          page
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.message.length) {
          this.page++
          this.goodsList = this.goodsList.concat(response.data.message)
        } else {
          this.finished = true
        }
        this.loading = false
        // console.log(this.finished)
      }).catch(error => {
        console.log(error)
      })
    },
    // 点击大类的方法
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      // 大类切换数据初始化
      this.goodsList = []
      this.finished = false
      this.page = 1
      this.getCategorySubByCategoryId(categoryId)
    },
    // 点击子类获取商品信息
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      // console.log(this.categorySubId)
      // 切换时候的操作
      this.goodsList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    // 用于实现上拉加载
    onLoad () {
      // console.log('上滑加载更多')
      setTimeout(() => {
        // 子类ID
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodsList(this.categorySubId, this.page)
        // for(let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1)
        // }
        // // 加载状态结束
        // this.loading = false
        // if(this.list.length >= 40) {
        //   this.finished = true
        // }
      }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodsList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    goGoodsInfo (id) {
      this.$router.push({
        name: 'Goods',
        params: {
          goodsId: id
        }
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
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
