<script setup>
import { ref, nextTick, onMounted } from "vue";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const leftArea = ref(null);

const imgArr = Array(1).fill({
  src: "/images/playground/flip/img1.jpg",
});

const showOverlay = ref(false);
const originalParent = ref(null);
const clickImg = async (e) => {
  console.log("clickImg", e.currentTarget, e.target, e.target.parentElement);
  const img = e.currentTarget.querySelector("img");

  showOverlay.value = true;
  originalParent.value = e.target.parentElement; // 记录原始父元素
  await nextTick(); // 等待浮层渲染完成

  const state = Flip.getState(img);
  leftArea.value.appendChild(img);
  Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
  });
};
const clickOverlay = async (e) => {
  const img = e.currentTarget.querySelector("img");

  showOverlay.value = false;
  // await nextTick(); // 等待浮层渲染完成
  const state = Flip.getState(img);
  originalParent.value.appendChild(img);
  Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
    onComplete: () => {
      console.log("动画完成");
      originalParent.value = null; // 清除记录的原始父元素
    },
  });
};
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (originalParent.value) e.keyCode === 27 && clickOverlay(e);
  });
});
</script>

<template>
  <div class="flip-container">
    <div class="main-container">
      <div class="grid-container">
        <div
          class="img-box"
          v-for="(img, index) in imgArr"
          :key="index"
          @click="clickImg"
        >
          <img :src="img.src" alt="" class="image" />
        </div>
      </div>
    </div>
    <div class="overlay-container" ref="overlay" v-show="showOverlay">
      <div class="left-area" ref="leftArea" @click="clickOverlay"></div>
      <div class="right-area"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flip-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: bisque;
  .main-container {
    width: 100%;
    height: 100%;

    .grid-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      .img-box {
        width: 200px;
        height: 275px;

        cursor: pointer;
      }
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(0, 0, 0, 0.1);
    .left-area {
      width: 42%;
      height: 100%;
    }
    .right-area {
      flex: 1;
      // width: 50%;
      height: 100%;
    }
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
