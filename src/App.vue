<template>
  <div>
    <Header/>
    <!--路由组件显示 -->
    <keep-alive include="TypeNav">
      <router-view></router-view>
    </keep-alive>
    <Footer/>
  </div>
</template>

<script>

  import Header from './components/Header/index.vue'
  import Footer from './components/Footer/index.vue'


  export default {
    name:'App',
    components:{
      Header,
      Footer
    },
    mounted() {
      // 进入actions获取三级列表数据
      this.$store.dispatch('home/cateGoryList')
    },
  }
</script>

<style>

</style>
