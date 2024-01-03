<template>
  <div class="page">
    <Header :page="'home'"/>
    <div class="body">
      <img class="banner" :src="banner" />
      <div class="img_box">
        <img class="ai" :src="ai" />
        <div class="btn_box">
          <img @click="surface" class="item face" :src="face" />
          <img @click="goTODental" class="item dental" :src="dental" />
          <img @click="headside" class="item skull" :src="skull" />
          <img class="item video" :src="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import banner from "@/assets/home_2/banner.png";
import ai from "@/assets/home_2/ai.png";
import face from "@/assets/home_2/face.png";
import dental from "@/assets/home_2/dental.png";
import skull from "@/assets/home_2/skull.png";
import video from "@/assets/home_2/video.png";
import Header from "@/components/Header/index.vue";

const router = useRouter();

onMounted(() => {
  // 窗口滚动条设置
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "scroll";
});

// 退出登录
const outLogin = async () => {
  router.push({ path: "/login" });
}

// 面像分析
const surface = async () => {
  router.push({ path: "/face" });
}

// 牙例分析
const goTODental = async () => {
  router.push({ path: "/dental" });
}

// 头颅侧位分析
const headside = async () => {
  router.push({ path: "/headside" });
}
</script>

<style lang="scss" scoped>
.page {
  width: auto;
  height: 100vh;

  .body {
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_box {
      // border: 1px solid #000;
      display: flex;
      position: absolute;
      top: 80%;
      padding-bottom: 60px;

      .btn_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 824px;
        margin-left: 20px;

        .item {
          width: 390px;
          height: 265px;
          margin: 6px;
          border: 3px solid rgba(0, 0, 0, 0);
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
        }
        .item:hover{
          border: 3px solid #7BA9B9;
        }
      }
    }
  }
}
</style>