// 引入mockjs
import Mock from 'mockjs'

// 引入json数据
import banner from './banner.json'
import floor from './floor.json'
// webpack默认对外暴露图片、json数据

// mock数据     第一个参数：请求路径， 第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})