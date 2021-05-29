import axios from "axios";
import {Message} from "element-ui";
import router from "../router";
import requests from "./constants";
import {Loading} from 'element-ui';
import Vue from 'vue'
import constants from "./constants";

/*===========================变量===============================*/
let loadingInstance;
let source = axios.CancelToken.source();
let loadingRequestCount = 0;

/*==============================axios 请求与响应拦截器==================================*/
// [vue axios封装和公共全局loading配置 合并loading请求效果 避免重复请求]
// (https://blog.csdn.net/weixin_45115705/article/details/99672365)
/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    // 取消请求
    config.cancelToken = source.token
    if (config.cancelToken && config.cancelObj && config.cancelObj.cancel) {
        config.cancelObj.cancel('中断请求');
        delete config.cancelObj;
    }
    // 断网提示
    if (!navigator.onLine) {
        source.cancel('网络故障，请检查!')
    }
    // 配置了store持久化的就不需要取 sessionStorage 的了
    const token = window.sessionStorage.getItem('token');
    // 如果存在 token，后台未放行的请求都得携带这个 token 才能访问
    // 这里的请求头 Authorization 对应后端配置的请求头 key
    if (token) {
        config.headers['Authorization'] = token
    }
    // 请求拦截进来调用显示loading效果
    showLoading(config)
    console.log('api.js->axios.interceptors.request.use()->config')
    return config
}, err => {
    console.log('api.js->axios.interceptors.request.use()->err',err)
})

/**
 * 响应拦截器-拦截后台返回的数据
 */
axios.interceptors.response.use(resp => {
    console.log('api.js->axios.interceptors.response.use() -> resp')
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，
    // 避免多次请求loading关闭又开启
    // 合并loading请求效果 避免重复请求
    setTimeout(() => {
        hideLoading()
    }, 500);

    if (resp.status === 200 && resp.data) {
        if (resp.data.statusCode === 200) {
            if (resp.data.message) {
                Message.success({message: resp.data.message})
            }
            // 返回数据给前端
            return resp.data
        } else {
            // 后台返回 401-用户尚未登录，并且当前 sessionStorage 中存在失效的 token，则跳转到登录页面
            if (resp.data.statusCode === 401 && sessionStorage.getItem('token')) {
                sessionStorage.removeItem('token')
                // 跳转到登录页面
                router.replace(constants.ROOT)
            }
            Message.warning({message: resp.data.message})
            return false
        }
    }
}, err => {
    // 后端接口都访问不了的情况
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，
    // 避免多次请求loading关闭又开启合并loading请求效果 避免重复请求
    setTimeout(() => {
        hideLoading()
    }, 500);

    const code = err.response.code;
    if (code === 504 || code === 500) {
        Message.error({message: '服务器宕机，你可敢信？'})
    } else if (code === 403) {
        Message.error({message: '权限不足呢！'})
    } else if (code === 401) {
        Message.error({message: '请登录先喂！'})
        router.replace(constants.ROOT)
    } else {
        if (err.response.data.message) {
            Message.error({message: err.response.data.message})
        } else {
            Message.error({message: '未知错误！'})
        }
    }
    console.log('api.js->axios.interceptors.response.use() => err',err)
    return;
})
/**
 * 显示loading的函数 并且记录请求次数 ++
 */
const showLoading = () => {
    if (loadingRequestCount === 0) {
        // element的服务方式 target 我这边取的是表单 项目是后台系统 每个页面都有表单 类似整个表单loading
        // 和在表单配置v-loading一样的效果，这么做是全局实现了，不用每个页面单独去v-loading
        loadingInstance = Loading.service({target: '.el-form'});
    }
    loadingRequestCount++
    console.log(loadingRequestCount)
}
/**
 * 隐藏loading的函数，并且记录请求次数
 */
const hideLoading = () => {
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingRequestCount === 0) {
        Vue.nextTick(() => {//以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
        });
    }
}
/*===============================axios 请求公共方法===========================*/
/**
 * 前缀 url
 */
const baseURL = ''
/**
 * 发送一个 axios 异步 get 请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${baseURL}${url}`,
        data: params
    })
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${baseURL}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${baseURL}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${baseURL}${url}`,
        data: params
    })
}
