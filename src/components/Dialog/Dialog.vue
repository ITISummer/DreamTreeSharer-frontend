<template>
  <!-- 添加 pin 弹出框容器
  https://github.com/an-object-is-a/reactjs-pinterest-clone/tree/main/src
  -->
  <div class="add_pin_modal" v-show="showDialog">
    <div class="add_pin_container">
      <DialogLeft/>
      <DialogRight :commentsOrDreamForm="true"/>
    </div>
  </div>
</template>

<script>
import Upload from "../../views/Upload/Upload";
import DialogLeft from "./DialogLeft";
import DialogRight from "./DialogRight";

export default {
  props: {showDialog: Boolean},
  components: {Upload,DialogLeft,DialogRight}
}
</script>

<style scoped lang="scss">
/* -------------------------------------------- */
.add_pin_modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
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