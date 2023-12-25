<template>
  <div class="body">
    <div class="analyze">
      <div style="padding-bottom: 15px;">面像分析：</div>
      <div style="padding-top: 30px;display: flex;justify-content: space-between;">
        <div class="imglist">
          <div class="img_item">
            <el-image style="width: 240px; height: 256px" fit="cover"
              :src="faceimg.find(image => image.type === 'front').url" :preview-src-list="srcList">
            </el-image>
            <div class="text">正面照</div>
          </div>
          <div class="img_item">
            <el-image style="width: 240px; height: 256px" fit="cover"
              :src="faceimg.find(image => image.type === 'profile').url" :preview-src-list="srcList0">
            </el-image>
            <div class="text">侧面照</div>
          </div>
          <div class="img_item">
            <el-image style="width: 240px; height: 256px" fit="cover"
              :src="faceimg.find(image => image.type === 'smile').url" :preview-src-list="srcList1">
            </el-image>
            <div class="text">微笑照</div>
          </div>
        </div>

        <div class="inform">
          <div>面像分析结果（13项）</div>
          <div class="informList">
            <div class="front">
              <div>
                <div class="placeleft">
                  <text>正貌-正面型：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[0].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options0" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[0].checked ? isChecked : checked" @click="face.list[0].checked = !face.list[0].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>正貌-下面高：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[2].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[2].checked ? isChecked : checked" @click="face.list[2].checked = !face.list[2].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>正貌-对称性：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[1].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[1].checked ? isChecked : checked" @click="face.list[1].checked = !face.list[1].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>正貌-颏位：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[4].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[4].checked ? isChecked : checked" @click="face.list[4].checked = !face.list[4].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>正貌-唇齿位：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[3].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[3].checked ? isChecked : checked" @click="face.list[3].checked = !face.list[3].checked" />
                  </div>
                </div>

              </div>
              <div>
                <div class="placeleft">
                  <text>正貌-微笑：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[5].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[5].checked ? isChecked : checked" @click="face.list[5].checked = !face.list[5].checked" />
                  </div>
                </div>
              </div>
            </div>

            <div class="flank" style="margin-left: 1%;">
              <div>
                <div class="placeleft">
                  <text>侧貌-侧面型：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[6].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[6].checked ? isChecked : checked" @click="face.list[6].checked = !face.list[6].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>侧貌-唇位：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[8].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options12" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[8].checked ? isChecked : checked" @click="face.list[8].checked = !face.list[8].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>侧貌-颏位：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[10].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options11" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[10].checked ? isChecked : checked" @click="face.list[10].checked = !face.list[10].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>侧貌-鼻唇角：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[7].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[7].checked ? isChecked : checked" @click="face.list[7].checked = !face.list[7].checked" />
                  </div>
                </div>

              </div>
              <div>
                <div class="placeleft">
                  <text>侧貌-颏唇沟：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[9].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[9].checked ? isChecked : checked" @click="face.list[9].checked = !face.list[9].checked" />
                  </div>
                </div>
              </div>
              <div>
                <div class="placeleft">
                  <text>侧貌-下颌角：</text>
                </div>
                <div class="placeright">
                  <el-select v-model="face.list[11].value" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options9" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="check">
                    <img class="is_checked" :src="face.list[11].checked ? isChecked : checked" @click="face.list[11].checked = !face.list[11].checked" />
                  </div>
                </div>

              </div>
            </div>

            <div style="display: flex;justify-content: flex-start;width: 66%; ">
              <div style="text-align: left;width: 180px; min-width: 113px;">
                <text>口周肌肉分析：</text>
              </div>
              <div class="placeright" style="width: 100%;">
                <el-select v-model="value10" multiple placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in options10" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div class="check">
                  <img class="is_checked" :src="checked10 ? isChecked : checked" @click="checked10 = !checked10" />
                </div>
              </div>
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
      procedure: 0,

      srcList: [],
      srcList0: [],
      srcList1: [],
      faceimg: [],
      facelist: {},
      checked0: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
      checked11: false,
      checked12: false,
      value: '0',
      value0: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: '',
      value10: [],
      value11: '',
      value12: '',
      options: [{
        value: '0',
        label: '正常'
      }],
      //面型
      options0: [{
        value: 0,
        label: '短面型'
      }, {
        value: 1,
        label: '基本均等'
      }, {
        value: 2,
        label: '长面型'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //对称
      options1: [{
        value: 0,
        label: '基本对称'
      }, {
        value: 1,
        label: '不对称'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //下面高
      options2: [{
        value: 0,
        label: '长'
      }, {
        value: 2,
        label: '正常'
      }, {
        value: 1,
        label: '短'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //唇齿位
      options3: [{
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '唇闭合不全'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //正貌-颏位
      options4: [{
        value: 0,
        label: '基本居中'
      }, {
        value: 1,
        label: '偏左'
      }, {
        value: 2,
        label: '偏右'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //微笑
      options5: [{
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '露龈笑'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //侧面型
      options6: [{
        value: 0,
        label: '凹面型'
      }, {
        value: 2,
        label: '直面型'
      }, {
        value: 1,
        label: '凸面型'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //鼻唇角
      options7: [{
        value: 1,
        label: '大'
      }, {
        value: 2,
        label: '正常'
      }, {
        value: 0,
        label: '小'
      }, {
        value: 10 || '10',
        label: '-'
      }],

      //颏唇沟
      options8: [{
        value: 0,
        label: '浅'
      }, {
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '深'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      //下颌角
      options9: [{
        value: 2,
        label: '大'
      }, {
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '小'
      }, {
        value: 10,
        label: '-'
      }],
      options10: [{
        value: 0 || '0' || '',
        label: '无'
      }, {
        value: 1,
        label: '颏肌紧张'
      }, {
        value: 2,
        label: '口周肌肉紧张'
      }, {
        value: 3,
        label: '唇闭合不全'
      }, {
        value: 4,
        label: '无明显异常'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      options11: [{
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '前'
      }, {
        value: 0,
        label: '后'
      }, {
        value: 10 || '10',
        label: '-'
      }],
      options12: [{
        value: 0,
        label: '前'
      }, {
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '后'
      }, {
        value: 10 || '10',
        label: '-'
      }],
    }
  },
  created() {

    this.faceimg = this.face.img
    console.log(this.face, 'sssss')

    this.srcList.push(this.faceimg.find(image => image.type === 'front').url)
    this.srcList0.push(this.faceimg.find(image => image.type === 'profile').url)
    this.srcList1.push(this.faceimg.find(image => image.type === 'smile').url)
    this.facelist = this.face.list
    // this.value0 = parseInt(this.face.list[0].value)
    // this.value1 = parseInt(this.face.list[1].value)
    // this.value2 = parseInt(this.face.list[2].value)
    // this.value3 = parseInt(this.face.list[3].value)
    // this.value4 = parseInt(this.face.list[4].value)
    // this.value5 = parseInt(this.face.list[5].value)
    // this.value6 = parseInt(this.face.list[6].value)
    // this.value7 = parseInt(this.face.list[7].value)
    // this.value8 = parseInt(this.face.list[9].value)
    // this.value9 = parseInt(this.face.list[11].value)
    // this.value11 = parseInt(this.face.list[10].value)
    // this.value12 = parseInt(this.face.list[8].value)
    // if(this.face.list.results[12] !== ""){
    //   this.value10.push(this.face.list.results[12])
    // }

  },
  methods: {

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file, 'file');
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
 
<script setup>
import checked from "@/assets/checked.png";
import isChecked from "@/assets/isChecked.png";
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  margin: 0 auto;
  // border: 1px solid #030303;
  padding: 20px 0;
  // height: 100vh;
}

.front {
  >div {
    display: flex;
    // justify-content: space-between;
    margin-top: 5%;

    >div {
      width: 60%;
    }
  }
}

.check {
  margin-left: 2%;
  width: 2% !important;
  cursor: pointer;
}

.is_checked {
  width: 22px;    
  height: 22px;
  margin-left: 6px;
}

.placeleft {
  width: 35% !important;
  min-width: 113px;
  text-align: left;
}

.placeright {
  display: flex;
  // justify-content: flex-end;
  align-items: center;
}

.flank {
  >div {
    display: flex;
    justify-content: space-between;
    margin-top: 5%;

    >div {
      width: 60%;
    }
  }
}

.imglist {
  width: 50%;
  display: flex;
  justify-content: space-between;

  .img_item {
    width: 240px;
    height: 256px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text {
      position: absolute;
      bottom: -40px;
    }
  }
}

.analyze {
  padding-top: 30px;
}

.inform {
  width: 48%;
  margin-left: 2%;

  .informList {
    width: 100%;
    margin-left: 2%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    text-align: right;

    text {
      text-align: left;
    }

    >div {
      width: 46%;
      margin-top: 10px;
    }
  }
}

.next {
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