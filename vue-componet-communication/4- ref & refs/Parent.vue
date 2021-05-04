<template>
<div>
  <p>Parent</p>
  <Child ref="child"></Child>
  <p style="color: red">输出值请按 f12 查看控制台</p>
</div>
</template>

<script>
import Child from "./Child";
export default {
  components: {Child},
  mounted() {
    const comA = this.$refs.child;
    console.log(comA.name);  // Vue.js
    comA.sayHello();  // hello
  }
}
</script>

<style scoped>

</style>