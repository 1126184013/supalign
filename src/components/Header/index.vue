<template>
  <div class="header" :class="page == 'home' ? '' : 'bgc'" :style="{ 'min-width': minW + 'px' }">
    <div class="box" :class="pageStyle">
      <img class="logo" :src="logo" @click="goToHome" />

      <div class="info">
        <el-icon :size="25">
          <BellFilled />
        </el-icon>
        <el-avatar class="avatar" :size="40" :src="circleUrl" />
        <span class="name">测试账号11</span>
        <div style="font-size: 18px; cursor: pointer;" @click="outLogin">注销</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";

const props = defineProps(['page', 'minW'])
const router = useRouter()
const circleUrl = ref('')
const pageStyle = ref('')

onMounted(() => {
  if (props.page == 'home') {
    pageStyle.value = ''
  } else if (props.page == 'upload' || props.page == 'analyze') {
    console.log(1);
    pageStyle.value = 'width_2'
  } else pageStyle.value = 'width'
})

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
  padding: 20px 35px;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 257px;
      height: auto;
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

}

.width {
  width: 100% !important;
}

.width_2 {
  width: 1440px !important;
}

.bgc {
  background-color: #f2f2f2;
}
</style>