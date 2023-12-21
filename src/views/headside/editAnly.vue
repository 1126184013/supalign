<template>
    <div class="bodyed">
      <div class="headlist">
        <div class="tool">
          <div>
            <div class="toolicon">
              <img src="../../assets/bj.png" alt=""  style="width: 25px;">
              <text>编辑</text>
            </div>
            <div class="toolicon">
              <img src="../../assets/tj.png" alt=""  style="width: 25px;">
              <text>添加</text>
            </div>
          </div>
          <div class="modelimg">
            <img src="../../assets/zxt.png" alt="" style="width: 43px;">
            <div>点线模式</div>
          </div>
        </div>
        <div class="tool">
          <div>
            <div class="toolicon">
              <img src="../../assets/cd.png" alt=""  style="width: 25px;">
              <text>长度</text>
            </div>
            <div class="toolicon">
              <img src="../../assets/jd.png" alt=""  style="width: 25px;">
              <text>角度</text>
            </div>
          </div>
          <div class="modelimg" @click="delet">
            <img src="../../assets/cx.png" alt="" style="width: 43px;">
            <div>回退</div>
          </div>
        </div>
        <div class="tool">
          <div>
            <div class="toolicon" @click="zoomIn">
              <img src="../../assets/fd.png" alt=""  style="width: 25px;">
              <text>放大</text>
            </div>
            <div class="toolicon" @click="zoomOut">
              <img src="../../assets/sx.png" alt=""  style="width: 25px;">
              <text>缩小</text>
            </div>
          </div>
          <div class="modelimg" @click="brate">
            <img src="../../assets/jz.png" alt="" style="width: 43px;">
            <div>校准</div>
          </div>
        </div>
        <div class="tool" style="width: 30%;border: none;">
          <div class="modelimg" style="width: 22%;">
            <img src="../../assets/lk.png" alt="" style="width: 43px;">
            <div>轮廓重置</div>
          </div>
          <div style="width: 55%;">
            <div class="slider">
              <div class="demonstration">图片亮度</div>
              <el-slider v-model="value1"></el-slider>
            </div>
            <div class="slider">
              <div class="demonstration">图像灰度</div>
              <el-slider v-model="value1"></el-slider>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="width:50%">
          <canvas ref="myCanvas" @click="addPoint" @mousedown="startDrag" @mousemove="dragPoint" @mouseup="endDrag" :width="canvasWidth" :height="canvasHeight"></canvas>
        </div>
        <div style="width:49.8%">
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
    </div>
  </template>
  
  <script>
  import axios from 'axios'
import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['editstart'],
      data() {
        return {
          imageSrc: '',
          points: [], // 存储标点坐标的数组
          scale: 1, // 当前的缩放比例
          canvasWidth:500,
          canvasHeight:600,
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
        }
      },
      components:{ Text },
      created() {
        let that = this
        this.imageSrc = this.editstart.img
        console.log(this.imageSrc,'编辑')
        this.tabdaproj.map((item,index)=>{
          // that.tableData.push({})
          that.tableData[index].itemName = item
          that.tableData[index].measure = this.editstart.list.result[index]
          console.log(that.tableData,'下标数据')

        })
      },
      mounted() {
        this.drawCanvas()
      },
      computed: {
        canvasWidth() {
          return 500 * this.scale; // 根据缩放比例调整canvas宽度
        },
        canvasHeight() {
          return 600 * this.scale; // 根据缩放比例调整canvas高度
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

          image.src = this.imageSrc;
        },
    addPoint(event) {
      const canvas = this.$refs.myCanvas;
      const rect = canvas.getBoundingClientRect();

      const x = (event.clientX - rect.left) / this.scale; // 根据缩放比例计算实际坐标
      const y = (event.clientY - rect.top) / this.scale; // 根据缩放比例计算实际坐标

      this.points.push({ x, y });
      this.drawPoints();
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
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        });
      };

      image.src = this.imageSrc;
    },
    delet(){
      this.points.pop();
      this.drawCanvas();
    },
    zoomIn() {
      this.scale *= 1.2; // 放大缩放比例
      this.drawCanvas();
    },
    zoomOut() {
      this.scale /= 1.2; // 缩小缩放比例
      this.drawCanvas();
    },
    brate(){
      this.scale = 1;
      this.drawCanvas();
    }
      }
    }
    
  </script>
  
<style lang="scss" scoped>
.bodyed{
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.headlist{
  width: 100%;
  height: 13vh;
  background-color: #76A0B1;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  .tool{
    width: 15%;
    display: flex;
    justify-content: space-evenly;
    color: #FFFFFF;
    border-right: 1px solid #d3d1d1;
    .modelimg{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .toolicon{
      display: flex;
      padding-top: 5px;
      align-items: center;
      img{
        margin-right: 15px;
      }
    }
    .demonstration{
      width: 40%;
    }
  }
  .slider{
    display: flex;
  }
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 5px;
}

canvas {
  border: 1px solid #ccc;
  cursor: crosshair;
}
</style>