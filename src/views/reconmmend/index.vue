<template>
    <div class="body">
      <Header :page="'reconmmend'" :minW="1440" />
      <div class="box">
        <div class="sched">
            <text style="color: #3D859E;">
                <text @click="gowher(1)"> 上传图片 ></text>
                <text  @click="gowher(5)"> 分析结果 ></text> 
                <text> 推荐产品 ></text> 
                
            </text>
            <text > 生成建议 ></text> 
                <text > 生成报告 </text> 
        </div>
        <div class="product">
            <div class="reconname">塑型器产品推荐</div>
            <div class="reconname">SL-O-14BII新1</div>
            <div class="line"></div>
            <div>
                <div class="prodprof" :style="{ height: isExpanded ? 'auto' : '50vh', overflow: isExpanded ? 'visible' : 'hidden' }">
                    <div class="prodleft">
                        <div class="productcolor">
                            <div class="sizewid">塑型器颜色：</div>
                            <div style="width:40%">
                                <div class="spanbox">
                                    <div ><input type="checkbox"  class="my-checkbox"><span>l 类</span></div>
                                    <div style=""><input type="checkbox" class="my-checkbox"><span>粉红</span></div>
                                    <div style=""><input type="checkbox" class="my-checkbox"><span>蓝</span></div>
                                    <div style=""><input type="checkbox" class="my-checkbox"><span>透明</span></div>
                                    <div style=""><input type="checkbox" class="my-checkbox"><span>其它</span></div>
                                
                                </div>
                                
                            </div>
                        </div>
                        <div class="productcolor">
                            <div class="sizewid">塑型器类型：</div>
                                <div style="width:48%">
                                <div class="spanbox">
                                    <div style=""><input type="checkbox"><span>l 类</span></div>
                                    <div style=""><input type="checkbox"><span>II 类</span></div>
                                    <div style=""><input type="checkbox"><span>III 类</span></div>
                                    <div style=""><input type="checkbox"><span>O</span></div>
                                    <div style=""><input type="checkbox"><span>S</span></div>
                                    <div style=""><input type="checkbox"><span>T</span></div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div class="sizewid">塑型器产品：</div>
                            <div style="width: 86%;">
                                <div class="checbox">
                                    <div>
                                        <input type="checkbox" v-model="checked1">
                                        <span>SL-O-01</span>
                                    </div>
                                    
                                    <div><input type="checkbox"><span>SL-O-01AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-01AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII新1 </span></div>
                                    <div><input type="checkbox"><span>SL-O-02</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AII 拷贝</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-21AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-22AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-23AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-23BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-23BII </span></div>
                                    <div><input type="checkbox"><span>SL-O-23BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BIII</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prodright">
                        <div class="reconname">塑型器产品推荐</div>
                        <div class="reconname">SL-O-14BII新1</div>
                        <div style="width: 100%;margin-top:5%">
                            <img src="../../assets/prodceshi.png" alt="" style="max-width: 100%;">
                        </div>
                    </div>
                </div>
                
                <div class="zdstyle" v-if="isExpanded == false" @click="isExpanded = true">展开 <img src="../../assets/zk.png" alt=""  style="width:12px"></div>
                <div class="zdstyle" v-if="isExpanded == true" @click="isExpanded = false">收起 <img src="../../assets/sq.png" alt=""  style="width:12px"></div>
            </div>
            <div class="coarse"></div>
            <div class="reconname">矫治器产品推荐</div>
            <div class="reconname">SL-O-11All</div>
            <div class="line"></div>
            <div>
                <div class="prodprof" :style="{ height: jzisExpanded ? 'auto' : '50vh', overflow: jzisExpanded ? 'visible' : 'hidden' }">
                    <div class="prodleft">
                        <div class="productcolor">
                            <div class="sizewid">矫治器颜色：</div>
                            <div style="width:40%">
                                <div class="spanbox">
                                <div style=""><input type="checkbox" style="background-color:red"><span>l 类</span></div>
                                <div style=""><input type="checkbox"><span>粉红</span></div>
                                <div style=""><input type="checkbox"><span>蓝</span></div>
                                <div style=""><input type="checkbox"><span>透明</span></div>
                                <div style=""><input type="checkbox"><span>其它</span></div>
                            </div>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div class="sizewid">矫治器类型：</div>
                            <div style="width:46.4%">
                                <div class="spanbox">
                                    <div>
                                    <input type="checkbox" value="l" v-model="selectedItem" @change="handleCheckboxChange('l')">
                                    <span>l 类</span>
                                    </div>
                                    <div style="margin-left:15px;">
                                    <input type="checkbox" value="II" v-model="selectedItem" @change="handleCheckboxChange('II')">
                                    <span>II 类</span>
                                    </div>
                                    <div style="margin-left:15px;">
                                    <input type="checkbox" value="III" v-model="selectedItem" @change="handleCheckboxChange('III')">
                                    <span>III 类</span>
                                    </div>
                                    <div style="margin-left:15px;">
                                    <input type="checkbox" value="O" v-model="selectedItem" @change="handleCheckboxChange('O')">
                                    <span>O</span>
                                    </div>
                                    <div style="margin-left:15px;">
                                    <input type="checkbox" value="S" v-model="selectedItem" @change="handleCheckboxChange('S')">
                                    <span>S</span>
                                    </div>
                                    <div style="margin-left:15px;">
                                    <input type="checkbox" value="T" v-model="selectedItem" @change="handleCheckboxChange('T')">
                                    <span>T</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div class="sizewid">矫治器产品：</div>
                            <div style="width: 86%;">
                                <div class="checbox">
                                    <div>
                                        <input type="checkbox" v-model="checked1">
                                        <span>SL-O-01</span>
                                    </div>
                                    
                                    <div><input type="checkbox"><span>SL-O-01AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-01AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-01BIII新1 </span></div>
                                    <div><input type="checkbox"><span>SL-O-02</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-02AII 拷贝</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-02BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-03BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04AIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BI新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII新</span></div>
                                    <div><input type="checkbox"><span>SL-O-04BIII新1</span></div>
                                    <div><input type="checkbox"><span>SL-O-21AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-21BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-22AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-22BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-23AI</span></div>
                                    <div><input type="checkbox"><span>SL-O-23BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-23BII </span></div>
                                    <div><input type="checkbox"><span>SL-O-23BIII</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BI</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BII</span></div>
                                    <div><input type="checkbox"><span>SL-O-24BIII</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prodright">
                        <div class="reconname">矫治器产品详情</div>
                        <div class="reconname">SL-O-14BII新1</div>
                        <div style="width: 100%;margin-top:5%">
                            <img src="../../assets/prodceshi.png" alt="" style="max-width: 100%;">
                        </div>
                    </div>
                </div>
                <div class="zdstyle" v-if="jzisExpanded == false" @click="jzisExpanded = true">展开 <img src="../../assets/zk.png" alt="" style="width:12px"></div>
                <div class="zdstyle" v-if="jzisExpanded == true" @click="jzisExpanded = false">收起 <img src="../../assets/sq.png" alt="" style="width:12px"></div>
            </div>
            <div class="coarse"></div>
            <div class="reconname"> 塑形器产品编辑</div>
            <div class="line"></div>
            <div style="margin-top:1%">
                <div class="productEdit" >
                    <div class="tool">
                        <div>
                            <div><img src="../../assets/cd.png" alt=""></div>
                            <div>测量</div>
                        </div>
                        <div>
                            <div><img src="../../assets/fd.png" alt=""></div>
                            <div>放大图片</div>
                        </div>
                        <div>
                            <div><img src="../../assets/sx.png" alt=""></div>
                            <div>缩小图片</div>
                        </div>
                        <div>
                            <div><img src="../../assets/cx.png" alt=""></div>
                            <div>撤销</div>
                        </div>
                    </div>
                    <div class="imgEdit">
                        <img src="../../assets/prodceshi.png" alt="">
                    </div>
                </div>
                
            </div>
        </div>
        <div class="nextstyle" @click="next">
            下一步
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

