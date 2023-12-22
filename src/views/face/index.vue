<template>
  <Header :page="'face'" />
  <div class="body">
    <div class="head">
      <text :class="procedure >= 0 ? 'headcolor' : ''">1、上传面像图片 > </text>
      <text :class="procedure >= 1 ? 'headcolor' : ''">2、分析结果 > </text>
      <text :class="procedure >= 2 ? 'headcolor' : ''">3、生成生成报告</text>
      <!-- <el-steps :active="active" simple space="1">
            <el-step title="步骤 1" ></el-step>
            <el-step title="步骤 2" ></el-step>
            <el-step title="步骤 3" ></el-step>
        </el-steps> -->

      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
    <div style="padding: 30px 0;">
      <div class="analyze" v-if="procedure == 0">
        <div>
          <input type="file" ref="fileInput" multiple @change="handleFileChange" style="display: none">
          <el-button class="custom-button" size="small" type="primary" @click="openFileInput"
            v-loading.fullscreen.lock="fullscreenLoading">批量上传</el-button>

          <!-- <text>(上传规则)</text> -->
        </div>
        <div class="uoload">
          <div class="faceimg">
            <input type="file" ref="fileupimgfron" multiple @change="upimgfron" style="display: none">
            <img src="../../assets/face2/face1.png" alt="" style="width: 173px; height: 187px" v-if="frontimg.length < 1"
              @click="openupimgfron">
            <div v-else>
              <el-image style="width: 173px; height: 187px" :src="frontimg" :preview-src-list="frontimgbig">
              </el-image>
              <div class="imgdel" @click="imgdel('frontimg')">删除</div>
            </div>

            <!-- <img :src="imagelist[1]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
          </div>
          <div class="faceimg">
            <input type="file" ref="flankimg" multiple @change="upflankimg" style="display: none">
            <img src="../../assets/face2/face2.png" alt="" style="width: 173px; height: 187px" v-if="flankimg.length < 1"
              @click="openflankimg">
            <div v-else>
              <el-image style="width: 173px; height: 187px" :src="flankimg" :preview-src-list="flankimgbig">
              </el-image>
              <div class="imgdel" @click="imgdel('flankimg')">删除</div>
            </div>

            <!-- <img :src="imagelist[0]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
          </div>
          <div class="faceimg">
            <input type="file" ref="smileimg" multiple @change="upsmileimg" style="display: none">
            <img src="../../assets/face2/face3.png" alt="" style="width: 173px; height: 187px" v-if="smileimg.length < 1"
              @click="opensmileimg">
            <div v-else>
              <el-image style="width: 173px; height: 187px" :src="smileimg" :preview-src-list="smileimgbig">
              </el-image>
              <div class="imgdel" @click="imgdel('smileimg')">删除</div>

            </div>

            <!-- <img :src="imagelist[2]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
          </div>
        </div>
      </div>
      <div v-if="procedure == 1" style="">
        <FaceAnalyze :face="face"></FaceAnalyze>
      </div>
      <div v-if="procedure == 2" style="">
        <FaceReport :face="face"></FaceReport>
      </div>
    </div>

    <div class="next">
      <div @click="lasttype" class="nextsty" v-if="procedure != 0">上一步</div>
      <div class="nextstynull" v-if="imagelist.length < 3">
        开始分析
      </div>
      <!-- <div class="nextsty" v-else-if="procedure=='1'">生成报告</div> -->
      <div @click="nexttype" class="nextsty" v-else-if="procedure == '1'">生成报告</div>
      <div @click="nexttype" class="nextsty" v-else-if="procedure == '2'">下载pdf</div>
      <div @click="nexttype" class="nextsty" v-else>开始分析</div>
    </div>

    <!-- <el-loading v-if="loading" :text="loadingText" :spinner="loadingSpinner">
      <i class="el-icon-phone"></i>
      <div class="loading">正在分析...</div>
    </el-loading> -->
  </div>
</template>
  
