<template>
  <Header :page="'face'" />
  <div class="body">
    <div class="head">
      <text :class="procedureIndex >= 0 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(0)">1、上传面像图片 </text>
      <text :class="procedureIndex >= 1 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(1)">> 2、分析结果 </text>
      <text :class="procedureIndex >= 2 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(2)">> 3、生成报告</text>
      <!-- <el-steps :active="active" simple space="1">
            <el-step title="步骤 1" ></el-step>
            <el-step title="步骤 2" ></el-step>
            <el-step title="步骤 3" ></el-step>
        </el-steps> -->

      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </div>
    <div style="padding: 30px 0;">
      <div class="analyze" v-if="procedure == 0">
        <div class="top">
          <input type="file" ref="fileInput" multiple @change="handleFileChange" style="display: none">
          <el-button class="custom-button" size="large" type="primary" @click="openFileInput">批量上传</el-button>
          <!-- v-loading.fullscreen.lock="fullscreenLoading" -->
          <div @click="ruleShow = true" class="rule">( <text>上传规则</text> )</div>
        </div>
        <div class="uoload">
          <div class="faceimg">
            <input type="file" ref="fileupimgfron" multiple @change="upimgfron" style="display: none">
            <img src="../../assets/face2/face1.png" alt="" style="width: 173px; height: 187px" v-if="frontimg.length < 1"
              @click="openupimgfron">
            <div v-else>
              <el-image style="width: 173px; height: 187px" fit="cover" :src="frontimg" :preview-src-list="frontimgbig">
              </el-image>
              <div class="imgdel" @click="imgdel('frontimg')">删除</div>
            </div>

            <!-- <img :src="imagelist[1]?.url" alt="" style="width: 100%;height: 100%;" v-else> -->
          </div>
          <div class="faceimg">
            <input type="file" ref="flankimg" multiple @change="upflankimg" style="display: none">
            <img src="../../assets/face2/face2.png" alt="" style="width: 173px; height: 187px;" v-if="flankimg.length < 1"
              @click="openflankimg">
            <div v-else>
              <el-image style="width: 173px; height: 187px" fit="cover" :src="flankimg" :preview-src-list="flankimgbig">
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
              <el-image style="width: 173px; height: 187px" fit="cover" :src="smileimg" :preview-src-list="smileimgbig">
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
      <div @click="nexttype" class="nextsty" v-if="procedure == 0">开始分析</div>
      <div @click="report" class="nextsty" v-else-if="procedure == '1'">生成报告</div>
      <div @click="downloadPDF" class="nextsty" v-else-if="procedure == '2'">下载PDF</div>
      <!-- <div class="nextsty" v-else-if="procedure == '2'">
        <a :href="pdf_url" download="方案报告.pdf">下载PDF</a>
      </div> -->
      <div @click="reserve" class="nextsty" v-if="procedure == 2">保存</div>
    </div>
  </div>

  <el-dialog v-model="ruleShow" width="80%" class="dialog">
    <template #header>
      <div class="my_header">
        面像照上传规则
      </div>
    </template>
    <div class="text">
      <h4>正面像照片要求</h4>
      <text>1、人像居于正中</text><br />
      <text>2、患者面部端正，目视镜头</text><br />
      <text>3、取景范围上方要适当留白，下方可至锁骨水平</text><br />
      <text>4、两侧耳廓显露的大小基本一致</text><br />
      <text>5、正面像自然闭唇，微笑像自然微笑</text><br />
      <text>6、相机处于患者鼻尖水平，以鼻子对焦</text><br />
      <h4>侧面像照片要求</h4>
      <text>1、患者面部要端正，目视前方，不能仰头或低头</text><br />
      <text>2、以右侧侧貌拍照，需要清晰看到一侧眼睛、鼻尖、嘴唇和颜部轮廓，不要显示对侧结构</text><br />
      <text>3、取景范围上方要适当留白，下方可至锁骨水平，前方有适当留白，后方范围无要求</text><br />
      <text>4、侧面像自然闭唇</text><br />
      <text>5、耳屏前方乙状切迹为构图中心点，以耳屏前方对焦</text><br />
      <div class="last">
        <text>声明：本网站照片及视频资料都已获患者本人授权使用，任何媒体、网站或个人未经我公司书面授权均不得擅自进行下载、转载或以其他方式使用，违者将依法追究责任。</text>
      </div>
    </div>

  </el-dialog>
</template>
  
