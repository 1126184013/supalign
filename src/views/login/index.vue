<template>
  <div class="page">
    <img :src="logo" class="logo">
    <div class="box">
      <div class="form">
        <div class="small">
          <img :src="small1" class="small1">
          <img :src="small2" class="small2">
        </div>
        <div class="content">
          <div class="title">欢迎登录</div>
          <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
            <el-tab-pane label="密码登录" name="first">
              <el-input class="input" size="large" type="text" v-model="user" placeholder="请输入账户名" :prefix-icon="User" />
              <el-input class="input" size="large" type="password" show-password v-model="password" placeholder="请输入密码"
                :prefix-icon="Lock" />
              <div class="options">
                <el-checkbox class="checkbox" v-model="checked" label="记住密码" />
                <div class="text">忘记密码</div>
              </div>
              <div class="btn" @click="handleLogin">登录</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <img :src="people" class="people">
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock } from '@element-plus/icons-vue'
import logo from "@/assets/home_2/logo.png";
import people from "@/assets/login/people.png";
import small1 from "@/assets/login/small_1.png";
import small2 from "@/assets/login/small_2.png";
import DevicePixelRatio from '@/utils/DevicePixelRatio.js';

const route = useRoute();
const router = useRouter();
let activeName = ref('first');
let user = ref('admin');
let password = ref('111111');
let checked = ref(false);

onMounted(() => {
  document.getElementsByTagName('body')[0].style.zoom = 'normal';
  console.log(document.getElementsByTagName('body')[0].style.zoom);
});

const handleLogin = async () => {
  if (user.value == "admin" && password.value == "111111") {
    new DevicePixelRatio().init();
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
  width: auto;
  height: 100vh;
  min-width: 1110px;
  min-height: 680px;
  background: url('@/assets/login/bgc.png') no-repeat;
  background-size: 100% 100%;
  position: relative;

  .logo {
    position: absolute;
    left: 4%;
    top: 11%;
    width: 15%;
    height: auto;
  }

  .box {
    width: 91%;
    height: 48%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(123, 169, 185, 0.6);

    .form {
      width: 36%;
      height: 150%;
      position: absolute;
      background-color: #fff;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 10px;
      padding-bottom: 2%;

      .small {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: absolute;
        // border: 1px solid #000;
        top: 50%;
        left: -110%;
        transform: translateY(-50%);

        .small1 {
          width: 80%;
          height: auto;
        }

        .small2 {
          width: 15%;
          height: auto;
          margin-top: 15%;
        }
      }

      .content {
        margin: 15%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          font-size: 37px;
          font-weight: 550;
          letter-spacing: 0.2em;
          // margin-bottom: 20px;
        }

        .demo-tabs {
          width: 100%;
          margin-top: 8%;

          :deep(.el-tabs__item.is-active) {
            color: rgba(123, 169, 185, 1);
          }

          :deep(.el-tabs__item) {
            font-size: 18px;
          }

          :deep(.el-tabs__active-bar) {
            width: 50% !important;
            height: 3px;
            transform: translateX(50%) !important;
            background-color: rgba(123, 169, 185, 1);
          }

          :deep(.el-tabs__nav-wrap::after) {
            background-color: #fff;
          }

          :deep(.el-tabs__content) {
            width: 100%;
          }

          .input {
            margin-top: 9%;

            :deep(.el-input__wrapper.is-focus) {
              box-shadow: 0 0 0 1px rgba(123, 169, 185, 1);
            }
          }

          .options {
            display: flex;
            margin-top: 9%;
            justify-content: space-between;
            align-items: center;

            .checkbox {
              :deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
                color: rgba(123, 169, 185, 1) !important;
              }

              :deep(.el-checkbox__input.is-checked) {
                --el-checkbox-checked-input-border-color: #7BA9B9;
                --el-checkbox-checked-bg-color: #7BA9B9;
              }

              :deep(.el-checkbox__input:hover) {
                --el-checkbox-input-border-color-hover: #7BA9B9;
              }
            }

            .text {
              font-size: 14px;
              color: #7BA9B9;
            }
          }

          .btn {
            width: 100%;
            background: #7BA9B9;
            color: #fff;
            margin: 9% 0;
            border-radius: 5px;
            font-size: 20px;
            line-height: 40px;
            text-align: center;
            font-weight: 600;
          }
        }
      }
    }
  }

  .people {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 60%;
    width: auto;
  }
}
</style>