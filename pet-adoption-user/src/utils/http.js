import axios from 'axios'
import router from '@/router/router-static'
import storage from '@/utils/storage'
import { Loading } from 'element-ui';

const http = axios.create({
    timeout: 1000 * 86400,
    withCredentials: true,
    baseURL: '/petadoption',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 创建一个loading实例
let loadingInstance;

// 请求拦截
http.interceptors.request.use(config => {
    loadingInstance  = Loading.service({ 
        lock: true, 
        text: '加载中...', 
        spinner: 'el-icon-loading', 
        background: 'rgba(0, 0, 0, 0)' 
    });
    
    config.headers['Token'] = storage.get('Token') // 请求头带上token
    return config
}, error => {
    loadingInstance.close(); // 请求成功后关闭loading
    return Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(response => {
    loadingInstance.close(); // 请求成功后关闭loading
    if (response.data && response.data.code === 401) { // 401, token失效
        router.push({ name: 'login' })
    }
    return response
}, error => {
    loadingInstance.close(); // 请求成功后关闭loading
    return Promise.reject(error)
})
export default http