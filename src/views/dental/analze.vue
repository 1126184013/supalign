<template>
  <div class="page">
    <div class="title">牙例分析</div>
    <div :class="clientWidth >= 1650 ? 'box' : ''">

      <div class="pageLeft">
        <div style="margin: 20px 10px; font-weight: 600;">口内照</div>
        <div class="imgList">
          <div class="img_item" v-for="(item, index) in list">
            <div class="img_box" v-if="index < 6">
              <el-image class="img" fit="cover" :src="item" :preview-src-list="list" :initial-index="index" />
              <text style="margin-top: 20px;">正面照</text>
            </div>
          </div>
        </div>
      </div>

      <div class="inform" :class="clientWidth >= 1650 ? '' : 'm-t'">
        <div style="margin: 20px 0; font-weight: 600;">分析结果 (22项)</div>
        <div class="leftList">
          <div class="list_item" v-for="(item, index) in mockList">
            <div class="item_left">{{ item.name }}:</div>
            <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
              <el-option v-for="item in options[index]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="rightList"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "analze",
  props: ['list'],
  data() {
    return {
      clientWidth: 0,
      options: [
        [
          { value: 0, label: '尖圆形' },
          { value: 1, label: '卵圆形' },
          { value: 2, label: '方圆形' },
        ],
        [
          { value: 0, label: '尖圆形' },
          { value: 1, label: '卵圆形' },
          { value: 2, label: '方圆形' },
        ],
        [
          { value: 0, label: 'Ⅰ度拥挤' },
          { value: 1, label: 'Ⅱ度拥挤' },
          { value: 2, label: 'Ⅲ度拥挤' },
        ],
        [
          { value: 0, label: 'Ⅰ度拥挤' },
          { value: 1, label: 'Ⅱ度拥挤' },
          { value: 2, label: 'Ⅲ度拥挤' },
        ],
        [
          { value: 0, label: '水平对称性' },
          { value: 1, label: '前后向对称性' },
        ],
        [
          { value: 0, label: '水平对称性' },
          { value: 1, label: '前后向对称性' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '远中阶梯' },
          { value: 1, label: '终末平面平齐' },
          { value: 2, label: '近中阶梯' },
        ],
        [
          { value: 0, label: '远中阶梯' },
          { value: 1, label: '终末平面平齐' },
          { value: 2, label: '近中阶梯' },
        ],
        [
          { value: 0, label: '反𬌗' },
          { value: 1, label: '切𬌗' },
          { value: 2, label: '正常' },
          { value: 3, label: '过大' },
        ],
        [
          { value: 0, label: '反𬌗' },
          { value: 1, label: '正常' },
          { value: 2, label: '正锁𬌗' },
        ],
        [
          { value: 0, label: '有' },
          { value: 1, label: '无' },
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '深覆𬌗' },
          { value: 2, label: '开𬌗' },
          { value: 3, label: '切𬌗' },
        ],
        [
          { value: 0, label: '开𬌗' },
          { value: 1, label: '正常' },
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' },
        ],
        [
          { value: 0, label: '面中线' },
          { value: 1, label: '上颌中线' },
          { value: 2, label: '下颌中线' },
        ],
        [
          { value: 0, label: '无龋齿' },
          { value: 1, label: '有龋齿' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '优良' },
          { value: 1, label: '差' },
          { value: 1, label: '牙面软垢' },
          { value: 1, label: '牙龈红肿' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有' },
        ],
      ],
      mockList: [
        { name: '弓型形态-上颌', value: 0 },
        { name: '弓型形态-下颌', value: 0 },
        { name: '拥挤度-上颌', value: 0 },
        { name: '拥挤度-下颌', value: 0 },
        { name: '对称性-上颌', value: 0 },
        { name: '对称性-下颌', value: 0 },
        { name: '磨牙关系-左', value: 0 },
        { name: '磨牙关系-右', value: 0 },
        { name: '尖牙关系-左', value: 0 },
        { name: '尖牙关系-右', value: 0 },
        { name: '乳牙终末平面-左', value: 0 },
        { name: '乳牙终末平面-右', value: 0 },
        { name: '前牙覆盖情况', value: 0 },
        { name: '后牙覆盖情况', value: 0 },
        { name: '个别牙反𬌗', value: 0 },
        { name: '前牙覆𬌗情况', value: 0 },
        { name: '后牙覆𬌗情况', value: 0 },
        { name: 'Spee曲线曲度', value: 0 },
        { name: '中线', value: 0 },
        { name: '龋齿', value: 0 },
        { name: '口腔卫生', value: 0 },
        { name: '牙体龋坏', value: 0 },
      ]
    }
  },
  mounted() {
    this.clientWidth = document.body.clientWidth;
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.clientWidth = document.body.clientWidth;
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30px 20px;

  .title {
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 10px;
  }

  .pageLeft {
    width: 40%;
    min-width: 750px;

    .imgList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .img_item {
        width: 30%;
        min-width: 173px;
        margin: 0px 5px 30px;

        .img_box {
          display: flex;
          flex-direction: column;
          align-items: center;

          .img {
            width: 173px;
            height: 187px;
          }
        }
      }
    }

  }

  .inform {
    width: 58%;
    padding-bottom: 5%;
    margin-left: 2%;
    // background-color: red;

    .leftList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .list_item {
        width: 48%;
        margin-bottom: 30px;
        display: flex;

        .item_left {
          width: 220px;
        }

        :deep(.el-input__inner) {
          font-size: 18px;
          user-select: none;
        }
      }
    }
  }

  .box {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .m-t {
    width: 70% !important;
    min-width: 750px;
    margin-top: 80px;
    margin-left: 0 !important;
  }
}
</style>