<script>
import FaceAnalyze from './faceAnalyze'
import FaceReport from './faceReport'
import Header from "../../components/Header/index.vue";
import { ElLoading, ElMessage } from 'element-plus'
import axios from 'axios'
export default {
  name: 'face',
  data() {
    return {
      active: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: true,
      clsrc: '',
      procedure: 0,
      imagelist: [],
      face: {},
      frontimg: [],
      flankimg: [],
      smileimg: [],
      frontimgbig: [],
      flankimgbig: [],
      smileimgbig: [],
      loading: false,
      activeNames: ['1'],
      loadingText: '加载中...', // 加载动画的文本提示
      loadingSpinner: 'el-icon-loading', // 加载动画的图标

    }
  },
  components: {
    FaceAnalyze,
    FaceReport,
    Header
  },
  methods: {
    nexttype() {
      let text = '';
      if (this.procedure == 1) {
        this.procedure++
        text = '正在生成中，请稍等...'
        return
      } else if (this.procedure == 2) {
        text = '正在下载中，请稍等...'
      } else {
        text = '正在分析中，请稍等...'
      }
      // this.loading = true; // 显示加载动画
      const loadingInstance = ElLoading.service({ text })

      this.imagelist.find(image => image.type === 'front').url = this.frontimg;
      this.imagelist.find(image => image.type === 'profile').url = this.flankimg;
      this.imagelist.find(image => image.type === 'smile').url = this.smileimg;
      console.log(this.imagelist, '下一步')
      axios.post('/api/face', this.imagelist)
        .then(response => {
          // 处理上传成功的回调
          console.log(response, '处理上传成功的回调');
          this.face.list = response.data
          this.face.img = this.imagelist
          this.procedure == '2' ? this.procedure = '2' : this.procedure++
          // this.loading = false; // 隐藏加载动画 
          loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          // this.loading = false; // 隐藏加载动画
          loadingInstance.close()
          ElMessage.error(error)
        });

    },
    handleChange(val) {
      console.log(val);
    },
    lasttype() {
      if (this.procedure > 0) {
        this.procedure--
      } else {
        this.$emit('tabs');
      }

    },
    imgdel(type) {
      this[type] = []
      this[type + `big`] = []
      let todata = this.imagelist.find(image => image.type === 'front');
      if (todata) {
        this.imagelist.splice(todata, 1)
      }
      console.log(this[type], this[type + `big`], this.imagelist, '删除图片');
    },
    handleRemove(file, fileList) {
      this.hideUpload = false
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file, 'file');
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.hideUpload = true
    },
    open(text) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    },



    //正脸
    upimgfron(event) {
      console.log(event, 'event');
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
          console.log(response, '处理上传成功的回调');
          if (response.data.type == 'wrong') {
            this.$confirm('没有检测到人脸，是否继续', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.frontimg = response.data.url
              this.frontimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'front');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'front', url: response.data.url })
              }
            })
          } else if (response.data.type == 'profile') {
            this.$confirm('检测到的是侧脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.frontimg = response.data.url
              this.frontimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'front');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'front', url: response.data.url })
              }
            })
          } else if (response.data.type == 'smile') {
            this.$confirm('检测到的是微笑脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.frontimg = response.data.url
              this.frontimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'front');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'front', url: response.data.url })
              }
            })
          }
          else {
            this.frontimg = response.data.url
            this.frontimgbig[0] = response.data.url
            let todata = this.imagelist.find(image => image.type === 'front');
            if (todata) {
              todata.url = response.data.url
            } else {
              this.imagelist.push({ type: 'front', url: response.data.url })
            }

          }
        })
    },
    //侧脸
    upflankimg(event) {
      console.log(event, 'event');
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
          console.log(response, '处理上传成功的回调');
          if (response.data.type == 'wrong') {
            this.$confirm('没有检测到人脸，是否继续', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.flankimg = response.data.url
              this.flankimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'profile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'profile', url: response.data.url })
              }

            })
          } else if (response.data.type == 'front') {
            this.$confirm('检测到的是正脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.flankimg = response.data.url
              this.flankimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'profile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'profile', url: response.data.url })
              }

            })
          }
          else if (response.data.type == 'smile') {
            this.$confirm('检测到的是微笑脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.flankimg = response.data.url
              this.flankimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'profile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'profile', url: response.data.url })
              }

            })
          }
          else {
            this.flankimg = response.data.url
            this.flankimgbig[0] = response.data.url
            let todata = this.imagelist.find(image => image.type === 'profile');
            if (todata) {
              todata.url = response.data.url
            } else {
              this.imagelist.push({ type: 'profile', url: response.data.url })
            }

          }
        })
    },
    //微笑
    upsmileimg(event) {
      console.log(event, 'event');
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
          console.log(response, '处理上传成功的回调');
          if (response.data.type == 'wrong') {
            this.$confirm('没有检测到人脸，是否继续', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.smileimg = response.data.url
              this.smileimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'smile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'smile', url: response.data.url })
              }

            })
          } else if (response.data.type == 'profile') {
            this.$confirm('检测到的是侧脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.smileimg = response.data.url
              this.smileimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'smile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'smile', url: response.data.url })
              }

            })
          } else if (response.data.type == 'front') {
            this.$confirm('检测到的是正脸，是否使用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.smileimg = response.data.url
              this.smileimgbig[0] = response.data.url
              let todata = this.imagelist.find(image => image.type === 'smile');
              if (todata) {
                todata.url = response.data.url
              } else {
                this.imagelist.push({ type: 'smile', url: response.data.url })
              }

            })
          } else {
            this.smileimg = response.data.url
            this.smileimgbig[0] = response.data.url
            let todata = this.imagelist.find(image => image.type === 'smile');
            if (todata) {
              todata.url = response.data.url
            } else {
              this.imagelist.push({ type: 'smile', url: response.data.url })
            }

          }
        })
    },
    //批量上传
    handleFileChange(event) {
      // 加载动画
      const loadingInstance = ElLoading.service({
        text: '正在上传...',
      })

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
          console.log(response, '处理上传成功的回调');
          this.imagelist = response.data
          this.face.img = this.imagelist
          console.log(this.frontimg, this.flankimg, this.smileimg, 'this.frontimg')


          let tabfrontimg = this.imagelist.find(image => image.type === 'front');
          let tabflankimg = this.imagelist.find(image => image.type === "profile");
          let tabsmileimg = this.imagelist.find(image => image.type === "smile");
          if (tabfrontimg) {
            this.frontimg = tabfrontimg.url
            this.frontimgbig[0] = tabfrontimg.url
          }
          if (tabflankimg) {
            this.flankimg = tabflankimg.url
            this.flankimgbig[0] = tabflankimg.url
          }
          if (tabsmileimg) {
            this.smileimg = tabsmileimg.url
            this.smileimgbig[0] = tabsmileimg.url
          }
          console.log(this.frontimg, this.flankimg, this.smileimg, 'this.frontimg')

          // 关闭加载动画
          loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          loadingInstance.close()
          ElMessage.error(error)
        });
    },
    openupimgfron() {
      this.$refs.fileupimgfron.click();
    },

    opensmileimg() {
      this.$refs.smileimg.click();

    },
    openflankimg() {
      this.$refs.flankimg.click();

    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
  }
}

