<template>
  <div class="footer">
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
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.footer {
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
</style>