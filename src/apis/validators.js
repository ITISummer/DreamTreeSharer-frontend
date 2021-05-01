import constants from "./constants";
import * as requestApi from "./api";


/**
 * 验证邮箱格式
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
const checkEmail = function (rule, value, callback){
    if (!value) {
        return callback(new Error('请输入邮箱！'));
    } else if (!constants.REG_OF_EMAIL.test(value)) {
        callback(new Error('邮箱格式不匹配！'));
    }
    // callback() 一定要调用！
    callback();
};

/**
 * 验证手机格式
 */
const checkMobile = function (rule, value, callback){
    if (!value) {
        return callback(new Error('请输入手机号！'));
    } else if (!constants.REG_OF_MOBILE.test(value)) {
        callback(new Error('手机号格式不匹配！'));
    }
    callback();
};

/**
 * 验证输入的密码格式
 */
const checkPassword = function (rule, value, callback) {
    if (!value) {
        callback(new Error('请输入密码！'));
    } else if (!constants.REG_OF_PWD.test(value)) {
        callback(new Error('密码至少包含大写字母，小写字母，数字，且不少于8位！'))
    }
    callback();
}
/**
 * 验证是否与以上密码相同
 * [javascript，检测对象中是否存在某个属性](https://www.cnblogs.com/kongxianghai/archive/2013/04/12/3015803.html)
 */
const reCheckPassword = function (rule, value, callback) {
    if (this.hasOwnProperty("regForm") ) {
        if (value !== this.regForm.password ) {
            callback(new Error('输入的密码与以上密码不相同！'));
        }
    }
    if (this.hasOwnProperty("updateForm") ) {
        if (value !== this.updateForm.password ) {
            callback(new Error('输入的密码与以上密码不相同！'));
        }
    }
    callback();
}
/**
 * 验证输入的用户名格式
 * [axios使用及配置明细小记](https://blog.csdn.net/u014225733/article/details/98722635)
 */
const checkUsername = function (rule, value, callback){
    // 移除前后所有空格
    value = value.trim()
    if (!value) {
        callback(new Error('请输入用户名！'));
    } else if (!constants.REG_OF_USERNAME.test(value)) {
        callback(new Error('用户名必须是6-10位之间的字母、下划线、@、. 并且不能以数字开头！'))
    } else if (!this.loginOrReg){ // 如果是注册表单用户名验证，才往后台发送用户名是否重复验证请求
    // 发送请求到后端验证是否用户名已存在！
    requestApi.getRequest(`${constants.USERNAME_EXISTED}/${value}`).then(resp => {
        console.log(resp)
    }).catch(error => {
        console.log(error)
        })
    }
    callback()
}

export default {
    checkEmail,
    checkMobile,
    checkPassword,
    checkUsername,
    reCheckPassword,
}