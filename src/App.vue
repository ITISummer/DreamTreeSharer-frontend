<template>
  <div id="app">
    <!--    <router-link/> 类似于 a 标签-->
    <!-- app 组件中只有 router-view 组件 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
/**
全局样式
*/
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//[element-UI更改样式不生效的解决方法](https://blog.csdn.net/weixin_42630688/article/details/86551380)
#upload_container{
.el-upload-dragger {
  box-sizing: border-box;
  border: 10px dashed #d9d9d9;
  width: 360px;
  height: 400px;
}
}
</style>
