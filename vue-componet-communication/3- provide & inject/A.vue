<template>
  <div>
    <p>A组件中的内容："{{ msgInA }}"</p>
    <p>A组件中提供的内容："A 组件 provide 的内容"</p>
    <B></B>
  </div>
</template>

<script>
import B from './B'

export default {
  components: {B},
  data() {
    return {
      msgInA: 'AAAAAAA'
    }
  },
  provide: {
    provideInA: "A 组件 provide 的内容"
  },
}
</script>

<style scoped>

</style>