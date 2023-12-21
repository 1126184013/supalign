<template>
  <div class="page">
    <Header />

    <body>
      <div v-if="statecode == 0">
        <img class="homeImg" :src="home" />
        <div class="main">
          <div class="content">
            <div class="title">
              <span>AI自测系统</span>
              <div class="underline"></div>
            </div>
            <div class="options">
              <div @click="surface">
                <div class="optionsImg1">
                  <div class="optiontext">面像分析</div>
                </div>
              </div>
              <div>
                <div class="optionsImg2">
                  <div class="optiontext">牙列分析</div>
                </div>
              </div>
              <div @click="headside">
                <div class="optionsImg3">
                  <div class="optiontext">头颅侧位分析</div>
                </div>
              </div>
              <div>
                <div class="optionsImg4">
                  <div class="optiontext">视频分析</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="statecode == 1">
        <Face @tabs="tabstate" />
      </div>
    </body>

    <footer>
      <div class="bottom">
        <div style="font-size: 16px">
          <el-row>
            <el-col :span="4" :offset="2">关于公司</el-col>
            <el-col :span="5" :offset="1">0-12岁儿童颜面发育管理</el-col>
            <el-col :span="5" :offset="1">牙贝美塑产品</el-col>
            <el-col :span="5" :offset="1">联系我们</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="7">错畸形的危害</el-col>
            <el-col :span="5" :offset="1">嘟嘟嘴·吞咽辅助训练器</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="7">国内外专家意见</el-col>
            <el-col :span="5" :offset="1">小颜盒·口腔功能辅助训练包</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="7">家长应该怎么做</el-col>
            <el-col :span="5" :offset="1">塑贝牙·牙槽骨塑型器</el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="10" :offset="2">2022 成都牙贝美塑保留所有权力 ALL Rights Reserved</el-col>
            <el-col :span="10" :offset="2">互联网药品信息服务资格证书编号：(川)·非经营性·2021-0400</el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="14">蜀ICP备19025004号-1</el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="14">川公安网备51010702001572号</el-col>
          </el-row>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import logo from "@/assets/logo.png";
import home from "@/assets/home/home.png";
import facial from "@/assets/home/facial.png";
import dental from "@/assets/home/dental.png";
import { useRoute, useRouter } from "vue-router";
import skull from "@/assets/home/skull.png";
import video from "@/assets/home/video.png";
import Face from "@/views/face/index.vue";
import Header from "../../components/Header/index.vue";
const statecode = ref(0)
const router = useRouter();
onMounted(() => {
  // 窗口滚动条设置
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "scroll";
});
const tabstate = async () => {
  if (statecode.value == 1) {
    statecode.value = 0
  } else if (statecode.value == 0) {
    statecode.value = 1
  }

  console.log(statecode)
}
const outLogin = async () => {
  console.log('statecode')
  router.push({ path: "/login" });
}
const surface = async () => {
  router.push({ path: "/face" });
}
const headside = async () => {
  router.push({ path: "/headside" });
}
</script>

<style lang="scss" scoped>
.select {
  color: #3D859E;
}

.page {
  width: 100vw;
  height: 100vh;

  header {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 427px;
      height: 40px;
    }

    .info {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #030303;
      line-height: 50px;

      .item {
        margin: 0 10px;

        .el-dropdown-link {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #030303;
          line-height: 50px;
        }
      }
    }
  }

  .homeImg {
    width: 100vw;
  }

  .main {
    width: 100vw;

    .content {
      margin: 30px 18%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .anallist {
        border: 1px solid #000;
        width: 48%;
        padding: 15px 0;
        margin-top: 15px;
        display: flex;
        justify-content: center;
        font-size: 28px;

        .listimg {
          display: flex;
          width: 63%;
          // justify-content: space-around;
          align-items: center;

          >div {
            margin-left: 10px;
          }

        }

        img {
          width: 80px;
          height: 80px;
        }
      }

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

        .optiontext {
          font-size: 20px;
          padding: 28px 15px;
          font-weight: bold;
        }

        .optionsImg1 {
          background-image: url(../../assets/home/facial.png);
          background-size: 100% 100%;
          height: 250px;
          width: 36vw;
          margin: 10px 10px 10px 0;
        }

        .optionsImg2 {
          background-image: url(../../assets/home/dental.png);
          background-size: 100% 100%;
          height: 250px;
          width: 25vw;
          margin: 10px 0 10px 10px;
        }

        .optionsImg3 {
          background-image: url(../../assets/home/skull.png);
          background-size: 100% 100%;
          height: 250px;
          width: 25vw;
          margin: 0 10px 0 0;
        }

        .optionsImg4 {
          background-image: url(../../assets/home/video.png);
          background-size: 100% 100%;
          height: 250px;
          width: 36vw;
          margin: 0 0 0 10px;
        }
      }
    }
  }

  footer {
    background-color: #76a0b1;
    width: 100vw;
    height: 540px;

    .bottom {
      margin: 0 15%;
      padding: 40px;
      padding-bottom: 0;
      height: 480px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      :deep(.el-row) {
        margin-bottom: 40px;
      }
    }
  }
}
</style>