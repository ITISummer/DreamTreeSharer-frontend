// 模板页面
<template>
  <!--  一个模板的根标签，必须得有 -->
  <div>
    <!--      登录模块-->
    <el-form ref="loginForm" :rules="rules" :model="loginForm" v-show="loginOrReg" class="container">
      <h3 class="login-title">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="false"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input type="text" @keyup.enter="login" v-model="loginForm.captcha" placeholder="点击图片更换验证码"
                  style="width: 250px; margin-right: 5px"></el-input>
        <img :src="captchaUrl" alt="啊我~" style="cursor: pointer" @click="updateCaptcha">
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.checked" class="login-rememberMe">记住我</el-checkbox>
        <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        <el-button type="primary" @click="loginOrReg = false">还没有账号？请注册</el-button>
      </el-form-item>
    </el-form>
    <!--      注册模块-->
    <el-form ref="regForm" :rules="rules" :model="regForm" class="container" v-show="!loginOrReg">
      <h3 class="login-title">用户注册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="regForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="regForm.password" auto-complete="false" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input type="password" v-model="regForm.rePassword" auto-complete="false" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="tel" v-model="regForm.phone" maxLength="11" placeholder="请输入注册手机号"></el-input>
      </el-form-item>
      <el-form-item prop="smsCode">
        <el-input type="text" v-model="regForm.smsCode" @keyup.enter="register" placeholder="请输入验证码..."
                  style="width: 250px; margin-right: 5px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSmsCode" :disabled="!BtnStatus">
          {{ BtnStatus ? '获取验证码' : `${countDownTime}秒后获取` }}
        </el-button>
        <el-button type="primary" @click="register" style="width: 100%">注册</el-button>
        <el-button type="primary" @click="loginOrReg = true">已有账号？请登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import constants from "../../apis/constants";
import validators from "../../apis/validators";

export default {
  /**
   * 当一个 Vue 实例被创建时，它将 data 对象中的所有的
   * property 加入到 Vue 的响应式系统中。
   * 当这些 property 的值发生改变时，
   * 视图将会产生“响应”，即匹配更新为新的值。
   */
  data() { //组件里 data 属性必须是一个函数
    return {
      // 验证码按钮效果相关
      BtnStatus: true,
      countDownTime: 30,
      // 登录还是注册切换指标
      loginOrReg: true,
      // 指定的请求地址和后端地址对应，加上 new Date() 防止获得同样的验证码值
      captchaUrl: `${constants.CAPTCHA}?time=` + new Date(),
      // 登录参数-对应后端 UserModel
      loginForm: {
        username: 'summer',
        password: 'WWW_dts123',
        captcha: '',
        checked: true
      },
      // 注册参数 - 对应后端 RegisterModel
      regForm: {
        username: 'summerlv',
        password: 'WWW_dts123',
        rePassword: 'WWW_dts123',
        phone: '15244812873',
        smsCode: ''
      },
      // 校验规则
      rules: {
        // [ElementUI 的校验函数 validator 的传参与复用](https://blog.csdn.net/qq_42941302/article/details/112799014)
        // [vue+elementUI项目实现自定义校验规则的传参复用性](https://blog.csdn.net/u012443286/article/details/105258443)
        // 这里的 username, password, code 是和表单标签里面对应的，不是 vm 属性
        username: [{validator: validators.checkUsername.bind(this), trigger: 'blur'}],
        password: [{validator: validators.checkPassword, trigger: 'blur'}],
        captcha: [{required: true, message: '请输入图形验证码'}, {len: 4, message: "图形验证码长度应该为4", trigger: 'change'}],
        phone: [{validator: validators.checkMobile, trigger: 'blur'}],
        smsCode: [{required: true, message: '请输入短信验证码'}, {len: 6, message: "短信验证码长度应该为6", trigger: 'change'}],
        rePassword: [{validator: validators.reCheckPassword.bind(this), trigger: 'blur'}],
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
          console.log(valid)
          // resp 为请求后端成功后返回的 json 对象
          // 这里的 this.postRequest 是注册在 Vue 中全局变量 - main.js 中配置的
          this.postRequest(constants.LOGIN, this.loginForm).then(resp => {
            if (resp) {
              if (resp.statusCode === 400) {
                // 如果验证码未通过！
                this.$message.error({message: resp.message})
                return false
              } else {
                this.$message.success({message: resp.message})
              }
              // 存储用户 token 到 session 中
              const tokenStr = resp.object.tokenHead + resp.object.token
              window.sessionStorage.setItem('token', tokenStr)
              // 登录成功后获取并存入用户信息到 state - main.js 中
              // 登录成功后跳转到 home 页面 - 使用 replace 表示不能回退，而使用 push 则可以回退
              console.log('LoginAndRegister.vue-login()-resp', resp)
              /*
              查看此逻辑的话，结合 main.js 中路由导航守卫配置
              页面跳转 - 查询用户输入的路劲，
              如果没有登录则跳转到登录页面让用户登录，
              如果登录成功，则跳转到用户登录前指定的页面
              如果登录失败，则重新跳转到登录页面！
              */
              let path = this.$route.query.redirect
              this.$router.replace((path === constants.ROOT || path == undefined) ? constants.HOME : path)
            }
          })
        } else {
          this.$message.error('啊哦~ 必须正确填写所有字段！');
          return false;
        }
      });
    },

    /**
     * 更新验证码
     */
    updateCaptcha() {
      return this.captchaUrl = `${constants.CAPTCHA}?time=` + new Date()
    },

    /**
     * 用户注册
     */
    register() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          this.postRequest(constants.REGISTER, this.regForm).then(resp => {
            /* 用户注册成功，500ms 后跳转到登陆页面 */
            if (resp) {
              setTimeout(() => {
                this.loginOrReg = true
              }, 500)
            }
          })
        }
      })
    },
    /**
     * 更新手机验证码
     */
    updateSmsCode() {
      this.getRequest(`/get-sms-code/${this.regForm.phone}`).then((resp) => {
        console.log('/get-sms-code', resp)
        if (resp.statusCode === 200) {
          this.$message.success(resp.message + '您的验证码为：' + resp.object)
        } else {
          this.$message.warning(resp.message)
        }
        // 设置按钮倒计时防刷新效果
        let smsCodeEndTime = (new Date()).getTime() + 30000;
        // 将当前时间戳存入 localSotrage
        window.localStorage.setItem('smsCodeEndTime', JSON.stringify(smsCodeEndTime))
        this.cutDownTime(smsCodeEndTime)
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 倒计时
     */
    cutDownTime(smsCodeEndTime) {
      this.BtnStatus = false;
      this.countDownTime = Math.ceil((smsCodeEndTime - (new Date()).getTime()) / 1000)
      let time = setTimeout(() => {
        this.countDownTime--
        if (this.countDownTime < 1) {
          this.BtnStatus = true
          this.countDownTime = 60
          // 将当前时间戳从 localSotrage 移除
          window.localStorage.removeItem('smsCodeEndTime')
          clearTimeout(time)
        } else {
          this.cutDownTime(smsCodeEndTime)
        }
      }, 1000)
    },
  }
}
</script>
<!--
1. 加上与不加 scoped 有很大影响
2. 加 module 与加 scoped 一样，会让格式很乱
-->
<style lang="scss">
.container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
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
