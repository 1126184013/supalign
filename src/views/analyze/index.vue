<template>
  <div class="page">
    <Header :page="'analyze'" />
    <div class="content">
      <div class="head">
        <text :class="procedureIndex >= 0 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(0)">分析结果</text>
        <text :class="procedureIndex >= 1 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(1)">> 推荐产品</text>
        <text :class="procedureIndex >= 2 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(2)">> 生成建议</text>
        <text :class="procedureIndex >= 3 ? 'headcolor' : 'no_drop'" @click="changeCrumbs(2)">> 完成生成报告</text>
      </div>
      <el-collapse class="collapse" v-model="activeNames" @change="handleChange">
        <el-collapse-item title="面像分析" name="1">
          <div class="box">
            <div class="pageLeft">
              <div class="title">口内照</div>
              <div class="imgList">
                <div class="img_item" v-for="(item, index) in list.faceList">
                  <div class="img_box">
                    <el-image class="img" fit="cover" :src="item" :preview-src-list="list.faceList"
                      :initial-index="index" />
                    <text style="margin-top: 20px;">{{ list.faceName[index] }}</text>
                  </div>
                </div>
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">分析结果 (13项)</text>
              </div>
              <div class="selectList">
                <div class="list_item" v-for="(item, index) in faceMockList">
                  <div class="item_left">{{ item.name }}:</div>
                  <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in faceOptions[index]" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="牙列分析" name="2">
          <!-- 口内 -->
          <div class="box">
            <div class="pageLeft">
              <div class="title">口内照</div>
              <div class="imgList">
                <div class="img_item" v-for="(item, index) in list.dentalList">
                  <div class="img_box">
                    <el-image class="img" fit="cover" :src="item" :preview-src-list="list.dentalList"
                      :initial-index="index" />
                    <text style="margin-top: 20px;">{{ list.dentalName[index] }}</text>
                  </div>
                </div>
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">分析结果 (22项)</text>
              </div>
              <div class="selectList">
                <div class="list_item" v-for="(item, index) in mockList">
                  <div class="item_left">{{ item.name }}:</div>
                  <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in options[index]" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- CT -->
          <div class="box">
            <div class="pageLeft">
              <div class="title">CT照</div>
              <div class="imgList">
                <!-- <div class="img_item">
                  <div class="img_box"> -->
                <el-image class="img" fit="cover" :src="list.CTList[0]" :preview-src-list="list.CTList"
                  :initial-index="0" />
                <!-- <text style="margin-top: 20px;">CT照</text> -->
                <!-- </div>
                </div> -->
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">CT照分析结果</text>
                <div class="edit">编辑</div>
              </div>
              <el-table :data="tableData" style="width: 100%" border :header-cell-style="headerCellStyle"
                :span-method="objectSpanMethod">
                <el-table-column label="Hellman咬合发育阶段" align="center">
                  <el-table-column prop="name" width="45" align="center" />
                  <el-table-column prop="left8" width="45" align="center" />
                  <el-table-column prop="left7" width="45" align="center" />
                  <el-table-column prop="left6" width="45" align="center" />
                  <el-table-column prop="left5" width="45" align="center" />
                  <el-table-column prop="left4" width="45" align="center" />
                  <el-table-column prop="left3" width="45" align="center" />
                </el-table-column>
                <el-table-column label="ⅢA" align="center">
                  <el-table-column prop="left2" width="45" align="center" />
                  <el-table-column prop="left1" width="45" align="center" />
                  <el-table-column prop="right1" width="45" align="center" />
                  <el-table-column prop="right2" width="45" align="center" />
                  <el-table-column prop="right3" width="45" align="center" />
                  <el-table-column prop="right4" width="45" align="center" />
                  <el-table-column prop="right5" width="45" align="center" />
                  <el-table-column prop="right6" width="45" align="center" />
                  <el-table-column prop="right7" width="45" align="center" />
                  <el-table-column prop="right8" width="45" align="center" />
                </el-table-column>
              </el-table>
              <div class="selectList" style="margin-top: 40px;">
                <div class="list_item" v-for="(item, index) in CTMockList">
                  <div class="item_left">{{ item.name }}:</div>
                  <el-select v-model="item.value" :teleported="false" placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in CTOptions[index]" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- 口内3D照 -->
          <div class="box">
            <div class="pageLeft">
              <div class="title">口内3D照分析</div>
              <div class="imgList1">
                <div class="img_item" v-for="(item, index) in list.TDList">
                  <div class="img_box">
                    <el-image class="img" fit="cover" :src="item" :preview-src-list="list.TDList"
                      :initial-index="index" />
                    <text style="margin-top: 20px;">{{ index ? '下颌' : '上颌' }}</text>
                  </div>
                </div>
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">口内3D照分析结果</text>
                <div class="edit">编辑</div>
              </div>
              <el-table :data="tableData2" style="width: 100%; fontSize: 16px;" border stripe
                :header-cell-style="headerCellStyle" :span-method="objectSpanMethod">
                <el-table-column prop="name" label="" width="45" align="center" />
                <el-table-column prop="value" label="" align="center" />
                <el-table-column prop="up" label="上颌" align="center" />
                <el-table-column prop="down" label="下颌" align="center" />
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="头侧片分析" name="3">
          <div class="box">
            <div class="pageLeft">
              <div class="title"></div>
              <div class="imgList1" style="margin-top: 30px;">
                <el-image class="img" fit="cover" :src="list.cephalicList[0]" :preview-src-list="list.cephalicList"
                  :initial-index="0" />
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">头侧片分析结果</text>
                <div class="edit">编辑</div>
              </div>
              <el-table :data="tableData3" style="width: 100%; fontSize: 16px;" border stripe
                :header-cell-style="headerCellStyle" max-height="310">
                <el-table-column prop="name" label="分析项目" align="center" />
                <el-table-column prop="up" label="上颌" align="center" />
                <el-table-column prop="down" label="下颌" align="center" />
                <el-table-column prop="deviation" label="偏差值" align="center" />
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="其他类型照片" name="4">
          <div class="box">
            <div class="pageLeft">
              <!-- <div class="title">口内照</div> -->
              <div class="imgList1">
                <div class="img_item" v-for="(item, index) in list.otherPhotoList">
                  <div class="img_box">
                    <el-image class="img" fit="cover" :src="item" :preview-src-list="list.otherPhotoList"
                      :initial-index="index" />
                    <text style="margin-top: 20px;">{{ index ? '下颌后缩患者前伸下颌侧面照' : '反𬌗患者下颌后退咬合照' }}</text>
                  </div>
                </div>
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">其他类型照片分析结果</text>
              </div>
              <el-input v-model="textarea" :rows="8" type="textarea" placeholder="请输入照片分析结果" />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="其他视频" name="5">
          <div class="box">
            <div class="pageLeft">
              <!-- <div class="title">口内照</div> -->
              <div class="imgList1">
                <div class="img_item" v-for="(item, index) in list.otherVideoList">
                  <div class="img_box">
                    <el-image class="img" fit="cover" :src="item" :preview-src-list="list.otherVideoList"
                      :initial-index="index" />
                    <text style="margin-top: 20px;">{{ index ? '吞咽视频' : '半身呼吸视频' }}</text>
                  </div>
                </div>
              </div>
            </div>
            <div class="inform">
              <div class="title_1">
                <text class="title">视频分析结果</text>
              </div>
              <el-input v-model="textarea2" :rows="8" type="textarea" placeholder="请输入视频分析结果" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="btn">下一步</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";


