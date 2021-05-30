<template>
  <el-container>
    <Header/>
    <Aside/>
    <router-view/>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
export default {
  components: {Header,Aside},
}
</script>
