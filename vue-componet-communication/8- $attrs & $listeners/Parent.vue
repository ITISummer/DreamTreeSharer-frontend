<template>
  <div>
    <childA
        :name="name"
        :age="age"
        :gender="gender"
        :height="height"
        title="SummerLv"
    ></childA>
  </div>
</template>
<script>
const ChildA = () => import("./ChildA.vue");
export default {
  components: { ChildA },
  data() {
    return {
      name: "zhang",
      age: "18",
      gender: "女",
      height: "158"
    };
  }
};
</script>

<style scoped>

</style>