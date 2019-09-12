<template>
  <div class="register-page">
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div class="register-button">
        <van-button type="primary" size="large"
        @click="submitRegisterUser">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/api/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    submitRegisterUser () {
      axios({
        method: 'post',
        url: url.registerUser,
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then((response) => {
        console.log(response)
        // 如果返回code为200，代表注册成功，我们给用户作Toast提示
        if (response.data.code === 200) {
          Toast.success('注册成功')
        } else {
          // console.log(response.data.message)
          Toast.fail('注册失败')
        }
      }).catch((error) => {
        console.log(error)
        Toast.fail('注册失败')
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.register-page
  background #ffffff
  .register-panel
    width 96%
    border-radius  5px
    margin 20px auto
    padding-bottom 50px
    .register-button
      padding-top 10px
</style>
