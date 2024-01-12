<template>
    <div class="body">
        <div class="custnameLsit" v-if="customEdit==false">
            <div class="namelisthead">
                <div>自定义分析法</div>
                <div></div>
            </div>
            <div class="namelistbod">
                <div class="name">
                    <div class="nametitle">
                        <table style="width: 100%; border: 1px solid #3D859E;">
                            <tr style="background-color: #3D859E;color: #FFFFFF;">
                                <td>分析法名称</td>
                                <td>默认分析法</td>
                                <td>操作</td>
                            </tr>
                            <tr class="bortr" v-for="item in customList">
                                <td class="borrig">{{item.name}}</td>
                                <td class="borrig">
                                    <el-switch
                                     v-model="value"
                                     active-color="#7BA9B9"
                                     inactive-color="#D4D4D4">
                                    </el-switch>
                                </td>
                                <td class="cztd">
                                    <div style="color: #FF0000;">删除</div>
                                    <div @click="edit(item)">编辑</div>
                                    <div @click="useList(item)">使用</div>
                                </td>
                            </tr>
                        </table>
                        
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="namelistfot">
                <div style="background-color:#D4D4D4;width: 25%;text-align: center;color: #666666;" @click="cancelPopup">
                    取消
                </div>
                <div style="background-color:#7BA9B9;width: 25%;text-align: center;color: #FFFFFF;" @click="customEdit = true">
                    创建分析法
                </div>
            </div>
        </div>
        <div v-else>
            <div class="editnameLsit">
                <div class="namelisthead">
                    <div>自定义分析法</div>
                    <div></div>
                </div>
                <div class="editbod">
                    <div class="editbodselect">
                        <div>
                            分析法名称 <text style="color: red;">*</text>：<input type="text" v-model="selectname" style="width: 50%; border-radius: 3px; border: 1px solid #666666;">
                        </div>
                        <div style="display: flex;width: 50%;">
                            <div>是否存为模板 <text style="color: red;">*</text>：</div> 
                            <div style="width: 25%;display: flex;align-items: center;">
                                <input type="checkbox" v-model="rigChecked" style="height: 16px;width: 18px;" @change="checkValidity(1)">是
                            </div>
                            <div style="width: 25%;display: flex;align-items: center;">
                                <input type="checkbox" v-model="noChecked" style="height: 16px;width: 18px;" @change="checkValidity(0)">否</div>
                        </div>
                    </div>
                    <div class="select">
                        <div class="selectLeft">
                            <div class="seletitle">牙贝分析法</div>
                            <div style="text-align: center;">分析项目</div>
                            <div class="selectList">
                                <el-checkbox-group v-model="checkList" style="display: flex;flex-direction: column;">
                                    <el-checkbox v-for="item in selectTxt" :label="item"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="selectRight">
                            <div class="seletitle">所选分析项目</div>
                            <div style="text-align: center;">分析项目</div>
                            <div class="selectList">
                                <div v-for="item in checkList">
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="namelistfot">
                <div style="background-color:#D4D4D4;width: 25%;text-align: center;color: #666666;" @click="customEdit = false">
                    取消
                </div>
                <div style="background-color:#7BA9B9;width: 25%;text-align: center;color: #FFFFFF;" @click="projectSave">
                    保存
                </div>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
    import { Text } from 'vue'
    export default {
      name: 'faceReport',
      data() {
        return {
            value: true,
            customEdit: false,//编辑弹窗
            rigChecked: false,//是存为模板
            noChecked: false,//否存为模板
            customList:[],//自定义列表
            selectname:'',//名称
            checkList:[],//选中列表
            checkid: "",
            selectTxt:['SNA','A_N_perp','SNB','Pog_N_perp','ANB','FMA','SN_MP','S_Go_N_Me','S_N','Go_Me','FH_NPo','Na_S_Ar','S_Ar_Go','Ar_Go_Me','Ar_Go_N','Na_Go_Me',
            'Sum_of_Angles','PtV_U6','ANS_Xi_Pm','Dc_Xi_Pm','U1_SN','U1_NA','L1_MP','L1_FH','L1_NB','U1_L1','UL_EP','LL_EP'],
        }
      },
      components:{ 
        
      },
      created() {
        axios.post('api/method_list').then(response => {
            // 处理下载成功的回调
            this.customList = response.data;
            console.log(response,'处理下载成功的回调');
            
        })
      },
      mounted() {
        
      },
      computed: {},
      methods: {
        //关闭弹窗
        cancelPopup(){
            
            this.$emit('updatevalue');
        },
        edit(e){
            this.customEdit = true;
            console.log(e,'编辑');
            this.selectname = e.name;
            this.checkList = e.list;
            this.checkid = e.id;
        },
        useList(e){
            this.$emit('updatevalue',e);
        },
        //保存.
        projectSave(){
            let that = this;
            let params = {}
            if(this.checkid==''){
                params = {
                    content:{
                        list:this.checkList,
                        name:this.selectname,
                        template:this.rigChecked==true?1:2
                    }
                }
            }else{
                params = {
                    content:{
                        id:this.checkid,
                        list:this.checkList,
                        name:this.selectname,
                        template:this.rigChecked==true?1:2
                    }
                }
            }

            
            console.log(toString(params), params,'params');
            axios.post('api/method_upate', params).then(response => {
            // 处理上传成功的回调
            console.log(response,'处理上传成功的回调');
            that.customEdit = false
            
          })
        },
        //是否为模板
        checkValidity(e){
                
            if(e==0 && this.noChecked==true){

                this.rigChecked=false;
                this.noChecked=true;
            }else if(e==1 && this.rigChecked==true){
                this.rigChecked=true;
                this.noChecked=false;
            }

        }
      }
    }
    
  </script>
  
