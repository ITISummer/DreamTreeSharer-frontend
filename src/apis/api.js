import axios from "axios";
import {Message} from "element-ui";
import router from "../router";
import requests from "./constants";
import { Loading } from 'element-ui';
import Vue from 'vue'

let loadingInstance;
let source = axios.CancelToken.source();
// 请求次数
let loadingRequestCount = 0;
// [vue axios封装和公共全局loading配置 合并loading请求效果 避免重复请求]
// (https://blog.csdn.net/weixin_45115705/article/details/99672365)
/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    config.cancelToken = source.token // 取消请求
    if(config.cancelToken && config.cancelObj && config.cancelObj.cancel) {
        config.cancelObj.cancel('中断请求');
        delete config.cancelObj;
    }
    if (!navigator.onLine) { // 断网提示
        source.cancel('网络故障，请检查!')
    }
    console.log('api.js->axios.interceptors.request.use()')
    // 请求拦截进来调用显示loading效果
    showLoading(config)
    // 配置了store持久化的就不需要取 sessionStorage 的了
    // const token = store.state.token || sessionStorage.getItem('token');
    const token = window.sessionStorage.getItem('token');
    // 如果存在 token，后台未放行的请求都得携带这个 token 才能访问
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, error => {console.log(error)})

/**
 * 响应拦截器-拦截后台返回的数据
 */
axios.interceptors.response.use(resp => {
    // // 处理 token - 应该写在登录中！
    // if (resp.headers.token) {//保存token
    //     store.commit('SET_TOKEN', resp.headers.token);
    //     // 同理配置了store持久化的就不需要localstorage的了
    //     localStorage.setItem("token", resp.data.token);
    // }

    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，
    // 避免多次请求loading关闭又开启
    // 合并loading请求效果 避免重复请求

    console.log('api.js->axios.interceptors.response.use()')
    setTimeout(() => {
        hideLoading()
    }, 500);

    if (resp.status && resp.status === 200) {
        if (resp.data.statusCode === 200) {
            Message.success({message: resp.data.message})
            // 返回数据给前端
            return resp.data
        } else {
            Message.warning({message: resp.data.message})
            return false
        }
    }
}, error => {
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，
    // 避免多次请求loading关闭又开启合并loading请求效果 避免重复请求
    setTimeout(() => {
        hideLoading()
    }, 200);
    // error.response.data.status
    console.log(error)
    const statusCode = error.response.statusCode;
    if (statusCode === 504 || statusCode === 404) {
        Message.error({message:'服务器掉线啦！( ╯□╰ )|或者您请求的页面不存在咯！'})
    } else if (statusCode === 403) {
        Message.error({message:'权限不足，请联系管理员！'})
    } else if (statusCode === 401) {
        Message.error({message:'尚未登录，请先登录！'})
        router.replace(requests.ROOT).then(r => true)
    } else {
        if (error.response.data.message) {
            Message.error({message:error.response.data.message})
        } else {
            Message.error({message:'未知错误！'})
        }
    }

})
/**
 * 显示loading的函数 并且记录请求次数 ++
 */
const showLoading = () => {
    if (loadingRequestCount === 0) {
        // element的服务方式 target 我这边取的是表单 项目是后台系统 每个页面都有表单 类似整个表单loading
        // 和在表单配置v-loading一样的效果，这么做是全局实现了，不用每个页面单独去v-loading
        loadingInstance = Loading.service({ target: '.el-form'});
    }
    loadingRequestCount++
}

/**
 * 隐藏loading的函数，并且记录请求次数
 */
const hideLoading = () => {
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingRequestCount === 0) {
        Vue.nextTick(()=>{//以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
        });
    }
}
/*===============================================================================*/
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
