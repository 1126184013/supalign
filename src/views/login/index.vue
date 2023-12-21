<template>
  <div class="box">
    <div class="page">
      <div class="left">
        <div class="lefttext">
          专注0-12岁<br/>
           中国儿童颜面生长发育平衡管理
        </div>
        <!-- <div class="text">
          <span>Welcome!</span>
          <br />
          <span class="text2">欢迎来到牙贝美塑AI检测系统</span>
        </div> -->
      </div>
      <div class="right">
        <img class="logo" :src="logo" />
        <div class="form">
          <p>登录</p>
          <input class="input" placeholder="请输入账号" type="text" v-model="loginForm.user" />
          <input class="input" placeholder="请输入密码" type="password" v-model="loginForm.password" />
          <div class="btn" @click="handleLogin">登录</div>
        </div>
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
.box{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items: center;
}
.page {
  min-width: 55%;
  height: 70%;
  display: flex;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.233);

  .left {
    position: relative;
    width:50%;
    height: 100%;
    background-image: url(../../assets/login.png);
    background-size: 100% 100%;
    .lefttext{
      margin: 30px;
      font-size: 20px;
      font-size: 500;
    }
    .login {
      width: 100%;
      height: 100%;
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
    width:50%;
    height: 100%;
    position: relative;
    .logo {
      width: 60%;
      margin-left: 7%;
      margin-top: 10%;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      // left: 50%;
      // top: 40%;
      // transform: translate(-50%, -50%);

      p {
        // margin-bottom: 30px;
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #000000;
        // line-height: 61px;
      }

      .input {
        width: 80%;
        height: 40px;
        margin: 5% 0;
        border: 1px solid #bfbfbf;
        border-radius: 8px;
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        // color: #bfbfbf;
        // line-height: 48px;
        padding: 0 20px;
      }

      .btn {
        width: 35%;
        height: 20%;
        margin-top: 10%;
        background: #7BA9B9;
        border-radius: 44px;
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding: 5px 0;
      }
    }
  }
}
</style>