import Header from "../../components/Header/index.vue";
    import { Text } from 'vue'
    export default {
      name: 'faceReport',
      props: ['editstart'],
      data() {
        return {
            procedureIndex: 2,
            isExpanded:false,//默认不展开
            jzisExpanded:false,//默认不展开
            imgisExpanded:false,//默认不展开
            shaperadio:1,
            shapModelEradio:1,
            productEradio:1,
            selectedItem: ''
        }
      },
      components:{ 
        
        Header
     },
      created() {
        if (this.$route.query.index) this.procedureIndex = this.$route.query.index;
      },
      computed: {
        selectedItem() {
            // 如果选中项个数为1，则返回选中项的值；否则返回空字符串
            return this.selectedItem.length === 1 ? this.selectedItem[0] : '';
        }
      },
      mounted() {
        
      },
      computed: {},
      methods: {
        next(){
            this.$router.push('/suggest'); // 替换为你想要跳转的路由路径
        },
        handleCheckboxChange(value) {
            this.selectedItem = value;
        },
        gowher(i){
            if (i == 1) this.$router.push({ path: '/upload', query: { index: this.procedureIndex } })
            else if (i == 2) return
            else if (i == 3 && this.procedureIndex >= 3) this.$router.push({ path: '/suggest', query: { index: this.procedureIndex } })
            else if (i == 4 && this.procedureIndex >= 4) this.$router.push({ path: '/speech', query: { index: this.procedureIndex } })
            else if (i == 5) this.$router.push({ path: '/analyze', query: { index: this.procedureIndex } })
        }
      }
    }
    
  </script>
  
