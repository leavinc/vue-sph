<template>
  <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="leave">
                    <h2 class="all" @mouseenter="enterType">全部商品分类</h2>
                    <!-- 过渡动画 -->
                    <!-- <transition
                        name="animate__animated animate__bounce"
                        enter-active-class="animate__flipInY"
                        leave-active-class="animate__flipOutY"
                    > -->
                        <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <div class="item" v-for="(c1,index) in cateGoryList" :key="c1.categoryId" :class="{curColor:currentIndex === index}">
                                <h3 @mouseenter="changeIndex(index)" >
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId" >{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix">
                                    <!-- 二级分类 -->
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" >{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" >{{c3.categoryName}}</a>
                                                </em>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    <!-- </transition> -->
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>

            </div>
        </div>
</template>

<script>

    import {mapState} from 'vuex'
    import 'animate.css'

    export default {
        name:'TypeNav',
        data() {
            return {
                // 存储鼠标移到哪一个一级分类
                currentIndex:-1,
                show:true
            }
        },
        methods: {
            // 修改currentIndex
            changeIndex(index){
                this.currentIndex = index
                this.show = true
            },
            // 事件委派 其子元素也能触发该事件
            leave(){
                // 设置currentInedx为-1，这样就无法为任何一个item添加背景色
                this.currentIndex = -1
                // 判断是否在Search模块中
                if(this.$route.path != '/home'){
                    this.show = false
                }
            },
            // 三级列表路由跳转函数
            goSearch(event){
                // 判断是否是a标签
                
                // 获取触发当前事件节点
                let element = event.target   
                console.log(element.dataset)   

                // 获取当前节点的自定义属性,节点带有一个dataset属性，可以获取节点自定义属性和属性值
                let {categoryname,category1id,category2id,category3id} = element.dataset

                if(categoryname){
                    // 整理路由跳转参数
                    let location = {name:'search'}
                    let query = {categoryName:categoryname}
                    // 判断是几级标签
                    if(category1id){
                        // 一级标签
                        query.category1Id = category1id
                    }else if(category2id){
                        // 二级标签
                        query.category2Id = category2id
                    }else{
                        // 三级标签
                        query.category3Id = category3id
                    }

                    // 携带paramas参数
                    location.params = this.$route.params
                    // 携带query参数
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                }
            },
            // 触发该事件才使得Search模块show为true，显示三级列表
            enterType(){
                this.show = true
            },
            
        },
        // 组件挂载完毕发请求获取数据
        mounted() {
            // this.$store.dispatch('home/cateGoryList')
            // Search模块show的初始值改为false，隐藏三级列表
            if(this.$route.path != '/home'){
                this.show = false
            }

            
        },
        computed:{
            ...mapState({
                // 我们将对象属性值写成一个函数，当使用这个计算属性一次，就会执行这个函数一次
                // 我们注入一个参数state，他是整体的大store的state，所以对应的cateGoryList需要我们去自己获取
                // cateGoryList:(state) => {
                //     return state.home.cateGoryList
                // }

                // 简写形式
                cateGoryList:state=>state.home.cateGoryList
            })
        }
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        // &当前元素
                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }

                    .curColor{
                        background-color: rgb(238, 113, 96);
                    }
                }
            }

            // 过渡动画

            // 过渡动画开始状态（显示）
            // .sort-enter{
            //     height: 0px;
            // }
            // 过渡动画结束状态（显示）
            // .sort-enter-to{
            //     height: 461px;
            // }
            // 定义动画事件、速率（显示）
            // .sort-enter-active{
            //     transition: all .5s linear;
            // }

            // 过渡动画开始状态（隐藏）
            // .sort-leave{
            //     height: 461px;
            // }
            // 过渡动画结束状态（隐藏）
            // .sort-leave-to{
            //     height: 0px;
            // }
            // 定义动画事件、速率（隐藏）
            // .sort-leave-active{
            //     transition: all .5s linear;
            // }
        }
    }
</style>