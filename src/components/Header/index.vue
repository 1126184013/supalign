<template>
  <div class="header" :class="page == 'face' ? 'bgc' : ''">
    <img class="logo" :src="logo" @click="goToHome" />

    <div class="info">
      <el-icon class="item">
        <BellFilled />
      </el-icon>
      <el-dropdown class="item m-l-r">
        <span class="el-dropdown-link">
          <span style="font-size: 22px;"> 测试111</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>暂无其他数据</el-dropdown-item>
            <!-- <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="item">测试账号11</span>
      <el-avatar class="item" :size="50" :src="circleUrl" />
      <div style="font-size: 22px;" @click="outLogin">注销</div>
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
  padding: 30px 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 427px;
    height: 40px;
    // margin-left: 60px;
  }

  .info {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #030303;
    line-height: 50px;

    .item {
      margin: 0 10px;

      .el-dropdown-link {
        font-size: 22px;
        font-weight: 400;
        color: #030303;
        line-height: 50px;
        display: flex;
        align-items: center;
      }
    }

    .m-l-r {
      margin: 0 30px 0 20px;
    }
  }
}

.bgc {
  background-color: #f2f2f2;
}
</style>