<script>
import FaceAnalyze from './faceAnalyze'
import FaceReport from './faceReport'
import Header from "../../components/Header/index.vue";
import { ElLoading, ElMessage } from 'element-plus'
import { useRoute, useRouter } from "vue-router";
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
      procedureIndex: 0,
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
      loadingInstance: '', // 加载动画实例
      ruleShow: false,
      res: [],
      pdf_url: '',
    }
  },
  components: {
    FaceAnalyze,
    FaceReport,
    Header
  },

  created() {
    window.addEventListener("popstate", this.monitorBackForward, false)
  },

  methods: {
    changeCrumbs(index) {
      if (this.procedure == index) return
      else if (index > this.procedureIndex) return
      else this.procedure = index
    },

    // 开始分析
    nexttype() {
      if (this.procedure == 0 && this.imagelist.length < 3) {
        ElMessage.error('请先上传图片')
        return
      }
      // this.loading = true; // 显示加载动画
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading',
        text: '正在分析中，请稍候...',
      })

      this.imagelist.find(image => image.type === 'front').url = this.frontimg;
      this.imagelist.find(image => image.type === 'profile').url = this.flankimg;
      this.imagelist.find(image => image.type === 'smile').url = this.smileimg;
      console.log(this.imagelist, '下一步')

      axios.post('/api/face', this.imagelist)
        .then(response => {
          // 处理上传成功的回调
          console.log(response, '处理上传成功的回调');
          this.res = response.data.results;
          this.face.list = response.data.results.map((item, index) => {
            if (index == 0) return { type: 0, name: '正面型', value: item, checked: false }
            else if (index == 1) return { type: 0, name: '对称性', value: item, checked: false }
            else if (index == 2) return { type: 0, name: '下面高', value: item, checked: false }
            else if (index == 3) return { type: 0, name: '唇齿位', value: item, checked: false }
            else if (index == 4) return { type: 0, name: '颏位', value: item, checked: false }
            else if (index == 5) return { type: 0, name: '微笑', value: item, checked: false }
            else if (index == 6) return { type: 1, name: '侧面型', value: item, checked: false }
            else if (index == 7) return { type: 1, name: '鼻唇角', value: item, checked: false }
            else if (index == 8) return { type: 1, name: '唇位', value: item, checked: false }
            else if (index == 9) return { type: 1, name: '颏唇沟', value: item, checked: false }
            else if (index == 10) return { type: 1, name: '颏位', value: item, checked: false }
            else if (index == 11) return { type: 1, name: '下颌角', value: item, checked: false }
          })
          this.face.img = this.imagelist
          this.procedure = 1
          this.procedureIndex = 1
          // this.loading = false; // 隐藏加载动画 
          this.loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          // this.loading = false; // 隐藏加载动画
          this.loadingInstance.close()
          ElMessage.error(error)
        });

    },

    // 生成报告
    report() {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在生成中，请稍等...'
      })
      axios.post('/api/description', this.res)
        .then(res => {
          res.data.result.forEach((item, index) => {
            this.face.list[index] = { ...this.face.list[index], status: item[0], significance: item[1] }
          });
          this.procedure = 2
          this.procedureIndex = 2
          this.loadingInstance.close()
        }).catch(error => {
          this.loadingInstance.close()
          ElMessage.error(error)
        })
    },

    // 下载pdf
    downloadPDF() {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在下载中，请稍等...'
      })
      axios.post('/api/report', {
        data: this.res,
        image1: this.imagelist[0].url,
        image2: this.imagelist[1].url,
        image3: this.imagelist[2].url,
      }).then(res => {
        this.loadingInstance.close()
        this.openWindow(res.data.url, '方案报告');
      }).catch(error => {
        this.loadingInstance.close()
        ElMessage.error(error)
      })
    },

    // 打开pdf
    openWindow(url, title) {
      const newWindow = window.open('about:blank', title);
      newWindow.document.title = title;
      let iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.width = '100%';
      iframe.style.height = '100vh';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.overflow = 'hidden';
      iframe.style.border = 'none';
      newWindow.document.body.style.margin = '0';
      newWindow.document.body.appendChild(iframe);
    },

    // 保存
    reserve() {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在保存中，请稍等...'
      })
      axios.post('/api/save', this.res).then(res => {
        if (res.data.code == 0) {
          this.loadingInstance.close()
          this.$router.push('/home')
          ElMessage.success('保存成功')
        }
      }).catch(error => {
        this.loadingInstance.close()
        ElMessage.error(error)
      })
    },

    // 返回上一步
    lasttype() {
      if (this.procedure > 0) {
        this.procedure--
      } else {
        this.$emit('tabs');
      }
    },

    // 返回上一步
    lasttype() {
      if (this.procedure > 0) {
        this.procedure--
      } else {
        this.$emit('tabs');
      }
    },
    handleChange(val) {
      console.log(val);
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
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在上传图片中...',
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
          console.log('imgList>>>>', this.imagelist);
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
          this.loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          this.loadingInstance.close()
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

    monitorBackForward() {
      if (this.loadingInstance) this.loadingInstance.close()
    },
  },
}

</script>
  
<style lang="scss" scoped>
.custom-button {
  background-color: #7BA9B9;
  border: 1px solid #7BA9B9;
  font-size: 18px;
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
  user-select: none;
  font-size: 20px;
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
  justify-content: center;
  margin-top: 200px;
}

.headcolor {
  color: #7BA9B9;
  cursor: pointer;
}

.no_drop {
  color: #000;
  // cursor:no-drop;
  // pointer-events: none;
}

.analyze {
  padding-top: 30px;

  .top {
    display: flex;
    align-items: center;

    .rule {
      margin-left: 20px;
      color: #7BA9B9;
      font-size: 16px;
      cursor: pointer;

      text {
        text-decoration: underline;
      }
    }

    .rule:hover {
      color: #666;
    }
  }
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
  height: 40px;
  padding: 5px;
  background-color: #7BA9B9;
  color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  margin: 0 1%;
  font-size: 18px;
  line-height: 40px;
  cursor: pointer;
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

.dialog {
  .my_header {
    background-color: #ff5e2b;
    padding: 20px 10px;
    color: #fff;
  }

  .text {
    font-size: 16px;
    line-height: 32px;

    .last {
      margin: 30px 0 20px 0;
    }
  }

  :global(.el-dialog__header) {
    padding: 0;
    margin-right: 0;
  }

  :global(.el-dialog__body) {
    padding-top: 10px;
  }

  :global(.el-dialog__headerbtn .el-dialog__close) {
    color: #fff;
  }
}
</style>