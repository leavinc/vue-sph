// 二次封装axios
import axios from 'axios'

// 创建axios实例
const mockRequests = axios.create({
    // 配置对象

    // 基础路径 接口文档中的路径都带有mock，配置baseURL可以让每个请求路径都带上/mock
    baseURL:'/mock',
    // 请求超时的时间
    timeout:5000
})

// 请求拦截器 发送请求时，会在此之前做一些业务
mockRequests.interceptors.request.use((config) => {
    // config:配置对象 里面有header请求头配置项
    return config
})

// 响应拦截器
mockRequests.interceptors.response.use((res) => {
    return res.data
},() => {
    return Promise.reject(new Error('Fail---'))
})

export default mockRequests