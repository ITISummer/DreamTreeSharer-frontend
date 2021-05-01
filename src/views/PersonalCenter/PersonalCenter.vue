<template>
  <el-container>
    <Header :search.sync="search"></Header>
    <Aside></Aside>
    <router-view/>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
export default {
  components: {Header,Aside},
  data() {
    return {
      search: '',
    }
  },
}
</script>
<style scoped lang="scss">
</style>
