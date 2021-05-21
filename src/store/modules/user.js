import {INIT_USERINFO} from "../mutation-types";

const state = {
    /** 当前登录用户 */
    userInfo: {},
}

const mutations = {
    /**存入用户信息*/
    [INIT_USERINFO](state, data) {
        state.userInfo = data
    },
    /** 更新用户头像 */
    UPDATE_USER_AVATAR(state, data) {
        state.userInfo.userAvatarUrl = data
    },
    /** 更新用户邮箱或者手机号 */
    UPDATE_EMAIL_OR_MOBILE(state,data){
        if (data.flag === 'email'){
            state.userInfo.email = data.value
        } else if (data.flag === 'mobile'){
            state.userInfo.mobile = data.value
        }
    },
}

const actions = {
    /** 更新用户头像 */
    updateUserAvatar(context, data) {
        context.commit('UPDATE_USER_AVATAR', data)
    },
    updateEmailOrMobile(context, data) {
        context.commit('UPDATE_EMAIL_OR_MOBILE',data)
    },
    /**初始化用户信息*/
    initUserInfo(context, data) {
        context.commit('INIT_USERINFO', data)
    },
}


const getters = {
    // 在 vue 组件中取值时使用 this.$store.getUserInfo.xxx(userInfo 中属性值)
    getUserInfo(state) {
        return state.userInfo
    }
}

export default {
    state,
    mutations,
    actions,
    getters
};
