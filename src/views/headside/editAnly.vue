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
            <div class="toolicon" @click="islengthstat">
              <img src="../../assets/cd.png" alt=""  style="width: 25px;">
              <text>长度</text>
            </div>
            <div class="toolicon" @click="isAnglestat">
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
        <div class="tool" style="width: 45%;border: none;">
          <div class="modelimg" style="width: 22%;">
            <img src="../../assets/lk.png" alt="" style="width: 43px;">
            <div>轮廓重置</div>
          </div>
          <div style="width: 55%;">
            <div class="slider">
              <div class="demonstration">图片亮度</div>
              <el-slider v-model="value1" @input="intensity"></el-slider>
            </div>
            <div class="slider">
              <div class="demonstration">图像灰度</div>
              <el-slider v-model="value2" @input="intensity"></el-slider>
            </div>
          </div>
          <div class="modelimg" style="width: 22%;" @click="customShow = true">
              <img src="../../assets/zdy.png" alt="" style="width: 43px;">
              <div>自定义分析法</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="width:70%;position: relative;overflow: auto;">
          <canvas ref="myCanvas" @click="addPoint" @mousedown="startDrag" @mousemove="dragPoint" @mouseup="endDrag" :width="canvasWidth" :height="canvasHeight"></canvas>
          <div @click="nameedit" class="namesty" >{{ this.pointname }}</div>
        </div>
        <div class="tablesty" v-if="nameeditstart == 1">
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
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
        <div class="tablesty" v-if="nameeditstart == 2">
          <div class="dropdown">
            <div v-for="(item,idexs) in tabdaproj"  
            @mouseover="setHover(idexs)"
            @mouseleave="clearHover()"
            @click="fillname(item)"
            :style="{ backgroundColor: hoverIndex === idexs ? '#76A0B1' : '', color: hoverIndex === idexs ? 'white' : ''  }">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div style="position: absolute;left: -4%;top:-16%;z-index: 999;height: calc(100% + 19%);" v-if="customShow==true">
        <Custom @updatevalue="updatevalue"/>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Custom from './custom.vue'
 import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['editstart'],
      data() {
        return {
          hoverIndex: -1,
          imageSrc: '',
          nameshow:false,
          isRotated: false, // 是否已经旋转
          isDragging:false, // 是否正在拖动
          islengthstate:false, // 是否处于长度模式
          isAnglestate:false, // 是否处于角度模式
          lines:[], // 存储标点连线
          pointRadius: 10, // 标点半径
          islength:false, 
          ctx: null,
          canvasstart:1, // 切换模式
          pointname:"",
          lengthpoint:[],//长度标点
          Anglespoint:[],//角度标点
          names:'',
          value1:50,//图片亮度
          value2:0,//图片灰度
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
          canvasWidth:1000,
          canvasHeight:'',
          nameeditstart:1,
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
          canvas:null,
          endPoint:null,
          startPoint: null,
          newposin:{},
          heightinit:{},
          heightend:{},
          customShow:false,
        }
      },
      components:{ Text,Custom },
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
        this.canvas = this.$refs.myCanvas;
        this.ctx = this.canvas.getContext('2d');
        
        
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
          let that =this
          const canvas = that.$refs.myCanvas;
          const ctx = canvas.getContext('2d');
          that.ctx = ctx
          const image = new Image();
          image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 绘制图片时指定宽度和高度为 canvas 的宽度和高度

            ctx.filter = `brightness(${that.value1 + 50}%) grayscale(${that.value2 *3}%)`;
            
            // function draw() {
            //   // 动态设置滤镜效果
            //   let filterValue = `brightness(${that.value1}%)`; // 设置亮度调整滤镜效果
            //   let filtergrayscale = that.value2 *2; // 设置色相旋转滤镜效果
              
            //   ctx.filter = filterValue;

            //   // 绘制图像到 Canvas 上
            //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            //   // 更新亮度值
            //   filterValue = (filterValue) % 200;

            //   // 在下一帧时更新滤镜效果
            //   requestAnimationFrame(draw);
            // }
            
            // draw()
            that.drawPoints(); // 绘制标点

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
      //长度标点
      if(this.islengthstate){
        // 添加点到数组中
        this.lengthpoint.push({x:x*this.scale, y:y*this.scale});
        if (this.lengthpoint.length === 3) {
          this.lengthpoint = [];
          this.drawPoints();
        }

        // 绘制点
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(x*this.scale, y*this.scale, 3, 0, Math.PI * 2);
        this.ctx.fill();
        // 如果已经添加了两个点，则绘制连接线
        if (this.lengthpoint.length === 2) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#ff0000';
          this.ctx.moveTo(this.lengthpoint[0].x, this.lengthpoint[0].y);
          this.ctx.lineTo(this.lengthpoint[1].x, this.lengthpoint[1].y);
          this.ctx.stroke();
        }
      }
      //角度标点
      if(this.isAnglestate){
        // 添加点到数组中
        this.Anglespoint.push({x:x*this.scale, y:y*this.scale});
        if (this.Anglespoint.length === 4) {
          this.Anglespoint = [];
          this.drawPoints();
        }
        // 绘制点
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(x*this.scale, y*this.scale, 3, 0, Math.PI * 2);
        this.ctx.fill();
        if (this.Anglespoint.length >= 2) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#ff0000';
          if(this.Anglespoint.length === 2){
            this.ctx.moveTo(this.Anglespoint[0].x, this.Anglespoint[0].y);
            this.ctx.lineTo(this.Anglespoint[1].x, this.Anglespoint[1].y);
          }else if(this.Anglespoint.length === 3){
            this.ctx.moveTo(this.Anglespoint[1].x, this.Anglespoint[1].y);
            this.ctx.lineTo(this.Anglespoint[2].x, this.Anglespoint[2].y);

            const point1 = this.Anglespoint[0];
            const point2 = this.Anglespoint[1];
            const point3 = this.Anglespoint[2];

             // 连接两条线段
  const line1 = { x: point2.x - point1.x, y: point2.y - point1.y };
  const line2 = { x: point3.x - point2.x, y: point3.y - point2.y };

  // 计算两条线段的夹角
let angleRadians = Math.atan2(line2.y, line2.x) - Math.atan2(line1.y, line1.x);
if (angleRadians < 0) {
  angleRadians += 2 * Math.PI;
}
let angleDegrees = (angleRadians * 180) / Math.PI;

// 将角度限制在 0 到 180 度之间
if (angleDegrees > 180) {
  angleDegrees = 360 - angleDegrees;
}

  console.log("两条线段的夹角为: " + angleDegrees + " 度");
          }
          
          this.ctx.stroke();
        }
      }
      
    },
    drawPoints() {
      const canvas = this.$refs.myCanvas;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const image = new Image();
      this.lines = [this.points[2], this.points[3]]//线的点
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.lines[0].x * this.scale, this.lines[0].y * this.scale);
        for (let i = 1; i < this.lines.length; i++) {
          const currentPoint = this.lines[i];
          const previousPoint = this.lines[i - 1];
          const midPointX = (previousPoint.x + currentPoint.x) / 2 * this.scale;
          const midPointY = (previousPoint.y + currentPoint.y) / 2 * this.scale;

          ctx.quadraticCurveTo(previousPoint.x * this.scale, previousPoint.y * this.scale, midPointX, midPointY);
        }
        ctx.lineTo(this.lines[this.lines.length - 1].x * this.scale, this.lines[this.lines.length - 1].y * this.scale);
        
        if (this.canvasstart == 1 || this.canvasstart == 2) {
            ctx.stroke();
            
          }
        this.points.forEach(point => {
          const x = point.x * this.scale;
          const y = point.y * this.scale;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          if (this.canvasstart == 1 || this.canvasstart == 3) {
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
      // if(this.islengthstate){
      //   this.heightinit = { x:mouseX, y:mouseY }
      //   this.heightend = { x:mouseX, y:mouseY }
      //   this.newposin = { x:mouseX, y:mouseY }
      //   this.islength = true;

      //   this.ctx.beginPath();
      //   this.ctx.moveTo(this.heightinit.x*this.scale, this.heightinit.y*this.scale);
      //   this.ctx.lineTo(this.heightend.x+1*this.scale  , this.heightend.y+1*this.scale );
      //   this.ctx.stroke();
      //   // this.isDragging = true;
      //   // this.currentDraggingPoint = this.newposin
      //   this.drawPoints();

      // }
      


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
      // 根据鼠标位置计算出标点应该移动到的新位置
      const canvas = this.$refs.myCanvas;
      const rect = canvas.getBoundingClientRect();

      const newPointX = (event.clientX - rect.left)/ this.scale;
      const newPointY = (event.clientY - rect.top)/ this.scale;

      if (this.isDragging && this.currentDraggingPoint) {
        // 将当前拖拽对象的坐标设置为新位置
        // this.points[this.pointsindex].x = newPointX;
        // this.points[this.pointsindex].y = newPointY;

        this.heightend.x = newPointX  * this.scale
        this.heightend.y = newPointY * this.scale
        console.log(this.heightend,"heightend")
        // 重新绘制所有标点
        this.drawPoints();
      }
      if(this.islength){
          this.newposin.x = newPointX * this.scale
          this.newposin.y = newPointY  * this.scale
          
        
      }
    },
    endDrag(event){
      const canvas = this.$refs.myCanvas;
      const rect = canvas.getBoundingClientRect();

      const mouseX = (event.clientX - rect.left);
      const mouseY = (event.clientY - rect.top);

      this.isDragging = false;
      this.currentDraggingPoint = null
      this.islength = false
      
      if(this.islengthstate){
        this.ctx.beginPath();
        this.ctx.moveTo(this.heightinit.x*this.scale, this.heightinit.y*this.scale);
        this.ctx.lineTo(this.newposin.x  , this.newposin.y );
        this.ctx.stroke();
      }
    },
    intensity(){
      console.log(this.value1,"value1")
      this.drawCanvas()

    },
    
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    nameedit(){
      this.nameeditstart = 2
      
    },
    imgedig(){
      this.editradggstate = !this.editradggstate
      this.isPointLineMode = false
    },
    islengthstat(){
      this.islengthstate = !this.islengthstate
      this.isAnglestate = false
    },
    isAnglestat(){
      this.isAnglestate = !this.isAnglestate
      this.islengthstate = false

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
        
      const canvas = this.$refs.myCanvas;
      const ctx = canvas.getContext('2d');
      const angleInDegrees = 180 - (Math.atan2(this.points[3].y * this.scale - this.points[2].y * this.scale, this.points[3].x * this.scale - this.points[2].x * this.scale) * (180 / Math.PI)); // 旋转角度
      console.log(angleInDegrees,'角度')
      if (this.isRotated) {
        // 恢复画布
        ctx.setTransform(1, 0, 0, 1, 0, 0); // 恢复变换矩阵
        this.isRotated = false; // 修改状态变量
      } else {
        ctx.translate(canvas.width / 2, canvas.height / 2); // 将原点移动到画布中心
        ctx.rotate((angleInDegrees * Math.PI) / 180); // 旋转角度
        ctx.translate(-canvas.width / 2, -canvas.height / 2); // 将原点移动回左上角
        this.isRotated = true; // 修改状态变量
      }
        this.drawCanvas();
    },
    fillname(e){
      console.log(e,'name')
      this.points[this.pointsindex].name = e
      this.pointname = this.points[this.pointsindex].name
      this.nameeditstart = 1
    },  
    //子组件传参
    updatevalue(e){
      this.customShow = false
      if(e != ''){
        let listValue={
              itemName:'',
              measure:'',
              stand:'83',
              deviation:'4',
              sense:''
            }
        let that = this
        // this.tabdaproj = e.list
        this.tableData = []
        console.log(this.tabdaproj,'子组件传参ssss') 
        e.list.map((item,index)=>{
          this.tableData.push(listValue)
          that.tableData[index].itemName = item
          that.tableData[index].measure = Number(this.editstart.list.result[index]).toFixed(1)
        })

      }
    },
    setHover(index) {
      this.hoverIndex = index;
    },
    clearHover() {
      this.hoverIndex = -1;
    }
      
  }
}
    
  </script>
  
<style lang="scss" scoped>
.hover-bg :hover{
  background-color: #76A0B1;
}
.tablesty{
  width:30%;
  cursor: default;
}
.dropdown{
  width: 50%;
  height: auto;
  border: 1px solid #76A0B1;
  text-align: center;

}

.dropdown div{
  padding: 3px 0;
}
.selesty{
  border: none; /* 去掉边框 */
  background-color: #76A0B1; /* 修改背景颜色 */
}
.bodyed{
  width: 92vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: default;
  position: relative;
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
  width: 98.5%;
  height: 13vh;
  background-color: #76A0B1;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  padding: 10px;
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
  margin-top: 4%;
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