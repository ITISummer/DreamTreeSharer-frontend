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

# 2021年4月17日 - 处理图片上传时向后台动态获取 token

前端需要在校验完用户提交的图片格式（后缀，大小）后往后台提交图片名(key)以方便后端根据 key 来生成图片上传 token。期间遇到一个问题是前端使用 `:before-upload="beforeUpload"` 钩子函数来校验完图片格式后，按理想情况，这时候应该开始根据 key 来向后台通过 发送 ajax 请求获得后台生成的 token。但是由于是异步请求，前端在校验完图片格式后就直接提交到远程服务器，这时候后台动态生成的 token 的获得始终是要慢于前台向远程服务器（七牛云）提交。所以每次提交给远程服务器时，token总是为 "" 。在经过一番折腾（查询\<el-upload> 标签相关属性与钩子函数）无果后，我脑子里这时候总是浮现 async 与 await，我在前期跟着学习的时候，有见过这两个关键词的使用，但是一直没有很深的印象也没有很好的理解。所以在遇到以上提到的问题后，我一直没第一时间反应过来。在遇到以上问题的时候，我就在想，是不是有一种手段，能够让 \<el-uplaod> 进行图片格式验证完后先等待 getQiniuToken() 异步获取到后台生成的 token 后再拿着 key 与 token 向远程服务器进行提交！结合刚才的想法与脑子里浮现的 async 与 await，我尝试模仿前面学习的用法，给本项目中的相关方法给加上 async 与 await 后，然后就成功了！开心（o(*￣▽￣*)ブ）！！！ 

具体代码如下：

```js
  methods: {
    /**
     * 创建前从后台获取访问七牛云的 token - (key(文件名) bucket, AccessKey, SecretKey)
     */
    getQiniuToken: async function(key) {
      const _this = this;
     await this.getRequest(`/qiniu/uploadToken/${key}`)
          .then(function(res) {
            if (res.statusCode === 200) {
              _this.qiniuData.token = res.object;
            } else {
              _this.$message({message: res.message, duration: 2000, type: "warning"});
            }
          });
    },
    /**
     * 图片上传前的格式校验
     * @param file
     * @returns {boolean}
     */
    beforeUpload: async function(file) {
      this.qiniuData.key = file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
     await this.getQiniuToken(this.qiniuData.key)
    },
```

## 关于 vue 组件中的 \<style scoped> 与 \<style module> 使用的理解

出现的问题是，当我在 Upload.vue 定义 img{width: 350px; height: 350px }时，会影响 Comments.vue 中评论者头像大小的影响，加了 scoped 就没影响了，但是貌似加了 scoped 后 Upload.vue 中的样式又会有变化，我尝试给给所有 vue 组件的 style 标签中都加上 scoped 属性，但是本来没加 scoped，样式显示效果就很好了，加了后反而不好了，整个样式的控制感觉整体上很乱，我在搜寻后，发现加 module 属性可以达到与 scoped 同样的效果，且貌似比 scoped 更好一点，但是当我尝试把原来的 scoped 属性换成 module 属性时，每个组件的样式显示又千奇百怪了。哎！ 😔

**参考文档**

[掘金： Vue: scoped 样式与 CSS Module 对比](https://juejin.cn/post/6844903673517211655)

[segment: vue的scoped和module的区别](https://segmentfault.com/a/1190000021084387)

[简书：Vue中对比scoped css和css module的区别](https://www.jianshu.com/p/255a42397db5)

### \<style scoped>

**以下内容参考** [简书：Vue中对比scoped css和css module的区别](https://www.jianshu.com/p/255a42397db5)

为类名添加一个hash标识属性。无法完全避开css权重和类名重复的问题。

```html
<style scoped>
h1 {
 color: #f00;
}
</style>
```

```html
//编译结果如下
h1[data-v-4c3b6c1c] {
 color: #f00;
}
```

缺点

- 如果用户在别处定义了相同的类名，也许还是会影响到组件的样式。
- 根据css样式优先级的特性，scoped这种处理会造成每个样式的权重加重,引用 使用了scoped的组件 作为子组件，修改子组件的样式变得很难，可能迫不得已只能用！important
- **scoped会使 标签选择器 渲染变慢很多倍**，用标签选择器时scoped会严重降低性能，而使用class或id则不会

**以下内容参考** [segment：vue的scoped和module的区别](https://segmentfault.com/a/1190000021084387)

在scoped规定区域内的样式。渲染后给元素加上属性，并将选择器变成属性选择器 。这样就限定了范围。防止形成全局样式。

2. 缺点

无法修改子组件、第三方组件、 v-html 创建的 DOM 、的样式，

3. 解决方案

1),通过穿透scoped，使用深度选择器，例如'>>>'。
2),另外用一个普通不含scoped的style标签。在里面书写样式。

4. 总结

上面不管是那种方式都是违背scoped的原则。都会形成全局样式。所以使用scoped的一般是中小型项目。



### \<style module>

以下内容参考 [掘金： Vue: scoped 样式与 CSS Module 对比](https://juejin.cn/post/6844903673517211655)

为所有类名重新生成类名，生成方式为类似 `所在组件名_原类名_哈希值` 例如：

```vue
<style>
  .BasePanel__d17eko1 {
    /* some styles */
  }
  .ComponentName__pricing-panel__a81Kj {
    width: 300px;
    margin-bottom: 30px;
  }
</style>

<div class="BasePanel__d17eko1 ComponentName__pricing-panel__a81Kj">
  content
</div>

作者：西楼听雨
链接：https://juejin.cn/post/6844903673517211655
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

**以下内容参考** [segment：vue的scoped和module的区别](https://segmentfault.com/a/1190000021084387)

将module的里面的样式都保存在$style对象中，渲染后选择器会加上该组件所在文件的文件名作为前缀；由于是个对象所以也同时能将样式导出供其他页面使用。

```vue
<template>
  <div :class="$style.content">
    <div :class="$style['title-wrap']">我是红色的</div>
    <green-title></green-title>
  </div>
</template>
 
<style lang="scss" module>
.content {
  .title-wrap {
    font-size: 20px;
    color: red;
  }
}
</style>
```

![image.png](https://segmentfault.com/img/bVbAC4o)

结论： 根据渲染前后变化其实也是就形成一个特殊的模块化的命名方式。来形成全局样式，只是由于加上选择器前缀比较显得跟私有化些，一般难以重名而已。

### 总结

css module前期进行不麻烦的配置，实现的效果比scoped css更优，这里推荐使用css module。

