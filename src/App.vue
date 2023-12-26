<script>
export default {
  name: "App",
};
</script>

<script setup>
import { onMounted } from "vue";
import DevicePixelRatio from '@/utils/DevicePixelRatio.js';
// 初始化设备像素比
onMounted(() => {
  new DevicePixelRatio().init();
  // bodyScale();
})

const bodyScale = () => {
  var devicewidth = document.documentElement.clientWidth;//获取当前分辨率下的可是区域宽度
  var scale = devicewidth / 1920; // 分母——设计稿的尺寸
  document.body.style.zoom = scale;//放大缩小相应倍数
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped></style>
