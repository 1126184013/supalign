<template>
    <div class="body">
      <!-- <div class="head">
        <text>1、上传面像图片 > </text>
        <text>2、分析结果 > </text>
        <text>3、生成生成报告</text>
      </div> -->
      <div class="analyze">
        <div style="border-bottom: 1px solid #E9ECF1;padding-bottom: 15px;"><text style="color: red;">*</text>面像分析：</div>
        <div style="padding-top: 30px;display: flex;justify-content: space-between;">
            <div class="imglist">
              <div>
                <!-- <img :src="faceimg[1].url" alt="" style="width: 120px;height: 130px;"> -->
                <el-image 
                  style="width: 120px; height: 130px"
                  :src="faceimg[1].url" 
                  :preview-src-list="srcList0">
                </el-image>
                <div @click="click">正面照</div>
              </div>
              <div>
                <!-- <img :src="faceimg[0].url" alt="" style="width: 120px;height: 130px;"> -->
                <el-image 
                  style="width: 120px; height: 130px"
                  :src="faceimg[0].url" 
                  :preview-src-list="srcList0">
                </el-image>
                <div>侧面照</div>
              </div>
              <div>
                <!-- <img :src="faceimg[2].url" alt="" style="width: 120px;height: 130px;"> -->
                <el-image 
                  style="width: 120px; height: 130px"
                  :src="faceimg[2].url" 
                  :preview-src-list="srcList">
                </el-image>
                <div>微笑照</div>
              </div>
            </div>

            <div class="inform">
              <div>面像分析结果（13项）</div>
              <div class="informList">
                <div>
                  <text>正貌-正面型：</text>
                  <el-select v-model="value0" placeholder="请选择">
                    <el-option
                      v-for="item in options0"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>正貌-对称性：</text>
                  <el-select v-model="value1" placeholder="请选择" >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>正貌-下面高：</text>
                  <el-select v-model="value2" placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>正貌-唇齿位：</text>
                  <el-select v-model="value3" placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>正貌-颏位：</text>
                  <el-select v-model="value4" placeholder="请选择">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>正貌-微笑：</text>
                  <el-select v-model="value5" placeholder="请选择">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>侧貌-侧面型：</text>
                  <el-select v-model="value6" placeholder="请选择">
                    <el-option
                      v-for="item in options6"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>侧貌-鼻唇角：</text>
                  <el-select v-model="value7" placeholder="请选择">
                    <el-option
                      v-for="item in options7"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>侧貌-唇位：</text>
                  <el-select v-model="value8" placeholder="请选择">
                    <el-option
                      v-for="item in options8"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

                <div>
                  <text>侧貌-颏唇沟：</text>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>侧貌-颏位：</text>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>侧貌-下颌角：</text>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <text>口周肌肉分析：</text>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
        </div>
      </div>
      

    </div>
  </template>
  
  <script>
    export default {
      name: 'face',
      props: ['face'],
      data() {
        return {
            active: 1,
            dialogImageUrl: '',
            dialogVisible: false,
            procedure:0,
            srcList:[],
            srcList0:[],
            srcList1:[],
            faceimg:[],
            facelist:{},
            value:'0',
            value0:"",
            value1:"",
            value2:"",
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            value7:"",
            value8:"",
            options: [{
              value: '0',
              label: '正常'
            }],
            //面型
            options0: [{
              value: 0,
              label: '宽面型'
            },{
              value: 1,
              label: '正常面型'
            },{
              value: 2,
              label: '高面型'
            }],
            //对称
            options1: [{
              value: 0,
              label: '对称'
            },{
              value: 1,
              label: '不对称'
            }],
            //下面高
            options2: [{
              value: 0,
              label: '长'
            },{
              value: 1,
              label: '短'
            },{
              value: 2,
              label: '正常'
            }],
            //唇齿位
            options3: [{
              value: 0,
              label: '正常'
            },{
              value: 1,
              label: '不闭合'
            }],
            //颏位
            options4: [{
              value: 0,
              label: '正常'
            },{
              value: 1,
              label: '不正常'
            }],
            //微笑
            options5: [{
              value: 0,
              label: '正常微笑'
            },{
              value: '1',
              label: '微笑露龈'
            }],
            //脸型
            options6: [{
              value: 0,
              label: '凹面型'
            },{
              value: 1,
              label: '凸面型'
            },{
              value: 2,
              label: '正常'
            }],
            //鼻唇角
            options7: [{
              value: 0,
              label: '鼻唇角小'
            },{
              value: 1,
              label: '鼻唇角大'
            },{
              value: 2,
              label: '鼻唇角正常'
            }],
            //颏唇沟
            options8: [{
              value: 0,
              label: '颏唇沟浅'
            },{
              value: 1,
              label: '颏唇沟正常'
            }],
            
        }
      },
      created() {
        
        this.faceimg = this.face.img
        console.log(this.faceimg,'sss')
        this.srcList.push(this.faceimg[2].url)
        this.srcList0.push(this.faceimg[0].url)
        this.srcList1.push(this.faceimg[1].url)
        this.facelist = this.face.list
        this.value0 = this.face.list.results[0]
        this.value1 = this.face.list.results[1]
        this.value2 = this.face.list.results[2]
        this.value3 = this.face.list.results[3]
        this.value4 = this.face.list.results[4]
        this.value5 = this.face.list.results[5]
        this.value6 = this.face.list.results[6]
        this.value7 = this.face.list.results[7]
        this.value8 = this.face.list.results[8]
       },
      methods: {

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            console.log(file,'file');
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
    .body{
        width: 100%;
        margin: 0 auto;
        // border: 1px solid #030303;
        padding: 20px 0;
        height: 100vh;
    }
    .imglist{
      width: 30%;
      display: flex;
      div{
        margin-left: 5%;
        text-align: center;
      }
      
    }
    .analyze{
        padding-top: 30px;
    }
    .inform{
      width: 58%;
      margin-left: 2%;
      .informList{
        width: 90%;
        margin-left: 2%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        text-align: right;
        text{
          text-align: left;
        }
        div{
          width: 48%;
          margin-top: 10px;
        }
      }
    }
    
    .next{
        width: 10%;
        padding: 5px;
        background-color: #003399;
        color: #FFFFFF;
        border-radius: 5px;
        text-align: center;
        position: relative;
        left: 45%;
        bottom: -30%;
    }
  </style>