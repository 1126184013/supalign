<template>
  <div class="page">
    <Header :page="'dental'" />
    <div class="content">
      <div class="head">
        <text :class="procedureIndex >= 0 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(0)">1、上传牙例图片 </text>
        <text :class="procedureIndex >= 1 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(1)">> 2、分析结果 </text>
        <text :class="procedureIndex >= 2 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(2)">> 3、生成报告</text>
      </div>
      <div class="middle" v-if="procedure == 0">
        <div class="title">
          <text style="color: red">*</text>牙例分析
          <input type="file" ref="fileInput" multiple @change="batch" style="display: none">
          <el-button class="custom-button" size="large" type="primary" @click="uploadBatch">批量上传</el-button>
        </div>
        <div class="box">
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>口内照：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item" v-for="(item, index) in intraoral">
                <input type="file" :ref="`uploadFile${index}`" multiple @change="upload($event, index)"
                  style="display: none">
                <div style="height: 187px;" v-if="intraoralList[index]">
                  <el-image class="img" fit="cover" :src="intraoralList[index]" :preview-src-list="intraoralList"
                    :initial-index="index" />
                  <div class="imgdel" @click="imgdel(index)">删除</div>
                </div>
                <img v-else class="img" :src="item.url" @click="uploadClick(index)" />
                <text style="margin-top: 20px;">{{ item.name }}</text>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>CT照：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item">
                <input type="file" ref="uploadFile6" multiple @change="upload($event, 6)" style="display: none">
                <div style="height: 187px;" v-if="intraoralList[6]">
                  <el-image class="img" fit="cover" :src="intraoralList[6]" :preview-src-list="intraoralList"
                    :initial-index="6" />
                  <div class="imgdel btm" @click="imgdel(6)">删除</div>
                </div>
                <img v-else class="img" src="@/assets/dental/CTFile.png" @click="uploadClick(6)">
              </div>
            </div>
          </div>
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>口内3D照分析：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item">
                <input type="file" ref="uploadFile7" multiple @change="upload($event, 7)" style="display: none">
                <div style="height: 187px;" v-if="intraoralList[7]">
                  <el-image class="img" fit="cover" :src="intraoralList[7]" :preview-src-list="intraoralList"
                    :initial-index="7" />
                  <div class="imgdel btm" @click="imgdel(7)">删除</div>
                </div>
                <img v-else class="img" src="@/assets/dental/CTFile.png" @click="uploadClick(7)">
              </div>
            </div>
          </div>
        </div>
      </div>

      <Analze v-if="procedure == 1" :list="intraoralList" />
      <Report v-if="procedure == 2" :list="intraoralList" />
    </div>
    <div class="btn_box">
      <div class="btn" @click="analyze" v-if="procedure == 0">开始分析</div>
      <div class="btn" @click="report" v-if="procedure == 1">生成报告</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import Header from "@/components/Header/index.vue";
import leftFile from "@/assets/dental/leftFile.png";
import frontFile from "@/assets/dental/frontFile.png";
import rightFile from "@/assets/dental/rightFile.png";
import upFile from "@/assets/dental/upFile.png";
import downFile from "@/assets/dental/downFile.png";
import vizorFile from "@/assets/dental/vizorFile.png";
import Analze from "./analze";
import Report from "./report";

import kounei1 from "@/assets/delete/kouneizuoce.png";
import kounei2 from "@/assets/delete/kouneizheng.png";
import kounei3 from "@/assets/delete/kouneiyouce.png";
import kounei4 from "@/assets/delete/kouneishang.png";
import kounei5 from "@/assets/delete/kouneixia.png";
import kounei6 from "@/assets/delete/kounei90.png";
import ct from "@/assets/delete/ct.png";
import kounei3Dshang from "@/assets/delete/kounei3Dshang.png";
import kounei3Dxia from "@/assets/delete/kounei3Dxia.png";

