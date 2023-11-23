<template>
    <div class="body">
      <div class="head">
        <text>1、上传面像图片 > </text>
        <text>2、分析结果 > </text>
        <text>3、生成生成报告</text>
        <!-- <el-steps :active="active" simple space="1">
            <el-step title="步骤 1" ></el-step>
            <el-step title="步骤 2" ></el-step>
            <el-step title="步骤 3" ></el-step>
        </el-steps> -->

        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>
      <div class="analyze" v-if="procedure==0">
        <div><text style="color: red;">*</text>面像分析：
          <input type="file" ref="fileInput" multiple @change="handleFileChange" style="display: none">
          <el-button size="small" type="primary" @click="openFileInput" v-loading.fullscreen.lock="fullscreenLoading">批量上传</el-button>

          <!-- <text>(上传规则)</text> -->
        </div>
        <div class="uoload">
            <div class="faceimg">
              <input type="file" ref="fileupimgfron" multiple @change="upimgfron" style="display: none">
              <img src="../../assets/face/face1.png" alt="" style="width: 100%;height: 100%;" v-if="frontimg.length<1"  @click="openupimgfron">
                  <div v-else >
                    <el-image 
                      style="width: 150px; height: 190px"
                      :src="frontimg" 
                      :preview-src-list="frontimgbig">
                    </el-image>
                    <div class="imgdel" @click="imgdel('frontimg')">删除</div>
                  </div>
              
              <!-- <img :src="imagelist[1]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
            </div>
            <div class="faceimg">
              <input type="file" ref="flankimg" multiple @change="upflankimg" style="display: none">
              <img src="../../assets/face/face2.png" alt="" style="width: 100%;height: 100%;" v-if="flankimg.length<1"  @click="openflankimg">
              <div v-else >
                <el-image 
                  style="width: 150px; height: 190px"
                  :src="flankimg" 
                  :preview-src-list="flankimgbig">
                </el-image>
                <div class="imgdel" @click="imgdel('flankimg')">删除</div>
              </div>
              
              <!-- <img :src="imagelist[0]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
            </div>
            <div class="faceimg">
              <input type="file" ref="smileimg" multiple @change="upsmileimg" style="display: none">
              <img src="../../assets/face/face3.png" alt="" style="width: 100%;height: 100%;" v-if="smileimg.length<1" @click="opensmileimg">
              <div v-else  >
                <el-image 
                  style="width: 150px; height: 190px"
                  :src="smileimg" 
                  :preview-src-list="smileimgbig">
                </el-image>
                <div class="imgdel" @click="imgdel('smileimg')">删除</div>

              </div>
              
              <!-- <img :src="imagelist[2]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
            </div>
        </div>
      </div>
      <div v-if="procedure==1" style="">
        <FaceAnalyze :face="face"></FaceAnalyze>
      </div>
      
      <div class="next">
        <div @click="lasttype" class="nextsty">上一步</div>
        <div class="nextstynull" v-if="imagelist==''">
          下一步
        </div>
        <div @click="nexttype" class="nextsty" v-else>下一步</div>
      </div>
      <el-loading v-if="loading" :text="loadingText" :spinner="loadingSpinner" >
        <i class="el-icon-phone"></i>
        <div class="loading">正在分析...</div>
      </el-loading>
    </div>
  </template>
  
  <script>
  import FaceAnalyze from './faceAnalyze'
  import axios from 'axios'
    export default {
      name: 'face',
      data() {
        return {
            active: 1,
            dialogImageUrl: '',
            dialogVisible: false,
            hideUpload:true,
            procedure:0,
            imagelist: [],
            face:{},
            frontimg:[],
            flankimg:[],
            smileimg:[],
            frontimgbig:[],
            flankimgbig:[],
            smileimgbig:[],
            loading: false,
            loadingText: '加载中...', // 加载动画的文本提示
            loadingSpinner: 'el-icon-loading', // 加载动画的图标
        }
      },
      components:{
        FaceAnalyze
      },
      methods: {
        nexttype(){
          this.loading = true; // 显示加载动画
          console.log(this.imagelist,'下一步')
          axios.post('/api/face', this.imagelist)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            this.face.list = response.data
            this.face.img = this.imagelist
            this.loading = false; // 隐藏加载动画
            this.procedure++
          })
          .catch(error => {
            // 处理上传失败的回调
            this.loading = false; // 隐藏加载动画
          });
          
        },
        lasttype(){
          if(this.procedure>0){
            this.procedure--
          }else{
            this.$emit('tabs');
          }
          
        },
        imgdel(type){
          this[type] = []
          this[type+`big`] = []
          let todata = this.imagelist.find(image => image.type === 'front');
            if(todata){
              this.imagelist.splice(todata,1)
            }
          console.log(this[type],this[type+`big`],this.imagelist,'删除图片');
        },
        handleRemove(file, fileList) {
            this.hideUpload = false
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            console.log(file,'file');
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            this.hideUpload = true
        },
        open(text) {
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{

        })
      },
        upimgfron(event){
          console.log(event,'event');
          const files = event.target.files;

          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);  // 修改键名以匹配后端期望
          console.log(formData); // 打印 formData 对象
          }

          // 发送请求
          axios.post('/api/single', formData)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            if(response.data.type=='wrong'){
              this.$confirm('没有检测到人脸，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.frontimg = response.data.url
                this.frontimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'front');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'front',url:response.data.url})
                }
              })

              // this.open('没有检测到人脸，是否继续').then(()=>{
              //   this.frontimg = response.data.url
              // this.imagelist.push(response.data.url)
              // })
            }else if(response.data.type=='profile'){
              this.$confirm('检测到的是侧脸，是否使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.frontimg = response.data.url
                this.frontimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'front');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'front',url:response.data.url})
                }
              })

              // this.open('检测到的是正脸，是否使用').then(()=>{
              //   this.frontimg = response.data.url
              //   this.imagelist.push(response.data.url)
              // })
            }
            else {
              this.frontimg = response.data.url
              this.frontimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'front');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'front',url:response.data.url})
                }

            }
          })
        },
        upflankimg(event){
          console.log(event,'event');
          const files = event.target.files;

          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);  // 修改键名以匹配后端期望
          console.log(formData); // 打印 formData 对象
          }

          // 发送请求
          axios.post('/api/single', formData)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            if(response.data.type=='wrong'){
              this.$confirm('没有检测到人脸，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.flankimg = response.data.url
                this.flankimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'profile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'profile',url:response.data.url})
                }

              })
              // this.open('没有检测到人脸，是否继续').then(()=>{
              //   this.flankimg = response.data.url
              // this.imagelist.push(response.data.url)
              // })
            }else if(response.data.type=='front'){
              this.$confirm('检测到的是正脸，是否使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.flankimg = response.data.url
                his.flankimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'profile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'profile',url:response.data.url})
                }

              })

              // this.open('检测到的是正脸，是否使用').then(()=>{
              //   this.flankimg = response.data.url
              // this.imagelist.push(response.data.url)
              // })
            }
            else {
              this.flankimg = response.data.url
              this.flankimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'profile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'profile',url:response.data.url})
                }

            }
          })
        },
        //微笑
        upsmileimg(event){
          console.log(event,'event');
          const files = event.target.files;

          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);  // 修改键名以匹配后端期望
          console.log(formData); // 打印 formData 对象
          }

          // 发送请求
          axios.post('/api/single', formData)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            if(response.data.type=='wrong'){
              this.$confirm('没有检测到人脸，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.smileimg = response.data.url
                this.smileimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'smile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'smile',url:response.data.url})
                }

              })

              // this.open('没有检测到人脸，是否继续').then(()=>{
              //   this.smileimg = response.data.url
              //   this.imagelist.push(response.data.url)
              // })
            }else if(response.data.type=='profile'){
              this.$confirm('检测到的是侧脸，是否使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                this.smileimg = response.data.url
                this.smileimgbig[0] = response.data.url
                let todata = this.imagelist.find(image => image.type === 'smile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'smile',url:response.data.url})
                }

              })

              // this.open('检测到的是正脸，是否使用').then(()=>{
              //   this.smileimg = response.data.url
              //   this.imagelist.push(response.data.url)
              // })
            }else {
              this.smileimg = response.data.url
              this.smileimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'smile');
                if(todata){
                  todata.url = response.data.url
                }else{
                  this.imagelist.push({type:'smile',url:response.data.url})
                }

            }
          })
        },
        handleFileChange(event) {
          const files = event.target.files;
          console.log(files); // 打印文件列表

          // 确保用户选择了三个文件
          // if (files.length !== 3) {
          //   console.error('You must select 3 files');
          //   return;
          // }

          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);  // 修改键名以匹配后端期望
          }

          console.log(formData); // 打印 formData 对象

          // 发送请求
          
          axios.post('/api/upload', formData)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            this.imagelist = response.data
            this.face.img = this.imagelist
            if(this.imagelist[1]){
              this.frontimg.push(this.imagelist[1]?.url)
            }
             if(this.imagelist[0]){
              this.flankimg.push(this.imagelist[0]?.url)
            }
             if(this.imagelist[2]){
              this.smileimg.push(this.imagelist[2]?.url)
            }
            
            
            
          })
          .catch(error => {
            // 处理上传失败的回调
          });
        },
        openupimgfron(){
          this.$refs.fileupimgfron.click();

        },
        opensmileimg(){
          this.$refs.smileimg.click();

        },
        openflankimg(){
          this.$refs.flankimg.click();

        },
        openFileInput() {
          this.$refs.fileInput.click();
        },
    }
      }
    
  </script>
  
  <style lang="scss" scoped>
    .body{
        width: 90%;
        margin: 0 auto;
        // border: 1px solid #030303;
        padding: 20px 0;
        height: 60vh;
    }
    .faceimg {
        width: 10%;
        height: 10%;
    }
    .loading{
        width: 30%;
        height: 20%;
        position: fixed;
        background-color: #000000a4;
        left: 35%;
        top: 35%;
        color: #FFFFFF;
        text-align: center;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .head{
        width:100%;
        padding-bottom: 15px;
        border-bottom: 8px solid #dddddd;
    }
    .analyze{
        padding-top: 30px;
    }
    .imgdel{
        width: 150px;
        background-color: #1d1d1d63;
        color: #FFFFFF;
        position: relative;
        left: 0;
        top: -25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .uoload{
        margin-top: 15px;
        display: flex;
        // justify-content: center;
        padding-top: 5%;
        // padding-left: 5%;
        div{
            margin-left: 5%;
        }
    }
    .hide .el-upload--picture-card {
      display: none;
    }
    .next{
      display: flex;
        position: relative;
        left: 45%;
        bottom: -30%;
    }
    .nextsty{
      width: 8%;
        padding: 5px;
        background-color: #003399;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
        margin-left: 1%;
    }
    .nextstynull{
      width: 8%;
        padding: 5px;
        background-color: #828283;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
        margin-left: 1%;
    }
  </style>