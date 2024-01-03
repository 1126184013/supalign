<template>
    <div class="body">
      <Header />
      <div class="box">
        <div class="sched">分析结果 > <text style="color:#3D859E;">推荐产品 ></text>  生成建议 > 完成生成报告</div>
        <div class="product">
            <el-collapse v-model="activeNames" @change="handleChange">
                <div class="reconname">塑型器产品推荐</div>
                <!-- <div class="reconname">SL-O-14BII新1</div> -->
            <el-collapse-item title="SL-O-14BII新1" name="1">
                <div class="prodprof">
                    <div class="prodleft">
                        <div class="productcolor">
                            <div>塑型器颜色：</div>
                            <div>
                                <el-radio-group v-model="shaperadio">
                                    <el-radio :label="1">粉红</el-radio>
                                    <el-radio :label="2">蓝</el-radio>
                                    <el-radio :label="3">透明</el-radio>
                                    <el-radio :label="3">其它</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div>塑型器类型：</div>
                            <div>
                                <el-radio-group v-model="shapModelEradio">
                                    <el-radio :label="1">l 类 </el-radio>
                                    <el-radio :label="2">II 类</el-radio>
                                    <el-radio :label="3">III 类</el-radio>
                                    <el-radio :label="4">O</el-radio>
                                    <el-radio :label="5">S</el-radio>
                                    <el-radio :label="6">T</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div>塑型器类型：</div>
                            <div style="width: 86%;">
                                <el-radio-group v-model="productEradio">
                                    <el-radio :label="1">SL-O-01</el-radio>
                                    <el-radio :label="2">SL-O-01AI</el-radio>
                                    <el-radio :label="3">SL-O-01AII</el-radio>
                                    <el-radio :label="4">SL-O-01AIII</el-radio>
                                    <el-radio :label="5">SL-O-01BI</el-radio>
                                    <el-radio :label="6">SL-O-01BI新</el-radio>
                                    <el-radio :label="7">SL-O-01BI新1</el-radio>
                                    <el-radio :label="8">SL-O-01BII</el-radio>
                                    <el-radio :label="9">SL-O-01BII新</el-radio>
                                    <el-radio :label="10">SL-O-01BII新1</el-radio>
                                    <el-radio :label="11">SL-O-01BIII</el-radio>
                                    <el-radio :label="12">SL-O-01BIII新</el-radio>
                                    <el-radio :label="13">SL-O-01BIII新1 </el-radio>
                                    <el-radio :label="14">SL-O-02</el-radio>
                                    <el-radio :label="15">SL-O-02AI</el-radio>
                                    <el-radio :label="16">SL-O-02AII</el-radio>
                                    <el-radio :label="17">SL-O-02AII 拷贝</el-radio>
                                    <el-radio :label="18">SL-O-02BI</el-radio>
                                    <el-radio :label="19">SL-O-02BI新</el-radio>
                                    <el-radio :label="20">SL-O-02BI新1</el-radio>
                                    <el-radio :label="21">SL-O-02BII新</el-radio>
                                    <el-radio :label="22">SL-O-02BII新1</el-radio>
                                    <el-radio :label="23">SL-O-02BIII</el-radio>
                                    <el-radio :label="24">SL-O-02BIII新</el-radio>
                                    <el-radio :label="25">SL-O-02BIII新1</el-radio>
                                    <el-radio :label="26">SL-O-03</el-radio>
                                    <el-radio :label="27">SL-O-03AI</el-radio>
                                    <el-radio :label="28">SL-O-03AII</el-radio>
                                    <el-radio :label="29">SL-O-03AIII</el-radio>
                                    <el-radio :label="30">SL-O-03BI</el-radio>
                                    <el-radio :label="31">SL-O-03BI新</el-radio>
                                    <el-radio :label="32">SL-O-03BI新1</el-radio>
                                    <el-radio :label="33">SL-O-03BII新</el-radio>
                                    <el-radio :label="34">SL-O-03BII新1</el-radio>
                                    <el-radio :label="35">SL-O-03BIII</el-radio>
                                    <el-radio :label="36">SL-O-03BIII新</el-radio>
                                    <el-radio :label="37">SL-O-03BIII新1</el-radio>
                                    <el-radio :label="38">SL-O-04</el-radio>
                                    <el-radio :label="39">SL-O-04AI</el-radio>
                                    <el-radio :label="40">SL-O-04AII</el-radio>
                                    <el-radio :label="41">SL-O-04AIII</el-radio>
                                    <el-radio :label="42">SL-O-04BI</el-radio>
                                    <el-radio :label="43">SL-O-04BI新</el-radio>
                                    <el-radio :label="44">SL-O-04BI新1</el-radio>
                                    <el-radio :label="45">SL-O-04BII</el-radio>
                                    <el-radio :label="46">SL-O-04BII新</el-radio>
                                    <el-radio :label="47">SL-O-04BII新1</el-radio>
                                    <el-radio :label="48">SL-O-04BIII</el-radio>
                                    <el-radio :label="49">SL-O-04BIII新</el-radio>
                                    <el-radio :label="50">SL-O-04BIII新1</el-radio>
                                    <el-radio :label="51">SL-O-21AI</el-radio>
                                    <el-radio :label="52">SL-O-21BI</el-radio>
                                    <el-radio :label="53">SL-O-21BII</el-radio>
                                    <el-radio :label="54">SL-O-21BIII</el-radio>
                                    <el-radio :label="55">SL-O-22AI</el-radio>
                                    <el-radio :label="56">SL-O-22BI</el-radio>
                                    <el-radio :label="57">SL-O-22BII</el-radio>
                                    <el-radio :label="58">SL-O-22BIII</el-radio>
                                    <el-radio :label="59">SL-O-23AI</el-radio>
                                    <el-radio :label="60">SL-O-23BI</el-radio>
                                    <el-radio :label="61">SL-O-23BII </el-radio>
                                    <el-radio :label="62">SL-O-23BIII</el-radio>
                                    <el-radio :label="63">SL-O-24BI</el-radio>
                                    <el-radio :label="64">SL-O-24BII</el-radio>
                                    <el-radio :label="65">SL-O-24BIII</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="prodright">
                        <div class="reconname">塑型器产品推荐</div>
                        <div class="reconname">SL-O-14BII新1</div>
                        <div style="width: 100%;">
                            <img src="../../assets/prodceshi.png" alt="" style="max-width: 100%;">
                        </div>
                    </div>
                </div>
                
            </el-collapse-item>
            <div class="reconname">矫治器产品推荐</div>
            <!-- <div class="reconname">SL-O-11All</div> -->
            <el-collapse-item title="SL-O-11All" name="2">
                <div class="prodprof">
                    <div class="prodleft">
                        <div class="productcolor">
                            <div>矫治器颜色：</div>
                            <div>
                                <el-radio-group v-model="shaperadio">
                                    <el-radio :label="1">粉红</el-radio>
                                    <el-radio :label="2">蓝</el-radio>
                                    <el-radio :label="3">透明</el-radio>
                                    <el-radio :label="3">其它</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div>矫治器类型：</div>
                            <div>
                                <el-radio-group v-model="shapModelEradio">
                                    <el-radio :label="1">l 类 </el-radio>
                                    <el-radio :label="2">II 类</el-radio>
                                    <el-radio :label="3">III 类</el-radio>
                                    <el-radio :label="4">O</el-radio>
                                    <el-radio :label="5">S</el-radio>
                                    <el-radio :label="6">T</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="productcolor">
                            <div>矫治器产品：</div>
                            <div style="width: 86%;">
                                <el-radio-group v-model="productEradio">
                                    <el-radio :label="1">SL-O-01</el-radio>
                                    <el-radio :label="2">SL-O-01AI</el-radio>
                                    <el-radio :label="3">SL-O-01AII</el-radio>
                                    <el-radio :label="4">SL-O-01AIII</el-radio>
                                    <el-radio :label="5">SL-O-01BI</el-radio>
                                    <el-radio :label="6">SL-O-01BI新</el-radio>
                                    <el-radio :label="7">SL-O-01BI新1</el-radio>
                                    <el-radio :label="8">SL-O-01BII</el-radio>
                                    <el-radio :label="9">SL-O-01BII新</el-radio>
                                    <el-radio :label="10">SL-O-01BII新1</el-radio>
                                    <el-radio :label="11">SL-O-01BIII</el-radio>
                                    <el-radio :label="12">SL-O-01BIII新</el-radio>
                                    <el-radio :label="13">SL-O-01BIII新1 </el-radio>
                                    <el-radio :label="14">SL-O-02</el-radio>
                                    <el-radio :label="15">SL-O-02AI</el-radio>
                                    <el-radio :label="16">SL-O-02AII</el-radio>
                                    <el-radio :label="17">SL-O-02AII 拷贝</el-radio>
                                    <el-radio :label="18">SL-O-02BI</el-radio>
                                    <el-radio :label="19">SL-O-02BI新</el-radio>
                                    <el-radio :label="20">SL-O-02BI新1</el-radio>
                                    <el-radio :label="21">SL-O-02BII新</el-radio>
                                    <el-radio :label="22">SL-O-02BII新1</el-radio>
                                    <el-radio :label="23">SL-O-02BIII</el-radio>
                                    <el-radio :label="24">SL-O-02BIII新</el-radio>
                                    <el-radio :label="25">SL-O-02BIII新1</el-radio>
                                    <el-radio :label="26">SL-O-03</el-radio>
                                    <el-radio :label="27">SL-O-03AI</el-radio>
                                    <el-radio :label="28">SL-O-03AII</el-radio>
                                    <el-radio :label="29">SL-O-03AIII</el-radio>
                                    <el-radio :label="30">SL-O-03BI</el-radio>
                                    <el-radio :label="31">SL-O-03BI新</el-radio>
                                    <el-radio :label="32">SL-O-03BI新1</el-radio>
                                    <el-radio :label="33">SL-O-03BII新</el-radio>
                                    <el-radio :label="34">SL-O-03BII新1</el-radio>
                                    <el-radio :label="35">SL-O-03BIII</el-radio>
                                    <el-radio :label="36">SL-O-03BIII新</el-radio>
                                    <el-radio :label="37">SL-O-03BIII新1</el-radio>
                                    <el-radio :label="38">SL-O-04</el-radio>
                                    <el-radio :label="39">SL-O-04AI</el-radio>
                                    <el-radio :label="40">SL-O-04AII</el-radio>
                                    <el-radio :label="41">SL-O-04AIII</el-radio>
                                    <el-radio :label="42">SL-O-04BI</el-radio>
                                    <el-radio :label="43">SL-O-04BI新</el-radio>
                                    <el-radio :label="44">SL-O-04BI新1</el-radio>
                                    <el-radio :label="45">SL-O-04BII</el-radio>
                                    <el-radio :label="46">SL-O-04BII新</el-radio>
                                    <el-radio :label="47">SL-O-04BII新1</el-radio>
                                    <el-radio :label="48">SL-O-04BIII</el-radio>
                                    <el-radio :label="49">SL-O-04BIII新</el-radio>
                                    <el-radio :label="50">SL-O-04BIII新1</el-radio>
                                    <el-radio :label="51">SL-O-21AI</el-radio>
                                    <el-radio :label="52">SL-O-21BI</el-radio>
                                    <el-radio :label="53">SL-O-21BII</el-radio>
                                    <el-radio :label="54">SL-O-21BIII</el-radio>
                                    <el-radio :label="55">SL-O-22AI</el-radio>
                                    <el-radio :label="56">SL-O-22BI</el-radio>
                                    <el-radio :label="57">SL-O-22BII</el-radio>
                                    <el-radio :label="58">SL-O-22BIII</el-radio>
                                    <el-radio :label="59">SL-O-23AI</el-radio>
                                    <el-radio :label="60">SL-O-23BI</el-radio>
                                    <el-radio :label="61">SL-O-23BII </el-radio>
                                    <el-radio :label="62">SL-O-23BIII</el-radio>
                                    <el-radio :label="63">SL-O-24BI</el-radio>
                                    <el-radio :label="64">SL-O-24BII</el-radio>
                                    <el-radio :label="65">SL-O-24BIII</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="prodright">
                        <div class="reconname">矫治器产品详情</div>
                        <div class="reconname">SL-O-14BII新1</div>
                        <div style="width: 100%;">
                            <img src="../../assets/prodceshi.png" alt="" style="max-width: 100%;">
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <div class="reconname">塑型器产品编辑</div>
            <el-collapse-item title="" name="3">
                <div class="productEdit">
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
            </el-collapse-item>
            </el-collapse>
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
            shaperadio:1,
            shapModelEradio:1,
            productEradio:1
        }
      },
      components:{ 
        
        Header
     },
      created() {
        
      },
      mounted() {
        
      },
      computed: {},
      methods: {
        next(){
            this.$router.push('/suggest'); // 替换为你想要跳转的路由路径
        }
      }
    }
    
  </script>
  
<style lang="scss" scoped>
    .box{
        width: 90%;
        margin: 0 auto;
        .sched{
            padding:  2% 0;
            border-bottom:3px solid #E9ECF1;
        }
        .product{
            margin-top: 2%;
        }
        .reconname{
            color: #3D859E;
        }
        .productcolor{
            display: flex;
            align-items: center;
        }
        .prodprof{
            display: flex;
        }
        .prodleft{
            width: 75%;
        }
        .prodright{
            width: 25%;
        }
        .tool{
            width: 100%;
            padding: 5px;
            background-color: #76A0B1;
            display: flex;
            >div{
                width: 10%;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #fff;
                img{
                    height: 50px;
                }
            }
        }
        .imgEdit{
            width: 86%;
            margin: 5% auto;
            img{
                width: 100%;
            }
        }
        .nextstyle{
            width:20%;
            background-color:#003399;
            margin:0 auto;
            text-align:center;
            color:#fff;
            padding:8px 0;
            border-radius:5px;
            margin-top:10%;
        }
    }
</style>