<template>
  <div>
    <div class="body">
        <div class="liftimg" v-if="editshow == 0">
          <div>
            <!-- <el-image 
            :src="url" 
            :preview-src-list="srcList">
          </el-image> -->
            <canvas ref="myCanvas" @click="addPoint"  :width="canvasWidth" :height="canvasHeight"></canvas>
          </div>
          <!-- <img src="../../assets/15251548944895.png" alt="" style="width: 120px;height: 130px;"> -->
          
        </div>
        <div class="rightlist" v-if="editshow == 0">
          <div style="display: flex;justify-content: space-between;padding-bottom: 3%;">
            <text>头侧片分析结果</text>
            <el-button type="primary" @click="edit">编辑</el-button>
          </div>
          
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="itemName"
              label="分析项目"
              >
            </el-table-column>
            <el-table-column
              prop="measure"
              label="测量值"
              >
            </el-table-column>
            <el-table-column
              prop="stand"
              label="标准值"
              width="180">
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
        
        <div class="nextsty" v-if="editshow == 1">
          <Edit @update="update" :editstart="editstart"></Edit>
        </div>
    </div>
    <div class="next" v-if="editshow == 0">
      <div class="nextsty" @click="nextfunc">生成报告</div>
    </div>
  </div>
    
  </template>
  
  <script>
  import axios from 'axios'
  import  Edit  from './edit.vue'
import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['face'],
      
      data() {
        return {
          url: '',
          editshow:0,
          canvas:'',
          ctx:'',
          points: [], // 存储标点坐标的数组
          canvasWidth:600,
          canvasHeight:800,
          tabdaproj:['SNA','A_N_perp','SNB','Pog_N_perp','ANB','FMA','SN_MP','S_Go_N_Me','S_N','Go_Me','FH_NPo','Na_S_Ar','S_Ar_Go','Ar_Go_Me','Ar_Go_N','Na_Go_Me',
            'Sum_of_Angles','PtV_U6','ANS_Xi_Pm','Dc_Xi_Pm','U1_SN','U1_NA','L1_MP','L1_FH','L1_NB','U1_L1','UL_EP','LL_EP'],
          tableData: [
            {
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },
            {
              itemName:'',
              measure:'',
              stand:'80',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'3',
              deviation:'2',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'45',
              deviation:'3',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'18',
              deviation:'2',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'4',
              deviation:'3',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'21',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'19',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'73',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'59',
              deviation:'3',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'17',
              deviation:'3',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'30',
              deviation:'6',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'26',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'64',
              deviation:'2',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'55',
              deviation:'3',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'124',
              deviation:'8',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },{
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            },

          ],
          editstart:{},
          scale:1
        }
      },
      created() {
        let that = this
        console.log(this.face,'头侧')
        this.url = this.face.climg
        // this.canvasWidth = this.face.cllist.width
        // this.canvasHeight = this.face.cllist.height
        this.scale = (550 / this.face.cllist.width).toFixed(2);
        //编辑组件赋值
        this.editstart.img = this.face.climg
        this.editstart.list = this.face.cllist
        //列表
        this.tabdaproj.map((item,index)=>{
          // that.tableData.push({})
          that.tableData[index].itemName = item
          that.tableData[index].measure =Number(this.face.cllist.result[index]).toFixed(1)
          // console.log(that.tableData,'下标数据')

        })
        
        console.log(this.tableData,'列表数据')
      },
      components:{ 
        Text,
        Edit
       },
      mounted(){
        //返回图片标点坐标处理
        let that = this
        const image = new Image();
        image.onload = () => {
          //返回图片标点坐标处理
          this.face.cllist.landmarks.map((item, index) => {
            that.points.push({ x: item[0], y: item[1] });
          });
          console.log(this.points, '标点坐标');
          this.drawCanvas();
        };

        image.src = this.url;
      },
      computed: {
        canvasWidth() {
          return this.face.cllist.width * this.scale; // 根据缩放比例调整canvas宽度
        },
        canvasHeight() {
          return this.face.cllist.height * this.scale; // 根据缩放比例调整canvas高度
        },
      },
      methods: {
        drawCanvas() {
          const canvas = this.$refs.myCanvas;
          const ctx = canvas.getContext('2d');

          const image = new Image();
          image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 绘制图片时指定宽度和高度为 canvas 的宽度和高度
            this.drawPoints(); // 绘制标点
          };

          image.src = this.url;
        },
        drawPoints() {
          const canvas = this.$refs.myCanvas;
          const ctx = canvas.getContext('2d');

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const image = new Image();
          image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 绘制图片时指定宽度和高度为 canvas 的宽度和高度
            //颜色
            ctx.fillStyle = 'red';
            this.points.forEach(point => {
              const x = point.x * this.scale; // 根据缩放比例计算实际坐标
              const y = point.y * this.scale; // 根据缩放比例计算实际坐标

              ctx.beginPath();
              //标点大小
              ctx.arc(x, y, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.closePath();
            });
            // this.scale = 1;
          };

          image.src = this.url;
        },
        edit(){
          this.editshow = 1
        },
        update(){
          this.editshow = 0
          let that = this
        const image = new Image();
        image.onload = () => {
          //返回图片标点坐标处理
          this.face.cllist.landmarks.map((item, index) => {
            that.points.push({ x: item[0], y: item[1] });
          });
          console.log(this.points, '标点坐标');
          this.drawCanvas();
        };

        image.src = this.url;

        },
        nextfunc(){
          this.$emit('update');
        }
      }
    }
    
  </script>
  
<style lang="scss" scoped>
.body{
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  .next{
      display: flex;
      position: relative;
      left: 30%;
      top: 5%;
      // margin: 0 auto;
      padding: 10%;
      .nextsty{
        width: 20%;
        padding: 8px 0;
        background-color: #7BA9B9;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
      }
    }
}
  .liftimg{
      width: 40%;
      height: 100%;

  }
  .rightlist{
      width: 50%;
      height: 100%;
  }
</style>