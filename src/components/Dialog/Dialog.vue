<template>
  <!--
  [添加 pin 弹出框容器]( https://github.com/an-object-is-a/reactjs-pinterest-clone/tree/main/src)
  [vue中直接修改props中的值并未给出警告，为啥](https://segmentfault.com/q/1010000015952520)
  [Vue2在子组件改变父组件传入props值三种方法（利用Vue的设计漏洞实现双向同步）](https://blog.csdn.net/qq_21567385/article/details/109213813)
  [vue中实现点击空白区域关闭弹窗](https://juejin.cn/post/6911863086487961607)
  [用一个div画出关闭图标](https://segmentfault.com/a/1190000008955548)
  -->
  <div class="add_pin_modal" v-show="showDialog">
    <i class="el-icon-close close-btn" @click="closeDialog"></i>
    <div class="add_pin_container">
      <DialogLeft ref="DialogLeft"/>
      <DialogRight
          ref="DialogRight"
          :showCommentsOrDreamForm="showCommentsOrDreamForm"
          />
    </div>
  </div>
</template>

<script>
import Upload from "../Upload/Upload";
import DialogLeft from "./DialogLeft";
import DialogRight from "./DialogRight";

export default {
  components: {Upload, DialogLeft, DialogRight},
  props: {
    showDialog: Boolean,
    showCommentsOrDreamForm: Boolean,
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog',false)
    }
  }
}
</script>

<style scoped lang="scss">
.add_pin_modal {
  width: 100%;
  height: 754px;
  //width: 1900px;
  //height: 850px;
  position: absolute;
  //position: relative;
  top: 50%;
  left: 50%;
  //top: 330px;
  //left: 700px;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.close-btn{
  width:60px;
  height:60px;
  border:2px solid white;
  border-radius: 50%;
  position: relative;
  //position: absolute;
  //top: 9%;
  //left: 50%;
  &:hover{
    cursor: pointer;
    background: #3a8ee6;
  }
  &:before{
    content: '';
    display: block;
    position: absolute;
    width:90%;
    height:2px;
    background: white;
    transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
    top:30px;
    left:5%;
  }
  &:after{
    content: '';
    display: block;
    position: absolute;
    width:90%;
    height:2px;
    background: white;
    transform:rotate(-45deg);
    -webkit-transform:rotate(-45deg);
    top:30px;
    left:5%;
  }
}
.add_pin_container {
  padding: 35px;
  width: 780px;
  height: 500px;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(45deg, #F73D3D 25%, #4F1948 50%, #D12378 75%, #24A4E9 100%)
}
</style>
