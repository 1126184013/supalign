<template>
  <div class="page">
    <div class="box">
      <img src="../../assets/face2/face1.png" class="img">
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;

  .box {
    margin: 100px;
    width: 190px;
    height: 130px;
    border: 1px solid #000;
    overflow: hidden;
    // container-type: inline-size;
    position: relative;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // width: 100cqw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>