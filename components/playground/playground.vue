<script setup>
import VueFeatures from "@components/vue-features/VueFeatures.vue";
// import BoxShadow from "@components/box-shadow/BoxShadow.vue";
import resume from "@components/resume/resume.vue";
import flip from "@components/playground/flip/flip.vue";
import fixMenu from "@components/playground/fix-menu/fixMenu.vue";
import echarts from "@components/playground/echarts/echarts.vue";
</script>

<!-- <VueFeatures /> -->

<!-- <resume/> -->

<template>
  <div class="playground-container">
    <!-- <VueFeatures></VueFeatures> -->
    <!-- <BoxShadow></BoxShadow> -->
    <!-- <resume></resume> -->
    <!-- <flip></flip> -->
    <!-- <fixMenu></fixMenu> -->
    <echarts></echarts>
  </div>
</template>

<style lang="scss" scoped>
.playground-container {
  box-sizing: border-box;
  position: relative;

  padding: 1em;

  width: 100vw;
  height: 100vh;

  background-color: antiquewhite;

  overflow: auto;
  font-size: 16px;
}
</style>
