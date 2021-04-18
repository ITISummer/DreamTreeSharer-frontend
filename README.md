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

# 2021年4月18日-引入用户个人中心模块

[Vue修改用户信息~不要错过哦](https://blog.csdn.net/weixin_46370867/article/details/113448645)

参考以上文章，该文章使用的是 \<el-dialog>  不过为了适应本项目，我想改成 \<el-table> 吧，这样会更好看点！

另外，今天遇到一些问题，得记录下！

[npm run dev卡住 即 vue-cli-service serve卡住，不提示错误信息，进程也不关闭](https://blog.csdn.net/weixin_43711917/article/details/97970502)

首先是在创建一个 vue 组件后，不要直接在 \<template> 下写一些文本内容吧，这样会导致 build 的时候编译时卡住不动，没报错，也没提示，就是编译时卡住了，详解可以参考以上链接！

而在已经运行好的一个组件下，直接在 \<template> 中添加文本内容，则会报错：

<img src="https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/Snipaste_2021-04-18_21-43-11.png" style="zoom: 80%;" />

<img src="https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/Snipaste_2021-04-18_21-35-15.png" style="zoom:80%;" />

另外，使用 vue 时，\<style> 里的样式真难捉摸，我觉得是不是 build 的一些 bug ，明明一样的样式控制代码，有时候去掉跟没去掉样式没啥差别，有时候把直接在标签里在 style 属性里写的样式照搬到 \<style> 中，居然又会有很大的差别！明明已经运行正常的样式，在持续运行一段时间后，居然又变了！哎，反正真心累吧！真的很不想弄样式！



另外，记录下，刚本来想截图上传到 github 图床的，但是使用 picgo 一直上传不了，后来搜了下后，忽然记起，我改了我的 GitHub 用户名，所以一直上传不了！哎，我还以为 picgo 对 GitHub 这么不友好呢！[PicGo上传图片到GitHub总是失败的特殊解决办法](https://www.shopee6.com/web/web-tutorial/picgo-github-fail.html) 好了，几天就这样了吧！我左手臂酸疼，不想弄了！



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

![img](https://upload-images.jianshu.io/upload_images/3174701-e62ba449a0c2e7ac?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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

<img src="https://upload-images.jianshu.io/upload_images/3174701-db162929eb89cb7f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="img" style="zoom:80%;" />

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

