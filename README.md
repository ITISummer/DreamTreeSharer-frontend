# DreamTreeSharer-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 前言

DreamTreeSharer 前端

本来是在看到 Pinterest.com 后想借鉴其页面布局的，然后当时自己心里想着可不可以改装下，弄一个“想法分享网站”。而“想法分享”这个想法也是在看到 v2ex 后，感觉 v2ex 上面的一些创意想法都还不错！所以此项目后来索性就是结合 pinterest 的网站页面+v2ex 的想法分享搭建的。

由于毕设论文需要，同时也是对自己搭建过程的一个记录，我后知后觉的才觉得应该弄一个搭建过程记录，记录如何引入模块，如何将网上的模块给整合到此项目中并加以改进以适合本项目。记录的话就按照时间线+简单概述来记录吧！

# 参考学习网站

[【vue3.x】2021最新版Vue全套课程#Web框架学习基础+Vue全家桶+Vue实战项目（已完结）](https://www.bilibili.com/video/BV1Pz4y1S7Uv)

[尚硅谷Vue核心技术实战教程全套完整版(vue.js初学者快速入门到精通)](https://www.bilibili.com/video/BV1Wp411d7Ur)

[【李炎恢】【Vue.js Element UI / 前端UI / UI组件库】【十天技能课堂】](https://www.bilibili.com/video/BV1U54y127GB)

[全套完整版】2021最新SpringBoot+Vue前后端分离项目实战-在线智能办公系统，前后端分离项目](https://www.bilibili.com/video/BV1ar4y1K7qx)

# 前端设计

## 前端环境搭建

### 安装 node.js

https://nodejs.org/en/download/

[安装与卸载教程 - Windows下完全卸载node.js并安装node.js的多版本管理工具nvm-windows](https://blog.csdn.net/lewky_liu/article/details/87959839)

[nvm-windows github 地址](https://github.com/coreybutler/nvm-windows)

### 解决 npm 下载慢的问题

```shell
# 使用此命令
npm install cnpm -g

# 或使用如下语句解决 npm 速度慢的问题（建议）
npm install --registry=https://registry.npm.taobao.org/
```

### 安装 npm 管理器 nrm

```shell
npm install nrm -g

# 使用 nrm ls 查看已安装的 npm 包
nrm ls

# 使用 nrm use [镜像名]命令来使用镜像
nrm use taobao
```

### 使用 nrm ls 报错

[nrm报错 [ERR_INVALID_ARG_TYPE] 解决方法]:(https://blog.csdn.net/S_aitama/article/details/113706339)



### 安装 vue/cli

```shell
npm install -g @vue/cli

# 安装完后检查是否成功
vue --version
```

### 启动创建好的 vue 项目

```shell
# 进入项目根目录下
npm run serve
```



## 项目结构说明

<img src="C:\Users\LCX\AppData\Roaming\Typora\typora-user-images\image-20210331165926659.png" alt="image-20210331165926659" style="zoom:80%;" />

node_modules: 项目使用到的一些依赖

public: 开发时基本用不到，因为 vue 基本是组件开发，页面都是动态生成的

src: 项目源码

src-assets: 专门用于放一些资源

src-components: 项目组件

src-router: 路由目录

src-views: 页面目录

app.vue: 

main.js: 项目入口

bable.config.js: 打包时，将 ES6 语法转换为 ES5 语法

package-lock.json: 

package.json:  项目配置文件

README.md: 项目说明

# 2021年4月1日-2021年4月8日 - 编写 java 后端

[后端项目地址](https://github.com/ITISummer/DreamTreeSharer)

# 2021年4月11日

记录 vue 项目搭建

[vue-cli项目结构详解](https://juejin.cn/post/6844903540213678087#heading-4)

我觉得熟悉下 vue-cli 搭建的项目结构还蛮好的，我一开始就是看到那么多文件，我都搞不清那些文件是有啥作用，属于哪些模块，于是专门找了一篇文章来熟悉下使用 vue-cli 搭建的项目的项目结构及各文件夹和文件的作用，熟悉后就感觉 vue-cli 的作用就类似 spring initializer 快速搭建 springboot 项目的作用一样吧！

# 2021年4月12日 - 实现登录与注册页面

[全套完整版】2021最新SpringBoot+Vue前后端分离项目实战-在线智能办公系统，前后端分离项目](https://www.bilibili.com/video/BV1ar4y1K7qx)

在实现登录与注册页面过程中，使用到了 vue.js 的前端桌面 ui 库 [element-ui](https://element.eleme.io/) ，登录和注册页面使用了大量 ele-ui 的组件以及表单验证

[vue表单验证库async-validator的使用 elementUi + form](https://blog.csdn.net/QingWaXieZi/article/details/82950725)



# 2021年4月15日 - 引入瀑布流布局作为用户登录首页

我感觉瀑布流布局比较好看。除了好看，我觉得每个模块都可以是独立和重复的，这样对于数据的封装也会比较简单！还有其不同的出现方式：淡入淡出啥的效果也比较好看！

[Vue<瀑布流加载效果>](https://www.jianshu.com/p/97b89597ab5c)

[本项目使用的瀑布流插件 vue-waterfall-plugin - github 地址](https://github.com/heikaimu/vue-waterfall-plugin)

使用此插件出现了一些问题，就是始终是自动延时加载，而不是用户滑动滑块到了底部后触碰加载事件，虽然项目中有实现此功能，但是就是无效，使用的功能是 [element-ui 的 v-infinite-scorll 属性](https://element.eleme.cn/#/zh-CN/component/infiniteScroll) - **目前还没解决**

# 2021年4月16日 - 引入评论模块+图片上传

## 评论模块

目前只是简单引入了评论模块，还没做 ui 的优化以及后台数据获取啥的，后台也还没写好（哭/(ㄒoㄒ)/~~）

[本项目使用的评论模块-vue + element-ui + scss 仿简书评论模块](https://juejin.cn/post/6844903635063668744)

[另外可参考-利用Vue+ElementUi实现评论功能-仿掘金](https://blog.csdn.net/zLanaDelRey/article/details/100997792)

## 图片上传模块

[Element el-upload上传组件详解](https://segmentfault.com/a/1190000013796215)

[ElementUI的Upload上传，配合七牛云储存图片](https://segmentfault.com/a/1190000016309473)

**根据以上教程，运行代码后报如下错**

```js
vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in created hook: "TypeError: Cannot read property 'post' of undefined"
found in
---> <Upload> at src/views/Upload/Upload.vue
       <App> at src/App.vue
         <Root>
         
TypeError: Cannot read property 'post' of undefined
    at VueComponent.getQiniuToken (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Upload/Upload.vue?vue&type=script&lang=js&:62)
    at VueComponent.created (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Upload/Upload.vue?vue&type=script&lang=js&:56)
    at invokeWithErrorHandling (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:1853)
    at callHook (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4213)
    at VueComponent.Vue._init (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:4998)
    at new VueComponent (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:5144)
    at createComponentInstanceForVnode (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:3280)
    at init (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:3111)
    at merged (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:3298)
    at createComponent (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:5968)
    
upload-z1.qiniup.com/:1 Failed to load resource: the server responded with a status of 400 (Bad Request)
```

查看响应头后发现“未指定 token”

<img src="C:\Users\LCX\AppData\Roaming\Typora\typora-user-images\image-20210416144801416.png" alt="elemen-ui 上传七牛云报错" style="zoom:80%;" />

[七牛云上传下载操作指南](https://developer.qiniu.com/kodo/kb/1336/upload-download-instructions)

查询此文章发现七牛云对象存储上传所需的 token 是根据 bucket, access key, secret key 和 key（文件名）来生成的

成功设置好 token 后，开始请求，出现如下错误

`Proxy error: Could not proxy request /qrne6et6u.hn-bkt.clouddn.com/test.jpg from localhost:8080 to http://localhost:8081/ (ECONNREFUSED).`

我想这应该是跨域的问题

<img src="C:\Users\LCX\AppData\Roaming\Typora\typora-user-images\image-20210416193629667.png" alt="image-20210416193629667" style="zoom:80%;" />

由于我只设置了本地后台跨域，所以会报错，于是我想是不是能设置多个跨域，后来我查询到了，是可以设置多个跨域的： [webpack开发配置API代理解决跨域问题-devServer](https://segmentfault.com/a/1190000016199721)，添加一个跨域后，问题便解决了！

```js
proxyObj['/upload-api'] = {
    // websocket
    ws: false,
    // 目标地址
    target: 'http://upload-z2.qiniup.com',
    // 发送请求头 host 会被设置 target
    changeOrigin: true,
    // 重写请求地址
    pathRewrite: {
        '^/upload-api': ''
    }
}
```

<img src="C:\Users\LCX\AppData\Roaming\Typora\typora-user-images\image-20210416210112427.png" alt="image-20210416210112427" style="zoom:80%;" />

在经过一番仔细研究后发现需要加 http 或者 https 协议头部，于是请求地址变为了 `http://qrne6et6u.hn-bkt.clouddn.com/test.jpg` 这样就可以正确访问了