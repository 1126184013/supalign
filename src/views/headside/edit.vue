<template>
    <div class="bodyed">
      <div class="headlist">
        <div class="tool">
          <div>
            <div class="toolicon"  :style="editMode === 3 ? { backgroundColor: 'rgb(204 216 224)' } : {}" @click="editMode=editMode==3?0:3">
              <img src="../../assets/bj.png" alt=""  style="width: 25px;">
              <text>编辑</text>
            </div>
            <div class="toolicon"  :style="editMode === 4 ? { backgroundColor: 'rgb(204 216 224)' } : {}" @click="editMode=editMode==4?0:4">
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
            <div class="toolicon" @click="editMode=editMode==1?0:1" :style="editMode === 1 ? { backgroundColor: 'rgb(204 216 224)' } : {}">

              <img src="../../assets/cd.png" alt=""  style="width: 25px;">
              <text>长度</text>
            </div>
            <div class="toolicon" @click="editMode=editMode==2?0:2" :style="editMode === 2 ? { backgroundColor: 'rgb(204 216 224)' } : {}">
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
              <el-slider v-model="lightValue"></el-slider>
            </div>
            <div class="slider">
              <div class="demonstration">图像灰度</div>
              <el-slider v-model="grayValue"></el-slider>
            </div>
          </div>
          <div class="modelimg" style="margin-left: 20px; width: 22%;" @click="customShow = true">
              <img src="../../assets/zdy.png" alt="" style="width: 43px;">
              <div>自定义分析法</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="width:70%;position: relative;">
          <div ref="myCanvas" 
          :width="canvasWidth" 
          :height="canvasHeight" 
          style="position: relative;" :style="{width: canvasWidth+'px',transform:'rotate('+rotateAngle+'deg)' }" @click="CanvasClic">



          <img :src="imageSrc" 
          :style="{filter:'brightness('+lightValue+'%) contrast('+grayValue+'%)'}"
          style="width: 100%;position: absolute;">

            <!-- <img src="@/assets/line.png" style="width: 100%;position: absolute;"> -->

            <!-- <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/8.png" style="position: absolute; " 
            v-bind:style="{width:212*scale*ratio(33,25,0,0,150,738)+'px', left:points[33].x*scale+'px',top:points[33].y*scale+'px',transform: 'translate(-'+57*scale+'px,-'+3*scale+'px)'}">


            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/11.png" style="position: absolute; " 
            v-bind:style="{width:879*scale*ratio(0,26,0,0,333,486)+'px', left:points[0].x*scale+'px',top:points[0].y*scale+'px',transform: 'translate(-'+333*scale*ratio(0,26,0,0,333,486)+'px,-'+262*scale*ratio(0,26,0,0,333,486)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/7.png" style="position: absolute; " 
            v-bind:style="{width:628*scale*ratio(16,20,0,0,550,80)+'px', left:points[16].x*scale+'px',top:points[16].y*scale+'px',transform: 'translate(-'+0*scale*ratio(16,20,0,0,550,80)+'px,-'+63*scale*ratio(16,20,0,0,550,80)+'px)'}"> -->

            <!-- <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/1.png" style="position: absolute; " 
            v-bind:style="{width:183*scale*ratio(2,33,0,0,290,0)+'px', left:points[2].x*scale+'px',top:points[2].y*scale+'px',transform: 'translate(-'+100*scale*ratio(2,33,0,0,290,0)+'px,-'+413*scale*ratio(2,33,0,0,290,0)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/5.png" style="position: absolute; " 
            v-bind:style="{width:64*scale*ratio(27,23,0,0,0,284)+'px', left:points[27].x*scale+'px',top:points[27].y*scale+'px',transform: 'translate(-'+46*scale*ratio(27,23,0,0,0,284)+'px,-'+0*scale*ratio(27,23,0,0,0,284)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/2.png" style="position: absolute; " 
            v-bind:style="{width:175*scale*ratio(1,33,0,0,175,200)+'px', left:points[1].x*scale+'px',top:points[1].y*scale+'px',transform: 'translate(-'+104*scale*ratio(1,33,0,0,0,200)+'px,-'+237*scale*ratio(1,33,0,0,0,200)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/6.png" style="position: absolute; " 
            v-bind:style="{width:245*scale*ratio(36,37,0,0,20,50)+'px', left:points[36].x*scale+'px',top:points[36].y*scale+'px',transform: 'translate(-'+160*scale*ratio(36,37,0,0,0,50)+'px,-'+207*scale*ratio(36,37,0,0,0,50)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/13.png" style="position: absolute; " 
            v-bind:style="{width:288*scale*ratio(7,5,0,0,98,250)+'px', left:points[7].x*scale+'px',top:points[7].y*scale+'px',transform: 'translate(-'+82*scale*ratio(7,5,0,0,98,250)+'px,-'+474*scale*ratio(7,5,0,0,98,250)+'px)'}">

            <img v-if="points.length>=38 && canvasstart!=3" src="@/assets/3.png" style="position: absolute; " 
            v-bind:style="{width:83*scale*ratio(3,24,0,0,150,45)+'px', left:points[3].x*scale+'px',top:points[3].y*scale+'px',transform: 'translate(-'+43*scale*ratio(3,24,0,0,150,45)+'px,-'+45*scale*ratio(3,24,0,0,150,45)+'px)'}"> -->



            <svg v-if="points.length>=38 && canvasstart!=3" :width="canvasWidth" :height="canvasHeight" style="z-index: 99;position: absolute;">


                <!-- <path v-for="line in curveLines" :key="line" v-bind:d="generatePathD(line)" stroke="blue" fill="none" stroke-width="3"/> -->

                <path   v-bind:d="generatePath2()" stroke="blue" fill="none" stroke-width="3"/>

                <path   v-bind:d="generatePath3()" stroke="blue" fill="none" stroke-width="3"/>

                <path   v-bind:d="generatePath4()" stroke="blue" fill="none" stroke-width="3"/>


                <path   v-bind:d="generatePath5()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath6()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath7()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath8()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath9()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath10()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath11()" stroke="blue" fill="none" stroke-width="3"/>
                <path   v-bind:d="generatePath12()" stroke="blue" fill="none" stroke-width="3"/>


                <path v-if="editPoints.length>1"  
                    :d="'M'+editPoints[0].x*scale+','+editPoints[0].y*scale
                    +' L'+editPoints[1].x*scale+','+editPoints[1].y*scale
                    " stroke="red" fill="none" stroke-width="3"/>
                
                <path v-if="editPoints.length>2"  
                    :d="'M'+editPoints[1].x*scale+','+editPoints[1].y*scale
                    +' L'+editPoints[2].x*scale+','+editPoints[2].y*scale
                    " stroke="red" fill="none" stroke-width="3"/>


                <path v-if="rulePoints.length>1"  
                    :d="'M'+rulePoints[0].x*scale+','+rulePoints[0].y*scale
                    +' L'+rulePoints[1].x*scale+','+rulePoints[1].y*scale
                    " stroke="red" fill="none" stroke-width="3"/>

            </svg>

            <div v-if="canvasstart != 2" v-for="(item, index) in rulePoints" class="move_point"
                @mousedown.prevent="selectPoint2(index, $event)" 
                style="position: absolute; width: 5px; height: 5px; background-color: red; border-radius: 50%;color: yellow;z-index: 999;"
                :key="index" 
                :style="{ left: item.x*scale + 'px', top: item.y*scale + 'px' }"> 10mm </div>



            <div v-if="editMode != 0" v-for="(item, index) in editPoints" class="move_point"
                style="position: absolute; width: 5px; height: 5px; background-color: yellow; border-radius: 50%;color: yellow;z-index: 999;"
                :key="index" 
                :style="{ left: item.x*scale + 'px', top: item.y*scale + 'px' }"></div>

            
            <div v-if="editMode == 1 && editPoints.length==2"  class="move_point"
                style="position: absolute; width: 5px; height: 5px; border-radius: 50%;color: yellow;z-index: 999;"
                :key="index" 
                :style="{ left: editPoints[0].x*scale + 'px', top: editPoints[0].y*scale + 'px' }">{{ ruleText }}</div>

            <div v-if="editMode == 2 && editPoints.length==3"  class="move_point"
                style="position: absolute; width: 5px; height: 5px; border-radius: 50%;color: yellow;z-index: 999;"
                :key="index" 
                :style="{ left: editPoints[0].x*scale + 'px', top: editPoints[0].y*scale + 'px' }">{{ angleText }}</div>


            <div v-if="canvasstart != 2" v-for="(item, index) in points" class="move_point"
                @mousedown.prevent="selectPoint(index, $event)" 
                @dblclick="renamePoint(index)"
                style="position: absolute; width: 5px; font-size: 8px; height: 5px; background-color: red; border-radius: 50%;color: yellow;z-index: 999;"
                :key="index" 
                :style="{ left: item.x*scale + 'px', top: item.y*scale + 'px','background-color':pointColor(index)  }">{{ pointName(index) }}</div>



            <div v-for="(item, index) in white_points" 
            style="position: absolute; width: 5px; height: 5px; background-color: yellow; border-radius: 50%;color: red;"
            :key="index" 
            :style="{ left: item.x*scale + 'px', top: item.y*scale + 'px' }" class="point">{{ index }}</div>

            <div v-if="points.length>=38"
            style="position: absolute; width: 6px; height: 6px; background-color: yellow; border-radius: 50%;color: red;z-index: 999;"
            :key="index" 
            :style="{ left: tempPoint.x*scale + 'px', top: tempPoint.y*scale + 'px' }" class="point">tmp</div>
        </div>
          <div @click="nameedit" class="namesty" >{{ this.pointname }}</div>
        </div>
        <div class="tablesty" v-if="nameeditstart == 1">
          <div style="padding-bottom: 5%;">分析结果</div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="itemName"
              label="分析项目"
              width="120"
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
      <div class="next">
        <div class="nextsty" @click="nextfunc">保存</div>
      </div>
      <div style="position: absolute;left: 0%;top:0%;z-index: 999;height: calc(100% + 100%);width: 100%;" v-if="customShow==true">
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
            editMode:0,//0 正常 1 长度 2 角度
            customShow:false,
        rotateAngle:0,

          hoverIndex: -1,
          imageSrc: '',
          nameshow:false,
          isRotated: false, // 是否已经旋转
          isDragging:false, // 是否正在拖动
          lines:[], // 存储标点连线
          pointRadius: 10, // 标点半径
          islengthstate:false, // 是否处于长度模式
          islength:false, 
          ctx: null,
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

          lightValue:100,
          grayValue:100,

          rulePoints:[],

          ruleUnit:10,

          editPoints:[],

          ruleText:"",
          angleText:'',

          tempPoint:{x:0,y:0},

          selectedPoint:null,
          selectedPoint2:null,

          onselectedPoint:false,
          onselectedPoint2:false,

          celepoints:[],//选中标点
          editradggstate:false,//是否是编辑状态
          pointsindex:null, // 当前正在拖动的点在points中的索引
          currentDraggingPoint: null, // 当前正在拖动的点
          points: [], // 存储标点坐标的数组
          curveLines:[],
          white_points:[],
          scale: 1, // 当前的缩放比例
          canvasWidth:850,
          canvasHeight:'',
          nameeditstart:1,
          isPointLineMode:false, // 是否处于标点连线模式
          standard:['83','80','3','45','18','4','21','19','73','59','17','30','26','64','88','53','61','77','64','55','124'],
          deviation:['4','4','2','3','2','3','4','4','4','3','3','6','4','2','3','3','3','7','2','3','8'],
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
          that.tableData[index].deviation = that.deviation[index]
          that.tableData[index].stand = that.standard[index]
        })

      },
      mounted() {
        let that = this
        this.editstart.list.landmarks.map((item,index)=>{
          that.points.push({x:item[0],y:item[1]})
        })

        var rule1={x:this.points[112].x,y:this.points[0].y}
        var rule2={x:this.points[112].x,y:this.points[11].y}
        this.rulePoints.push(rule1);
        this.rulePoints.push(rule2);

        this.ruleUnit=Math.sqrt((this.rulePoints[1].x-this.rulePoints[0].x)*(this.rulePoints[1].x-this.rulePoints[0].x)+(this.rulePoints[1].y-this.rulePoints[0].y)*(this.rulePoints[1].y-this.rulePoints[0].y))/10;


        this.tempPoint.x= this.points[3].x*0.09+this.points[33].x*0.91;
        this.tempPoint.y = this.points[3].y*0.28+this.points[33].y*0.72;

        if(Math.abs(this.tempPoint.x-this.points[1].x)/Math.abs(this.points[3].x-this.points[33].x)>0.1 ||
            Math.abs(this.tempPoint.y-this.points[1].y)/Math.abs(this.points[3].y-this.points[33].y)>0.1 
        ){
            this.points[1].x=this.tempPoint.x;
            this.points[1].y=this.tempPoint.y;
        }




        this.line3();
        this.line4();
        this.line5();
        this.line6();
        this.line7();
        this.line8();
        this.line9();
        this.line10();
        this.line11();
        this.line12();
        this.line13();
        this.line14();
        
        this.line15();
        this.line16();
        this.line17();
        
        this.line18();
        this.line19();
       
       

        document.addEventListener('mousemove', (event) => {
            if (this.onselectedPoint) {
                let rect = this.$refs.myCanvas.getBoundingClientRect();
                this.points[this.selectedPoint].x = (event.clientX - rect.left)/this.scale;
                this.points[this.selectedPoint].y = (event.clientY - rect.top)/this.scale;
            }
            else if (this.onselectedPoint2) {
                let rect = this.$refs.myCanvas.getBoundingClientRect();
                this.rulePoints[this.selectedPoint2].x = (event.clientX - rect.left)/this.scale;
                this.rulePoints[this.selectedPoint2].y = (event.clientY - rect.top)/this.scale;

                this.ruleUnit=Math.sqrt((this.rulePoints[1].x-this.rulePoints[0].x)*(this.rulePoints[1].x-this.rulePoints[0].x)+(this.rulePoints[1].y-this.rulePoints[0].y)*(this.rulePoints[1].y-this.rulePoints[0].y))/10;

            }
        });
        document.addEventListener('mouseup', () => {
            this.selectedPoint = null;
            this.selectedPoint2 = null;
            this.onselectedPoint = false;
            this.onselectedPoint2 = false;
        });

        document.addEventListener('mousedown', () => {
            // if(this.selectedPoint)
            //     this.selectedPoint = null;
        });

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

        calculateAngle(A, B, C) {
            var AB = { x: B.x - A.x, y: B.y - A.y };
            var AC = { x: C.x - A.x, y: C.y - A.y };
            var BC = { x: C.x - B.x, y: C.y - B.y };

            var dotProductAB_AC = (AB.x * AC.x) + (AB.y * AC.y);
            var dotProductAB_BC = (AB.x * BC.x) + (AB.y * BC.y);
            var magnitudeAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
            var magnitudeBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);

            var angle = Math.acos(dotProductAB_BC / (magnitudeAB * magnitudeBC)) * 180 / Math.PI;

            // 检查角度是锐角还是钝角
            if (dotProductAB_AC < 0) {
                // 如果点积小于零，则角 ABC 是钝角
                angle = 180 - angle;
            }

            angle = 180-angle;

            return angle;
        },
        
        CanvasClic(event){

            let rect = this.$refs.myCanvas.getBoundingClientRect();


            if(this.editMode==1){
                if(this.editPoints.length<2){
                    this.editPoints.push({x:(event.clientX - rect.left)/this.scale,y:(event.clientY - rect.top)/this.scale});
                }
                else{
                    this.editPoints=[];
                    this.editPoints.push({x:(event.clientX - rect.left)/this.scale,y:(event.clientY - rect.top)/this.scale});
                }
                if(this.editPoints.length==2)
                {
                    var length = Math.sqrt(Math.pow(this.editPoints[1].x-this.editPoints[0].x,2)+Math.pow(this.editPoints[1].y-this.editPoints[0].y,2))/this.ruleUnit;
                    this.ruleText=length+'mm';
                }
                else{
                    this.ruleText='';
                }
            }
            else if(this.editMode==2){
                if(this.editPoints.length<3){
                    this.editPoints.push({x:(event.clientX - rect.left)/this.scale,y:(event.clientY - rect.top)/this.scale});
                }
                else{
                    this.editPoints=[];
                    this.editPoints.push({x:(event.clientX - rect.left)/this.scale,y:(event.clientY - rect.top)/this.scale});
                }

                if(this.editPoints.length==3)
                {
                    //根据三点计算角度
                    var angle = this.calculateAngle(this.editPoints[0],this.editPoints[1],this.editPoints[2]);
                    this.angleText=angle+'';
                }
                else{
                    this.angleText='';
                }

            }
            else if(this.editMode==4){
                this.points.push({x:(event.clientX - rect.left)/this.scale,y:(event.clientY - rect.top)/this.scale});
            }
        },

        selectPoint(index, event) {
            if(this.editMode==0){
                this.selectedPoint = index;
                this.onselectedPoint=true;
            }
               
        },

        selectPoint2(index, event) {
            if(this.editMode==0){
                this.selectedPoint2 = index;
                this.onselectedPoint2=true;
            }
                
        },

       
  
        // 重命名点
        renamePoint(index) {
            // const newName = prompt("请输入新的名称:");
            // if (newName) {
            //     this.points[index].name = newName;
            // }
        },
        nextfunc(){
          this.$emit('update',this.tableData);
        },



        generatePathD(line) {
            let d = 'M' + line.points[0].x * this.scale + ',' + line.points[0].y * this.scale;;
            for (let i = 1; i < line.points.length; i++) {
                d += ' L' + line.points[i].x * this.scale + ',' + line.points[i].y * this.scale;
            }
            // d += ' L' + this.points[line.end].x * this.scale + ',' + this.points[line.end].y * this.scale;
            return d;
        },


        generatePath2(){

          var path=[0,105,11,86,22,112,33,120,44,79,54,99,63,122];

            let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
            for (let i = 1; i < path.length; i++) {
                d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
            }
            return d;
        },

        generatePath3(){

        var path=[121,74,78,98,83,2,111,3,92,4,101,5,87,6];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath4(){

          var path=[100,50,51,52,53,94,95,128,84,110,91,100,55,56,57,123,93,117,58,108,88,60,61,116,62,114,64,65,115];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath5(){

          var path=[7,8,104,10,9,12,104];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath6(){

          var path=[13,14,15,106,16];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath7(){

          var path=[17,18,19,20,127,21,23];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath8(){

          var path=[17,18,19,20,127,21,23];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath9(){

          var path=[43,45,26,27,28,29,30,31,32,34,35,36,37,85,38,39,40,41,42];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },

        generatePath10(){

          var path=[24,25,26];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },
        generatePath11(){

          var path=[114,49,47,113,48,114];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },
        generatePath12(){

          var path=[65,73,72,71,70,69,68,81,67,80,66,119,124,77,76,65];

          let d = 'M' + this.points[path[0]].x * this.scale + ',' + this.points[path[0]].y * this.scale;;
          for (let i = 1; i < path.length; i++) {
              d += ' L' + this.points[path[i]].x * this.scale + ',' + this.points[path[i]].y * this.scale;
          }
          return d;
        },
        ratio(start,end,x1,y1,x2,y2) {


            console.log((x2-x1)/(this.points[end].x-this.points[start].x));
            if(x2-x1>y2-y1)
            {
                return Math.abs((this.points[end].x-this.points[start].x)/(x2-x1));
            }
            else
            {
                return Math.abs((this.points[end].y-this.points[start].y)/(y2-y1));
            }
            
            // return 0.1;
        },
        line_points(start,end,count){
            var startPoint = this.points[start];
            var endPoint = this.points[end];
            var linePoints = [];
            for(var i=0;i<=count+1;i++){
                var x = +startPoint.x + (endPoint.x-startPoint.x)*i/(count+1);
                var y = +startPoint.y + (endPoint.y-startPoint.y)*i/(count+1);
                linePoints.push({x:x,y:y})
                console.log(linePoints);
            }
            return linePoints;
        },

        line_points2(startPoint,endPoint,count){
           
            var linePoints = [];
            for(var i=0;i<=count+1;i++){
                var x = +startPoint.x + (endPoint.x-startPoint.x)*i/(count+1);
                var y = +startPoint.y + (endPoint.y-startPoint.y)*i/(count+1);
                linePoints.push({x:x,y:y})
                console.log(linePoints);
            }
            return linePoints;
        },

        line1(){
            var start=33;
            var end=17;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.05;
            linePoints[1].y+=length*0.0;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line2(){
            var start=17;
            var end=25;

            var linePoints = this.line_points(start,end,3);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.01;
            linePoints[1].y+=length*0.0;

            linePoints[2].x-=length*0.05;
            linePoints[2].y+=length*0.0;

            linePoints[3].x+=length*0.03;
            linePoints[3].y+=length*0.0;

            this.curveLines.push({start:start,end:end,points:linePoints});
            return linePoints;
        },
        line3(){

            var start=25;
            var end=22;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.1;
            linePoints[1].y+=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line4(){
            var start=22;
            var end=14;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.1;
            linePoints[1].y-=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line5(){
            var start=14;
            var end=29;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.1;
            linePoints[1].y-=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line6(){
            var start=29;
            var end=12;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.1;
            linePoints[1].y-=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line7(){
            var start=12;
            var end=10;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.3;
            linePoints[1].y+=length*0.05;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line8(){
            var start=11;
            var end=13;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.3;
            linePoints[1].y+=length*0.3;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line9(){
            var start=13;
            var end=30;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.3;
            linePoints[1].y+=length*0.3;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line10(){
            var start=30;
            var end=15;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.3;
            linePoints[1].y-=length*0.3;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line11(){
            var start=15;
            var end=31;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.1;
            linePoints[1].y+=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line12(){
            var start=31;
            var end=32;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.1;
            linePoints[1].y+=length*0.1;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line13(){
            var start=32;
            var end=35;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y-=length*0.02;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },
        line14(){
            var start=5;
            var end=6;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y-=length*0.02;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line15(){
            var start=6;
            var end=8;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y-=length*0.02;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line16(){
            var start=8;
            var end=7;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y-=length*0.02;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line17(){
            var start=7;
            var end=18;

            var linePoints = this.line_points(start,end,4);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y+=length*0.12;

            linePoints[2].x+=length*0.0;
            linePoints[2].y+=length*0.2;

            linePoints[3].x-=length*0.1;
            linePoints[3].y+=length*0.2;

            linePoints[4].x-=length*0.1;
            linePoints[4].y+=length*0.2;
            this.curveLines.push({start:start,end:end,points:linePoints});


            return linePoints;
        },

        line18(){
            var start=18;
            var end=24;

            var linePoints = this.line_points(start,end,1);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x-=length*0.1;
            linePoints[1].y-=length*0.02;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line19(){
            var start=24;
            var end=23;

            var linePoints = this.line_points(start,end,4);
            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[1].x+=length*0.0;
            linePoints[1].y-=length*0.02;

            linePoints[2].x+=length*0.0;
            linePoints[2].y+=length*0.2;

            linePoints[3].x-=length*0.1;
            linePoints[3].y+=length*0.2;

            linePoints[4].x-=length*0.1;
            linePoints[4].y+=length*0.2;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;
        },

        line20(){
            var start=0;
            var end=26;

            var startPoint={x:(+this.points[start].x-(this.points[end].x-this.points[start].x)*1.8),y:+(+this.points[start].y-(this.points[end].y-this.points[start].y)*0.5)};

            var linePoints = this.line_points2(startPoint,this.points[end],9);

            var length = Math.sqrt((this.points[start].x-this.points[end].x)*(this.points[start].x-this.points[end].x)+(this.points[start].y-this.points[end].y)*(this.points[start].y-this.points[end].y));

            linePoints[4].x-=length*0.2;
            linePoints[4].y-=length*0.20;
            this.curveLines.push({start:start,end:end,points:linePoints});

            return linePoints;

        },





    pointColor(e){
      var pointname='white';
      if(e === 118){
        pointname = "red";
      }else if(e === 104){
        pointname = "red";
      }else if(e === 106){
        pointname = "red";
      }else if(e === 107){
        pointname = "red";
      }else if(e === 110){
        pointname = "red";
      }else if(e === 95){
        pointname = "red";
      }else if(e === 117){
        pointname = "red";
      }else if(e === 78){
        pointname = "red";
      }else if(e === 124){
        pointname = "red";
      }else if(e === 82){
        pointname = "red";
      }else if(e === 25){
        pointname = "red";
      }else if(e === 113){
        pointname = "red";
      }else if(e === 132){
        pointname = "red";
      }else if(e === 81){
        pointname = "red";
      }else if(e === 79){
        pointname = "red";
      }else if(e === 83){
        pointname = "red";
      // }else if(e === 93){
      //   pointname = "Ep"; // 注意这里Dc, Ep和Gonion共用相同的索引

      }else if(e === 100){
        pointname = "red";
      }else if(e === 48){
        pointname = "red";
      }else if(e === 15){
        pointname = "red";
      }else if(e === 120){
        pointname = "red";
      }else if(e === 99){
        pointname = "red";
      // }else if(e === 19){
      //   pointname = "Xi";
      }
      return pointname;
    },
    pointName(e){
      console.log(e)
      var pointname='';
      if(e === 118){
        pointname = "Sella";
      }else if(e === 104){
        pointname = "Nasion";
      }else if(e === 106){
        pointname = "Orbitale";
      }else if(e === 107){
        pointname = "Porion";
      // }else if(e === 93){
      //   pointname = "Dc"; // 注意这里Dc, Ep和Gonion共用相同的索引
      // }else if(e === 93){
      //   pointname = "Ep";
      }else if(e === 110){
        pointname = "Pogonion";
      }else if(e === 95){
        pointname = "LowerIncisor";
      }else if(e === 117){
        pointname = "Gonion";
      }else if(e === 78){
        pointname = "LowerLip";
      }else if(e === 124){
        pointname = "UpperIncisor";
      }else if(e === 82){
        pointname = "Articulare";
      }else if(e === 25){
        pointname = "25";
      }else if(e === 113){
        pointname = "PtV";
      }else if(e === 132){
        pointname = "U6";
      }else if(e === 81){
        pointname = "ANS";
      }else if(e === 79){
        pointname = "A_point";
      }else if(e === 83){
        pointname = "B_point";
      // }else if(e === 93){
      //   pointname = "Ep"; // 注意这里Dc, Ep和Gonion共用相同的索引

      }else if(e === 100){
        pointname = "Menton";
      }else if(e === 48){
        pointname = "Pm";
      }else if(e === 15){
        pointname = "15";
      }else if(e === 120){
        pointname = "Nasion";
      }else if(e === 99){
        pointname = "UpperLip";
      // }else if(e === 19){
      //   pointname = "Xi";
      }else {
        pointname = ""; // 用于处理不在列表中的索引
      }

    //   else{
    //     pointname=e;
    //   }
    // pointname=e
        pointname=e+' '+pointname;
      return pointname;
    },
   
   

    nameedit(){
      this.nameeditstart = 2
      
    },
    imgedig(){
      this.editradggstate = !this.editradggstate
      this.isPointLineMode = false
    },
    handstart(){
    },
    delet(){
      this.points.pop();
    },
    zoomIn() {
      this.scale *= 1.2; // 放大缩放比例
    },
    zoomOut() {
      this.scale /= 1.2; // 缩小缩放比例
    },
    
    brate(){
        
        
      const angleInDegrees = 180 - (Math.atan2(this.points[3].y * this.scale - this.points[2].y * this.scale, this.points[3].x * this.scale - this.points[2].x * this.scale) * (180 / Math.PI)); // 旋转角度
      console.log(angleInDegrees,'角度')
      if (this.isRotated) {
        // 恢复画布
        this.rotateAngle=0;
        this.isRotated = false; // 修改状态变量
      } else {
        
        this.rotateAngle=angleInDegrees;
        this.isRotated = true; // 修改状态变量
      }
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
        
        let that = this
        // this.tabdaproj = e.list
        this.tableData = []
        for(let i = 0; i < e.list.length; i++){
          // console.log(item,'子组件传参ssss') 
          let listValue={
              itemName:'',
              measure:'',
              stand:'',
              deviation:'',
              sense:''
            }

          this.tableData.push(listValue)
          let objindex = this.tabdaproj.indexOf(e.list[i])

          this.tableData[i].itemName = e.list[i]
          that.tableData[i].stand = this.standard[objindex]
          that.tableData[i].deviation = this.deviation[objindex]
          that.tableData[i].measure = Number(that.editstart.list.result[objindex]).toFixed(1)
          
        }
        

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
.next{
      display: flex;
      position: relative;
      left: 35%;
      top: 0%;
      // margin: 0 auto;
      padding: 10%;
      .nextsty{
        width: 20%;
        padding: 5px;
        background-color: #7BA9B9;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
      }
    }
.tablesty{
  width:34%;
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
  width: 96vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: default;

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
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 150vh;
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