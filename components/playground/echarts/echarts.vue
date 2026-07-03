<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
let option = {};
const myecharts = ref(null);
// ...
onMounted(() => {
  let chart = echarts.init(myecharts.value);
  option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {},
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      {
        type: "time",
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        xAxisIndex: 0,
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
      {
        xAxisIndex: 1,
        name: "直接访问",
        type: "line",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  chart.setOption(option);
});
// ...
</script>

<template>
  <h1>echarts</h1>
  <div ref="myecharts" id="myecharts"></div>
</template>

<style lang="scss" scoped>
#myecharts {
  margin-top: 10%;
  width: 800px;
  height: 400px;
  background-color: aliceblue;
}
</style>
