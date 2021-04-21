import {postRequest} from "./api";

/**
 * 用户登录
 * @param requestUrl
 * @param loginForm
 * @param loading
 */
export const login = (requestUrl='', loginForm={}) => {
    // 这里的 this.postRequest 是注册在 Vue 中全局变量 - main.js 中配置的
    postRequest(requestUrl, loginForm).then(resp => {
        if (resp) { // resp-后端返回的对象
            console.log(resp)
            // 存储用户 token 到 session 中
            const tokenStr = resp.object.tokenHead + resp.object.token
            window.sessionStorage.setItem('token', tokenStr)
        }
    })
}