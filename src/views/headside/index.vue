<template>
    <div class="body">
      <Header />
      <div class="head">
        <text :class="procedure>=0?'headcolor':''" @click="schedule>0?procedure=0:''">1、上传头颅CT图片 > </text>
        <text :class="procedure>=1?'headcolor':''" @click="schedule>=1?procedure=1:''">2、分析结果 > </text>
        <text :class="procedure>=2?'headcolor':''">3、生成报告</text>
      </div>
      <div class="headflankbody"  v-if="procedure==0">
          <div style="display: flex;flex-direction: column;font-size: 16px;">
            <text>头侧片分析</text> 
            <text style="margin-top: 10px;color: rgb(168, 168, 168);" @click="rulestate=1">上传规则</text>
          </div>
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
            <Headflank @update="update" :face="face"></Headflank>
          </div>
          <div v-if="procedure==2">
              <HeadflankReport :face="face"></HeadflankReport>
          </div>
        <div class="next">
        
        <div @click="nexttype" class="nextsty" v-if="procedure==0">开始分析</div>
      </div>
      <el-loading v-if="loading" :text="loadingText" :spinner="loadingSpinner" >
        <i class="el-icon-phone"></i>
        <div class="loading">正在分析...</div>
      </el-loading>
      <div class="rule" v-if="rulestate==1">
        <div class="rulebox">
          <div class="rulehead"><text>X光照上传规则</text><text>X</text></div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Headflank from './headflank'
  import HeadflankReport from './headflankReport'
import Header from "../../components/Header/index.vue";
    import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['editstart'],
      data() {
        return {
          face:{},
          procedure:0,
          schedule:0 ,
          clsrc:'',
          rulestate:0,
        }
      },
      watch: {
        procedure(newVal) {
          // 当步骤变化时，根据当前步骤更新链接状态
          const links = this.$el.querySelectorAll('text');
          for (let i = 0; i < links.length; i++) {
            if (i <= newVal) {
              links[i].classList.add('headcolor');
              links[i].onclick = () => { this.procedure = i; };
            } else {
              links[i].classList.remove('headcolor');
              links[i].onclick = null;
            }
          }
        },
      },
      components:{ 
        Text,
        Headflank,
        HeadflankReport,
        Header
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
            this.schedule++
            this.loading = false; // 隐藏加载动画
            
          })
          .catch(error => {
            // 处理上传失败的回调
            this.loading = false; // 隐藏加载动画
          });
        },
        update(){
          this.procedure++
          this.schedule++
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
        position: relative;
    }
    .head{
        width:100%;
        font-size: 18px;
        padding-bottom: 15px;
        border-bottom: 8px solid #dddddd;
        margin-top: 3%;
    }
    .rule{
      position: absolute;
      left: -2%;
      top:0;
      background-color: #3b3b3b7e;
      width: 100vw;
      height: 100%;
      .rulebox{
        width: 86%;
        min-height: 80%;
        background-color: #FFFFFF;
        margin: 5% auto;
        .rulehead{
          width: 96%;
          background-color: #76A0B1;
          display: flex;
          justify-content: space-between;
          padding: 1.5% 2%;
          color: #FFFFFF;
        }
      }
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
      left: 36%;
      top: 15%;
      .nextsty{
        width: 20%;
        padding: 8px 0;
        background-color: #7BA9B9;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
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