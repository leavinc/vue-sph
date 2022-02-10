// trade模块store
// 引入接口
import {reqAddress,reqTradeList} from '../../api/index'


export default {
    namespaced:true,
    state:{
        address:[],
        tradeList:{}
    },
    getters:{
        detailArrayList(state){
            return state.tradeList.detailArrayList || []
        }
    },
    actions:{
        // 获取地址
        async getAddress({commit}){
            let result = await reqAddress()
            if(result.code === 200){
                commit('GETADDRESS',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('fail---'))
            }
        },
        // 获取购物清单
        async getTradeList({commit}){
            let result = await reqTradeList()
            if(result.code === 200){
                commit('GETTRADELIST',result.data)
            }
        },
        // 提交订单
        // async getOrder({commit},data){
        //     let result = await reqOrder(data)
        //     console.log(result)
        // }
    },
    mutations:{
        GETADDRESS(state,value){
            state.address = value
        },
        GETTRADELIST(state,value){
            state.tradeList = value
        }
    }
}