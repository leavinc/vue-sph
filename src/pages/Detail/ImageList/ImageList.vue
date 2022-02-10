<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide) in skuImageList" :key="slide.id" >
        <img :src="slide.imgUrl" :class="{active:slide.isDefault === '1' }" @click="changeCurrentIndex(slide,skuImageList)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    watch:{
      // 监听数据可以保证数据已经获取到，但是不能保证DOM结构已经构建完成
      skuImageList(){
        this.$nextTick(() => {
                new Swiper (this.$refs.cur, {
            
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    // 显示区域一次显示几张图片
                    slidesPerView : 3, 
                    // 切换时多少张图片为一组进行切换
                    slidesPerGroup : 1,
                    
                }) 
            })
      }
    },
    methods: {
      
      changeCurrentIndex(slide,skuImageList){
        // 排他操作，被点击的高亮
        skuImageList.forEach(element => {
          element.isDefault = '0'
        });
        slide.isDefault = '1'
        
        // 更改放大区域呈现图片
        this.$bus.$emit('choosedImg',slide.imgUrl)
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-wrapper{
      padding-left: 36.68px;


      .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        
      }
    }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>