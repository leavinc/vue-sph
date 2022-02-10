module.exports = {
    // 打包时不创建map文件
    productionSourceMap:false,
    pages:{
        index:{
            // 入口
            entry:'src/main.js'
        },
    },
    // 关闭语法检查
    lintOnSave:false,
    // 开启代理服务器  需要重新开启vue
    devServer: {

        // 设置代理服务器是否打开、主机号、端口 
        open: true,
        host: "127.0.0.1",
        port: "8080",
      // 代理
        proxy: {
            //  "/students" 是请求前缀，当端口号后跟着相同的请求前缀，则代理服务器会将请求转发至数据服务器5000获取数据
            //  如果没有前缀则会去pubilc中寻找资源  如果有前缀则会去代理中寻找
            // 如果前缀和资源路径相同，则会去代理中寻找资源
            "/api": {
                target: "http://39.98.123.211",
                // 用于支持websocket
                ws:true,
                //  该值为true时，代理服务器8080去数据服务器5000获取数据时，会把自己伪装成5000端口的服务器
                //  该值为false时，代理服务器8080去请求数据服务器5000时，会真实地告诉数据服务器自己是8080服务器
                //  控制req.url的host值
                changeOrigin: true,

                // 重写请求路径，该对象属性是键值对，属性名是正则表达式，匹配到需要修改的路径，属性值是改后的路径
                // pathRewrite: {
                //     "^/api": ""
                // }
            },

        }
    }
}