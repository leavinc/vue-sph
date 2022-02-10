<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    
    export default {
        name:'Carousel',
        props:['list'],
        watch:{
            // 我们获取轮播图数据是通过actions状态执行异步操作获取数据放到state中的
            // 但是当我们使用swiper创建swiper实例执行操作时,异步的数据还没有获取回来
            // 我们使用v-for遍历生成结构，但是数据还没有获取到所以我们并不能生成结构
            // 结构没有生成，我们创建的swiper实例就无法作用于上，就无法实现轮播图功能
            // 所以我们使用watch监视bannerList属性，当数据获取到了，bannerList变化再触发操作
            // 但是数据获取到了还需要时间去更新DOM结构，也需要一定时间，直接执行的话也不行
            // 所以我们使用$nextTick钩子，当获取到数据更新完DOM结构后再创建swiper实例  
            // 这个生命周期钩子，我们如果在数据修改之后即handler函数中调用其，会获得更新后的DOM 
            list:{
                immediate:true,
                handler(){
                    // 轮播图js操作
                this.$nextTick(() => {
                    var mySwiper = new Swiper (this.$refs.cur, {
                        direction: 'horizontal', // 水平切换选项
                        loop: true, // 循环模式选项
                        
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination', 
                            clickable :true,
                        },
                        
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        
                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                        
                    }) 
                })
                }
            }
        } 
    }
</script> 

<style>

</style>