<template class="border">
  <div>
    <p>name: {{name}}</p>
    <p>ChildA的$attrs: {{$attrs}}</p>
    <ChildB v-bind="$attrs"></ChildB>
  </div>
</template>
<script>
const ChildB = () => import("./ChildB.vue");
export default {
  components: {
    ChildB
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    name: String // name作为props属性绑定
  },
  created() {
    console.log(this.$attrs);
    // { "age": "18", "gender": "女", "height": "158", "title": "SummerLv" }
  }
};
</script>

<style scoped>

</style>