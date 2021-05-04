<template>
<div>
  <p>B组件获取到的A组件中的内容：{{msgInB}}</p>
  <C></C>
</div>
</template>

<script>
import C from './C'
export default {
  components: {C},
  data() {
    return {
      msgInB: this.provideInA
    }
  },
  inject:['provideInA']
}
</script>

<style scoped>

</style>