<template>
  <div class="login-page">
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="login-panel">
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="userNameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="login-button">
        <van-button type="primary" size="large"
        :loading="openLoading"
        @click="loginAction">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/api/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      openLoading: false, // 是否开启用户登录的Loading
      userNameErrorMsg: '', // 当用户名出现错误的时候
      passwordErrorMsg: '' // 当密码出现错误的时候
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    loginAction () {
      this.checkForm() && this.axiosLoginUser()
    },
    // 提交信息表单验证
    checkForm () {
      let isOk = true
      if (this.userName.length < 5) {
        this.userNameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.userNameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    axiosLoginUser () {
      // 先把按钮进行loading状态，防止重复提交
      this.openLoading = true
      axios({
        method: 'post',
        url: url.login,
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then((response) => {
        console.log(response)
        // 如果返回code为200，代表注册成功，我们给用户作Toast提示
        if (response.data.code === 200) {
          // Toast.success('注册成功')
          Toast.success(response.data.message)
          this.$router.push('/')
        } else {
          // console.log(response.data.message)
          Toast.fail('注册失败')
          this.openLoading = false
        }
      }).catch((error) => {
        console.log(error)
        Toast.fail('注册失败')
        this.openLoading = false
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-page
  background #ffffff
  .login-panel
    width 96%
    border-radius  5px
    margin 20px auto
    padding-bottom 50px
    .login-button
      padding-top 10px
</style>
