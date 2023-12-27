<template>
  <div class="header" :class="page == 'home' ? '' : 'bgc'">
    <div class="box" :class="page == 'home' ? '' : 'width'">
      <img class="logo" :src="logo" @click="goToHome" />

      <div class="info">
        <el-icon :size="25">
          <BellFilled />
        </el-icon>
        <!-- <el-dropdown class="item m-l-r">
        <span class="el-dropdown-link">
          <span style="font-size: 22px;"> 测试111</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>暂无其他数据</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
        <el-avatar class="avatar" :size="40" :src="circleUrl" />
        <span class="name">测试账号11</span>
        <div style="font-size: 18px; cursor: pointer;" @click="outLogin">注销</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";

const props = defineProps(['page'])
const router = useRouter()

const circleUrl = ref('')
const outLogin = async () => {
  router.push({ path: "/login" });
}
const goToHome = () => {
  router.push({ path: "/" });
}
</script>

<style lang="scss" scoped>
.header {
  width: auto;
  padding: 30px 32px;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 427px;
      height: 40px;
      // margin-left: 30px;
    }

    .info {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #030303;
      line-height: 50px;

      .avatar {
        margin-left: 50px;
      }

      .name {
        margin: 0 50px 0 10px;
      }

      .item {
        margin: 0 10px;

        .el-dropdown-link {
          font-size: 18px;
          font-weight: 400;
          color: #030303;
          line-height: 50px;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .width {
    width: 100% !important;
  }
}

.bgc {
  background-color: #f2f2f2;
}
</style>