</script>
  
<style lang="scss" scoped>
.custom-button {
  background-color: #7BA9B9;
}

.el-button {
  background-color: #7BA9B9;
}

.custom-title {
  color: red;
  font-size: 20px;
}

.body {
  width: 96%;
  margin: 0 auto;
  overflow-x: hidden;
  // border: 1px solid #030303;
  padding: 20px 0;

}

.faceimg {
  width: 173;
  height: 187;
}

.loading {
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

.head {
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 8px solid #dddddd;
  position: relative;
}

.next {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 200px;
}

.headcolor {
  color: #7BA9B9
}

.analyze {
  padding-top: 30px;
}

.imgdel {
  width: 173px;
  background-color: #1d1d1d63;
  color: #FFFFFF;
  position: relative;
  left: 0;
  top: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uoload {
  margin-top: 15px;
  display: flex;
  // justify-content: center;
  padding-top: 5%;

  // padding-left: 5%;
  div {
    margin-left: 5%;
  }
}

.hide .el-upload--picture-card {
  display: none;
}

.nextsty {
  width: 200px;
  height: 30px;
  padding: 5px;
  background-color: #7BA9B9;
  color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  margin: 0 1%;
  line-height: 30px;
}

.nextstynull {
  width: 200px;
  height: 30px;
  padding: 5px;
  background-color: #828283;
  color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  margin-left: 1%;
  line-height: 30px;
}
</style>