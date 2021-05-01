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

本来是在看到 Pinterest.com 后想借鉴其页面布局的，然后当时自己心里想着可不可以改装下，弄一个“想法分享网站”。而“想法分享”这个想法也是在看到 v2ex 后，感觉 v2ex 上面的一些创意想法都还不错！所以此项目后来索性就是结合 pinterest 的网站页面+v2ex 的想法分享搭建的。不过我给它起了个中文名叫 - “许愿分享树”，英文名叫 "DreamTreeSharer"，意在想让人们大胆分享心中的想法和愿望！

由于毕设论文需要，同时也是对自己搭建过程的一个记录，我后知后觉的才觉得应该弄一个搭建过程记录，记录如何引入模块，如何将网上的模块给整合到此项目中并加以改进以适合本项目以及使用了哪些资料或者网络链接！。记录的话就按照时间线+简单概述来记录吧~

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

[nrm报错 [ERR_INVALID_ARG_TYPE] 解决方法](https://blog.csdn.net/S_aitama/article/details/113706339)



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

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/image-2.png" style="zoom:80%;" />

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

[java调用qiniu七牛云空间](https://blog.csdn.net/visket2008/article/details/77164233)

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

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/image-20210416144801416.png" style="zoom:80%;" />

[七牛云上传下载操作指南](https://developer.qiniu.com/kodo/kb/1336/upload-download-instructions)

查询此文章发现七牛云对象存储上传所需的 token 是根据 bucket, access key, secret key 和 key（文件名）来生成的

成功设置好 token 后，开始请求，出现如下错误

`Proxy error: Could not proxy request /qrne6et6u.hn-bkt.clouddn.com/test.jpg from localhost:8080 to http://localhost:8081/ (ECONNREFUSED).`

我想这应该是跨域的问题

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/image-20210416193629667.png" style="zoom:80%;" />

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

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/image-20210416210112427.png" style="zoom:80%;" />

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

# 2021年4月18日-引入用户个人中心模块

[Vue修改用户信息~不要错过哦](https://blog.csdn.net/weixin_46370867/article/details/113448645)

参考以上文章，该文章使用的是 \<el-dialog>  不过为了适应本项目，我想改成 \<el-table> 吧，这样会更好看点！

另外，今天遇到一些问题，得记录下！

[npm run dev卡住 即 vue-cli-service serve卡住，不提示错误信息，进程也不关闭](https://blog.csdn.net/weixin_43711917/article/details/97970502)

首先是在创建一个 vue 组件后，不要直接在 \<template> 下写一些文本内容吧，这样会导致 build 的时候编译时卡住不动，没报错，也没提示，就是编译时卡住了，详解可以参考以上链接！

而在已经运行好的一个组件下，直接在 \<template> 中添加文本内容，则会报错：

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/Snipaste_2021-04-18_21-43.png" style="zoom: 80%;" />

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/Snipaste_2021-04-18_21-35.png" style="zoom:80%;" />

另外，使用 vue 时，\<style> 里的样式真难捉摸，我觉得是不是 build 的一些 bug ，明明一样的样式控制代码，有时候去掉跟没去掉样式没啥差别，有时候把直接在标签里在 style 属性里写的样式照搬到 \<style> 中，居然又会有很大的差别！明明已经运行正常的样式，在持续运行一段时间后，居然又变了！哎，反正真心累吧！真的很不想弄样式！



另外，记录下，刚本来想截图上传到 github 图床的，但是使用 picgo 一直上传不了，后来搜了下后，忽然记起，我改了我的 GitHub 用户名，所以一直上传不了！哎，我还以为 picgo 对 GitHub 这么不友好呢！重新添加了 token，然后就可以了！[PicGo上传图片到GitHub总是失败的特殊解决办法](https://www.shopee6.com/web/web-tutorial/picgo-github-fail.html) 好了，今天就这样了吧！我左手臂酸疼，不想弄了！



## vue 组件间通信的六种方式

参考来源：[segment：vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)

![img](https://upload-images.jianshu.io/upload_images/3174701-7a15ec352b4e7d84?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

A 和 B、B 和 C、B 和 D 都是父子关系，C 和 D 是兄弟关系，A 和 C 是隔代关系（可能隔多代）

### 方法一、`props`/`$emit`

父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。

#### 1.父组件向子组件传值

父组件向子组件传递 `users:["Henry","Bucky","Emily"]`

```vue
//App.vue父组件
<template>
  <div id="app">
    <users v-bind:users="users"></users>//前者自定义名称便于子组件调用，后者要传递数据名
  </div>
</template>
<script>
import Users from "./components/Users"
export default {
  name: 'App',
  data(){
    return{
      users:["Henry","Bucky","Emily"]
    }
  },
  components:{
    "users":Users
  }
}
```

```vue
//users子组件
<template>
  <div class="hello">
    <ul>
      <li v-for="user in users">{{user}}</li>//遍历传递过来的值，然后呈现到页面
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props:{
    users:{           //这个就是父组件中子标签自定义名字
      type:Array,
      required:true
    }
  }
}
</script>
```

**总结：父组件通过props向下传递数据给子组件。注：组件中的数据共有三种形式：data、props、computed**

#### 2.子组件向父组件传值（通过分发事件形式 (this.$emit()）

![img](https://upload-images.jianshu.io/upload_images/3174701-8d31dfc061d39fad?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```vue
// 子组件
<template>
  <header>
    <h1 @click="changeTitle">{{title}}</h1>//绑定一个点击事件
  </header>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      title:"Vue.js Demo"
    }
  },
  methods:{
    changeTitle() {
      this.$emit("titleChanged","子向父组件传值");//自定义事件  传递值“子向父组件传值”
    }
  }
}
</script>
```

```vue
// 父组件
<template>
  <div id="app">
    <app-header v-on:titleChanged="updateTitle" ></app-header>//与子组件titleChanged自定义事件保持一致
   // updateTitle($event)接受传递过来的文字
    <h2>{{title}}</h2>
  </div>
</template>
<script>
import Header from "./components/Header"
export default {
  name: 'App',
  data(){
    return{
      title:"传递的是一个值"
    }
  },
  methods:{
    updateTitle(e){   //声明这个函数
      this.title = e;
    }
  },
  components:{
   "app-header":Header,
  }
}
</script>
```

**总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件。**

### 方法二、`$emit`/`$on`

**这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级**。当我们的项目比较大时，可以选择更好的状态管理解决方案vuex。

```vue
    var Event=new Vue();
    Event.$emit(事件名,数据);
    Event.$on(事件名,data => {});
```



### 方法三、vuex

![img](D:\CodingsAndWorkplaces\WebStormWorkplace\DreamTreeSharer-frontend\src\store\vuex 调用过程)

#### 1.简要介绍Vuex原理

Vuex实现了一个**单向数据流**，**在全局拥有一个State存放数据**，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。

#### 2.简要介绍各模块在流程中的功能：

- Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，**执行dispatch方法触发对应action进行回应**。
- dispatch：操作行为触发方法，是唯一能执行action的方法。
- actions：**操作行为处理模块,由组件中的`$store.dispatch('action 名称', data1)`来触发。然后由commit()来触发mutation的调用 , 间接更新 state**。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
- commit：状态改变提交操作方法。对mutation进行提交，**是唯一能执行mutation的方法**。
- mutations：**状态改变操作方法，由actions中的`commit('mutation 名称')`来触发**。**是Vuex修改state的唯一推荐方法**。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。**页面显示所需的数据从该对象中进行读取**，利用Vue的细粒度数据响应机制来进行高效的状态更新。
- getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。

#### 3.Vuex与localStorage

vuex 是 vue 的状态管理器，存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态，**具体做法应该在vuex里数据改变的时候把数据拷贝一份保存到localStorage里面，刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state。**

```vue
<script>
let defaultCity = "上海"
try {   // 用户关闭了本地存储功能，此时在外层加个try...catch
  if (!defaultCity){
    defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
  }
}catch(e){}
export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      try {
      window.localStorage.setItem('defaultCity', JSON.stringify(state.city));
      // 数据改变的时候把数据拷贝一份保存到localStorage里面
      } catch (e) {}
    }
  }
})    
</script>
```

这里需要注意的是：由于vuex里，我们保存的状态，都是数组，而localStorage只支持字符串，所以需要用JSON转换：

```vue
<script>
JSON.stringify(state.subscribeList);   // array -> string
JSON.parse(window.localStorage.getItem("subscribeList"));    // string -> array    
</script>
```

### 方法四、`$attrs`/`$listeners`

#### 1.简介

多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。但如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，未免就有点大材小用。为此Vue2.4 版本提供了另一种方法----`$attrs`/`$listeners`

- `$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 interitAttrs 选项一起使用。
- `$listeners`：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/3174701-db162929eb89cb7f" alt="img" style="zoom:80%;" />

如上图所示`$attrs`表示没有继承数据的对象，格式为{属性名：属性值}。Vue2.4提供了`$attrs` , `$listeners` 来传递数据与事件，跨级组件之间的通讯变得更简单。简单来说：`$attrs`与`$listeners` 是两个对象，`$attrs` 里存放的是父组件中绑定的非 Props 属性，`$listeners`里存放的是父组件中绑定的非原生事件。

### 方法五、provide/inject

#### 1.简介

Vue2.2.0新增API,这对选项需要一起使用，**以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效**。一言而蔽之：祖先组件中通过provider来提供变量，然后在子孙组件中通过inject来注入变量。
**provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系**。

### 方法六、`$parent` / `$children`与 `ref`

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- `$parent` / `$children`：访问父 / 子实例

需要注意的是：这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据。

### 总结

常见使用场景可以分为三类：

- 父子通信：

父向子传递数据是通过 props，子向父是通过 events（`$emit`）；通过父链 / 子链也可以通信（`$parent` / `$children`）；ref 也可以访问组件实例；provide / inject API；`$attrs/$listeners`

- 兄弟通信：

Bus；Vuex

- 跨级通信：

Bus；Vuex；provide / inject API、`$attrs/$listeners`

# 2021年4月20日 给个人中心添加用户头像上传

[使用的组件](https://github.com/dream2023/vue-ele-upload-image)

[vue-image-crop-upload裁剪工具使用踩坑](https://blog.csdn.net/liu19721018/article/details/114687092)

昨天停电一天，手机关机没电，停电也没网，所以没有弄！

在完善用户信息修改过程中我遇到了以下问题，目前还没有解决！

就是，使用 vue 的 element-ui 库的 \<el-upload> 上传图片的问题！
我现在有个需求是，希望弄一个用户上传头像的功能，能够给用户提供裁切头像的功能，但是原生的 \<el-uplaod> 没有这个功能，所以我就找了个别人二次封装 \<el-upload> 的一个组件 【https://github.com/dream2023/vue-ele-upload-image】使用这个组件的好处是能够比较简单的就可以上传图片了！但是这其中也有一个问题，就是我想在上传图片前获取图片文件名（key），然后根据 key，再 axios 异步传递给本地后台生成一个 token（七牛云对象存储需要）然后再上传，如果是使用原生 \<el-upload> 标签的话，就可以使用 before-upload 钩子函数通过 file.name 获取 key，然后 axios 异步传递给后台，后台根据 key 生成 token 后再以 json 方式返回给前端，前端再根据 key 和 token 传递给远程七牛云对象存储！但是使用这个组件后我感觉使用 before-upload 不起作用，根本调用不了这个钩子函数！

然后我尝试的解决办法是，把这个组件给下载下来，然后提取其中的组件 vue-ele-upload-image-master\lib\EleUploadImage.vue 到我的 src/views/Cropper 目录下，然后改其中的对应的 \<el-upload> 的 before-upload 钩子函数里面给添加 axios 访问本地后台以获取 token，但是失败了，感觉也没有调用！

于是我尝试的第二种方法是不直接在 EleUploadImage.vue 中调用，而是在其中使用 props 暴露 before-upload 出来，然后我在我的 vue 组件 PersonalCenter.vue 中通过传递方法给 props 来调用，但是也调用不了！

 EleUploadImage.vue 中有封装 element-ui 的 \<el-uplaod>和 
import Cropper from "vue-image-crop-upload";
import EleGallery from "vue-ele-gallery";

这两个组件，其中 vue-image-crop-upload 是做图片裁剪功能的，我想到的第三种方法是直接使用 vue-image-crop-upload 组件，但是我还没尝试，由于 EleUploadImage.vue 的简便性，我想继续尝试用这个组件！

对了，还有个情况是：当我直接把文件名（key）和生成好的 token 写定在请求的 data 数据域中时，是可以正常裁剪后上传头像的，所以问题就是怎么在使用 EleUploadImage.vue 的前提下，将 key 传递给本地后台生成 token 然后返回！



# 2021年4月21日 发现以上问题出现的问题点，不过今天又遇到了新的问题

以上问题，其实是我没仔细地阅读源码而导致的！其实在【https://github.com/dream2023/vue-ele-upload-image】这个组件的源码中，有明确指定当使用不同属性（drag, crop）的时候，会调用里面封装的不同上传组件，里面使用了 v-if="crop" 和 v-if="!crop" 来判定是加载 \<el-upload> 还是 \<cropper>！这个问题是昨晚解决的，昨晚十一点多的时候，我朋友还远程帮我调试，后来在他调试过程中，我忽然看到了这个加载条件，然后我们一起验证了是否是因为 （drag, crop） 属性指定的原因，最后发现是这样的！

不过今天我又遇到了新的问题！

在指定 crop 属性，从而使用 \<cropper>  后，然后重写 cropper 中的 crop-success 钩子函数【记录一个小插曲：在将 crop-success 这个钩子函数给暴露给父组件（调用者），从而能够让父组件可以重写的目的，使用的是子组件中使用 props 暴露钩子函数，但是我这时候又想获取子组件中的 data 数据域，于是我查询了下，发现可以在子组件中使用 $emit() 分发事件的方式传递给父组件数据 [vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)就可以正常从本地后台获取 token 了，但是我发现它内部提交有一些问题：当我上传第一张图片时，提交给远程的 token 为空（但是我本地是生成了 token 并传递给了本地前台的），然后七牛云远程给报：`{"error":"token not specified"}` 然后我上传第二张不同图片后，它内部提交的 token 是第一张图片的 token，所以七牛云远程就报 `{"error":"key doesn't match with scope"}`于是我又上传第三张不同图片，得到的结果是和上传第二张得到的结果一样 `{"error":"key doesn't match with scope"}` 于是我陷入了思考，那是不是我两次上传同一张图片后就能成功呢？于是我测试了下，在连续上传同一张图片后，真的成功了！！！！！，我天！！！但是片刻喜悦过后，我要怎么解决这个问题呢？

```js
理想情况下的 key:token 对应关系
主板.png
7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:eEf8h-nntBdX9KsNRUm3PFeSodc=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OuS4u-advy5wbmciLCJkZWFkbGluZSI6MTYxODk3ODE3OX0=

显卡.png
7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:Q75N-YGg-U_8V0ApwOCbpBgMQdQ=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OuaYvuWNoS5wbmciLCJkZWFkbGluZSI6MTYxODk3ODE5NH0=

缓存.png
7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:MY_NrJ6b5qF1ouBIVlk38NTUFP8=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0Oue8k-WtmC5wbmciLCJkZWFkbGluZSI6MTYxODk3ODIyNX0=

-------------------------------------------------------------------------------------------------------------------
现实情况下的 key:token 对应关系
key: 主板.png
token: 

key: 显卡.png
token: 7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:eEf8h-nntBdX9KsNRUm3PFeSodc=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OuS4u-advy5wbmciLCJkZWFkbGluZSI6MTYxODk3ODE3OX0=

key: 缓存.png
token: 7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:Q75N-YGg-U_8V0ApwOCbpBgMQdQ=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OuaYvuWNoS5wbmciLCJkZWFkbGluZSI6MTYxODk3ODE5NH0=
```

## 使用 vuex 做数据（状态）管理

### 安装 vuex

```bash
npm install vuex -S
```

### 导入 vue 和 vuex

新建 /src/store/index.js

```js
import Vue from "vue";
import Vuex from 'vuex'
Vue.use(vuex)
```

### 记录 el-loading 持续加载的问题

由于我配置了全局拦截器用于拦截**请求与响应**，但是我在登录页面登录时，输入错误的验证码后，el-loading 就一直加载。我想是因为在我输入登录信息和错误验证码后，先设置了 el-loading 效果为 true，然后再去向本地后台发送 login 请求，本地后台处理 login 请求后将响应结果反馈到到前台，但是这时候响应拦截器拦截了本地后台返回的结果，因为检测到验证码匹配错误，所以就直接 return 了，那么在登录页面的 el-loading 就一直为 true 了，所以 el-loading 效果就一直在，于是我在想能不能在拦截器拦截到错误验证码反馈后，能够通知登录页面刷新或者是关闭 el-loading 效果，以方便用户再次输入，但是我转念一想，如果是刷新的话，那么用户输入的数据会没有，这样会不友好！但是通知登录页面将 el-loading 效果设置为 false，我又不会。所以我上网搜了下，发现可以在 请求与拦截 的配置里配置全局的 loading 效果，所以我决定尝试下！[vue axios封装和公共全局loading配置 合并loading请求效果 避免重复请求](https://blog.csdn.net/weixin_45115705/article/details/99672365)

整个过程还算顺利，其中报了两个错，搜了下就修复了，但是没做记录，小遗憾吧！决定休息下洗洗睡了！遇到 bug 太累了啊~

# 2021年4月22日 用户注册与用户登录成功信息获取

[获取用户信息]https://www.bilibili.com/video/BV1ar4y1K7qx?p=16&spm_id_from=pageDriver

跟着以上视频学习的！

在弄好了用户登录成功，然后 main.js 中路由导航守卫判断是否当前用户信息存在，如果不存在则发送请求向后台获取后，我在调试过程中发现了这个报错！

```js
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "search"
```

首先实现前面的功能还是蛮顺利吧！

![](https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/2021042210360.png)

遇到的这个报错我想主要是因为我提取了 Header.vue 组件，然后因为其里面包含搜索框，而搜索框中的内容是通过其他引用到 Header.vue 的父组件通过 Header.vue 中设置的 props 来传递给 Header.vue 的，所以我看上面报错的说明是指：避免在父组件中直接改变子组件(Header.vue) 中通过 props 声明的值，而是通过改变 data 中的值或者基于 props 中的值的 computed property(计算属性) 。但是我产生了一个疑问是：应该在父组件中设置 computed property 还是在子组件中呢？于是我拿起了 google 搜索，将报错 copy 进搜索栏，就得到了以下结果！

参考文章：

https://dev.to/jakzaizzat/avoid-mutating-a-prop-directly-ab9
https://stackoverflow.com/questions/40574661/avoid-mutating-a-prop-directly-since-the-value-will-be-overwritten

可以有两种写法，但是思想都是一样的！

**子组件 Header.vue 中写法**

```vue
<template>
	<input v-model="searchInput">
</template>
<script>
    props: {
        search: String
    }
 // https://dev.to/jakzaizzat/avoid-mutating-a-prop-directly-ab9
 // https://stackoverflow.com/questions/40574661/avoid-mutating-a-prop-directly-since-the-value-will-be-overwritten
  computed: {
    searchInput: {
      get: function(){
        return this.search;
      },
      set: function(newSearch){
        // 方式一：[update:] 为特定写法和父组件中 [.sync] 搭配
        this.$emit('update:search', newSearch)
        // 方式二：update-search 为自定义事件名
        // this.$emit('update-search', newSearch)
      }
    }
  },
</script>
<style scoped></style>
```

**父组件 Home.vue 写法**

```vue
<template>
<!--方式一-->
	<Header :search.sync="search" ></Header>
<!--方式二-->
	<!-- <Header :search="search" @update-search="updateSearch"></Header> -->
</template>
<script>
	data() {
        return {
            search: ''
        }
    },
   // 方式二
   // methods: {
   // 	updateSearch(newSearch){this.search = newSearch;}
   // }
</script>
<style scoped></style>
```

## 注销登录+未登录 bug 解决

[注销登录](https://www.bilibili.com/video/BV1ar4y1K7qx?p=17&spm_id_from=pageDriver)

主要是当用户点击注销后能够有[消息提示框](https://element.eleme.io/#/en-US/component/message-box#confirm)，提示用户是否真的注销，以防用户误操作！还有就是当用户点击确认注销后，清空 windows.sessionStorage 或者 vuex 中 token 和 userInfo，另外，退出到登录页面！

其中有使用到 element-ui 的 [下拉框 Command Event](https://element.eleme.io/#/en-US/component/dropdown#command-event)

[未登录菜单 bug 解决](https://www.bilibili.com/video/BV1ar4y1K7qx?p=19&spm_id_from=pageDriver)

## 在线聊天功能

[GitHub Demo 地址](https://github.com/is-liyiwei/vue-Chat-demo)

[在线聊天功能学习](https://www.bilibili.com/video/BV1ar4y1K7qx?p=61&spm_id_from=pageDriver)

[引入在线聊天功能并调整一些细节](https://www.bilibili.com/video/BV1ar4y1K7qx?p=62&spm_id_from=pageDriver)

http://qrne6et6u.hn-bkt.clouddn.com/nv1.jpg

**安装一些插件**

```bash
npm install sockjs-client
npm install stompjs
```

**安装好后配置 vue.config.js**

```js
// websocket 代理
proxyObj['/ws'] = {
    ws: true,
    target: 'ws://localhost:8081'
}
```

**store/index.js 导包**

```js
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
```

## 用户注册功能

导入导出时遇到一些报错，特地搜了下 ES6 语法的导入导出，忽然开朗了，哈哈哈~

记录一个滑铁卢，我在我的 `validators.js` 中定义了一些通用的字段验证方法【checkEmail(rule,value,callback),checkMobile(rule,value,callback)...】，但是定义这些方法的时候时分开定义的，暴露的时候是统一暴露的【export defalut{checkEmail,checkMobile,...}】，于是我在 `LoginAndRegister.vue` 中引入的时候使用的是 `import validators from "../../apis/validators";`这样我便可以使用 validators.checkEmail 的方式来调用里面定义的方法！但是，当我在 `validators.js` 中想使用 axios 异步的时候，需要使用到 `api.js` 中的分别定义且分别暴露的使用 axios 封装的 ajax 请求方法【export const getRequest(url,params), export const postRequest(url,params)...】，于是导入的方式还是 `import requestApi from "./api";`，这时候我使用 `requestApi.getRequest` 时，就老是给我报错，说 `getRequest is not defined`，我一直在想是哪里出问题了，后来今早我先搜了下 `ES6 import export` 阅读了这篇文章 [ES6 Modules and How to Use Import and Export in JavaScript](https://www.digitalocean.com/community/tutorials/js-modules-es6) 在阅读过程中，我的脑子里突然意识到了是不是跟 分别暴露和统一暴露有关？于是我验证了下，发现是有关！哎，这就是初学者的烦恼吧！遇到一些低级错误都要 debug 半天！

测试注册功能的时候，我有两个功能需求，一是在用户输入完 用户名 字段时，当鼠标焦点不在用户名输入框时，这时候发送 axios 封装的 Ajax 请求到后台，验证用户名是否已存在，于是我在后台写了如下放行规则：web.ignoring().antMatchers("/get-sms-code/\**","/username-existed/\**") 但是前端发送这两个请求时，老是报错提示：未登录！但是我明明放行了请求的啊！于是我搜到了下：`spring security 放行请求写法` 我本以为是不是我的放行请求路径写法的问题，因为我一直没弄懂放行请求的写法到底是怎么写的，一直是模仿别人怎么写，我就怎么写的。比如，我没弄懂，后面的 `/**` 是啥意思，但是浏览器给我的结果是 [Spring Security 两种资源放行策略，千万别用错了！](https://blog.csdn.net/u012702547/article/details/106395776) 我还是被标题吸引进去了，我看了下，感觉是这篇博文中描述的问题！于是我把后端放行请求的写法改成了如下：

```java
http.authorizeRequests()
    .antMatchers("/get-sms-code/**","/username-existed/**").permitAll()
    .anyRequest().authenticated()
```

于是后端返回结果就不是提示 **未登录！**了

### 注册时实现按钮倒计时功能

[vue中实现倒计时功能（刷新页面不清除）](https://blog.csdn.net/weixin_42204698/article/details/96474492)

### element-ui validator 表单复用

在开发中，需要对用户提交的表单进行校验规则复用，可以使用 bind() 方法可以用来绑定调用处的的数据以实现参数传递！

不过需要注意的是，在公共方法定义处的模块不要使用箭头函数，而是使用 function 定义方法，因为箭头函数中 this 是指向定义处的父级 this，而使用 function 则 this 指向调用者 this，可参考如下：

 [ElementUI 的校验函数 validator 的传参与复用](https://blog.csdn.net/qq_42941302/article/details/112799014)
[vue+elementUI项目实现自定义校验规则的传参复用性](https://blog.csdn.net/u012443286/article/details/105258443) 

**本项目使用：**

validators.js 中定义的 checkUsername()

```js
/**
 * 验证输入的用户名格式
 * @param rule
 * @param value
 * @param callback
 * [axios使用及配置明细小记](https://blog.csdn.net/u014225733/article/details/98722635)
 */
const checkUsername = function (rule, value, callback){
    // 移除前后所有空格
    value = value.trim()
    if (!value) {
        callback(new Error('请输入用户名！'));
    } else if (!constants.REG_OF_USERNAME.test(value)) {
        callback(new Error('用户名必须是6-10位之间的字母、下划线、@、. 并且不能以数字开头！'))
    } else if (!this.loginOrReg){ // 如果是注册表单用户名验证，才往后台发送用户名是否重复验证请求
        // 发送请求到后端验证是否用户名已存在！
        setTimeout(requestApi.getRequest(`/username-existed/${value}`).then(resp => {
            console.log(resp)
        }).catch(error => {
            console.log(error)
            }),500)
    }
}

// 统一暴露
export default {
    checkUsername,
}
```

LoginAndRegister.vue 中编写 el-form 的 rules 规则进行调用

```vue
<template>
	<el-form ref='regForm' :rules="rules" :model="regForm" v-show="!loginOrReg">
	    <el-form-item prop="username">
          <el-input type="text" v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
import validators from "../../apis/validators";
data(){
    return {
        regForm: {
            username: '',
        }
      // 登录还是注册切换指标
      loginOrReg: true,
        rules: {
           username: [{validator: validators.checkUsername.bind(this), required: true, trigger:'blur'}],
        }
    }
}
</script>
<style scoped></style>
```

[“call bind apply in javascript w3schools” Code Answer](https://www.codegrepper.com/code-examples/javascript/call+bind+apply+in+javascript+w3schools)

[javascript，检测对象中是否存在某个属性](https://www.cnblogs.com/kongxianghai/archive/2013/04/12/3015803.html)

### 记录一个小 bug

我本想将 el-form 所有字段验证给提取出来，以达到复用的目的，但是在我将所有字段验证方法给写好了后，测试验证都起作用了，但是，这时候我点击 登录 按钮和 注册按钮时，居然没反应了？？！！！我心累，真的郁闷，在写验证方法前都还好好的，写完后登录和注册不起作用了，没调用方法，也没其他报错，在查找半天无果后，我跑出去散了下心，然后回来洗个澡，再次打开电脑后，我打开了包含那些验证方法的 validators.js ，当我看到 callback() 后，我竟然直接就意识里认定是和这些 callback() 有关，于是我让这些方法不管三七二十一，执行到最后都需要执行下 callback() ，然后重启项目，这次居然可以了，我天！！！人的直觉和意识有时候是被某种力量给定了吧？所以保持努力，你的守护神会在暗处默默帮助你的，即使你看不到听不到，但是会有的，他和我们所在空间不一样，在你无助无力时，就会出现的，助你度过难关！哈哈哈~ （我只是为了记录个 bug）

# 2021年4月25日 主页面功能

在更改主页面（Home.vue）功能的时候，由于我的主页面包含我提取出来的 Header.vue 组件，这是一个公共组件，而在 Header.vue 里面我获取了本来是用户登录成功后存入 window.sessionStorage 的用户信息，存储的 key 为 userInfo！而我在我的主页面也需要使用到 userInfo，这样有两种方式可以获取到：一种是像 Header.vue 中获取 userInfo 一样，使用 window.sessionStorage.getItem("userInfo")！但是我觉得每个组件这样写一次都比较麻烦，所以我在想可不可以在 Header.vue 中加载一次，然后通过 this.$emit("getUserInfo", this.userInfo) 给暴露一个事件，然后在需要使用到（包含）Header.vue 的组件中触发这个事件从而获取到 Header.vue 中从 sessionStorage 中获取到的 userInfo！但是，我尝试了下，在主页面中获取 Header.vue 中通过触发 $emit() 暴露出的事件从而获取 userInfo 的方式有一个问题，那就是何时触发这个事件(getUserInfo)比较好？我尝试了下在 Home.vue 组件中使用 mounted{} 选项，但是我没获取到，反而报错，说是未定义的问题！于是在思索了一会儿后，我在想，是不是有一种存储数据的方式类似 window.sessionStorage 或者 window.localStorage 一样可以方便组件获取数据！这时候我的脑子里浮现了“组件间通信”，想起来我之前看过一篇博文讲的是 [vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626) 于是我直觉告诉我，我应该使用 vuex 了，如果继续使用 sessionStorage 的话，那将不方便我代码的后续管理，于是我去中文官网学习了下 vuex [#Vuex 是什么？](https://vuex.vuejs.org/zh/#vuex-是什么)

[vuex使用视频教学参考](https://www.bilibili.com/video/BV1hs411E7cB?p=22&spm_id_from=pageDriver)

## 对 Vuex 使用的整理

<img src="https://cdn.jsdelivr.net/gh/ITISummer/FigureBed/img/vuex 调用过程 .png" style="zoom:80%;" />

## 使用 picgo+github+jsdeliver 搭建个人图床

其实早已使用 GitHub+picGo ！但是今天我想把以前写的博客里存在于本地的图片给上传到 GitHub，我就想 typora 会有这个功能吗？我在 typora 编辑的博文中显示在本地的图片上鼠标右击了下，果不其然，第三个选项就是 upload image，于是我就网上搜了下 typora 配置上传图片，于是就参考到了下面链接！我想说明下，其实使用 GitHub 来作为图床有一些弊端，就是访问图片链接的话，开代理（翻墙）才可以访问，但是 picgo 上又没有配置 gitee（码云）的功能！作为免费图床，当然还可以选择 sm.sm 但是我觉得可能会不那么稳定，我的意思是怕有一天就倒闭了或者不开放了！所以我选了实力比较强硬的 GitHub，这次搜索我发现了原来可以配置 cdn 来加速访问，所以我配置了 cdn-jsdeliver ！我测试了下，在关闭代理后使用了 cdn 的图片链接可以正常访问，而直接上传到 GitHub 的图片是不能访问的！但是开了代理的话，所有的都能访问！

[typora自动上传图片](https://blog.csdn.net/weixin_41800884/article/details/104718367)

[Github + PicGo + jsDelivr 创建稳定、免费图床](https://www.jianshu.com/p/4a29945ad69c)

[Typora如何通过PicGo自动上传图片到图床](https://www.jianshu.com/p/a3371dc5802e)

# 2021年4月27日 记录一个错误

`Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/chat".`

造成这种错误的原因是：使用类似 `this.$router.push('/chat') ` 的使用方式！感觉使用 router.xxx() 进行跳转到同一地址的话，那就会包这个错误！然后使用的是 `<router-link to='/chat'>` 的方式的话，就不会报错！我查了下可以使用一种方式来让浏览器不打印错误，那就是使用 `catch()` 来捕获错误！[具体可参考此文章 - How to solve Avoided redundant navigation to current location error in vue?](https://stackoverflow.com/questions/62462276/how-to-solve-avoided-redundant-navigation-to-current-location-error-in-vue)

