import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'
// 使用插件
Vue.use(VueRouter)

// 防止重复点击报错    Avoided redundant navigation to current location
// 编程式导航才会出现此类问题，当我们多次点击跳转同一路由，会触发NavigationDuplicated
// 因为push|replace函数返回的是一个promise，它需要一个成功的回调和一个失败的回调，我们通过其原型，为其添加 

// push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    // call|apply 
    //      相同点：都可以调用一次函数并且可以修改函数的上下文一次
    //      不同点，call传递参数用逗号隔开，apply传递参数用数组
    return originalPush.call(this, location).catch(err => err)
}

// replace
//  location 我们调用方法传递的路由对象
//  resolve 成功的回调
//  replace 失败的回调
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location,resolve,reject){
    if(resolve && reject){
        originalReplace.call(this,location,resolve,reject)
    }else{
        originalReplace.call(this,()=>{},()=>{}) 
    }
}
// 配置路由
const router = new VueRouter({
    routes,
    // 控制路由跳转后的滚动条位置 x为横向  y为纵向
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
      }
})

// 全局前置路由守卫
router.beforeEach(async (to,from,next) => {
    // 存储用户信息的name属性
    let userName = store.state.user.userInfo.name
    // 判断是否登录
    if(sessionStorage.getItem('TOKEN')){
        
        if(to.path === '/home'){
            next()
        }else{
            // 判断用户信息是否存在
            if(userName){
                next()
            }else{
                // 不存在用户信息
                try {
                    // 发送请求获取用户信息
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // token失效获取不到用户信息
                    alert('用户身份过期，请重新登录！')
                    // 退出登录
                    await store.dispatch('user/userLogout')
                    // 重新登陆
                    next('/login')

                }
            }
        }
    }else{
        next()
    }
})

export default router