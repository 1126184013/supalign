<template>
    <div class="body">
        <div>
            <div class="headtitle">
                <text class="fonthead">头侧片分析</text>
            </div>
            
            <div class="imglist">
                
              <div>
                <!-- <img :src="faceimg[1].url" alt="" style="width: 120px;height: 130px;"> -->
                <el-image 
                    style="width: 310px; "
                    :src="url" 
                    :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
        </div>
        <div>
            <div class="headtitle">
                <text class="fonthead">诊断分析</text>
            </div>
            <div class="pdfupdata">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="daprojectte"
                    label="分析项目"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="maxillary"
                    label="测量值"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="jaw"
                    label="标准值">
                    </el-table-column>
                    <el-table-column
                    prop="deviation"
                    label="偏差值">
                    </el-table-column>
                    <el-table-column
                    prop="deviation"
                    label="临床意义">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="nextsty">
            <div>下载PDF</div>
            <div>保存</div>
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
            srcList:[],
            srcList0:[],
            srcList1:[],
            faceimg:[],
            url: '',
          srcList: [],
          tableData: [{
            daprojectte: 'SNA',
            maxillary: '79.8',
            jaw: '83',
            deviation:"4"
          }, {
            daprojectte: 'SNB',
            maxillary: '79.8',
            jaw: '83',
            deviation:"4"
          }, {
            daprojectte: 'ANB',
            maxillary: '2',
            jaw: '83',
            deviation:"4"
          }, {
            daprojectte: 'Ptm-A(mm)',
            maxillary: '79.8',
            jaw: '83',
            deviation:"4"
          }, {
            daprojectte: 'Ptm-s(mm)',
            maxillary: '12',
            jaw: '18',
            deviation:"2"
          }, {
            daprojectte: 'PP-FH',
            maxillary: '0.1',
            jaw: '4',
            deviation:"3"
          }, {
            daprojectte: 'PP-MP',
            maxillary: '27',
            jaw: '21',
            deviation:"4"
          }, 
        ]
        }
      },
      created() {
        console.log(this.face,'created')
        this.url = this.face.climg
        this.srcList.push(this.url)
      },
      components:{ Text },
      methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
      }
      }
    
  </script>
  
<style lang="scss" scoped>
.pdfupdata{
  padding-bottom: 10%;
}
.nextsty{
  margin:10% auto;
  display:flex;
  justify-content: space-evenly;
  >div{
    width:20%;
            background-color:#7BAABA;
            text-align:center;
            color:#fff;
            padding:8px 0;
            border-radius:5px;
  }
}
.fonthead{
    font-size: 18px;
    font-weight: 500;
}
tr{
    margin: 0;
    padding: 0;
}
td{
    margin: 0;
    padding: 0;
}
.headtitle{
    height: 50px;
}
.body{
        width: 100%;
        margin: 0 auto;
        // border: 1px solid #030303;
        padding: 20px 0;

    }
.imglist{
      width: 100%;
      padding-bottom: 80px;
      display: flex;
      div{
        margin-left: 5%;
        text-align: center;
      }
      
    }
</style>