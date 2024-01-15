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
                    prop="itemName"
                    label="分析项目"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="measure"
                    label="测量值"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="stand"
                    label="标准值">
                    </el-table-column>
                    <el-table-column
                    prop="deviation"
                    label="偏差值">
                    </el-table-column>
                    <el-table-column
                    prop="sense"
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
      props: ['face','tabdata'],
      data() {
        return {
            srcList:[],
            standard:['83','80','3','45','18','4','21','19','73','59','17','30','26','64','88','53','61','77','64','55','124'],
          deviation:['4','4','2','3','2','3','4','4','4','3','3','6','4','2','3','3','3','7','2','3','8'],
          tabdaproj:['SNA','A_N_perp','SNB','Pog_N_perp','ANB','FMA','SN_MP','S_Go_N_Me','S_N','Go_Me','FH_NPo','Na_S_Ar','S_Ar_Go','Ar_Go_Me','Ar_Go_N','Na_Go_Me',
            'Sum_of_Angles','PtV_U6','ANS_Xi_Pm','Dc_Xi_Pm','U1_SN','U1_NA','L1_MP','L1_FH','L1_NB','U1_L1','UL_EP','LL_EP'],
            srcList0:[],
            srcList1:[],
            faceimg:[],
            url: '',
          srcList: [],
          tableData: [],
        }
      },
      created() {
        console.log(this.face,'created')
        let that = this
        this.url = this.face.climg
        this.srcList.push(this.url)
        this.tableData = this.tabdata

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