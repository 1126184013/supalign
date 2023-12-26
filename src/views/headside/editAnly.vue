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
            <div class="selesty" >
              <select v-model="canvasstart"  @change="handstart" style="background-color: #76A0B1;border: none;color: #fff;">
                <option style="background-color: #ffff;color: black; border: none;" value="1">点线模式</option>
                <option style="background-color: #ffff;color: black; border: none;" value="2">辅助点隐藏</option>
                <option style="background-color: #ffff;color: black; border: none;" value="3">轮廓隐藏</option>
              </select>
            </div>
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
        <div class="tool" style="width: 35%;border: none;">
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
        <div style="width:50%;position: relative;">
          <canvas ref="myCanvas" @click="addPoint" @mousedown="startDrag" @mousemove="dragPoint" @mouseup="endDrag" :width="canvasWidth" :height="canvasHeight"></canvas>
          <div @click="nameedit" class="namesty" >{{ this.pointname }}</div>
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
          nameshow:false,
          isDragging:false, // 是否正在拖动
          lines:[], // 存储标点连线
          pointRadius: 10, // 标点半径
          canvasstart:1, // 切换模式
          pointname:"",
          names:'',
          options:[{
            value: 1,
            label: '点线模式'
          },{
            value: 2,
            label: '辅助点隐藏'
          },{
            value: 3,
            label: '轮廓线模式'
          },],
          celepoints:[],//选中标点
          editradggstate:false,//是否是编辑状态
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
        this.scale = (this.canvasWidth / this.editstart.list.width);
        
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
      
        const canvas = this.$refs.myCanvas;
        const rect = canvas.getBoundingClientRect();

        const x = (event.clientX - rect.left) / this.scale; // 根据缩放比例计算实际坐标
        const y = (event.clientY - rect.top) / this.scale; // 根据缩放比例计算实际坐标
        // 遍历已有的标点数组，判断鼠标是否在某个标点附近
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
          const distance = Math.sqrt((x - point.x ) ** 2 + (y - point.y ) ** 2);
          this.celepoints.push({ x, y});
          if (distance <= this.pointRadius) {
            this.pointName(i)
            break;
          }
        }
        
      if(this.isPointLineMode){
        this.names = prompt('请输入名称：')
        if(this.names === null){
          return
        }
        this.points.push({ x, y , name: this.names});
        this.drawPoints();
      }
      
    },
    drawPoints() {
      const canvas = this.$refs.myCanvas;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const image = new Image();
      // this.lines = [{x:110.373046875,y:420.5859375},{x:801.2265625,y:1208.7109375},{x:985.181640625,y:1174.609375},]
      this.lines = [this.points[22],this.points[28],this.points[26],this.points[34]]
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 绘制图片时指定宽度和高度为 canvas 的宽度和高度
        //标点颜色
        ctx.fillStyle = 'red';
        // 线条颜色
        ctx.strokeStyle = "#0505F9";
        // 线条粗细
        ctx.lineWidth = 2;
        ctx.beginPath();

        for(let i = 0; i < this.lines.length-1; i++){
          ctx.moveTo(this.lines[i].x*this.scale, this.lines[i].y*this.scale);
          ctx.lineTo(this.lines[i+1].x*this.scale, this.lines[i+1].y*this.scale);

        }
        if(this.canvasstart == 1||this.canvasstart == 2){
          ctx.stroke(); // 绘制线条
        }
        
        this.points.forEach(point => {
          const x = point.x * this.scale; // 根据缩放比例计算实际坐标
          const y = point.y * this.scale; // 根据缩放比例计算实际坐标
          ctx.beginPath();
          
          //标点大小
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          if(this.canvasstart == 1||this.canvasstart == 3){
            ctx.fill();
          }
          
          ctx.closePath();
        });
      };

      image.src = this.imageSrc;
    },

    //拖拽
    startDrag(event) {
      const canvas = this.$refs.myCanvas;
      const rect = canvas.getBoundingClientRect();

      const mouseX = (event.clientX - rect.left)/ this.scale;
      const mouseY = (event.clientY - rect.top)/ this.scale;

      // 遍历已有的标点数组，判断鼠标是否在某个标点附近
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        const distance = Math.sqrt((mouseX - point.x ) ** 2 + (mouseY - point.y ) ** 2);

        // 如果鼠标在标点附近，将该标点设为当前拖拽对象
        
        if (distance <= this.pointRadius) {
          this.pointName(i)
          
          this.currentDraggingPoint = point;
          this.pointsindex = i;
          break;
        }
      }

      // 如果存在当前拖拽对象，将其设为正在拖拽状态
      if (this.currentDraggingPoint && this.editradggstate) {
        this.isDragging = true;
      }
    },
    pointName(e){
      console.log(e)
      if(e == 0){
        this.pointname = "Sella"
      }else if(e == 1){
        this.pointname =this.points[this.pointsindex].name?this.points[this.pointsindex].name: "Nasion"
      }else if(e == 2){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Orbitale"
      }else if(e == 3){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Porion"
      }else if(e == 4){ 
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Dc"
      }else if(e == 5){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Ep"
      }else if(e == 6){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Pogonion"
      }else if(e == 7){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"LowerIncisor"
      }else if(e == 9){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Gonion"
      }else if(e == 13){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"LowerLip"
      }else if(e == 17){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"UpperIncisor"
      }else if(e == 18){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"Articulare"
      }else if(e == 25){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:""
      }else if(e == 27){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"PtV"
      }else if(e == 36){
        this.pointname = this.points[this.pointsindex].name?this.points[this.pointsindex].name:"U6"
      }else{
        console.log(this.points[e],"1")
        if(this.points[e].name){
        console.log(this.points[e].name,"2")
          this.pointname = this.points[e].name
        }
      }
    },
    dragPoint(event) {
      if (this.isDragging && this.currentDraggingPoint) {
        // 根据鼠标位置计算出标点应该移动到的新位置
        const canvas = this.$refs.myCanvas;
       const rect = canvas.getBoundingClientRect();

        const newPointX = (event.clientX - rect.left)/ this.scale;
        const newPointY = (event.clientY - rect.top)/ this.scale;

        // 将当前拖拽对象的坐标设置为新位置
        this.points[this.pointsindex].x = newPointX;
        this.points[this.pointsindex].y = newPointY;

        // 重新绘制所有标点
        this.drawPoints();
      }
    },
    endDrag(){
      this.isDragging = false;
      this.currentDraggingPoint = null

    },
    nameedit(){
      this.names = prompt('请输入名称：')
        if(this.names === null){
          return
        }
      this.points[this.pointsindex].name = this.names
      this.pointName(this.pointsindex)
    },
    imgedig(){
      this.editradggstate = !this.editradggstate
      this.isPointLineMode = false
    },
    handstart(){
      this.drawPoints()
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

.selesty{
  border: none; /* 去掉边框 */
  background-color: #76A0B1; /* 修改背景颜色 */
}
.bodyed{
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.namesty{
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  padding: 2px;
  background-color: rgba(89, 89, 89, 0.74);
  color: #FFFFFF;
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