export default {
  name: 'dental',
  data() {
    return {
      procedure: 0,
      procedureIndex: 0,
      intraoral: [
        { name: '左侧咬合照', url: leftFile },
        { name: '正面照', url: frontFile },
        { name: '右侧咬合照', url: rightFile },
        { name: '上颌𬌗面照', url: upFile },
        { name: '下颌𬌗面照', url: downFile },
        { name: '90°覆面照', url: vizorFile },
      ],
      intraoralList: [kounei1, kounei2, kounei3, kounei4, kounei5, kounei6, ct, kounei3Dshang, kounei3Dxia],
      loadingInstance: ''
    }
  },
  components: {
    Header,
    Analze,
    Report
  },

  methods: {
    // 面包屑切换
    changeCrumbs(index) {
      if (this.procedure == index) return
      else if (index > this.procedureIndex) return
      else this.procedure = index
    },

    // 触发文件上传
    uploadClick(i) {
      if (i < 6) this.$refs[`uploadFile${i}`][0].click();
      else this.$refs[`uploadFile${i}`].click();
    },

    // 批量上传
    uploadBatch() {
      this.$refs.fileInput.click();
    },

    batch(event) {
      // 加载动画
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在上传图片中...',
      })

      this.intraoralList = []
      const files = event.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);  // 修改键名以匹配后端期望
      }

      // 发送请求
      axios.post('/api/upload', formData)
        .then(res => {
          res.data.forEach(item => {
            this.intraoralList.push(item.url)
          })
          this.loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          this.loadingInstance.close()
          ElMessage.error(error)
        });
    },

    // 上传照片
    upload(event, i) {
      // console.log(event, i);
      let files = event.target.files;

      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);  // 修改键名以匹配后端期望
      }

      // 发送请求
      axios.post('/api/single', formData)
        .then(response => {
          this.intraoralList[i] = response.data.url
        })
    },

    imgdel(i) {
      this.intraoralList[i] = ''
      // console.dir(this.$refs[`uploadFile${i}`][0].files);
    },

    // 开始分析
    analyze() {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading',
        text: '正在分析中，请稍候...',
      })
      setTimeout(() => {
        this.procedure = 1
        this.procedureIndex = 1
        window.scrollTo({ top: 0 })
        this.loadingInstance.close()
      }, 2000)
    },

    // 生成报告
    report() {
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在生成中，请稍等...'
      })
      setTimeout(() => {
        this.procedure = 2
        this.procedureIndex = 2
        window.scrollTo({ top: 0 })
        this.loadingInstance.close()
      }, 2000)
      // axios.post('/api/description', this.res)
      //   .then(res => {
      //     res.data.result.forEach((item, index) => {
      //       this.face.list[index] = { ...this.face.list[index], status: item[0], significance: item[1] }
      //     });
      //     this.procedure = 2
      //     this.procedureIndex = 2
      //     this.loadingInstance.close()
      //   }).catch(error => {
      //     this.loadingInstance.close()
      //     ElMessage.error(error)
      //   })
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  // width: 100vw;
  // height: auto;

  .content {
    width: 96%;
    margin: 0 auto;
    overflow-x: hidden;
    padding: 20px 0;
    user-select: none;
    font-size: 20px;

    .head {
      width: 100%;
      padding-bottom: 15px;
      border-bottom: 8px solid #dddddd;
      position: relative;

      .headcolor {
        color: #7BA9B9;
        cursor: pointer;
      }

      .no_drop {
        color: #000;
      }
    }

    .middle {
      padding: 30px 20px;

      .title {
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 10px;
        border-bottom: 1px solid #dddddd;

        .custom-button {
          margin-left: 20px;
          background-color: #7BA9B9;
          border: 1px solid #7BA9B9;
          font-size: 18px;
        }
      }

      .box {

        .item {
          margin-top: 40px;

          .title_1 {
            font-size: 18px;
            display: flex;
            align-items: center;

            .rule {
              font-size: 16px;
              color: #7BA9B9;
              cursor: pointer;

              text {
                text-decoration: underline;
              }
            }

            .rule:hover {
              color: #666;
            }
          }

          .upload {
            width: 50%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .upload_item {
              width: 30%;
              margin-top: 30px;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;

              .img {
                width: 173px;
                height: 187px
              }

              .imgdel {
                width: 173px;
                background-color: #1d1d1d63;
                color: #FFFFFF;
                position: absolute;
                bottom: 47px;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .btm {
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }


  .btn_box {
    margin-top: 30px;
    width: 100%;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
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
  }
}
</style>