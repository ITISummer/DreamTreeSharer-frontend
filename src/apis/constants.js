/**
 * ES6 统一暴露
 */
export default {
    /*----------------------------Regular Expression-------------------------*/
    // 验证邮箱的正则表达式 [书写一个用于验证邮箱的正则表达式](https://juejin.cn/post/6844903795386744845)
    REG_OF_EMAIL: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
    // 手机号正则匹配表达式
    REG_OF_MOBILE: /^1[3456789]\d{9}$/,
    // 密码至少包含大写字母，小写字母，数字，且不少于8位
    REG_OF_PWD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    // 用户名必须是6-10位之间的字母、下划线、@、. ||||| 并且不能以数字开头
    REG_OF_USERNAME: /^[A-Za-z_@.]{6,10}$/,
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
    /*----------------------------main.js-------------------------*/
    // '/get-current-current-user-info'
    GET_CURRENT_USER_INFO: '/get-current-user-info',
    /*----------------------------Header.vue-------------------------*/
    // '/logout'
    LOGOUT: '/logout',
    // '/chat'
    CHAT: '/chat',
    /*----------------------------AccountSetting.vue-------------------------*/
    // '/qiniu/uploadToken'
    GET_QINIU_TOKEN_URL: '/qiniu/uploadToken',
    // '/update-pwd'
    UPDATE_PWD: '/update-pwd',
    // '/update-email-or-mobile'
    UPDATE_EMAIL_OR_MOBILE: '/update-email-or-mobile',
    // '/get-code'
    GET_CODE: '/get-code',
    // '/update-avatar-url'
    UPDATE_AVATAR_URL: '/update-avatar-url',
    /*----------------------------Comments.vue-------------------------*/
    // '/get-comments'
    GET_COMMENTS: '/get-comments',
    // '/update-like-num'
    UPDATE_LIKE_NUM: '/update-like-num',
    // '/add-one-comment'
    ADD_ONE_COMMENT: '/add-one-comment',
    /*-----------------------------------------------------*/
    qiniu: {
        qiniuData: {key: "", token: ""},
        // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
        uploadQiniuUrl: "http://upload-z1.qiniup.com",
        // 七牛云返回储存图片的子域名
        //华南 -  uploadQiniuAddr: "qrne6et6u.hn-bkt.clouddn.com/",
        uploadQiniuAddr: "http://qt72k9qhl.hb-bkt.clouddn.com/"
    },
    /*----------------------------DiaglogRight.vue-------------------------*/
    // 'yyyy-MM-DD HH:mm:ss'
    TIME_FORMATTER: 'yyyy-MM-DD HH:mm:ss',
    // '/add-one-pinboard'
    ADD_ONE_PIN: '/add-one-pinboard',
    // '/update-pinboard'
    UPDATE_PIN: '/update-pinboard',
    /*----------------------------Card.vue-------------------------*/
    GET_CHAT_LIST: '/get-chat-list',
    /*----------------------------UserText.vue-------------------------*/
    WS_CHAT: '/ws/chat',
    /*----------------------------Home.vue-------------------------*/
    GET_SHARABLE_PIN: '/get-sharable-pin',
    /*----------------------------Pinboards.vue-------------------------*/
    // '/get-pinboards'
    GET_PINS: '/get-pinboards',
    // '/delete-one-pinboard'
    DEL_ONE_PIN: '/delete-one-pinboard',
    /*----------------------------Favorites.vue-------------------------*/
    // '/get-favorites'
    GET_FAVORITES: '/get-favorites',
    /*----------------------------Pagination.vue-------------------------*/
    // '/fuzzy-search'
    FUZZY_SEARCH: '/fuzzy-search',
    /*----------------------------WaterfallMain.vue-------------------------*/
    // '/update-pin-like-num'
    UPDATE_PIN_LIKE_NUM: '/update-pin-like-num',
    // '/favorite-one-pin'
    FAVORITE_ONE_PIN: '/favorite-one-pin',
    /*----------------------------Profile.vue-------------------------*/
    GET_USER_INFO: '/get-user-info'
}
