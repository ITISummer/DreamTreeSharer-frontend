import axios from "axios";
import {Message} from "element-ui";
import router from "../router";

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    // 如果存在 token，后台未放行的请求都得携带这个 token 才能访问
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
    }
    return config
}, error => {
    console.log(error)
})
/**
 * 响应拦截器-拦截后台返回的数据
 */
axios.interceptors.response.use(success => {
    if (success.status && success.status === 200) {
        if (success.data.statusCode === 500 || success.data.statusCode === 401 || success.data.statusCode === 403) {
            Message.error({message: success.data.message})
            return
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
    }
    // 返回数据给前端
    return success.data
}, error => {
    if (error.response.statusCode === 504 || error.response.statusCode === 404) {
        Message.error({message:'服务器掉线啦！( ╯□╰ )'})
    } else if (error.response.statusCode === 403) {
        Message.error({message:'权限不足，请联系管理员！'})
    } else if (error.response.statusCode === 401) {
        Message.error({message:'尚未登录，请先登录！'})
        router.replace('/')
    } else {
        if (error.response.data.message) {
            Message.error({message:error.response.data.message})
        } else {
            Message.error({message:'未知错误！'})
        }
    }

})

/**
 * 前缀 url
 */
// const baseURL = '/api'
const baseURL = ''
/**
 * 发送一个 axios 异步 post 请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const postRequest = (url,params) => {
    return axios({
        method: 'post',
        url: `${baseURL}${url}`,
        data: params
    })
}

/**
 * 发送一个 axios 异步 delete 请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const deleteRequest = (url,params) => {
    return axios({
        method: 'delete',
        url: `${baseURL}${url}`,
        data: params
    })
}
/**
 * 发送一个 axios 异步 put 请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const putRequest = (url,params) => {
    return axios({
        method: 'put',
        url: `${baseURL}${url}`,
        data: params
    })
}
/**
 * 发送一个 axios 异步 get 请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const getRequest = (url,params) => {
    return axios({
        method: 'get',
        url: `${baseURL}${url}`,
        data: params
    })
}
