<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 商品展示 -->
        <ul class="cart-list" v-for="(cartInfo) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='cartInfo.isChecked === 1' @change="changeCheck(cartInfo.skuId,cartInfo.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a  class="mins" @click="handler('mins',-1,cartInfo)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cartInfo)">
            <a  class="plus" @click="handler('plus',1,cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice*cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCart(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked && cartInfoList.length !=0' @change="selectAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getCartList()
    },
    methods: {
      getCartList(){
        this.$store.dispatch('shopcart/getCartList')
      },
      // 修改数量
      // debounce防抖动，200毫秒只能点击一次
      handler:debounce(async function(type,num,cart){
        switch (type) {
          // 加
          case 'plus': num = 1
            break;
          // 减
          case 'mins': num = cart.skuNum>1?-1:0
            break;
          // 直接修改
          case 'change': 
            if(isNaN(num) || num < 0){
              num = 0
            }else{
              num = parseInt(num) - cart.skuNum
            }
        }

        try {
          // 这里的skuNum传递过去也会增加到后台的skuNum上
            await this.$store.dispatch('detail/addOrUpdate',{skuId:cart.skuId,skuNum:num})
            // 发送请求获取最新数据
            this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },200),

      // 删除该项商品
      async deleteCart(skuId){
        try {
          // 等待删除成功了
          await this.$store.dispatch('shopcart/deleteCart',skuId)
          // 发送请求获取最新数据
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },

      // 修改选择状态
      async changeCheck(skuId,isChecked){
        if(isChecked === 1){
            isChecked = 0
        }else if(isChecked === 0){
            isChecked = 1
        }
        try {
          await this.$store.dispatch('shopcart/changeCheck',{skuId:skuId,isChecked:isChecked})
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },

      // 删除选中的商品
      async deleteAllChecked(){
        try {
          await this.$store.dispatch('shopcart/deleteAllChecked')
          // 删除成功则再次发请求获取购物车列表数据
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      // 全选/全不选
      async selectAll(){
        try {
          await this.$store.dispatch('shopcart/selectAll',this.isAllChecked)
        } catch (error) {
          alert(error.message)
        }
      }

    },
    computed:{
      ...mapState({
        cartList:(state) => {
          return state.shopcart.cartList
        }
      }),
      ...mapGetters('shopcart',['cartInfoList']),
      // 商品总价
      totalPrice(){
        let sum =0 
        this.cartInfoList.forEach(element => {
          let price = element.skuPrice*element.skuNum
          sum+=price
        });
        return sum
      },
      // 是否全选
      isAllChecked(){
        // 数组every方法遍历数组每一项，判断回调函数是否每一个都为真，全为真则方法返回true，有一个不为真则返回false
        return this.cartInfoList.every(item => {
          return  item.isChecked === 1
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>