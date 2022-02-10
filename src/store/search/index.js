// search模块store
// 引入三级分类接口请求方法
import {reqSearchInfo} from '../../api/index'


export default {
    namespaced:true,
    state:{
        searchList:{}
    },
    getters:{
        // 简化state中的数据（拆分）
        goodsList(state){
            return state.searchList.goodsList
        },
        trademarkList(state){
            return state.searchList.trademarkList
        },
        attrsList(state){
            return state.searchList.attrsList
        }
    },
    actions:{
        async getSearchList({commit},value){
            let result = await reqSearchInfo(value)
            if(result.code === 200){
                commit('SEARCHLIST',result.data)
            }
        }
    },
    mutations:{
        SEARCHLIST(state,value){
            state.searchList = value
        }
    }
}