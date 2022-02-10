// user(登录与注册)模块store
// 引入接口
import {reqCode,reqUserRegister,reqLogin,reqUserInfo,reqLogout} from '../../api/index'


export default {
    namespaced:true,
    state:{
        code:'',
        // 开始未登录，优先从session中获取，如果没有则为空，如果登陆了，则会获取到token，将其改为获取到的token，并且存入session
        // 刷新后继续从session中获取
        token:sessionStorage.getItem('TOKEN'),
        userInfo:{}
    },
    getters:{
        
    },
    actions:{
        // 获取验证码
        async getCode({commit},phone){
            let result = await reqCode(phone)
            if(result.code === 200){
                commit('GETCODE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('fail---'))
            }
        },
        // 用户注册
        async userRegister({commit},user){
            let result = await reqUserRegister(user)
            if(result.code === 200 ){
                
                return 'ok'
            }else{
                if(result.code === 223){
                    
                    return Promise.reject(new Error('手机号已被注册'))
                }
                if(result.code === 206){
                    return Promise.reject(new Error('f验证码错误'))
                }
                
            }
        },
        // 用户登录(token 令牌)
        async userLogin({commit},data){
            let result = await reqLogin(data)
            if(result.code === 200){
                // 获取到token
                commit('USERLOGIN',result.data.token)
                // 持久化存储token
                sessionStorage.setItem('TOKEN',result.data.token)
                // 清除uuid游客身份
                localStorage.removeItem('UUIDTOKEN')
                return 'ok'
            }else{
                return Promise.reject(new  Error('fail---'))
            }
        },
        // 获取用户信息
        async getUserInfo({commit}){
            let result = await reqUserInfo()
            if(result.code === 200){
                commit('GETUSERINFO',result.data)
                console.log(result)
                return 'ok'
            }else{
                return Promise.reject(new Error('fail---'))
            }
            
        },
        // 退出登录
        async userLogout({commit}){
            let result = await reqLogout()
            if(result.code === 200){
                commit('USERLOGOUT')
                return 'OK'
            }else{
                return Promise.reject(new Error('fail---'))
            }
            
        }
    },
    mutations:{
        // 保存验证码
        GETCODE(state,value){
            state.code = value
        },
        // 保存token
        USERLOGIN(state,value){
            state.token = value
        },
        // 保存用户信息
        GETUSERINFO(state,value){
            state.userInfo = value
        },
        // 清除userInfo,token
        USERLOGOUT(state){
            state.token = ''
            state.userInfo = {}
            sessionStorage.removeItem('TOKEN')
        }
    }
}