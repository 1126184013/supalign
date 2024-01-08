<template>
  <div class="page">
    <Header :page="'upload'" :minW="1440" />
    <div class="content">
      <div class="head">
        <text :class="procedureIndex >= 0 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(0)">上传图片 </text>
        <text :class="procedureIndex >= 1 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(1)">> 分析结果 </text>
        <text :class="procedureIndex >= 2 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(2)">> 推荐产品 </text>
        <text :class="procedureIndex >= 3 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(3)">> 生成建议 </text>
        <text :class="procedureIndex >= 4 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(4)">> 生成报告 </text>
      </div>
      <div class="middle">
        <div class="title">
          <text style="color: red">*</text>面像分析：
          <input type="file" ref="faceFileInput" multiple @change="dentalBatch($event, 'face')" style="display: none">
          <el-button class="custom-button" size="large" type="primary" @click="dentalUploadBatch('face')">批量上传</el-button>
          <div class="rule m-l-30">( <text>上传规则</text> )</div>
        </div>
        <div class="box">
          <div class="item_1">
            <div class="upload">
              <div class="upload_item" v-for="(item, index) in face">
                <input type="file" :ref="`faceUploadFile${index}`" multiple @change="upload($event, 'face', index)"
                  style="display: none">
                <div style="height: 260px;" v-if="faceList[index]">
                  <el-image class="img" fit="cover" :src="faceList[index]" :preview-src-list="faceList"
                    :initial-index="index" />
                  <div class="imgdel" @click="imgdel(index)">删除</div>
                </div>
                <img v-else class="img" :src="item.url" @click="uploadClick('face', index)" />
                <text style="margin-top: 20px;">{{ item.name }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="title">
          <text style="color: red">*</text>牙列分析：
          <!-- <input type="file" ref="dentalFileInput" multiple @change="dentalBatch($event, 'dental')" style="display: none">
          <el-button class="custom-button" size="large" type="primary"
            @click="dentalUploadBatch('dental')">批量上传</el-button> -->
        </div>
        <div class="box">
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>口内照：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item" v-for="(item, index) in intraoral">
                <input type="file" :ref="`intraoraUploadFile${index}`" multiple @change="upload($event, 'dental', index)"
                  style="display: none">
                <div style="height: 260px;" v-if="intraoralList[index]">
                  <el-image class="img" fit="cover" :src="intraoralList[index]" :preview-src-list="intraoralList"
                    :initial-index="index" />
                  <div class="imgdel" @click="imgdel(index)">删除</div>
                </div>
                <img v-else class="img" :src="item.url" @click="uploadClick('dental', index)" />
                <text style="margin-top: 20px;">{{ item.name }}</text>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>口内CT照：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item">
                <input type="file" ref="CTUploadFile" multiple @change="upload($event, 'dental', 6)"
                  style="display: none">
                <div style="height: 260px;" v-if="CTList[0]">
                  <el-image class="img" fit="cover" :src="CTList[0]" :preview-src-list="CTList" :initial-index="6" />
                  <div class="imgdel btm" @click="imgdel(6)">删除</div>
                </div>
                <img v-else class="img" src="@/assets/dental/CTFile.png" @click="uploadClick('dental', 6)">
              </div>
            </div>
          </div>
          <div class="item">
            <div class="title_1">
              <text style="color: red;">*</text>口内3D照分析：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload w_2">
              <div class="upload_item" v-for="(item, index) in TDDefault">
                <input type="file" :ref="`TDUploadFile${index}`" multiple @change="upload($event, 'TD', index)"
                  style="display: none">
                <div style="height: 260px;" v-if="TDList[index]">
                  <el-image class="img" fit="cover" :src="TDList[index]" :preview-src-list="TDList" :initial-index="index" />
                  <div class="imgdel" @click="imgdel(index)">删除</div>
                </div>
                <img v-else class="img" :src="item.url" @click="uploadClick('TD', index)">
                <text style="margin-top: 20px;">{{ item.name }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="box">
          <div class="item_1">
            <div class="title_1">
              <text style="color: red;">*</text>头侧片分析：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload">
              <div class="upload_item">
                <input type="file" ref="headSideUploadFile" multiple @change="upload($event, 'headSide')"
                  style="display: none">
                <div style="height: 260px;" v-if="headSideList[0]">
                  <el-image class="img" fit="cover" :src="headSideList[0]" :preview-src-list="headSideList"
                    :initial-index="0" />
                  <div class="imgdel btm" @click="imgdel(7)">删除</div>
                </div>
                <img v-else class="img" src="@/assets/dental/CTFile.png" @click="uploadClick('headSide')">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="box">
          <div class="item_1">
            <div class="title_1">
              <!-- <text style="color: red;">*</text> -->
              视频分析：
              <div class="rule">( <text>上传规则</text> )</div>
            </div>
            <div class="upload flex_start">
              <div class="upload_item m-r-100" v-for="(item, index) in video">
                <input type="file" :ref="`videoUploadFile${index}`" multiple @change="upload($event, 'video', index)"
                  style="display: none">
                <div style="height: 260px;" v-if="videoList[index]">
                  <el-image class="img" fit="cover" :src="videoList[index]" :preview-src-list="videoList"
                    :initial-index="index" />
                  <div class="imgdel" @click="imgdel(index)">删除</div>
                </div>
                <img v-else class="img" :src="item.url" @click="uploadClick('video', index)" />
                <text style="margin-top: 20px;">{{ item.name }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <div class="btn" @click="">保存</div>
        <div class="btn" @click="goToanalyze">下一步</div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import Header from "@/components/Header/index.vue";
import face1 from "@/assets/face2/face1.png";
import face2 from "@/assets/face2/face2.png";
import face3 from "@/assets/face2/face3.png";
import leftFile from "@/assets/dental/leftFile.png";
import frontFile from "@/assets/dental/frontFile.png";
import rightFile from "@/assets/dental/rightFile.png";
import upFile from "@/assets/dental/upFile.png";
import downFile from "@/assets/dental/downFile.png";
import vizorFile from "@/assets/dental/vizorFile.png";
import defaultFile from "@/assets/dental/CTFile.png";
export default {
  name: "upload",
  data() {
    return {
      id: 0,
      procedure: 0,
      procedureIndex: 0,
      face: [
        { name: '正面照', url: face1 },
        { name: '微笑照', url: face3 },
        { name: '侧面照', url: face2 },
      ],
      faceList: [],
      intraoral: [
        { name: '左侧咬合照', url: leftFile },
        { name: '正面照', url: frontFile },
        { name: '右侧咬合照', url: rightFile },
        { name: '上颌𬌗面照', url: upFile },
        { name: '下颌𬌗面照', url: downFile },
        { name: '90°覆面照', url: vizorFile },
      ],
      intraoralList: [],
      CTList: [],
      TDDefault: [
      { name: '上颌', url: defaultFile },
      { name: '下颌', url: defaultFile },
      ],
      TDList: [],
      headSideList: [],
      video: [
        { name: '吞咽视频', url: defaultFile },
        { name: '半身呼吸视频', url: defaultFile },
      ],
      videoList: [],
    }
  },
  components: {
    Header,
  },
  created() {
    this.id = this.$route.query.id;
    if (this.$route.query.index) this.procedureIndex = this.$route.query.index;
  },
  methods: {
    // 触发文件上传
    uploadClick(type, i) {
      if (type == "face") {
        this.$refs[`faceUploadFile${i}`][0].click();
      }
      else if (type == "dental") {
        if (i < 6) this.$refs[`intraoraUploadFile${i}`][0].click();
        else if (i == 6) this.$refs[`CTUploadFile`].click();
      }
      else if (type == 'TD') {
        this.$refs[`TDUploadFile${i}`][0].click();
      }
      else if (type == "headSide") {
        this.$refs[`headSideUploadFile`].click();
      }
      else if (type == "video") {
        this.$refs[`videoUploadFile${i}`][0].click();
      }
    },

    // 上传照片
    upload(event, type, i) {
      // console.log(event, i);
      let files = event.target.files;

      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);  // 修改键名以匹配后端期望
      }

      // 发送请求
      axios.post('/api/single', formData)
        .then(response => {
          if (type == "face") {
            this.faceList[i] = response.data.url
          }
          else if (type == "dental") {
            if (i < 6) this.intraoralList[i] = response.data.url
            else if (i == 6) this.CTList[0] = response.data.url
          }
          else if (type == "TD") {
            this.TDList[i] = response.data.url
          }
          else if (type == "headSide") {
            this.headSideList[0] = response.data.url
          }
          else if (type == "video") {
            this.videoList[i] = response.data.url
          }

        }).catch(error => {
          // 处理上传失败的回调
          ElMessage.error(error)
        });
    },

    // 批量上传
    dentalUploadBatch(type) {
      if (type == "dental") {
        this.$refs.dentalFileInput.click();
      } else if (type == 'face') {
        this.$refs.faceFileInput.click();
      }
    },

    dentalBatch(event, type) {
      // 加载动画
      this.loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'iam-loading_2',
        text: '正在上传图片中...',
      })

      if (type == "dental") {
        this.intraoralList = []
      } else if (type == 'face') {
        this.faceList = []
      }
      const files = event.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);  // 修改键名以匹配后端期望
      }

      // 发送请求
      axios.post('/api/upload', formData)
        .then(res => {
          if (type == "dental") {
            res.data.forEach(item => {
              this.intraoralList.push(item.url)
            })
          } else if (type == 'face') {
            res.data.forEach(item => {
              this.faceList.push(item.url)
            })
          }
          this.loadingInstance.close()
        })
        .catch(error => {
          // 处理上传失败的回调
          this.loadingInstance.close()
          ElMessage.error(error)
        });
    },

    changeCrumbs(i) {
      if (i == 0) return
      else if (i == 1 && this.procedureIndex >= 1) this.$router.push({ path: "/analyze", query: { id: this.id }})
      // else if (i == 2) this.$router.push({ path: "/reconmmend" })
      // else if (i == 3) this.$router.push({ path: "/suggest" })
      // else if (i == 4) this.$router.push({ path: "/speech" })
    },

    goToanalyze() {
      this.$router.push({ path: "/analyze" });
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .content {
    width: 1440px;
    margin: 0 auto;
    overflow-x: hidden;
    padding: 20px 35px;
    user-select: none;
    font-size: 20px;

    .head {
      width: 100%;
      padding-bottom: 15px;
      position: relative;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;

      .headcolor {
        color: #3D859E;
        cursor: pointer;
      }

      .no_drop {
        color: #000;
      }
    }

    .middle {
      border-top: 8px solid #dddddd;
      padding: 30px 0 50px;

      .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #dddddd;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;

        .custom-button {
          // margin-left: 20px;
          background-color: #7BA9B9;
          border: 1px solid #7BA9B9;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 400;
          padding: 8px;
          height: 30px;
        }
      }

      .box {

        .item {
          margin-top: 40px;
        }
      }
    }

    .btn_box {
      margin: 140px 0 20px;
      display: flex;
      justify-content: center;

      .btn {
        margin: 0 20px;
        width: 340px;
        background: #7BA9B9;
        border-radius: 5px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        cursor: pointer;
        padding: 8px 0;
      }
    }
  }


  .title_1 {
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .upload {
    width: 1020px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .upload_item {
      width: 260px;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .img {
        width: 260px;
        height: 260px
      }

      .imgdel {
        width: 260px;
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

  .rule {
    font-size: 14px;
    color: #7BA9B9;
    cursor: pointer;
    font-weight: 400;

    text {
      text-decoration: underline;
    }
  }

  .rule:hover {
    color: #666;
  }

  .m-l-30 {
    margin-left: 20px;
  }

  .m-r-100 {
    margin-right: 100px;
  }

  .flex_start {
    display: flex;
    justify-content: flex-start;
  }

  .w_2 {
    width: 640px;
  }
}
</style>