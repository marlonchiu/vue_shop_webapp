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
/**
 * 前端交互效果制作
 * 返回登录成功时，给用户一个Toast提示，
 * 并跳转到首页（其实正常应该跳转到个人中心，但是我们还没有制作），
 * 当返回登录失败的时候，要提示用户登录失败，
 * 并把登录按钮重新启用，可以再次登录。
 */
import axios from 'axios'
import storage from 'good-storage'
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
  created () {
    // 判断是否已经登录过
    if (storage.get('userInfo')) {
      Toast.success('您已经登录！')
      this.$router.push('/')
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
        // 如果返回code为200，代表登录成功，我们给用户作Toast提示
        // response.data.message 成功返回的匹配正确 true
        if (response.data.code === 200 && response.data.message) {
          // 登录成功先保存登录信息
          new Promise((resolve, reject) => {
            let userInfo = {
              userName: this.userName
            }
            storage.set('userInfo', userInfo)
            setTimeout(() => { resolve() }, 200)
          }).then(() => {
            Toast.success('登录成功')
            this.$router.push('/')
          }).catch(err => {
            Toast.fail('登录状态保存失败')
            console.log(err)
          })
        } else {
          // console.log(response.data.message)
          Toast.fail('登录失败')
          this.openLoading = false
        }
      }).catch((error) => {
        console.log(error)
        Toast.fail('登录失败')
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
