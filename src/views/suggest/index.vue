<template>
    <div class="body">
      <Header />
      <div class="box">
        <div class="sched">分析结果 > 推荐产品 > <text style="color: #3D859E;">生成建议 ></text>  完成生成报告</div>
        <div class="product">
            <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="方案提示沟通" name="1">
                <div class="contentBox">
                    <div class="contentLeft" :style="{ border: (onepushtext.length === 0) ? 'none' : '' }">
                        <div v-if="onepushtext.length > 0">
                            <div v-for="item in onepushtext">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                    <div class="contentRight">
                        <div>编辑方案</div>
                        <label>
                            <div>
                                <input type="checkbox" v-model="checked1" @click="checkedtw(checked1,'1.早期矫治的主要目的是降低后续矫治的难度及可能性，降低后续矫治时拔牙的概率，降低后续进行正畸正颌联合治疗的概率。但由于生长发育，依从性，个体表达，以及遗传因素等原因，并不能百分百杜绝后续介入其他治疗的可能。')">
                                <span>1.早期矫治的主要目的是降低后续矫治的难度及可能性，降低后续矫治时拔牙的概率，
                                    降低后续进行正畸正颌联合治疗的概率。但由于生长发育，依从性，个体表达，以及遗传因素等原因，
                                    并不能百分百杜绝后续介入其他治疗的可能。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="checked2" @click="checkedtw(checked2,'2.早期矫治旨在对牙列进行萌出引导，牙弓塑形及建立正确的口腔功能环境，精细排齐不属于本期范畴，后续通常需要固定/隐形正畸治疗。')">
                                <span>2.早期矫治旨在对牙列进行萌出引导，牙弓塑形及建立正确的口腔功能环境，
                                    精细排齐不属于本期范畴，后续通常需要固定/隐形正畸治疗。
                                </span>
                            </div>
                            <br>

                            <div>
                                <input type="checkbox" v-model="checked3" @click="checkedtw(checked3,'3.该患者由于存在口呼吸/异常吞咽等口腔功能异常，若无法恢复正常的口腔功能和正确的肌力平衡，可能影响矫治的稳定性，导致复发。')">
                                <span>3.该患者由于存在口呼吸/异常吞咽等口腔功能异常，
                                    若无法恢复正常的口腔功能和正确的肌力平衡，可能影响矫治的稳定性，导致复发。
                                </span>
                            </div>
                            <br>

                            <div>
                                <input type="checkbox" v-model="checked4" @click="checkedtw(checked4,'4.家长需指导孩子正确佩戴，前1-2周为适应期，可能出现口水增多，牙齿轻微疼痛等，都属正常现象。塑形器在初期有可能夜间脱出口内；若出现夜间脱落，可增加清醒时佩戴，逐渐适应，在解除气道阻塞前提下，夜间佩戴矫治器时可辅助唇贴。')">
                                <span>4.家长需指导孩子正确佩戴，前1-2周为适应期，可能出现口水增多，牙齿轻微疼痛等，都属正常现象。
                                    塑形器在初期有可能夜间脱出口内；若出现夜间脱落，可增加清醒时佩戴，逐渐适应，在解除气道阻塞前提下，
                                    夜间佩戴矫治器时可辅助唇贴。
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
                
            </el-collapse-item>
            <div style="width: 100%;background-color: #E9ECF1;height: 5px;"></div>
            <el-collapse-item title="风险提示" name="2">
                <div class="contentBox">
                    <div class="contentLeft " :style="{ border: (pushtext.length === 0) ? 'none' : '' }">
                        <div v-if="pushtext.length > 0">
                            <div v-for=" item in pushtext">
                                {{ item }}
                            </div>
                        </div>
                        
                    </div>
                    <div class="contentRight">
                        <div>编辑风险</div>
                        <label>
                            <div>
                                <input type="checkbox" v-model="editchecked1" @click="checked(editchecked1,'1.全景片由于放大率不一致？疑似双侧关节不对称/右侧髁突影像不清，疑似双侧关节长度不一致，侧位片下颌平面双侧重叠度不佳，请医生临床密切关注关节情况，若关节情况不佳，不建议进行塑形治疗。')">
                                <span>1.全景片由于放大率不一致？疑似双侧关节不对称/右侧髁突影像不清，疑似双侧关节长度不一致，侧位片
                                      下颌平面双侧重叠度不佳，请医生临床密切关注关节情况，若关节情况不佳，不建议进行塑形治疗。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked2" @click="checked(editchecked2,'2.通常间隔3个月复诊，因患者下前牙根型明显/下前牙唇倾，唇侧骨板较薄，建议医生可缩短复诊时间，如1月1次，密切关注面高及下前牙根型及牙周健康状况，有无异常松动或者唇倾加重，如有异常及时停戴。')">
                                <span>2.通常间隔3个月复诊，因患者下前牙根型明显/下前牙唇倾，唇侧骨板较薄，建议医生可缩短复诊时间，
                                        如1月1次，密切关注面高及下前牙根型及牙周健康状况，有无异常松动或者唇倾加重，如有异常及时停戴。
                                </span>
                            </div>
                            <br>

                            <div>
                                <input type="checkbox" v-model="editchecked3" @click="checked(editchecked3,'3.多生牙需要联合外科治疗拔除，若多生牙导致的XX萌出异常问题，需要联合其他方式处理，塑形器无法精确管理间隙及牵引牙齿萌出。牙数异常（如先天恒牙缺失），牙体大小异常等，后续视情况可能需要联合修复治疗')">
                                <span>3.多生牙需要联合外科治疗拔除，若多生牙导致的XX萌出异常问题，需要联合其他方式处理，塑形器无法
                                        精确管理间隙及牵引牙齿萌出。牙数异常（如先天恒牙缺失），牙体大小异常等，后续视情况可能需要
                                        联合修复治疗
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked4" @click="checked(editchecked4,'4.由于乳磨牙早失，为避免发生磨牙前移，需要在缺失处XX使用丝圈式间隙维持器/建议上颌可考虑Nance托式间隙维持器/建议下颌可考虑舌弓式间隙维持器。积极治疗乳牙基础疾病，不能保留乳牙及时拔除行间隙维持。若乳牙疾病导致间隙丧失，后续固定/正畸治疗时需考虑其他方式开辟间隙。')">
                                <span>4.由于乳磨牙早失，为避免发生磨牙前移，需要在缺失处XX使用丝圈式间隙维持器/建议上颌可考虑
                                        Nance托式间隙维持器/建议下颌可考虑舌弓式间隙维持器。积极治疗乳牙基础疾病，不能保留乳牙及时
                                        拔除行间隙维持。若乳牙疾病导致间隙丧失，后续固定/正畸治疗时需考虑其他方式开辟间隙。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked5" @click="checked(editchecked5,'5.唇系带待排查，若系带过短，影响间隙关闭，可能需要联合其他矫治方式及系带修整术等。')">
                                <span>5.唇系带待排查，若系带过短，影响间隙关闭，可能需要联合其他矫治方式及系带修整术等。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked6" @click="checked(editchecked6,'6.舌系带过短？若系带过短影响舌上抬及吞咽转换，建议行舌系带延长术。')">
                                <span>6.舌系带过短？若系带过短影响舌上抬及吞咽转换，建议行舌系带延长术。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked7" @click="checked(editchecked7,'7.垂直生长型，需要增加咀嚼训练。复诊期间密切监控，若如果出现下颌渐进性后缩，面高增加等，需要及时停戴，改行其他矫治方式。')">
                                <span>7.垂直生长型，需要增加咀嚼训练。复诊期间密切监控，若如果出现下颌渐进性后缩，面高增加等，需要
                                        及时停戴，改行其他矫治方式。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked8" @click="checked(editchecked8,'8.因良好的咀嚼功能有利于牙槽骨，颌骨及牙弓宽度的发育，建议每日咀嚼韧性食物或联合咀嚼训练，累计达30min以上。')">
                                <span>8.因良好的咀嚼功能有利于牙槽骨，颌骨及牙弓宽度的发育，建议每日咀嚼韧性食物或联合咀嚼训练，累
                                        计达30min以上。
                                </span>
                            </div>
                            <br>
                            <div>
                                <input type="checkbox" v-model="editchecked9" @click="checked(editchecked9,'9.鼻甲肥大，腺样体肥大，扁桃体肥大，气道狭窄，建议联合五官科治疗，若病因不去除，不良习惯根源可能无法解决且影响矫治效果及后续稳定性。')">
                                <span>9.鼻甲肥大，腺样体肥大，扁桃体肥大，气道狭窄，建议联合五官科治疗，若病因不去除，不良习惯根源
                                        可能无法解决且影响矫治效果及后续稳定性。
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </el-collapse-item>
            </el-collapse>
        </div>
        <div class="nextstyle" @click="next">
            生成报告
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

