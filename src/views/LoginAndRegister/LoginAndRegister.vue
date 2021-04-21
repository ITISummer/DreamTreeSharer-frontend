// 模板页面
<template>
<!--  // 一个模板的根标签，必须得有-->
    <div>
<!--      // 登录模块-->
      <el-form ref="loginForm" class="login-container" :rules="rules" :model="loginForm"  v-show="on"
      >
          <h3 class="login-title">用户登录</h3>
          <el-form-item prop="username">
              <el-input type="text"  placeholder="请输入用户名" auto-complete="false" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" auto-complete="false" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
              <el-input type="text" placeholder="点击图片更换验证码" auto-complete="false" @keyup.enter="login" v-model="loginForm.captcha" style="width: 250px; margin-right: 5px"></el-input>
              <img :src="captchaUrl" alt="啊我~" style="cursor: pointer" @click="updateCaptcha">
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="loginForm.checked" class="login-rememberMe">记住我</el-checkbox>
              <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
              <el-button type="primary" @click="on=false">还没有账号？请注册</el-button>
          </el-form-item>
        </el-form>
<!--      // 注册模块-->
      <el-form :rules="rules" ref="regForm" :model="regForm" class="login-container" v-show="!on">
        <h3 class="login-title">用户注册</h3>
        <el-form-item prop="username">
          <el-input type="text" auto-complete="false" v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" auto-complete="false" v-model="regForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input type="password" auto-complete="false" v-model="regForm.rePassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input type="tel" auto-complete="false" maxLength="11" v-model="regForm.phone" placeholder="请输入注册手机号"></el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <el-input type="text" auto-complete="false" @keyup.enter="register" v-model="regForm.smsCode" placeholder="请输入验证码..." style="width: 250px; margin-right: 5px"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary">获取验证码</el-button>
        <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
        <el-button type="primary" @click="on=true">已有账号？请登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<!--// 脚本-->
<script>

import requests from "../../apis/requests";
import * as LoginAndRegister from '../../apis/LoginAndRegister'

export default {
  /**
   * 当一个 Vue 实例被创建时，它将 data 对象中的所有的
   * property 加入到 Vue 的响应式系统中。
   * 当这些 property 的值发生改变时，
   * 视图将会产生“响应”，即匹配更新为新的值。
   */
    data() { //组件里 data 属性必须是一个函数
      /**
       * 验证输入的密码格式
       * @param rule
       * @param value
       * @param callback
       */
      const checkPassword = (rule, value, callback) => {
        // 密码至少包含大写字母，小写字母，数字，且不少于8位
        const regOfPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else if (!regOfPwd.test(value)) {
          callback(new Error('密码至少包含大写字母，小写字母，数字，且不少于8位！'))
        } else {
          callback();
        }
      }
      return{
        // // 设置是否有 loading 效果(element-ui) 点击登录按钮时则设置为 true
        // loading: false,
        // 登录还是注册切换指标
        on: true,
        // 指定的请求地址和后端地址对应，加上 new Date() 防止获得同样的验证码值
        captchaUrl: `${requests.CAPTCHA}?time=`+new Date(),
        // 登录参数-对应后端 LoginModel
        loginForm: {
          username: 'summer',
          password: 'WWW_dts123',
          captcha: '',
          checked: true
        },
        // 注册参数
        regForm: {
          username: 'summer',
          password: 'WWW_dts123',
          rePassword: 'summer',
          phone: '15244812873',
          smsCode: ''
        },
        // 校验规则
        rules: {
          // 这里的 username, password, code 是和表单标签里面对应的，不是 vm 属性
          username: [
            {required: true,message: '请输入用户名', trigger:'blur'},
            {min: 6,max: 18,message: '用户名长度应该在6-18字符内', trigger: 'change'}],
          password: [{ validator: checkPassword, trigger: 'blur' }],
          captcha: [
            {required: true,message: '请输入图形验证码', trigger:'blur'},
            {len: 4, message: "图形验证码长度应该为4", trigger: 'change'}],
          rePassword: [{required: true,message: '请确认密码', trigger:'blur'}],
          phone: [
            {required: true,message: '请输入手机号', trigger:'blur'},
            {len: 11, message: '手机号长度应该为 11 位', trigger: 'change'}],
          smsCode: [
            {required: true,message: '请输入短信验证码', trigger:'blur'},
            {len: 4, message: "短信验证码长度应该为6", trigger: 'change'}],
        },
        }
    },

  methods: {
    /**
     * 用户登录
     */
    login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // resp 为请求后端成功后返回的 json 对象
            // this.loading = true
            // 这里的 this.postRequest 是注册在 Vue 中全局变量 - main.js 中配置的
            this.postRequest(requests.LOGIN, this.loginForm).then(resp => {
              if (resp) {
                console.log('---------',resp)
                if (resp.statusCode === 400) {
                  // 如果验证码未通过！
                  this.$message.error({message: resp.message})
                  return
                } else {
                  this.$message.success({message: resp.message})
                }
                // this.loading = false
                // 存储用户 token 到 session 中
                const tokenStr = resp.object.tokenHead+resp.object.token
                window.sessionStorage.setItem('token', tokenStr)
                // 登录成功后获取并存入用户信息到 state - TODO
                // 登录成功后跳转到 home 页面 - 使用 replace 表示不能回退，而使用 push 则可以回退
                this.$router.replace(requests.HOME)
              }
            })
          } else {
            this.$message.error('啊哦~ 必须正确填写所有字段！');
            return false;
          }
        });
    },
    /**
     * 用户注册
     */
    register() {

    },
    /**
     * 更新验证码
     */
    updateCaptcha() {return this.captchaUrl = `${requests.CAPTCHA}?time=`+new Date()}
  }
}
</script>
<!--// 样式添加处-->

<!--
1. 加上与不加 scoped 有很大影响
2. 加 module 与加 scoped 一样，会让格式很乱
-->
<style lang="scss">
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
}
.login-rememberMe {
  text-align: left;
  margin: 0 0 15px 0;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
