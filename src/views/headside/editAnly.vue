<template>
    <div class="bodyed">
      <div class="headlist">
        <div class="tool">
          <div>
            <div class="toolicon" @click="imgedig">
              <img src="../../assets/bj.png" alt=""  style="width: 25px;">
              <text>编辑</text>
            </div>
            <div class="toolicon" @click="isPointLineMode = !isPointLineMode">
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
          isDragging:false, // 是否正在拖动
          pointRadius: 10, // 标点半径
          pointsindex:null, // 当前正在拖动的点在points中的索引
          currentDraggingPoint: null, // 当前正在拖动的点
          points: [], // 存储标点坐标的数组
          scale: 1, // 当前的缩放比例
          canvasWidth:500,
          canvasHeight:600,
          isPointLineMode:false, // 是否处于标点连线模式
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
        console.log(this.editstart,'编辑')
        let that = this
        this.imageSrc = this.editstart.img
        this.scale = (this.canvasHeight / this.editstart.list.height);
        
        this.tabdaproj.map((item,index)=>{
          that.tableData[index].itemName = item
          that.tableData[index].measure = Number(this.editstart.list.result[index]).toFixed(1)
          

        })
      },
      mounted() {
        let that = this
        this.editstart.list.landmarks.map((item,index)=>{
          that.points.push({x:item[0],y:item[1]})
        })
        console.log(this.points,'标点坐标')
        this.drawCanvas()
      },
      computed: {
        canvasWidth() {
          return this.editstart.list.width * this.scale; // 根据缩放比例调整canvas宽度
        },
        canvasHeight() {
          return this.editstart.list.height * this.scale; // 根据缩放比例调整canvas高度
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
      if(this.isPointLineMode){
        const canvas = this.$refs.myCanvas;
        const rect = canvas.getBoundingClientRect();

        const x = (event.clientX - rect.left) / this.scale; // 根据缩放比例计算实际坐标
        const y = (event.clientY - rect.top) / this.scale; // 根据缩放比例计算实际坐标

        this.points.push({ x, y });
        this.drawPoints();
      }
      
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
    //拖拽
    startDrag(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      console.log(event.clientX,110.373046875*this.scale,'拖拽1');
      console.log(event.clientY/this.scale,'拖拽1');
      // 遍历已有的标点数组，判断鼠标是否在某个标点附近
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        const distance = Math.sqrt((mouseX/this.scale - point.x ) ** 2 + (mouseY/this.scale - point.y ) ** 2);

        // 如果鼠标在标点附近，将该标点设为当前拖拽对象
        
        if (distance <= this.pointRadius) {
          console.log(distance,this.pointRadius,'拖拽');
          this.currentDraggingPoint = point;
          this.pointsindex = i;
          break;
        }
      }

      // 如果存在当前拖拽对象，将其设为正在拖拽状态
      if (this.currentDraggingPoint) {
        this.isDragging = true;
      }
    },
    dragPoint(event) {
      if (this.isDragging && this.currentDraggingPoint) {
        // 根据鼠标位置计算出标点应该移动到的新位置
        const newPointX = event.clientX;
        const newPointY = event.clientY;

        // 将当前拖拽对象的坐标设置为新位置
        this.points[this.pointsindex].x = newPointX/this.scale;
        this.points[this.pointsindex].y = newPointY/this.scale;

        // 重新绘制所有标点
        this.drawPoints();
      }
    },
    endDrag(){
      this.isDragging = false;
      this.currentDraggingPoint = null

    },
    imgedig(){
      this.isPointLineMode = false
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