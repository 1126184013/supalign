<template>
  <div class="body">
    <div>
      <div class="headtitle">
        <text class="fonthead">面像分析</text>
      </div>

      <div class="imglist">
        <div class="img_item">
          <el-image style="width: 173px; height: 187px" fit="cover"
            :src="faceimg.find(image => image.type === 'front').url" :preview-src-list="srcList">
          </el-image>
        </div>
        <div class="img_item">
          <el-image style="width: 173px; height: 187px" fit="cover"
            :src="faceimg.find(image => image.type === 'profile').url" :preview-src-list="srcList0">
          </el-image>
        </div>
        <div class="img_item">
          <el-image style="width: 173px; height: 187px" fit="cover"
            :src="faceimg.find(image => image.type === 'smile').url" :preview-src-list="srcList1">
          </el-image>
        </div>
      </div>
    </div>
    <div>
      <div class="headtitle mt">
        <text class="fonthead">诊断分析结果</text>
      </div>
      <div class="pdfupdata">
        <el-table :data="list" stripe style="width: 100%" :header-cell-style="headerCellStyle">
          <el-table-column label="正貌" width="120" align="center">
            <el-table-column prop="name" width="120" align="center" />
            <el-table-column prop="status" width="120" align="center" />
          </el-table-column>
          <el-table-column label="临床意义" prop="significance" header-align="center" />

          <el-table-column label="侧貌" width="120" align="center">
            <el-table-column prop="flankname" width="120" align="center" />
            <el-table-column prop="flankstatus" width="120" align="center" />
          </el-table-column>
          <el-table-column label="临床意义" prop="significance1" header-align="center" />
        </el-table>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import { Text } from 'vue'
export default {
  name: 'faceReport',
  props: ['face'],
  data() {
    return {
      srcList: [],
      srcList0: [],
      srcList1: [],
      faceimg: [],
      tableData: [{
        facename: '正面型',
        facevalue: '短面型',
        faceintro: '呈水平生长型，面型方短，常因上下领骨垂直发育不足所致，可伴有咬肌肥大，多见于骨性深覆合和宽面畸形的患者',
        flankname: '侧面型',
        flankvalue: '直',
        flankintro: '上下领骨前后关系协调，软组织额点、鼻底点和额前点基本在一条直线上;',
      }, {
        facename: '下面型',
        facevalue: '正常',
        faceintro: '面下1/3长于其它二等分',
        flankname: '唇位',
        flankvalue: '正常',
        flankintro: '鼻小柱与上唇前缘线间形成的一个侧面角',
      }, {
        facename: '对称性',
        facevalue: '面中线',
        faceintro: '眉间点、鼻尖点、上唇最凹点和颈部中点应位于正中矢状面上',
        flankname: '颜位',
        flankvalue: '正常',
        flankintro: '通过软组织鼻根点和眶点分别做FH平面垂线，两者形成“颌面区”，即JPF (jaw profile field)区，理想的额位应该在JPF区内',
      },],
      list: [],
    }
  },
  created() {
    console.log(this.face, 'ssssss')
    this.faceimg = this.face.img
    this.face.list.forEach((item, index) => {
      if (item.checked) {
        item.status = `${item.status} ?`
      }
      if (index < 6) this.list.push(item)
      else if (index >= 6) {
        this.list[index - 6]['flankname'] = item.name
        this.list[index - 6]['flankstatus'] = item.status
        this.list[index - 6]['significance1'] = item.significance
      }
    })
    this.srcList.push(this.faceimg.find(image => image.type === 'front').url)
    this.srcList0.push(this.faceimg.find(image => image.type === 'profile').url)
    this.srcList1.push(this.faceimg.find(image => image.type === 'smile').url)
  },
  components: { Text },
  methods: {
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {//第二行表头隐藏
        return { display: 'none' }
      }
    }
  }
}

</script>
  
<style lang="scss" scoped>
.pdfupdata {
  :deep(.el-table__inner-wrapper) {
    font-size: 16px;
  }
}

.fonthead {
  font-size: 18px;
  font-weight: 500;
}

tr {
  margin: 0;
  padding: 0;
}

td {
  margin: 0;
  padding: 0;
}

.headtitle {
  margin-bottom: 30px;
}

.body {
  width: 100%;
  margin: 0 auto;
  // border: 1px solid #030303;
  padding: 20px 0;

}

.imglist {
  width: 40%;
  display: flex;
  justify-content: space-between;

  .img_item {
    width: 173px;
    height: 187px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
  }
}

.mt {
  margin-top: 30px;
}
</style>