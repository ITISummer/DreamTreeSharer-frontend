/**
 * vue 配置跨域(axios)请求
 * 每次更新配置后需要重启
 */
let proxyObj = {}

// 本地后台代理
proxyObj['/'] = {
    // websocket
    ws: false,
    // 目标地址
    target: 'http://localhost:8081',
    // 发送请求头 host 会被设置 target
    changeOrigin: true,
    // 不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
}
// 七牛云代理 - 实现图片上传需要
proxyObj['/upload-api'] = {
    ws: false,
    // 目标地址
    target: 'http://upload-z2.qiniup.com',
    // 发送请求头 host 会被设置 target
    changeOrigin: true,
    // 重写请求地址
    pathRewrite: {
        '^/upload-api': ''
    }
},

// websocket 代理 - 实现在线聊天功能需要
proxyObj['/ws'] = {
    // websocket
    ws: true,
    changeOrigin: true,
    target: 'ws://localhost:8081'
};

// 请求到 8080，但是会转发到 8081 端口
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        // 代理对象
        proxy: proxyObj
    }
}