import Header from "../../components/Header/index.vue";
    import { Text } from 'vue'
    export default {
      name: 'suggest',
      props: [],
      data() {
        return {
            activeNames:['1','2'],
            onepushtext:[],
            pushtext:[],
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false,
            editchecked1:false,
            editchecked2:false,
            editchecked3:false,
            editchecked4:false,
            editchecked5:false,
            editchecked6:false,
            editchecked7:false,
            editchecked8:false,
            editchecked9:false,
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
        checked(e,text){
            if(!e){
                this.pushtext.push(text)
            }else{
                let tex = this.pushtext.filter(item => item !== text);
                this.pushtext = tex;
            }
        },
        checkedtw(e,text){
            if(!e){
                this.onepushtext.push(text)
            }else{
                let tex = this.onepushtext.filter(item => item !== text);
                this.onepushtext = tex;
            }
        },
        next() {
            this.$router.push('/speech')
        },
    }}
    
  </script>
  
<style lang="scss" scoped>
.texLeft{
    width: 49%;
    margin-top: 2.4%;
}
    .box{
        width: 90%;
        margin: 0 auto;
        .sched{
            padding:  2% 0;
            border-bottom:5px solid #E9ECF1;
        }
        .contentBox{
            display: flex;
            width: 96%;
            margin: 0 auto;
            justify-content: space-between;
            align-items: flex-start;
            .contentLeft{
                width: 49%;
                border: 1px solid #DBE6EC;
                
                border-radius: 5px;padding: 10px;
                margin-top: 2.4%;
                >div{
                    padding: 15px;
                    background-color: #DBE6EC;
                    border-radius: 5px;
                }
            }
            .contentRight{
                width: 48%;
                display: flex;
                flex-wrap: wrap;
                
                >div{
                    height: 10%;
                }
                >label{
                    line-height: 160%;
                    >div{
                        align-items: flex-start;
                        display: flex;
                        input{
                            margin-top: 4px;
                        }
                    }
                    
                }
                .checkbox-wrap{
                    >span{
                        display: block !important;
                        word-wrap: break-word !important;  
                        word-break: normal !important; 
                    }
                    width: 100%;
                    
                }
            }
            
        }
        .nextstyle{
            width:20%;
            background-color:#003399;
            margin:10% auto;
            text-align:center;
            color:#fff;
            padding:8px 0;
            border-radius:5px;
        }
    }
</style>