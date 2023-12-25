<template>
  <div class="page">
    <div id="pdfDom">
      <p>这是一段文本</p>
      <img src="../../assets/logo.png">
    </div>
    <el-button size="small" type="primary" @click="pdfFunc" :loading="loadingFlag">
      转成pdf
    </el-button>
  </div>
</template>

<script>
import htmlToPdf from "@/utils/htmlToPdf";

export default {
  data() {
    return {
      loadingFlag: false
    }
  },
  methods: {
    // 容器id="pdfCompany"
    pdfFunc() {
      this.loadingFlag = true;    // 动画加载事件
      // 调用htmlToPdf工具函数
      htmlToPdf.getPdf('文件标题', "#pdfDom");
      // 定时器模拟按钮loading动画的时间
      setTimeout(() => {
        this.loadingFlag = false;
      }, 1000);
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
}
</style>