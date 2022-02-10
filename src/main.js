import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router/index'
// 引入vuex store
import store from './store/index'
// 三级联动全局组件
import TypeNav from './components/TypeNav/index'
// 全局注册组件，第一个参数全局组件的名字，第二个参数哪一个组件
Vue.component('TypeNav',TypeNav)

// 测试三级分类接口
// import {reqCategoryList} from './api/index'
// reqCategoryList()

// 轮播图全局组件
import Carousel from './components/Carousel/index'
// 注册轮播图全局组件
Vue.component('Carousel',Carousel)

// 分页器全局组件
import Pagination from './components/Pagination/index'
// 全局注册分页器组件
Vue.component('Pagination',Pagination)

// 引入mockServe.js
import './mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css' 
 
// 统一引入api中的所有接口
import * as API from './api/index'

// 按需引入ElementUI
import { Button, MessageBox } from 'element-ui';
// 注册elementui插件
Vue.component(Button.name, Button);

// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
import lazyPng from './assets/1.gif'
// 注册懒加载插件
Vue.use(VueLazyload, {
  loading: lazyPng,
})


// 表单验证vee-validate
import VeeValidate from 'vee-validate';
// 设置为中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 表单验证配置
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    // 汉化
    ...zh_CN.messages,
    is:(field)=>`${field}`
  },
  attributes:{
    // 将对应的英文换成中文
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'请确认与密码相同',
    agree:'协议'
  }
})
// 自定义表单验证规则
VeeValidate.Validator.extend('agree',{
  validate:value=>{
    return value
  },
  getMessage:field=>field+'必须同意'
})

Vue.config.productionTip = false

const vm =new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    // api接口
    Vue.prototype.$API = API

    // 引入消息弹窗
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  // 注册路由
  router,
  // 注册vuex store
  store
}).$mount('#app')
console.log(vm)