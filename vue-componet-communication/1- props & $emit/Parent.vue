<template>
<div class="section">
  <p style="background: #8cc5ff">父组件通过 props 向子组件传值</p>
    <Child :articles="articles" @reverseArray="getReverseRes"></Child>
  <p style="background: #8cc5ff">父组件获取子组件反转数组后的值</p>
  <span style="color: red" v-for="(item, index) in reverseArticles" :key="index">{{item}},</span>
  </div>
</template>

<script>
import Child from "./Child";
export default {
  components: {Child},
  data() {
    return {
      articles: ['红楼梦', '西游记', '三国演义'],
      reverseArticles: [],
    }
  },
  methods: {
    getReverseRes(reverseRes) {
      this.reverseArticles = reverseRes;
    }
  }
}
</script>

<style scoped>

</style>