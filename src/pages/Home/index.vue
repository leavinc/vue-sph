<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav/>
        <ListContainer/>
        <TodayRecommand/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>  
        <Brand/>
    </div>
</template>

<script>
    import ListContainer from './ListContainer/index.vue'
    import TodayRecommand from './TodyRecommand/index.vue' 
    import Rank from './Rank/index.vue'
    import Like from './Like/index.vue'
    import Floor from './Floor/index.vue'
    import Brand from './Brand/index.vue'

    import {mapState} from 'vuex'
    export default {
        name:'Home',
        components:{
            ListContainer,
            TodayRecommand,
            Rank,
            Like,
            Floor,
            Brand,

        },
        mounted() {
            // 获取floor数据
            this.$store.dispatch('home/getFloorList')
            // 获取用户信息
            this.$store.dispatch('user/getUserInfo')
        },
        computed:{
            ...mapState({
                floorList:(state) => {
                    return state.home.floorList
                }
            })
        }
    }
</script>

<style>

</style>