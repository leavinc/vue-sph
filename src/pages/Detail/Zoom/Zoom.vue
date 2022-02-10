<template>
  <div class="spec-preview">
    <img :src="defaultImg" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="defaultImg" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  
  export default {
    name: "Zoom",
    props:['skuDefaultImg'],
    data() {
      return {
        currentImg:''
      }
    },
    watch:{
      skuDefaultImg(){
        this.$nextTick(() => {
          this.currentImg = this.skuDefaultImg
        })
      }
    },
    computed:{
      // 计算属性的值不能直接修改，所以我们将其依赖包装为一个data，如果是props的话我们不能修改，将其包装成data再让其成为计算属性的依赖，我们要修改计算属性时，修改其以来data就行
      defaultImg(){
        return this.currentImg
      }
    },
    mounted() {
      this.$bus.$on('choosedImg',(imgUrl) => {
        this.currentImg = imgUrl
      })
    },
    methods: {
      handler(event){
        // 获取Dom元素
        let mask = this.$refs.mask
        let big = this.$refs.big
        // 获取事件偏移量
        let left = event.offsetX-(mask.offsetWidth/2)
        let top = event.offsetY-(mask.offsetHeight/2)

        // 判断是否超出范围
        if(left<0){
          left = 0
        }else if(left > mask.offsetWidth){
          left = mask.offsetWidth
        }

        if(top<0){
          top = 0
        }else if(top > mask.offsetHeight){
          top = mask.offsetHeight
        }

        // 修改mask偏移量
        mask.style.left = left+'px'
        mask.style.top = top+'px'
        // 修改放大镜偏移量  
        // 放大镜的图片是普通图片尺寸的2倍,我们为其设置一个边框限制其大小跟普通照片一样,然后设置超出部分隐藏,这样显示的只有一部分
        // 我们设置其初始偏移量都为0,但是当mask偏移多少,我们要设置放大镜所显示的区域与整体图片相比相同的偏移量
        // mask相对于普通图片的偏移量 = 放大镜所显示的部分相对于整张图片的偏移量
        // 因为放大镜所显示的区域不能挪动,所以我们只能挪动big图片
        // 所以要设置负值,由于big图片是普通图片的两倍,所以要乘以2
        big.style.left = -2*left+'px'
        big.style.top = -2*top+'px'
        
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>