<style lang="scss" scoped>
.body{
        width: 100vw;
        margin: 0 auto;
        padding-top: 5%;
        height: 100%;
        background-color: rgb(0 0 0 / 64%);
        font-size: 14px;
        .editnameLsit{
            width: 926px;
            height: 1181px;
            margin: 2% auto;
            .editbod{
                height: 90%;
                background-color: #fff;
                .editbodselect{
                    display: flex;
                    justify-content: space-between;
                    >div{
                        padding: 15px;
                        width: 49%;
                    }
                }
                .select{
                    width: 80%;
                    margin: 50px auto;
                    display: flex;
                    justify-content: space-between;
                    height: 80%;
                    >div{
                        border: 1px solid #E9ECF1;
                        width: 44%;
                        border-radius:3px ;
                    }
                    .selectList{
                        border: 1px solid #E9ECF1;
                        width: 75%;
                        margin: 5% auto;
                        padding: 5%;
                        height: 85%;
                        overflow: auto;
                        >div{
                            
                            padding: 7px 0;
                        }
                    }
                    .seletitle{
                        text-align: center;
                        position: relative;
                        top: -10px;
                        left: 0;
                        background-color: #fff;
                        width: 45%;
                        margin: 0 auto;
                        font-size: 17px;
                    }
                }
            }
        }

    }
    .custnameLsit{
        margin-top: 20px;
        width: 50%;
        margin: 10% auto;
    }
    .namelisthead{
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #3D859E;
        color: #fff;
        div{
            padding: 10px;
        }
    }
    .namelistbod{
        min-height: 40vh;
        background-color: #fff;
        padding: 20px 10px;
    }
    .nametitle{
        width: 94%;
        margin: 0 auto;
        margin-top: 20px ;
        tr{
            width: 94%;
            td{
                padding: 10px;
                text-align: center;
                
                
            }
        }
    }
    .bortr{
        color: rgb(7, 7, 7);
        .cztd{
            display: flex;
            justify-content: space-around;
            color: #003399;
        }
    }
    
    .namelistfot{
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px;
        div{
            padding: 10px;
            font-size: 16px;
        }
    }
    .borrig{
        border-right: 1px solid #3D859E;
    }
</style>