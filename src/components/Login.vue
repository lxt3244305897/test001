<template>
    <div>
        <el-container><el-header style="background-color: red;margin-top: -60px; width: auto;">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="dodgerblue"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="2"  style="float: right;background-color: red">
                    <template slot="title">
                        {{this.jymm}}
                        欢迎{{listc[0].pid==2?"超级管理员":"管理员"}}{{listc[0].aname}}</template>
                    <el-menu-item index="2-1" style="text-align: center" @click="updateMi()">修改密码</el-menu-item>
                    <el-menu-item index="2-2" style="text-align: center" @click="insertad()">个人中心</el-menu-item>
                    <el-menu-item index="2-2" style="text-align: center" @click="clone()">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
            <el-container>
                <el-aside style="margin-top: -60px;background-color:lightskyblue;height: 800px;width:200px">
                    <div style="width: 100px;margin-top: -16px;background-color:dodgerblue;height: 60px;line-height: 60px">
                        <p>洋房后台管理</p>
                    </div>
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :router="true">
                        <div v-for="lis in this.listd">
                            <el-submenu :index="lis.auth_id" style="background-color:lightskyblue">
                                <template slot="title">
                                    <span style=" font-size: 18px; color:black;" >{{lis.auth_name}}</span>
                                </template>
                                <div v-for="li in lis.qxfp1">
                                    <el-menu-item style="background-color:lightskyblue":index="li.auth_id" :route="{name:li.auth_Url}" >
                                        <span style="">{{li.auth_name}}</span>
                                    </el-menu-item>
                                </div>
                            </el-submenu>
                        </div>
                    </el-menu>
                </el-aside> <el-main style="padding: 0px; background-color: white">
                <router-view></router-view>
            </el-main>
            </el-container>
        </el-container>
        <div>
            <el-dialog width="30%"  title="修改密码" :visible.sync="updateMM">
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="pwd1">
                        <el-input type="password" v-model="ruleForm2.pwd1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pwd">
                        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
                    <el-button type="success" @click="updateMM = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog width="70%"  title="个人资料+" :visible.sync="updateM1">
                <el-form label-width="80px" label-suffix="：" :rules="rules3" :model="list2"  ref="list2" class="form" >
                    <el-form-item label="姓名" prop="aname">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list2.aname"></el-input>
                    </el-form-item>

                    <el-form-item  label="性别" prop="asex" >
                        <el-radio v-model="list2.asex" label="0" checked>男</el-radio>
                        <el-radio v-model="list2.asex" label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item label="电话" prop="atel">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list2.atel"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list2.address"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="idcard">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list2.idcard"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addadmin('list2')">保存</el-button>
                    <el-button type="success" @click="updateM1 = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog width="50%"  title="个人资料" :visible.sync="updateM2">
                <el-form label-width="80px" label-suffix="：" :rules="rules3" :model="list1"  ref="list1" class="form" >
                    <el-form-item label="姓名" prop="aname">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list1.aname"></el-input>
                    </el-form-item>

                    <el-form-item  label="性别" prop="asex" >
                        <el-radio v-model="list1.asex" label="0" checked>男</el-radio>
                        <el-radio v-model="list1.asex" label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item label="电话" prop="atel">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list1.atel"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list1.address"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="idcard">
                        <!-- 必须去声明绑定的数据模型 -->
                        <el-input v-model="list1.idcard"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="updateadmin('list1')">保存</el-button>
                    <el-button type="success" @click="updateM2 = false">取 消</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    export default {
        name: "Login",
        inject:['reload'],
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else if (value !== this.jymm) {
                    callback(new Error('原密码不一致!'));
                } else {
                    callback();
                }
            };

            var validatephone = (rule, value, callback) => {
                let isMobile = /^1[34578]\d{9}$/.test(value);
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (isMobile) {
                    callback();
                } else {
                    callback(new Error('手机号格式不正确!'));
                }
            };
            var validateidcard = (rule, value, callback) => {
                let isMobile =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                } else if (isMobile) {
                    callback();
                } else {
                    callback(new Error('身份证格式不正确!'));
                }
            };
            return {
                ruleForm2: {
                    pwd: '',
                    checkPass: '',
                    pwd1: ''
                },
                rules2: {
                    pwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    pwd1: [
                        { validator: validatePass1, trigger: 'blur' }
                    ]
                },
                rules3:{
                    aname:[
                        {required:true,message:'姓名不能为空',trigger:'blur'},
                    ],
                    atel:[
                        { validator: validatephone, trigger: 'blur' }

                    ],
                    address:[
                        {required:true,message:'地址不能为空',trigger:'blur'},
                    ],
                    idcard:[
                        {required:true,message:'身份证不能为空',trigger:'blur'},

                        { validator: validateidcard, trigger: 'blur' }

                    ]
                },
                listc:[],
                jymm:"",
                listd:[],
                listt:[],
                list1:{},
                list2:{},
                isCollapse: true,
                updateMM:false,
                updateM1:false,
                updateM2:false,
                apwd:"",
                aname:"",
                asex:"",
                atel:"",
                address:"",
                idcard:"",
                liste:{}
            }
        },created:function () {
            this.listd=JSON.parse(localStorage.getItem('abb'));
            var aid=JSON.parse(localStorage.getItem('acc'))
            this.$axios.post("http://localhost:8081/AdminsController/queryaid?aid="+aid)
                .then(res=>{
                    this.listc=res.data;

                    this.jymm=this.listc[0].apwd;
                });
        },methods:{
            updateMi:function () {
                this.updateMM=true;
            }, submitForm(ruleForm2)
                {
                    this.$refs[ruleForm2].validate((valid) => {
                        if (valid) {
                            this.$axios.post("http://localhost:8081/AdminsController/updateapwd?apwd="+this.ruleForm2.pwd+"&aid="+this.listc[0].aid)
                                .then(res=>{
                                    if(res.data>0){
                                        alert("修改成功");
                                        this.updateMM=false;
                                        this.$router.push({name:'Test'})
                                    }
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },insertad:function () {
                this.$axios.post("http://localhost:8081/AdminsController/selectAd_info?aid="+this.listc[0].aid).then(res=>{
                    if(res.data!=""){
                        this.listt=res.data;
                        this.list1=this.listt[0];
                        console.log(this.list1);
                        this.updateM2=true;
                    }else {
                        this.updateM1=true;
                    }
                })

            }, addadmin(list2)
                {
                    this.$refs[list2].validate((valid) => {
                        if (valid) {
                            this.$axios.post("http://localhost:8081/AdminsController/insertad?aname="+this.list2.aname+"&asex="+this.list2.asex+"&atel="+this.list2.atel+"&address="+this.list2.address+"&idcard="+this.list2.idcard)
                                .then(res=>{
                                    if(res.data>0){
                                        alert("添加成功");
                                        this.updateM1=false;
                                        this.reload();
                                        this.$router.push({name:'Login'})
                                    }
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            }, updateadmin(list1)
                {
                    this.$refs[list1].validate((valid) => {
                        if (valid) {
                            this.$axios.post("http://localhost:8081/AdminsController/updateee?aname="+this.list1.aname+"&asex="+this.list1.asex+"&atel="+this.list1.atel+"&address="+this.list1.address+"&idcard="+this.list1.idcard+"&aid="+this.listc[0].aid)
                                .then(res=>{
                                    if(res.data>0){
                                        alert("修改成功");
                                        this.updateM2=false;
                                        this.reload();
                                        this.$router.push({name:'Login'})
                                    }
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },clone:function () {
                localStorage.clear();
                this.$router.push({name:'Test'})
            }
        }
    }

</script>
<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-header[data-v-ef68022e], .el-footer[data-v-ef68022e] {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0px;
    }
</style>
