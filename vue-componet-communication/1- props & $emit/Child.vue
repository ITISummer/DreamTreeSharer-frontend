<template>
  <div>
    <span style="color: red" v-for="(item, index) in articles" :key="index">{{item}},</span>
    <br>
    <button @click="reverseArticles">子组件通过 $emit() 向父组件中传值</button>
  </div>
</template>

<script>
export default {
  // props: ['articles']
  props: {
    articles: Array
  },

  methods:{
    reverseArticles() {
      this.$emit("reverseArray",this.articles.reverse())
    }
  }

}
</script>

<style scoped>

</style>