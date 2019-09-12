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
      <div class="register-button">
        <van-button type="primary" size="large"
        :loading="openLoading"
        @click="registerAction">马上注册</van-button>
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
      password: '',
      openLoading: false, // 是否开启用户的Loading
      userNameErrorMsg: '', // 当用户名出现错误的时候
      passwordErrorMsg: '' // 当密码出现错误的时候
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    registerAction () {
      this.checkForm() && this.submitRegisterUser()
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
    submitRegisterUser () {
      this.openLoading = true
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
