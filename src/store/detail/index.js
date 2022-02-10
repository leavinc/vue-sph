// detail模块store
// 引入商品详细信息接口请求方法
import {reqGoodsInfo,reqAddOrUpdate} from '../../api/index'
// 游客身份id
import {getUuid} from '../../utils/uuid_token'

export default {
    namespaced:true,
    state:{
        goodInfo:{},
        // 游客临时身份
        uuid:getUuid()
    },
    getters:{
        // 初始状态下goodInfo是空对象，getters一开始并没有拿到数据，所以会返回空，如果要调取该数据则会报错
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
         skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        },
    },
    actions:{
        // 获取商品信息
        async getGoodInfo({commit},skuId){
            let result = await reqGoodsInfo(skuId)
            if(result.code === 200){
                commit('GETGOODINFO',result.data)
            } 
        },
        // 添加购物车
        // 添加async、await后的函数返回一个Promise
        async addOrUpdate({commit},{skuId,skuNum}){
            // 传递的两个参数，第一个参数skuId用来判断是哪个商品，skuNum是用来增加或者减少数量的
            let result = await reqAddOrUpdate(skuId,skuNum)
            console.log(result)
            // 存入数据库成功
             if(result.code === 200){
                 return 'ok'
             }else{
                //  失败
                 return Promise.reject(new Error('faile---'))
             }
            
        }
    },
    mutations:{
        GETGOODINFO(state,value){
            state.goodInfo = value
        }
    }
}