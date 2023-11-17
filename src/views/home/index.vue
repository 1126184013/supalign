<template>
  <div class="page">
    <Header state="0"></Header>

    <body>
      <img class="homeImg" :src="home" />
      <div class="main">
        <div class="content">
          <div class="title">
            <span>AI自测系统</span>
            <div class="underline"></div>
          </div>
          <div class="options">
            <div @click="toFace">
              <img class="optionsImg1" :src="facial" />
            </div>
            <div>
              <img class="optionsImg2" :src="dental" />
            </div>
            <div>
              <img class="optionsImg3" :src="skull" />
            </div>
            <div>
              <img class="optionsImg4" :src="video" />
            </div>
          </div>
        </div>
      </div>
    </body>

    <Footer></Footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import home from "@/assets/home/home.png";
import facial from "@/assets/home/facial.png";
import dental from "@/assets/home/dental.png";
import skull from "@/assets/home/skull.png";
import video from "@/assets/home/video.png";

const router = useRouter()

onMounted(() => {
  // 窗口滚动条设置
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "scroll";
});

const toFace = async () => {
    router.push({ path: '/face' })
}
</script>

<style lang="scss" scoped>
.select {
  color: #3D859E;
}

.page {
  width: 100vw;
  height: 100vh;

  .homeImg {
    width: 100vw;
  }

  .main {
    width: 100vw;

    .content {
      margin: 30px 18%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          font-size: 36px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #222222;
          line-height: 46px;
        }

        .underline {
          margin-top: 10px;
          width: 98px;
          height: 4px;
          background: #76a0b1;
        }
      }

      .options {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;

        .optionsImg1 {
          width: 36vw;
          margin: 10px 10px 10px 0;
        }

        .optionsImg2 {
          width: 25vw;
          margin: 10px 0 10px 10px;
        }

        .optionsImg3 {
          width: 25vw;

          margin: 0 10px 0 0;
        }

        .optionsImg4 {
          width: 36vw;
          margin: 0 0 0 10px;
        }
      }
    }
  }
}
</style>