<style lang="scss" scoped>
    input[type="checkbox"] {
  width: 15px;
  height: 15px;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 15px;
  height: 15px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
}
input[type="checkbox"]:checked::after {
  content: "\2713";
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  display: block;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  background-color: #76A0B1;
  color: #fff;
  border: none;
  outline: none;
  border-radius:2px;

}


// input[type="checkbox"]:checked::before {
//   content: "\2713";
//   color: #fff;
//   background-color: #7BA9B9;
//     width: 100%;
//     height: 100%;
//   text-align: center;
// //   line-height: 14px;
// }
.sizewid{
    font-size:16px
}
.spanbox{
    display:flex;
    width:100%;
    >div{
        width:40%;
        display:flex;
        align-items: center;
    }
}

    .checbox{
        display:flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        >div{
            width:19%;
            padding-top:5px;
            display:flex;
            align-items: center;
        }
    }
    .zdstyle{
        color: #7BA9B9;
        width: 100%;
        text-align: center;
        padding: 1% 0;
    }
    .box{
        width: 1440px;
        margin: 0 auto;
        padding: 20px 35px;
        
        .sched{
            padding-bottom: 15px;
            font-size: 20px;
            border-bottom:8px solid #E9ECF1;
        }
        .product{
            margin-top: 0.8%;
        }
        .reconname{
            font-size: 18px;
            color: #3D859E;
            padding: 0.5% 0;
            font-weight: bold;
        }
        .productcolor{
            
            display: flex;
            align-items: baseline;
        }
        .prodprof{
            display: flex;
        }
        .prodleft{
            width: 75%;
            >div{
                margin-top:1.3%
            }
        }
        .prodright{
            width: 25%;
        }
        .tool{
            width: 100%;
            padding: 18px;
            background-color: #76A0B1;
            display: flex;
            >div{
                width: 7%;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #fff;
                img{
                    height: 30px;
                }
            }
        }
        .imgEdit{
            width: 86%;
            margin: 5% auto;
            img{
                width: 80%;
            }
        }
        .line{
            width:100%;
            background-color:#E9ECF1;
            height:1px;
            margin:0.5% 0;
        }
        .coarse{
            width:100%;
            background-color:#E9ECF1;
            height:5px;
            margin:0.4% 0;
        }
        .nextstyle{
            width:20%;
            background-color:#7BAABA;
            margin:10% auto;
            text-align:center;
            color:#fff;
            padding:8px 0;
            border-radius:5px;
            // margin:10%;
        }
    }
    

    
</style>