<template>
<div>
  <p>{{msgInParent}}</p>
  <button @click="changeMsgInChild">点击更改子类中的信息</button>
  <p>========以下为子组件中的信息========</p>
  <Child></Child>
</div>
</template>

<script>
import Child from "./Child";
export default {
  components: {Child},
  data(){
    return {
      msgInParent: '这是父类中的信息'
    }
  },
  methods: {
    changeMsgInChild() {
      this.$children[0].msgInChild = "这是父组件中更改后的子组件的值"
    }
  }
}
</script>

<style scoped>

</style>