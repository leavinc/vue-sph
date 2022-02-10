// 引入路由组件
// import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'

// 二级路由
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'
// 路由配置
export default [
    // 主页
    {
        path:'/home',
        name:'home',
        // 路由懒加载，将其变为一个回调函数，需要该路由时，再去加载
        component:() => import('../pages/Home'),
        meta:{
            // 控制Footer显示与隐藏
            showFooter:true
        }
    },
    // 登录
    {
        path:'/login',
        component:Login,
        meta:{
            // 控制Footer显示与隐藏
            showFooter:false,
            
        },
        // 独享前置守卫
        // 判断是否登录
        beforeEnter: (to, from, next) => {
            if(!sessionStorage.getItem('TOKEN')){
                next()
            }else{
                alert('无法重新登录!')
                next('/home' )
            }
            
        }
        
     },
    //  注册
     {
         path:'/register',
         component:Register,
         meta:{
            // 控制Footer显示与隐藏
            showFooter:false
        }
         
     },
    //  商品列表
     {
         path:'/search/:keyword?',
         name:'search',
         component:Search,
         meta:{
            // 控制Footer显示与隐藏
            showFooter:true
        },
     },
    //  商品细节
     {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{
            showFooter:true
        }
     },
    //  成功加入购物车
     {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{
            showFooter:true
        }
     },
    //  购物车
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{
            showFooter:true
        },
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem('TOKEN')){
                next()
            }else{
                alert('登录之后查看购物车!')
                // 传递登陆之前所要去的页面
                next('/login?redirect='+to.path)
            }
        },
    },
    // 结算
    {
        path:'/trade',
        component:Trade,
        meta:{
            showFooter:true
        },
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem('TOKEN')){
                if(from.path === '/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }else{
                alert('请先登录!')
                
            }
        }
    },
    // 支付
    {
        path:'/pay',
        component:Pay,
        meta:{
            showFooter:true
        },
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem('TOKEN')){
                if(from.path === '/trade'){
                    next()
                }else{
                    next(false)
                }
            }else{
                alert('请先登录!')
                
            }
        }
    },
    // 支付成功
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{
            showFooter:true
        },
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem('TOKEN')){
                if(from.path === '/pay'){
                    next()
                }else{
                    next(false)
                }
            }else{
                alert('请先登录!')
                
            }
        }
    },
    // 查看订单
    {
        path:'/center',
        component:Center,
        meta:{
            showFooter:true
        },
        beforeEnter: (to, from, next) => {
            
            if(sessionStorage.getItem('TOKEN')){
                next()
            }else{
                alert('登录之后查看订单!')
                // 传递登陆之前所要去的页面
                next('/login?redirect='+to.path)
            }
        },
        redirect:'/center/myorder',
        children:[
            // 个人订单
            {
                path:'myorder',
                component:MyOrder
            },
            // 团购订单
            {
                path:'grouporder',
                component:GroupOrder
            }
        ]
    },
    //  重定向
    {
        path:'*',
        redirect:'/home'
    }
]