// shopcart模块store
// 引入购物车列表接口
import {reqCartList,reqDelete,reqChecked} from '../../api/index'


export default {
    namespaced:true,
    state:{
        cartList:{}
    },
    getters:{
        // 购物车商品数据
        cartInfoList(state){
            return state.cartList.cartInfoList || []
        }
    },
    actions:{
        // 获取购物车列表数据
        async getCartList({commit}){
            let result = await reqCartList()
            if(result.code === 200){
                commit('GETCARTLIST',result.data[0])
                
            }
        },
        // 删除购物车某个商品
        async deleteCart({commit},skuId){
            let result = await reqDelete(skuId)
            if(result.code === 200){
                // 成功
                return 'ok'
            }else{
               //  失败
                return Promise.reject(new Error('faile---'))
            }
        },
        // 修改购物车商品选择状态
        async changeCheck({commit},{skuId,isChecked}){
            let result = await reqChecked(skuId,isChecked)
            if(result.code === 200){
                // 成功
                console.log(result)
                return 'ok'
            }else{
               //  失败
                return Promise.reject(new Error('faile---'))
            }
        },
        // 删除所选中的商品
        deleteAllChecked({dispatch,getters}){
            console.log(getters)
            let pAll = []
            // 循环遍历商品，获取被选中商品的id放入数组
            getters.cartInfoList.forEach(element => {
                // 判断商品选择状态，选择了的向服务器发送删除请求并传参skuId
                let promise = element.isChecked === 1 ? dispatch('deleteCart',element.skuId) : ''
                pAll.push(promise)
            })
            // Promise.all()方法接受一个数组，数组中每个元素都要是promise，该方法挨个判断数组中的元素成功还是失败，全都成功该方法返回成功，如果有一个失败该方法返回失败
            return Promise.all(pAll)
        },
        // 全选/全不选
        selectAll({dispatch,getters},isAllChecked){
            let pAll = []
             getters.cartInfoList.forEach(element => {
                isAllChecked === true ? element.isChecked = 0 : element.isChecked = 1
                let promise = dispatch('changeCheck',{skuId:element.skuId,isChecked:element.isChecked})
                pAll.push(promise)
            })
            return Promise.all(pAll)
        }
    },
    mutations:{
        GETCARTLIST(state,value){
            state.cartList = value || {}
        },
    }
}