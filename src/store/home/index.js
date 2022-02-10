// home模块store
// 引入三级分类接口请求方法
import {reqCategoryList,reqBannerList,reqFloorList} from '../../api/index'

export default {
    namespaced:true,
    state:{
        // 三级分类数据初始值
        cateGoryList:[],
        // 首页轮播图数据
        bannerList:[],
        // floor数据
        floorList:[]
    },
    getters:{

    },
    actions:{
        // 三级分类列表获取数据
        async cateGoryList({commit}){
            let result = await reqCategoryList()
            if(result.code === 200){
                commit('CATEGORYLIST',result.data)
            }
        },
        // 首页轮播图获取数据(mock数据)
        async getBannerList({commit}){
            // await等待响应结果
            let result = await reqBannerList()
            if(result.code === 200){
                commit('BANNERLIST',result.data)
            }
        },
        // floor轮播图数据
        async getFloorList({commit}){
            let result = await reqFloorList()
            if(result.code === 200){
                commit('FLOORLIST',result.data)
            }
        }
    },
    mutations:{
        CATEGORYLIST(state,value){
            state.cateGoryList = value
        },
        BANNERLIST(state,value){
            state.bannerList = value
        },
        FLOORLIST(state,value){
            state.floorList = value
            
        }
    }
}