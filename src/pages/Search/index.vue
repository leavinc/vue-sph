<template>
    <div>
        <TypeNav/>
        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="clearCategoryName">×</i></li>
                        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="clearKeyword">×</i></li>
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="clearTrademark">×</i></li>
                        <li class="with-x" v-for="(attrs,index) in searchParams.props" :key="index">{{attrs.split(':')[1]}}<i @click="clearProps(index)">×</i></li>
                    </ul>
                </div>
                <!-- SearchSelector -->
                <SearchSelector/>
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <!-- 排序 -->
                                <li :class="{active : isOne}" @click="sortUd('1')">
                                    <a >综合 <span v-show="isOne" class="iconfont " :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"></span></a>
                                </li>                              
                                <li :class="{active : isTwo}" @click="sortUd('2')">
                                    <a>价格 <span v-show="isTwo" class="iconfont " :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"></span></a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <!-- 商品列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <!-- 跳转至商品详情页面 -->
                                        <router-link :to="`/detail/${goods.id}`">
                                        <!-- 懒加载，当数据回来呈现之前，先呈现懒加载指定的图片 -->
                                            <img v-lazy="goods.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{goods.price}}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html"  :title="goods.title">{{goods.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                   <!-- 分页器组件 -->
                   <Pagination :pageNo= 'searchParams.pageNo' :pageSize = 'searchParams.pageSize' :total = 'total' :continues = '5' @getPageNo = 'getPageNo'/>
                </div>
                <!--hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_01.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i>4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>金属A面，360°翻转，APP下单省300！</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i>4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_04.png" />
                                    </div>
                                    <div class="attr">
                                        <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i>4068.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有20人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i>4088.00</i>
                                            </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchSelector from './SearchSelector/index.vue'
    import {mapGetters,mapState} from 'vuex'
    export default {
        name:'Search',
        data() {
            return {
                searchParams:{
                    category1Id: "",
                    category2Id: "",
                    category3Id: "",
                    categoryName: "",
                    keyword: "",
                    // 排序,默认综合 降序
                    order: "1:desc",
                    // 当前第几页
                    pageNo: 1,
                    // 每一页展示商品个数
                    pageSize: 10,
                    // 商品属性
                    props: [],
                    // 品牌
                    trademark: ""
                }
            }
        },
        components:{
            SearchSelector
        },
        beforeMount() {
            // this.searchParams.category1Id = this.$route.query.category1Id
            // this.searchParams.category2Id = this.$route.query.category2Id
            // this.searchParams.category3Id = this.$route.query.category3Id
            // this.searchParams.categoryName = this.$route.query.categoryName
            // this.searchParams.keyword = this.$route.params.keywords

            //  Object.assign方法可以将后面参数与第一个参数相同的属性合并，并赋值给第一个参数
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            
        },
        mounted() {
            // 在发请求之前获取传到search组件的数据
            this.getSearchData()
            // 事件总线品牌事件
            this.$bus.$on('tradeInfo',this.tradeSearch)
            // 事件总线商品属性事件
            this.$bus.$on('attrInfo',this.attrSearch)
        },
        computed:{
            ...mapGetters('search',['goodsList']),
            // 综合排序
            isOne(){
                return this.searchParams.order.indexOf('1') != -1
            },
            // 价格排序
            isTwo(){
                return this.searchParams.order.indexOf('2') != -1
            },
            // 升序
            isAsc(){
                return this.searchParams.order.indexOf('asc') != -1
            },
            // 降序
            isDesc(){
                return this.searchParams.order.indexOf('desc') != -1
            },
            // 数据总数
            ...mapState({
                total:(state) => {
                    return state.search.searchList.total
                }
            })
        },
        methods: {
            // 获取search数据，从接口获取数据存入state中，state更新，页面更新
            getSearchData(){
                this.$store.dispatch('search/getSearchList',this.searchParams)
            },

            // 清除query传递的参数
            clearCategoryName(){
                // 清除参数，设为undefined之后，当我们再去接口获取数据，只会去寻找不是undefined的数据，优化
                this.searchParams.categoryName = undefined
                this.searchParams.category1Id = undefined
                this.searchParams.category2Id = undefined
                this.searchParams.category3Id = undefined

                // 重新发请求,但此时，$route已被监听，当我们触发该事件后，
                // this.getSearchData()

                // 清除地址栏query参数，通过重新路由跳转，保留params参数
                this.$router.push(
                    {
                        name:'search',
                        params:this.$route.params
                    }
                )
            },
            // 清除params传递的keyword
            clearKeyword(){
                this.searchParams.keyword = undefined
                // this.getSearchData()
                // 清除地址栏params参数，通过重新路由跳转，保留query参数
                this.$router.push(
                    {
                        name:'search',
                        query:this.$route.query
                    }
                )
                // 清除Header组件keyword
                this.$bus.$emit("clear")
            },
            // 清除品牌信息trademark
            clearTrademark(){
                this.searchParams.trademark = ''
                this.getSearchData()
            },
            // 清除商品属性
            clearProps(index){
                
                this.searchParams.props.splice(index,1)
                this.getSearchData()
            },
            // 点击品牌搜索
            tradeSearch(trade){

                // 通过事件总线获取品牌参数，将其伪装成TypeName搜索框，
                // this.router.push({
                //     name:'search',
                //     params:{
                //         keyword:trade.tmName
                //     },
                //     query:this.$route.query
                // })

                // 使用trademark参数,将其存为字符串
                this.searchParams.trademark = `${trade.tmId}:${trade.tmName}`
                this.getSearchData()
                
                
                

            },
            // 点击商品属性搜索
            attrSearch(attrs,atrValue){
                console.log(atrValue)
                // 根据接口文档，判定我们所要传递的参数是什么形式，需要什么参数才能获取到数据
                // porps是数组，我们可能会多次点击商品属性进行选择，所以我们需要将每次点击的都存入数组
                let props = `${attrs.attrId}:${atrValue}:${attrs.attrName}`
                // 数组去重，不能重复点击
                if(this.searchParams.props.indexOf(props) === -1){
                    this.searchParams.props.push(props) 
                    this.getSearchData()
                }    
                
                
                
                
            },
            // 升降序切换
            sortUd(flag){
                let originFlag = this.searchParams.order.split(':')[0]
                let originSort = this.searchParams.order.split(':')[1]
                // 点击的综合
                // 如果flag相同，则切换升降序
                if(flag === originFlag){
                    this.searchParams.order = `${originFlag}:${originSort === 'desc'?'asc':'desc'}`
                }else {
                    // 如果flag不同，则改为当前flag，并且设置为降序
                    this.searchParams.order = `${flag}:${'desc'}`
                }
                this.getSearchData()
            },

            // 获取当前第几页
            getPageNo(pageNo){
                this.searchParams.pageNo = pageNo
                this.getSearchData()
            }
        },
        watch:{
            // 监听$route内部变化，当路径参数发生变化后，
            $route:{
                
                handler(newValue,oldValue){
                    Object.assign(this.searchParams,this.$route.query,this.$route.params)
                    this.getSearchData()
                    // 每一次请求完毕，要清除三级分类id
                    this.searchParams.category1Id = ''
                    this.searchParams.category2Id = ''
                    this.searchParams.category3Id = ''
                    
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .main{
        margin: 10px 0;
        .py-container{
            width: 1200px;
            margin: 0 auto;
            .bread{
                margin-bottom: 5px;
                overflow: hidden;
                .sui-breadcrumb{
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float:left;
                    li{
                        display: inline-block;
                        line-height: 18px;
                        a{
                            color: #666;
                            text-decoration: none;
                            &:hover{
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                .sui-tag{
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    .with-x{
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition:color 400ms;
                        cursor: pointer;
                        i{
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        &:hover{
                            color: #28a3ef;
                        }
                    }
                }
            }
            
            .details{
                margin-bottom: 5px;
                .sui-navbar{
                    overflow: visible;
                    margin-bottom: 0;
                    .filter{
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        .sui-nav{
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            li{
                                float: left;
                                line-height: 18px;
                                a{
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                &.active{
                                    a{
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                .goods-list{
                    margin: 20px 0;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        li{
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;
                            .list-wrap{
                                .p-img{
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;
                                    a{
                                        color: #666;
                                        img{
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                                .price{
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                    i{
                                        padding-left: 4px;
                                    }
                                }
                                .attr{
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    a{
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                .commit{
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    span{
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                .operate{
                                    padding: 12px 15px;
                                    .sui-btn{
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    .btn-bordered{
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        &:hover{
                                            border: 1px solid #666;
                                            color: #fff!important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    .btn-danger{
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        &:hover{
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color:white!important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
            }
            .hot-sale{
                margin-bottom: 5px;
                border: 1px solid #ddd;
                .title{
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 21px;
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    margin: 0;
                    padding: 5px 0 5px 15px;
                }
                .hot-list{
                    padding: 15px;
                    ul{
                        display:flex;
                        li{
                            width:25%;
                            height: 100%;
                            .list-wrap{
                                .p-img,.price,.attr,.commit{
                                    padding-left: 15px;
                                }
                                .p-img{
                                    img{
                                        max-width: 100%;
                                        vertical-align: middle;
                                        border: 0;
                                    }
                                }
                                .attr{
                                    width: 85%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                }
                                .price{
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .commit{
                                    height:22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>