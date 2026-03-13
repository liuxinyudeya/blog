<script setup></script>

<template>
  <div class="resume-container">
    <div class="resume-header">
      <div class="bg">
        <div class="skill-tags">
          <span>skill</span>
          <span>skill</span>
          <span>skill</span>
          <span>skill</span>
        </div>
      </div>
      <div class="person-card">
        <div class="person-head-img"></div>
        <div class="person-info">
          <div class="person-base-info">
            <h1>liuxy</h1>
            <p>
              <span>信息</span><span>信息</span><span>信息</span
              ><span>信息</span>
            </p>
            <p><span>信息</span><span>信息</span></p>
          </div>
          <div class="person-introduce"></div>
        </div>
      </div>
    </div>
    <div class="resume-body"></div>
  </div>
</template>

<style lang="scss" scoped>
$color-black: #010002;
$color-blue: #2c2ef0;
$color-white: #f9fefa;
$font-size: 16px;
$ine-height: 1.5;

$head-padding: 32px;
$head-img-width: 280px;
$head-img-height: 360px;
$bg-height: calc(34px + 32px + 32px + $head-img-height / 2);
$resume-header: calc(34px + 32px + 32px + $head-img-height + 64px);
.resume-container {
  box-sizing: border-box;
  font-size: $font-size;

  position: relative;

  margin: 0 auto;
  padding: 32px 24px;

  width: 1240px;
  height: 1754px;

  background-color: $color-black;
  font-family:
    "宋体",
    SimSun,
    "微软雅黑",
    Microsoft YaHei,
    Arial,
    sans-serif;
  line-height: 1.5;
  border-radius: 32px;
  overflow: hidden;

  .resume-header {
    width: 100%;
    height: $resume-header;
    border: 1px solid red;
    position: relative;
    .bg {
      width: 100%;
      height: $bg-height;
      background-color: $color-blue;
      border-radius: 36px;
      overflow: hidden;
      .skill-tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;

        margin: $head-padding;

        span {
          display: inline-block;
          padding: 4px 16px;

          border: 1px solid $color-white;
          color: $color-white;
          border-radius: 999px;
          white-space: nowrap;
        }
      }
    }
    .person-card {
      position: absolute;
      top: 34px + 32px + 32px;
      left: 0;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      width: 100%;
      height: $head-img-height;
      border: 1px solid red;
      .person-head-img {
        margin: 0 32px;
        width: $head-img-width;
        height: $head-img-height;
        border: 1px solid red;
      }
      .person-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
        .person-base-info,
        .person-introduce {
          width: 100%;
          height: 50%;
          border: 1px solid yellow;
        }

        .person-introduce {
          margin-top: 32px;
          padding: 16px;
          border: 1px solid $color-white;
          border-radius: 16px;
        }
      }
    }
  }
  .resume-body {
    padding: $head-padding;
    width: 100%;
    height: calc(100% - $resume-header);
    background-color: #fff;
    border-radius: 32px;
    overflow: hidden;
  }
}
</style>
