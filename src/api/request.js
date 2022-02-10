// 二次封装axios
import axios from 'axios'
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'

// 引入detail的store
import storeDetail from '../store/detail/index'
// 引入user的store
import storeUser from '../store/user/index'

// 创建axios实例
const requests = axios.create({
    // 配置对象

    // 基础路径 接口文档中的路径都带有api，配置baseURL可以让每个请求路径都带上/api
    baseURL:'/api',
    // 请求超时的时间
    timeout:5000
})

// 请求拦截器 发送请求时，会在此之前做一些业务
requests.interceptors.request.use((config) => {
    // config:配置对象 里面有header请求头配置项
    if(storeDetail.state.uuid){
        // 请求头加字段，标识游客身份
        config.headers.userTempId = storeDetail.state.uuid
    }
    // 通过请求头携带token向服务器获取用户信息
    if(storeUser.state.token){
        config.headers.token = storeUser.state.token
    }
    // if(storeUser.state.token)
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
},() => {
    return Promise.reject(new Error('Fail---'))
})

export default requests