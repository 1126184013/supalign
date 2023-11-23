<template>
  <div class="page">
    <div class="left">
      <img class="login" :src="login" />
      <div class="text">
        <span>Welcome!</span>
        <br />
        <span class="text2">欢迎来到牙贝美塑AI检测系统</span>
      </div>
    </div>
    <div class="right">
      <img class="logo" :src="logo" />
      <div class="form">
        <p>登录</p>
        <input class="input" placeholder="请输入账号" type="text" v-model="loginForm.user" />
        <input class="input" placeholder="请输入密码" type="password" v-model="loginForm.password" />
        <button class="btn" @click="handleLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import login from "@/assets/login.png";
import logo from "@/assets/logo.png";

const route = useRoute();
const router = useRouter();
const loginForm = ref({ user: "admin", password: "111111" });

onMounted(() => {
  // 隐藏窗口滚动条
  if (route.path === "/login") {
    document.body.style.overflow = "hidden";
  }
});

const handleLogin = async () => {
  const { user, password } = loginForm.value;
  if (user === "admin" && password === "111111") {
    router.push({ path: "/home" });
  } else {
    // 登录失败
    ElMessage({
      message: "账号或者密码错误",
      type: "error",
    });
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-width: 100vw;
  display: flex;
  overflow: hidden;

  .left {
    background-color: #fff;
    position: relative;

    .login {
      width: calc(100vh / 1080 * 960);
      height: 100vh;
    }

    .text {
      position: absolute;
      top: 110px;
      left: 68px;
      font-size: 87px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      line-height: 47%;
    }

    .text2 {
      font-size: 52px;
      position: relative;
      top: 39px;
    }
  }

  .right {
    width: calc(100vw - (100vh / 1080 * 960));
    height: 100vh;
    position: relative;

    .logo {
      // position: absolute;
      // top: 12%;
      // left: 68px;
      margin-left: 25%;
      padding-top: 5%;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);

      p {
        margin-bottom: 30px;
        font-size: 48px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #000000;
        line-height: 61px;
      }

      .input {
        width: 661px;
        height: 89px;
        margin: 30px 0;
        border: 1px solid #bfbfbf;
        border-radius: 10px;
        font-size: 40px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        // color: #bfbfbf;
        line-height: 48px;
        padding: 0 20px;
      }

      .btn {
        width: 300px;
        height: 88px;
        margin-top: 30px;
        background: #003399;
        border-radius: 44px;
        font-size: 40px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 48px;
      }
    }
  }
}
</style>