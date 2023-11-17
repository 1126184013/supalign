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
            <!-- <div>
                <el-upload
                action="/api/upload"
                list-type="picture-card"
                :limit="1"
                :show-file-list="true"
                :class="{hide: hideUpload}"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    <img src="../../assets/face/face1.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
                    <img :src="imagelist[1]?.url" alt="" style="width: 100%;height: 100%;" v-else>
                </el-upload>
                
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                
            </div>
            <div>
                <el-upload
                action="http://118.31.52.215:8097/api/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <img src="../../assets/face/face2.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
                  <img :src="imagelist[0].url" alt="" style="width: 100%;height: 100%;" v-else>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div>
                <el-upload
                action="http://118.31.52.215:8097/api/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <img src="../../assets/face/face3.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
                  <img :src="imagelist[2].url" alt="" style="width: 100%;height: 100%;" v-else>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div> -->
            <div class="faceimg">
              <img src="../../assets/face/face1.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
              <img :src="imagelist[1]?.url" alt="" style="width: 100%;height: 100%;" v-else>
            </div>
            <div class="faceimg">
              <img src="../../assets/face/face2.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
              <img :src="imagelist[0]?.url" alt="" style="width: 100%;height: 100%;" v-else>
            </div>
            <div class="faceimg">
              <img src="../../assets/face/face3.png" alt="" style="width: 100%;height: 100%;" v-if="imagelist.length<1">
              <img :src="imagelist[2]?.url" alt="" style="width: 100%;height: 100%;" v-else>
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
          axios.post('/api/face', this.imagelist)
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            this.face.list = response.data
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
        handleFileChange(event) {
          const files = event.target.files;
          console.log(files); // 打印文件列表

          // 确保用户选择了三个文件
          if (files.length !== 3) {
            console.error('You must select 3 files');
            return;
          }

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
            
          })
          .catch(error => {
            // 处理上传失败的回调
          });
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