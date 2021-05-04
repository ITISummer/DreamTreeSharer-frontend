// Child2.vue 中接收事件
<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import {EventBus} from "../../src/apis/eventBus";
export default {
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>

<style scoped>

</style>