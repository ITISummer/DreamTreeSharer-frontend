<template>
<div>
  <p>{{msgInChild}}</p>
  <p>获取到的父组件中的值：{{msgInParent}}</p>
</div>
</template>

<script>
export default {
  name: "Child",
  data() {
    return {
      msgInChild: '子组件中原本值'
    }
  },
  computed: {
    msgInParent() {
      return this.$parent.msgInParent
    }
  }
}
</script>

<style scoped>

</style>