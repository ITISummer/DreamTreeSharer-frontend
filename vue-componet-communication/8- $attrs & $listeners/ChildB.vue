<template>
  <div class="border">
    <p>age: {{age}}</p>
    <p>ChildB: {{$attrs}}</p>
  </div>
</template>
<script>

export default {
  inheritAttrs: false,
  props: {
    age: String
  },
  created() {
    console.log(this.$attrs);
    // { "gender": "女", "height": "158", "title": "SummerLv" }
  }
};
</script>

<style scoped>

</style>