// API接口统一管理
//  引入三级列表axios
import requests  from "./request";
// 引入首页轮播图axios
import mockRequests from './mockAjax'

// 三级联动接口 
//      /api/product/getBaseCategoryList  GET  无参数

export const reqCategoryList = () => {
    // 发请求  返回promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

// Search组件搜索数据
//      /api/list  POST  参数 {
                        //   "category3Id": "61",
                        //   "categoryName": "手机",
                        //   "keyword": "小米",
                        //   "order": "1:desc",
                        //   "pageNo": 1,
                        //   "pageSize": 10,
                        //   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
                        //   "trademark": "4:小米"
                        // }
export const reqSearchInfo = (params) => {
    return requests({
        url:'/list',
        method:'post',
        // data至少是一个空对象
        data:params
    })
}


// 首页轮播图接口
// mock假数据
export const reqBannerList = () => {
    return mockRequests({
        url:'/banner',
        method:'get'
    }) 
}

//  floor轮播图数据
export const reqFloorList = () => {
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}

// 产品详情信息接口
//      /api/item/{ skuId }     GET        参数:skuid
export const reqGoodsInfo = (skuid) => {
    return requests({
        url:`/item/${skuid}`,
        method:'get'
    })
}

// 添加购物车
//      /api/cart/addToCart/{ skuId }/{ skuNum }    POST    参数：skuId、skuNum
export const reqAddOrUpdate = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'

    })
}

// 购物车列表接口
//      /api/cart/cartList      GET
export const reqCartList = () => {
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

// 删除购物车接口
//      /api/cart/deleteCart/{skuId}  DELETE    参数：skuId
export const reqDelete = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

// 购物车商品选择接口
//      /api/cart/checkCart/{skuId}/{isChecked}     GET     参数：skuId、isChecked
export const reqChecked = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 获取验证码接口
//      /api/user/passport/sendCode/{phone}     GET
export const reqCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })   
}

// 注册接口
//      /api/user/passport/register     POST        参数：phone、password、code
export const reqUserRegister = (data) => {
    return requests({
        url:'/user/passport/register',
        method:'post',
        // 传递给服务器的数据
        data
    })
}

// 登录接口
//      /api/user/passport/login        POST    参数：phone、password
export const reqLogin = (data) => {
    return requests({
        url:'/user/passport/login ',
        method:'post',
        data
    })
}

// 登陆后携带token获取用户信息接口
//      /api/user/passport/auth/getUserInfo         GET
export const reqUserInfo = () => {
    return requests({
        url:'user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录
//      /api/user/passport/logout       GET     
export const reqLogout = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取用户地址
//      /api/user/userAddress/auth/findUserAddressList      GET
export const reqAddress = () => {
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

// 获取购买清单
//      /api/order/auth/trade       GET
export const reqTradeList = () => {
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })   
}

// 提交订单
//      /api/order/auth/submitOrder?tradeNo={tradeNo}       POST        参数名称	    类型	是否必选	描述
                                                                    // traderNo	        string	 Y	      交易编号(拼接在路径中)
                                                                    // consignee	    string	 Y	      收件人姓名
                                                                    // consigneeTel	    string	 Y	      收件人电话
                                                                    // deliveryAddress	string	 Y	      收件地址
                                                                    // paymentWay	    string	 Y	      支付方式                                              
                                                                    // orderComment	    string	 Y	      订单备注
                                                                    // orderDetailList	Array	 Y	      存储多个商品对象的数组
export const reqOrder = (tradeNo,data) => {
    return requests({
        url:`order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    }) 
}

// 获取支付信息
//      /api/payment/weixin/createNative/{orderId}      GET         参数：orderId
export const reqPayInfo = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}   

// 查询支付状态
//          /api/payment/weixin/queryPayStatus/{orderId}        GET     参数：orderId
export const reqPayState = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 获取我的订单列表
//      /api/order/auth/{page}/{limit}      GET     参数：page、limit
export const reqOrderList = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}