import kounei1 from "@/assets/delete/kouneizuoce.png";
import kounei2 from "@/assets/delete/kouneizheng.png";
import kounei3 from "@/assets/delete/kouneiyouce.png";
import kounei4 from "@/assets/delete/kouneishang.png";
import kounei5 from "@/assets/delete/kouneixia.png";
import kounei6 from "@/assets/delete/kounei90.png";
import ct from "@/assets/delete/ct.png";
import kounei3Dshang from "@/assets/delete/kounei3Dshang.png";
import kounei3Dxia from "@/assets/delete/kounei3Dxia.png";
import other1 from "@/assets/delete/other1.png";
import other2 from "@/assets/delete/other2.png";
import toucepian from "@/assets/delete/toucepian.png";

export default {
  name: "",
  data() {
    return {
      procedure: 0,
      procedureIndex: 0,
      activeNames: 1,
      faceOptions: [
        [
          { value: 0, label: '平均型' },
          { value: 1, label: '长面型' },
          { value: 2, label: '短面型' }
        ],
        [
          { value: 0, label: '对称' },
          { value: 1, label: '不对称' }
        ],
        [
          { value: 0, label: '面部三等分' },
          { value: 2, label: '下面高长' },
          { value: 1, label: '下面高短' }
        ],
        [
          { value: 0, label: '正常唇齿位' },
          { value: 1, label: '唇闭合不全' }
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' }
        ],
        [
          { value: 0, label: '正常微笑' },
          { value: 1, label: '微笑露龈' }
        ],
        [
          { value: 0, label: '直面型' },
          { value: 1, label: '凸面型' },
          { value: 2, label: '凹面型' }
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' }
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' }
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' }
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' }
        ],
        [
          { value: 0, label: '下颌角变小' },
          { value: 1, label: '下颌角变大' },
          { value: 2, label: '正常' }
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '颏肌紧张' },
          { value: 3, label: ' 口周肌肉紧张' },
          { value: 4, label: '  唇闭合不全' },
          { value: 5, label: ' 无明显异常' }
        ],
      ],
      faceMockList: [
        { name: '正貌-正面型', value: 0 },
        { name: '正貌-对称性', value: 0 },
        { name: '正貌-下面高', value: 0 },
        { name: '正貌-唇齿位', value: 0 },
        { name: '正貌-颏位', value: 0 },
        { name: '正貌-微笑', value: 0 },
        { name: '侧貌-侧面型', value: 0 },
        { name: '侧貌-鼻唇角', value: 0 },
        { name: '侧貌-唇位', value: 0 },
        { name: '侧貌-颏唇沟', value: 0 },
        { name: '侧貌-颏位', value: 0 },
        { name: '侧貌-下颌角', value: 0 },
        { name: '口周肌肉分析', value: 0 },
      ],
      options: [
        [
          { value: 0, label: '尖圆形' },
          { value: 1, label: '卵圆形' },
          { value: 2, label: '方圆形' },
        ],
        [
          { value: 0, label: '尖圆形' },
          { value: 1, label: '卵圆形' },
          { value: 2, label: '方圆形' },
        ],
        [
          { value: 0, label: 'Ⅰ度拥挤' },
          { value: 1, label: 'Ⅱ度拥挤' },
          { value: 2, label: 'Ⅲ度拥挤' },
        ],
        [
          { value: 0, label: 'Ⅰ度拥挤' },
          { value: 1, label: 'Ⅱ度拥挤' },
          { value: 2, label: 'Ⅲ度拥挤' },
        ],
        [
          { value: 0, label: '水平对称性' },
          { value: 1, label: '前后向对称性' },
        ],
        [
          { value: 0, label: '水平对称性' },
          { value: 1, label: '前后向对称性' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '安氏Ⅰ类' },
          { value: 1, label: '安氏Ⅱ类' },
          { value: 2, label: '安氏Ⅲ类' },
        ],
        [
          { value: 0, label: '远中阶梯' },
          { value: 1, label: '终末平面平齐' },
          { value: 2, label: '近中阶梯' },
        ],
        [
          { value: 0, label: '远中阶梯' },
          { value: 1, label: '终末平面平齐' },
          { value: 2, label: '近中阶梯' },
        ],
        [
          { value: 0, label: '反𬌗' },
          { value: 1, label: '切𬌗' },
          { value: 2, label: '正常' },
          { value: 3, label: '过大' },
        ],
        [
          { value: 0, label: '反𬌗' },
          { value: 1, label: '正常' },
          { value: 2, label: '正锁𬌗' },
        ],
        [
          { value: 0, label: '有' },
          { value: 1, label: '无' },
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '深覆𬌗' },
          { value: 2, label: '开𬌗' },
          { value: 3, label: '切𬌗' },
        ],
        [
          { value: 0, label: '开𬌗' },
          { value: 1, label: '正常' },
        ],
        [
          { value: 0, label: '正常' },
          { value: 1, label: '异常' },
        ],
        [
          { value: 0, label: '面中线' },
          { value: 1, label: '上颌中线' },
          { value: 2, label: '下颌中线' },
        ],
        [
          { value: 0, label: '无龋齿' },
          { value: 1, label: '有龋齿' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '优良' },
          { value: 1, label: '差' },
          { value: 1, label: '牙面软垢' },
          { value: 1, label: '牙龈红肿' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有' },
        ],
      ],
      mockList: [
        { name: '弓型形态-上颌', value: 0 },
        { name: '弓型形态-下颌', value: 0 },
        { name: '拥挤度-上颌', value: 0 },
        { name: '拥挤度-下颌', value: 0 },
        { name: '对称性-上颌', value: 0 },
        { name: '对称性-下颌', value: 0 },
        { name: '磨牙关系-左', value: 0 },
        { name: '磨牙关系-右', value: 0 },
        { name: '尖牙关系-左', value: 0 },
        { name: '尖牙关系-右', value: 0 },
        { name: '乳牙终末平面-左', value: 0 },
        { name: '乳牙终末平面-右', value: 0 },
        { name: '前牙覆盖情况', value: 0 },
        { name: '后牙覆盖情况', value: 0 },
        { name: '个别牙反𬌗', value: 0 },
        { name: '前牙覆𬌗情况', value: 0 },
        { name: '后牙覆𬌗情况', value: 0 },
        { name: 'Spee曲线曲度', value: 0 },
        { name: '中线', value: 0 },
        { name: '龋齿', value: 0 },
        { name: '口腔卫生', value: 0 },
        { name: '牙体龋坏', value: 0 },
      ],
      tableData: [
        {
          name: '牙列式',
          left8: '8',
          left7: '7',
          left6: '6',
          left5: '5',
          left4: '4',
          left3: '3',
          left2: '2',
          left1: '1',
          right1: '1',
          right2: '2',
          right3: '3',
          right4: '4',
          right5: '5',
          right6: '6',
          right7: '7',
          right8: '8',
        },
        {
          name: '牙列式',
          left8: '',
          left7: '',
          left6: '',
          left5: 'Ⅴ',
          left4: 'Ⅳ',
          left3: 'Ⅲ',
          left2: 'Ⅱ',
          left1: 'Ⅰ',
          right1: 'Ⅰ',
          right2: 'Ⅱ',
          right3: 'Ⅲ',
          right4: 'Ⅳ',
          right5: 'Ⅴ',
          right6: '',
          right7: '',
          right8: '',
        },
        {
          name: '牙列式',
          left8: '',
          left7: '',
          left6: '',
          left5: 'Ⅴ',
          left4: 'Ⅳ',
          left3: 'Ⅲ',
          left2: 'Ⅱ',
          left1: 'Ⅰ',
          right1: 'Ⅰ',
          right2: 'Ⅱ',
          right3: 'Ⅲ',
          right4: 'Ⅳ',
          right5: 'Ⅴ',
          right6: '',
          right7: '',
          right8: '',
        },
        {
          name: '牙列式',
          left8: '8',
          left7: '7',
          left6: '6',
          left5: '5',
          left4: '4',
          left3: '3',
          left2: '2',
          left1: '1',
          right1: '1',
          right2: '2',
          right3: '3',
          right4: '4',
          right5: '5',
          right6: '6',
          right7: '7',
          right8: '8',
        },
      ],
      CTOptions: [
        [
          { value: 0, label: '无' },
          { value: 1, label: '乳牙列' },
          { value: 2, label: '替牙列期' },
          { value: 3, label: '恒牙列初期' },
        ],
        [
          { value: 0, label: '有多生牙' },
          { value: 1, label: '无多生牙' },
        ],
        [
          { value: 0, label: '有阻生牙' },
          { value: 1, label: '没有阻生牙' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有炎症' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '有异常' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '关节吸收' },
          { value: 1, label: '关节不对称' },
          { value: 2, label: '无明显异常' },
        ],
        [
          { value: 0, label: '无' },
          { value: 1, label: '鼻中隔偏曲' },
          { value: 2, label: '鼻甲肥大' },
          { value: 3, label: '无明显异常' },
        ],
      ],
      CTMockList: [
        { name: '牙齿发育阶段', value: 0 },
        { name: '多生牙', value: 0 },
        { name: '阻生牙', value: 0 },
        { name: '根尖', value: 0 },
        { name: '颌骨情况', value: 0 },
        { name: '关节情况', value: 0 },
        { name: '鼻腔情况', value: 0 },
      ],
      tableData2: [
        {
          name: '牙弓宽度',
          value: '尖牙间',
          up: '47.50mm',
          down: '47.50mm'
        },
        {
          name: '牙弓宽度',
          value: '第一前/乳磨牙间',
          up: '40.13mm',
          down: '40.13mm'
        },
        {
          name: '牙弓宽度',
          value: '第二前/乳磨牙间',
          up: '33.28mm',
          down: '33.28mm'
        },
        {
          name: '牙弓宽度',
          value: '第一磨牙宽度',
          up: '6.34mm',
          down: '6.34mm'
        },
      ],
      list: {
        faceList: [
          'https://purplemoonfile.oss-cn-beijing.aliyuncs.com/231050ee-48af-4a69-9122-60f5e3f39a37.jpg',
          'https://purplemoonfile.oss-cn-beijing.aliyuncs.com/315b5d0c-5070-4863-85f6-ab6e2595238c.jpg',
          'https://purplemoonfile.oss-cn-beijing.aliyuncs.com/3362c51d-48fb-4559-9923-60e2c50059b6.jpg'
        ],
        faceName: [
          '正面照',
          '侧面照',
          '微笑照',
        ],
        dentalList: [
          kounei1,
          kounei2,
          kounei3,
          kounei4,
          kounei5,
          kounei6
        ],
        dentalName: [
          '左侧咬合照',
          '正面',
          '右侧咬合照',
          '上颌𬌗面照',
          '下颌𬌗面照',
          '90°覆盖照',
        ],
        CTList: [ct],
        TDList: [kounei3Dshang, kounei3Dxia],
        otherPhotoList: [other1, other2],
        otherVideoList: [other1, other2],
        cephalicList: [toucepian]
      },
      textarea: '',
      textarea2: '根内外的吸收、根折、牙根发育情况及牙骨质增生等；髓室及根管情况：髓腔及根管大小、髓石及牙内 吸收等；根尖及根尖周围情况：如根尖',
      tableData3: [
        {
          name: 'SNA',
          up: '79.8',
          down: '83',
          deviation: '4',
        },
        {
          name: 'SNB',
          up: '76.5',
          down: '80',
          deviation: '4',
        },
        {
          name: 'ANB',
          up: '3.3',
          down: '3',
          deviation: '2',
        },
        {
          name: 'Ptm-A(mm)',
          up: '37.6',
          down: '45',
          deviation: '3',
        },
        {
          name: 'Ptm-S(mm)',
          up: '12.9',
          down: '18',
          deviation: '2',
        },
        {
          name: 'PP-FH',
          up: '0.1',
          down: '4',
          deviation: '3',
        },
        {
          name: 'PP-MP',
          up: '27.6',
          down: '21',
          deviation: '4',
        },
        {
          name: 'SNA',
          up: '79.8',
          down: '83',
          deviation: '4',
        },
        {
          name: 'SNB',
          up: '76.5',
          down: '80',
          deviation: '4',
        },
        {
          name: 'ANB',
          up: '3.3',
          down: '3',
          deviation: '2',
        },
        {
          name: 'Ptm-A(mm)',
          up: '37.6',
          down: '45',
          deviation: '3',
        },
        {
          name: 'Ptm-S(mm)',
          up: '12.9',
          down: '18',
          deviation: '2',
        },
        {
          name: 'PP-FH',
          up: '0.1',
          down: '4',
          deviation: '3',
        },
        {
          name: 'PP-MP',
          up: '27.6',
          down: '21',
          deviation: '4',
        },
      ]
    }
  },
  components: {
    Header,
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },

    // 合并表头
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {//第二行表头隐藏
        return { display: 'none' }
      }
      return { backgroundColor: '#7BA9B9', color: '#fff', fontSize: '16px', height: '40px' }
    },

    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return { rowspan: 4, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
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
    padding: 40px 0;
    user-select: none;
    font-size: 20px;

    :deep(.el-collapse) {
      border-bottom: 0;
    }

    .head {
      width: 100%;
      padding-bottom: 30px;
      position: relative;
      font-size: 18px;
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

    .collapse {
      :deep(.el-collapse-item) {
        margin-bottom: 30px;
      }

      :deep(.el-collapse-item__header) {
        background-color: #E9ECF1;
        padding: 20px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3D859E;
        border-radius: 10px;
        height: 60px;
      }

      :deep(.el-collapse-item__header.is-active) {
        background-color: #fff;
        border-top: 10px solid #E9ECF1;
        border-bottom: 1px solid #E9ECF1;
        border-radius: 0;
        padding: 11px 20px 20px;
      }

      :deep(.el-collapse-item__wrap) {
        border-bottom: 0;
      }

      :deep(.el-collapse-item__content) {
        padding-bottom: 0;
      }

      :deep(.el-collapse-item__content .box:last-child) {
        border-bottom: 0;
      }
    }

    .btn {
      margin: 140px auto;
      width: 400px;
      height: 58px;
      background: #7BA9B9;
      border-radius: 6px;
      font-size: 26px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 58px;
      text-align: center;
    }
  }

  .pageLeft {
    width: 450px;
    // min-width: 750px;

    .title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #222222;
      margin-bottom: 20px;
    }

    .imgList {
      width: 450px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .img_item {
        width: 120px;
        margin: 0px 15px 70px;

        .img_box {
          display: flex;
          flex-direction: column;
          align-items: center;

          .img {
            width: 120px;
            height: 130px;
          }
        }
      }
    }

    .imgList1 {
      width: 478px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .img_item {
        width: 189px;
        margin: 0px 25px 70px;

        .img_box {
          display: flex;
          flex-direction: column;
          align-items: center;

          .img {
            width: 189px;
            height: 205px;
          }
        }
      }
    }

    .imgList1 {
      width: 520px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .img {
        width: 520px;
        height: 329px;
      }
    }
  }

  .inform {
    width: 58%;
    height: 100%;
    margin-left: 2%;
    margin-bottom: 25px;

    .title_1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #222222;
      }


      .edit {
        color: #02a7f0;
        font-size: 16px;
      }

    }

    .selectList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .list_item {
        width: 48%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        .item_left {
          width: 160px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #444444;
        }

        :deep(.el-input__inner) {
          font-size: 14px;
          user-select: none;
          height: 32px;
        }
      }
    }
  }

  .box {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E9ECF1;
    padding: 30px 60px 0;
  }

}
</style>