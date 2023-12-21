<template>
    <div class="body">
      <div class="head">
        <text :class="procedure>=0?'headcolor':''">1、上传头颅CT图片 > </text>
        <text :class="procedure>=1?'headcolor':''">2、分析结果 > </text>
        <text :class="procedure>=2?'headcolor':''">3、生成生成报告</text>
      </div>
      <div class="headflankbody"  v-if="procedure==0">
            <text>头侧片分析</text>  
            <div class="imgbox">
              <input type="file" ref="headflank" multiple @change="upheadflank" style="display: none">
              <div class="headflank" @click="openheadflank" v-if="clsrc == ''">
                <text>+</text>
                <div>上传</div>
              </div>
              <div class="headflank" @click="openheadflank" v-else>
                <img :src="clsrc" alt="">
              </div>
            </div>
          </div>
          <div  v-if="procedure==1">
            <Headflank :face="face"></Headflank>
          </div>
          <div v-if="procedure==2">
              <HeadflankReport :face="face"></HeadflankReport>
          </div>
        <div class="next">
        
        <div @click="nexttype" class="nextsty">开始分析</div>
      </div>
      <el-loading v-if="loading" :text="loadingText" :spinner="loadingSpinner" >
        <i class="el-icon-phone"></i>
        <div class="loading">正在分析...</div>
      </el-loading>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Headflank from './headflank'
  import HeadflankReport from './headflankReport'
    import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['editstart'],
      data() {
        return {
          face:{},
          procedure:0,
          clsrc:''
        }
      },
      components:{ 
        Text,
        Headflank,
        HeadflankReport,
        loading:false
     },
      created() {
        
      },
      mounted() {
        
      },
      computed: {},
      methods: {
        nexttype(){
          //头侧分析
          this.loading = true
          axios.post('/api/cl', {url:this.clsrc})
          .then(response => {
            // 处理上传成功的回调
            console.log(response,'头侧分析结果');
            this.face.cllist = response.data
            this.face.climg = this.clsrc
            this.procedure++
            this.loading = false; // 隐藏加载动画
            
          })
          .catch(error => {
            // 处理上传失败的回调
            this.loading = false; // 隐藏加载动画
          });
        },
        //头侧
        upheadflank(event){
          console.log(event,'event');
          const files = event.target.files;

          const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append('image', files[i]);  // 修改键名以匹配后端期望
            }
          // 发送请求
          axios.post('/api/uploadcl', formData)
            .then(response => {
              this.clsrc = response.data.url
              console.log(response,'头侧上传回调');
            })
          
        },
        openheadflank(){
          this.$refs.headflank.click();
        },
      }
    }
    
  </script>
  
<style lang="scss" scoped>
.body{
        width: 96%;
        margin: 0 auto;
        // border: 1px solid #030303;
        padding: 20px 0;
        
    }
    .head{
        width:100%;
        padding-bottom: 15px;
        border-bottom: 8px solid #dddddd;
    }
.headflankbody{
  padding: 5% 0;
    padding-left: 5%;
    display: flex;
    align-items: center;
    .headflank{
      width:200px;
      height: 220px;
      margin-left: 25%;
      border-radius: 2px;
      background-color: #dbdbdb60;
      border: 1px dashed rgb(173, 173, 173);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width:200px;
        height: 220px;
      }
    }
  }
  .next{
      display: flex;
      position: relative;
      left: 45%;
      top: 5%;
      .nextsty{
        width: 8%;
        padding: 5px;
        background-color: #7BA9B9;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
        margin-left: 1%;
      }
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
  .headcolor{
    color:#7BA9B9
  }
</style>