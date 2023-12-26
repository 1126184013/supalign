<template>
  <div class="page">
    <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" sortable label="Amount 1" />
      <el-table-column prop="amount2" sortable label="Amount 2" />
      <el-table-column prop="amount3" sortable label="Amount 3" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
        },
        {
          id: '12987123',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
        },
        {
          id: '12987124',
          name: 'Tom',
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
        },
        {
          id: '12987125',
          name: 'Tom',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
        },
        {
          id: '12987126',
          name: 'Tom',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
        },
      ]
    }
  },
  methods: {
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex,
    }) {
      console.log('行', row);
      console.log('列', column);
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }

    // 容器id="pdfCompany"
    // pdfFunc() {
    //   this.loadingFlag = true;    // 动画加载事件
    //   // 调用htmlToPdf工具函数
    //   htmlToPdf.getPdf('文件标题', "#pdfDom");
    //   // 定时器模拟按钮loading动画的时间
    //   setTimeout(() => {
    //     this.loadingFlag = false;
    //   }, 1000);
    // }
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 100vw;
  height: 100vh;
}
</style>