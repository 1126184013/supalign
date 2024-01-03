<template>
  <div class="page">
    <div class="title">牙例分析</div>
    <!-- 口内 -->
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
        <div class="selectList">
          <div class="list_item" v-for="(item, index) in mockList">
            <div class="item_left">{{ item.name }}:</div>
            <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
              <el-option v-for="item in options[index]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- CT -->
    <div :class="clientWidth >= 1650 ? 'box' : ''">
      <div class="pageLeft">
        <div style="margin: 20px 10px; font-weight: 600;">CT照</div>
        <div class="imgList">
          <div class="img_item" v-for="(item, index) in list">
            <div class="img_box" v-if="index == 6">
              <el-image class="img" fit="cover" :src="item" :preview-src-list="list" :initial-index="index" />
              <text style="margin-top: 20px;">CT照</text>
            </div>
          </div>
        </div>
      </div>
      <div class="inform" :class="clientWidth >= 1650 ? '' : 'm-t'">
        <div class="title_1">
          <text class="text">CT照分析结果</text>
          <div class="edit">编辑</div>
        </div>
        <el-table :data="tableData" style="width: 100%" border :header-cell-style="headerCellStyle"
          :span-method="objectSpanMethod">
          <el-table-column label="Hellman咬合发育阶段" align="center">
            <el-table-column prop="name" align="center" />
            <el-table-column prop="left8" width="55" align="center" />
            <el-table-column prop="left7" width="55" align="center" />
            <el-table-column prop="left6" width="55" align="center" />
            <el-table-column prop="left5" width="55" align="center" />
            <el-table-column prop="left4" width="55" align="center" />
            <el-table-column prop="left3" width="55" align="center" />
          </el-table-column>
          <el-table-column label="ⅢA" align="center">
            <el-table-column prop="left2" width="55" align="center" />
            <el-table-column prop="left1" width="55" align="center" />
            <el-table-column prop="right1" width="55" align="center" />
            <el-table-column prop="right2" width="55" align="center" />
            <el-table-column prop="right3" width="55" align="center" />
            <el-table-column prop="right4" width="55" align="center" />
            <el-table-column prop="right5" width="55" align="center" />
            <el-table-column prop="right6" width="55" align="center" />
            <el-table-column prop="right7" width="55" align="center" />
            <el-table-column prop="right8" width="55" align="center" />
          </el-table-column>
        </el-table>
        <div class="selectList" style="margin-top: 40px;">
          <div class="list_item" v-for="(item, index) in CTMockList">
            <div class="item_left">{{ item.name }}:</div>
            <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
              <el-option v-for="item in CTOptions[index]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- 口内3D照 -->
    <div :class="clientWidth >= 1650 ? 'box' : ''">
      <div class="pageLeft">
        <div style="margin: 20px 10px; font-weight: 600;">口内3D照分析</div>
        <div class="imgList">
          <div class="img_item">
            <div class="img_box">
              <el-image class="img" fit="cover" :src="list[7]" :preview-src-list="list" :initial-index="7" />
              <text style="margin-top: 20px;">上颌</text>
            </div>
          </div>
        </div>
      </div>
      <div class="inform" :class="clientWidth >= 1650 ? '' : 'm-t'">
        <div class="title_1">
          <text class="text">口内3D照分析结果</text>
          <div class="edit">编辑</div>
        </div>
        <el-table :data="tableData2" style="width: 100%; fontSize: 16px;" border stripe
          :header-cell-style="headerCellStyle" :span-method="objectSpanMethod">
          <el-table-column prop="name" label="" width="45" align="center" />
          <el-table-column prop="value" label="" align="center" />
          <el-table-column prop="up" label="上颌" align="center" />
          <el-table-column prop="down" label="下颌" align="center" />
        </el-table>
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
      ],
      tableData: [
        {
          name: '牙列式',
          left8: '8',
          left7: '7',
          left6: '6',
          left5: '5',
          left4: '4',
          left3: '3',
          left2: '2',
          left1: '1',
          right1: '1',
          right2: '2',
          right3: '3',
          right4: '4',
          right5: '5',
          right6: '6',
          right7: '7',
          right8: '8',
        },
        {
          name: '牙列式',
          left8: '',
          left7: '',
          left6: '',
          left5: 'Ⅴ',
          left4: 'Ⅳ',
          left3: 'Ⅲ',
          left2: 'Ⅱ',
          left1: 'Ⅰ',
          right1: 'Ⅰ',
          right2: 'Ⅱ',
          right3: 'Ⅲ',
          right4: 'Ⅳ',
          right5: 'Ⅴ',
          right6: '',
          right7: '',
          right8: '',
        },
        {
          name: '牙列式',
          left8: '',
          left7: '',
          left6: '',
          left5: 'Ⅴ',
          left4: 'Ⅳ',
          left3: 'Ⅲ',
          left2: 'Ⅱ',
          left1: 'Ⅰ',
          right1: 'Ⅰ',
          right2: 'Ⅱ',
          right3: 'Ⅲ',
          right4: 'Ⅳ',
          right5: 'Ⅴ',
          right6: '',
          right7: '',
          right8: '',
        },
        {
          name: '牙列式',
          left8: '8',
          left7: '7',
          left6: '6',
          left5: '5',
          left4: '4',
          left3: '3',
          left2: '2',
          left1: '1',
          right1: '1',
          right2: '2',
          right3: '3',
          right4: '4',
          right5: '5',
          right6: '6',
          right7: '7',
          right8: '8',
        },
      ],
      CTOptions: [
        [
          { value: 0, label: '无' },
          { value: 1, label: '乳牙列' },
          { value: 2, label: '替牙列期' },
          { value: 3, label: '恒牙列初期' },
        ],
        [
          { value: 0, label: '有多生牙' },
          { value: 1, label: '无多生牙' },
        ],
        [
          { value: 0, label: '有阻生牙' },
          { value: 1, label: '没有阻生牙' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有炎症' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有异常' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '关节吸收' },
          { value: 1, label: '关节不对称' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '鼻中隔偏曲' },
          { value: 2, label: '鼻甲肥大' },
          { value: 3, label: '无明显异常' },
        ],
      ],
      CTMockList: [
        { name: '牙齿发育阶段', value: 0 },
        { name: '多生牙', value: 0 },
        { name: '阻生牙', value: 0 },
        { name: '根尖', value: 0 },
        { name: '颌骨情况', value: 0 },
        { name: '关节情况', value: 0 },
        { name: '鼻腔情况', value: 0 },
      ],
      tableData2: [
        {
          name: '牙弓宽度',
          value: '尖牙间',
          up: '47.50mm',
          down: '47.50mm'
        },
        {
          name: '牙弓宽度',
          value: '第一前/乳磨牙间',
          up: '40.13mm',
          down: '40.13mm'
        },
        {
          name: '牙弓宽度',
          value: '第二前/乳磨牙间',
          up: '33.28mm',
          down: '33.28mm'
        },
        {
          name: '牙弓宽度',
          value: '第一磨牙宽度',
          up: '6.34mm',
          down: '6.34mm'
        },
      ]
    }
  },
  mounted() {
    this.clientWidth = document.body.clientWidth;
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    // 监听页面宽度
    handleResize() {
      this.clientWidth = document.body.clientWidth;
    },

    // 合并表头
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {//第二行表头隐藏
        return { display: 'none' }
      }
      return { backgroundColor: '#7BA9B9', color: '#fff', fontSize: '16px', height: '40px' }
    },

    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return { rowspan: 4, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }
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

        .img_box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0px 5px 30px;

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


    .title_1 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        margin: 20px 0;
        font-weight: 600;
      }

      .edit {
        color: #02a7f0;
        // font-size: 14px;
      }

    }

    .selectList {
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