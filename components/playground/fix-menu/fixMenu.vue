<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
// const isBig = ref(false);
const clickMenu = (e) => {
  //   isBig.value = !isBig.value;
  //   console.log("click menu");
  const bg = e.currentTarget.querySelector(".bg");
  bg.classList.toggle("big");
  const state = Flip.getState(bg);
  Flip.from(state, {
    duration: 1,
    ease: "expo.inOut",
  });
};
</script>

<template>
  <div class="fix-menu-container">
    <div class="menu-btn" @click="clickMenu">
      <div class="bg"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fix-menu-container {
  position: relative;
  width: 100%;
  height: 100%;
  //   border: 1px solid black;

  .menu-btn {
    position: absolute;
    top: 1em;
    right: 1em;
    inset: 0;
    width: 4em;
    height: 4em;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100%;
      background-color: burlywood;
      border-radius: 8px;
    }
    .bg.big {
      position: fixed;
      //   width: calc(100vw - 2em);
      //   height: calc(100vh - 2em);
    }
  }
}
</style>
