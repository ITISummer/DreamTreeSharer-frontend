<template>
<div>
  <p>C组件获取到的A组件中的内容：{{msgInC}}</p>
</div>
</template>

<script>
export default {
  inject: ['provideInA'],
  data() {
    return {
      msgInC: this.provideInA
    }
  }
}
</script>

<style scoped>

</style>