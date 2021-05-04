// Child1 中发送事件
<template>
  <div>
    <button @click="additionHandle">+加法器</button>
  </div>
</template>

<script>
import {EventBus} from "../../src/apis/eventBus";
export default {
  data(){
    return{
      num: 1
    }
  },
  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num: this.num++
      })
    }
  }
}
</script>

<style scoped>

</style>