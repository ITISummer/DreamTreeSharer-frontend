/**
 * ES6 统一暴露
 */
export default {
    /*----------------------------LoginAndRegister.vue-------------------------*/
    // '/'
    ROOT: '/',
    // '/login'
    LOGIN: '/login',
    // '/register'
    REGISTER: '/register',
    // '/captcha'
    CAPTCHA: '/captcha',
    // '/home'
    HOME: '/home',
    // '/username-existed'
    USERNAME_EXISTED: '/username-existed',
    // '/get-sms-code'
    GET_SMS_CODE: '/get-sms-code',
    // password regular expression
    // 密码至少包含大写字母，小写字母，数字，且不少于8位
    REG_OF_PWD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    // 用户名必须是6-10位之间的字母、下划线、@、. ||||| 并且不能以数字开头
    REG_OF_USERNAME: /^[A-Za-z_@.]{6,10}$/,
    /*----------------------------main.js-------------------------*/
    // '/get-current-user-info'
    GET_CURRENT_USER_INFO: '/get-current-user-info',
    /*----------------------------Header.vue-------------------------*/
    // '/logout'
    LOGOUT: '/logout',
    // '/chat'
    CHAT: '/chat',
    /*----------------------------AccountSetting.vue-------------------------*/
    // '/qiniu/uploadToken'
    GET_QINIU_TOKEN_URL: '/qiniu/uploadToken',
    // 验证邮箱的正则表达式
    REG_OF_EMAIL: /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
    REG_OF_MOBILE: /^1[3456789]\d{9}$/,
}