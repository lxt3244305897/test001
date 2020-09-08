<template>
    <div>
        <div class="yyy">
        <el-button type="primary" @click="showAdd()">添加管理员</el-button>
        <el-input class="cs" style="width: 256px" v-model="aname"></el-input>
        <el-button @click="getLi()">查询</el-button>
        </div>
        <el-table :data="this.getList.slice((currentPage-1)*PageSize,currentPage*PageSize)"  border style="width: 100%; line-height: 0px">
            <el-table-column  label="编号" prop="aid"></el-table-column>
            <el-table-column  resizable label="账号" prop="account"></el-table-column>
            <el-table-column  label="密码" prop="apwd"></el-table-column>
            <el-table-column label="状态" prop="astate">
                <template slot-scope="scope">
                    {{scope.row.astate==0?'可用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column label="身份" prop="pid">
                <template slot-scope="scope">
                    {{scope.row.pid==1?'普通管理员':'超级管理员'}}
                </template>
            </el-table-column>
            <el-table-column  label="姓名" prop="aname"></el-table-column>
            <el-table-column label="电话" prop="atel"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope" >
                    <el-button style=" float:left;" type="primary" @click="showDialog(scope.row)">修改</el-button>
                    <el-button style=" float: right;" type="success" @click="roleAdd(scope.row)">权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="PageSize"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
                <el-dialog width="30%" title="权限分配" :visible.sync="dialogTableVisible">
                    <el-form ref="configForm" :model="ropid" size="small" label-width="100px"
                             style="width: 50%" class="form">
                        <el-tree
                            :data="getrole"
                            show-checkbox
                            default-expand-all
                            node-key="auth_id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                        </el-tree>
                        <el-form-item>
                            <el-button :loading="addBtnLoading" type="primary" size="small"
                                       @click="getCheckedKeys()">立即提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
        <el-dialog width="30%" title="添加管理" :visible.sync="dialogVisibled">
            <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号" prop="aid" hidden>
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="ruleForm.aid" disabled="true"></el-input>
                </el-form-item>
                <el-form-item  label="账号" prop="account"  style="width: 400px">
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input  v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item  label="密码" prop="apwd" style="width: 400px">
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="ruleForm.apwd"></el-input>
                </el-form-item>
                <el-form-item  label="状态" prop="astate" style="width: 400px" hidden >
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-radio v-model="ruleForm.astate" label="0">可用</el-radio>
                    <el-radio v-model="ruleForm.astate" label="1" >禁用</el-radio>
                </el-form-item>
            </el-form>
            <div style="text-align: center;padding: 0px">
                <el-button type="primary" @click="add('ruleForm')">添加</el-button>
                <el-button type="success" @click="dialogVisibled = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog width="30%" title="修改管理" :visible.sync="dialogVisible">
            <el-form :model="adminsUpdate" :rules="rules3" ref="adminsUpdate" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号" prop="aid" >
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="adminsUpdate.aid" disabled="true"></el-input>
                </el-form-item>
                <el-form-item  label="账号" prop="account"  style="width: 400px">
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input  v-model="adminsUpdate.account"></el-input>
                </el-form-item>
                <el-form-item  label="密码" prop="apwd" style="width: 400px">
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="adminsUpdate.apwd"></el-input>
                </el-form-item>
                <template>
                    <el-form-item  label="状态" prop="astate" style="width: 400px" >
                        <el-radio   v-model="adminsUpdate.astate"  :label="0">可用</el-radio>
                        <el-radio  v-model="adminsUpdate.astate"  :label="1">禁用</el-radio>
                    </el-form-item>
                </template>
            </el-form>
            <div style="text-align: center;padding: 0px">
                <el-button type="primary" @click="edit('adminsUpdate')">修改</el-button>
                <el-button type="success" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "admins",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                }else {
                    callback();
                }
            };

            return {
                rules3: {
                    account: [
                        {min:2,max:10,message:'账号是2-10位',trigger:['change','blur']},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    apwd: [
                        {min:4,max:10,message:'密码中4-10位',trigger:['change','blur']},
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },rules2: {
                    account: [
                        {required:true,message:'用户名不能为空',trigger:'blur'},
                        {min:2,max:10,message:'账号是2-10位',trigger:['change','blur']},

                    ],
                    apwd: [
                        {required:true,message:'密码不能为空',trigger:'blur'},
                        {min:4,max:10,message:'密码中4-10位',trigger:['change','blur']},
                    ]
                },
                ruleForm:{},
                title: "修改员工",
                editB: false,
                dialogVisible: false,
                dialogTableVisible: false,
                adduser: false,
                adminsUpdate: {},
                getList: [],
                adminRole:[],
                addBtnLoading:false,
                dialogVisibled:false,
                getrole:[],
                listd:[],
                ropid:'',
                adminpid:'',
                pageSizes: [1, 2, 3, 4],
                // 每页显示的条数
                PageSize: 3,
                // 默认显示第几页
                currentPage: 1,
                // 总条数
                total: 1,
                aname:"",
                reauth_id:null,
                defaultProps: {
                    children: 'qxfp1',
                    label: 'auth_name'
                },
                auth_id: 0,
                auth_name: ''
            }
        },
        created: function () {
            var aid=JSON.parse(localStorage.getItem('acc'))
            this.$axios.post("http://localhost:8081/AdminsController/queryaid?aid="+aid)
                .then(res=>{
                        this.listd=res.data;
                });
            this.getLi();
        },
        methods:{
            getLi:function () {
                this.$axios.post("http://localhost:8081/AdminsController/query?aname="+this.aname)
                    .then(res=>{
                        if(res.data!=""){
                            this.total = res.data.length
                            this.getList=res.data;
                        }
                }).catch(error=>{
                    console.log(error)
                })
            },getro:function (id) {
                this.$axios.post("http://localhost:8081/AdminsController/queryrole?pid="+this.adminpid).then(res=>{
                    if(res.data!=""){
                            this.getrole=res.data
                        this.$axios.post("http://localhost:8081/AdminsController/roleAdmin?pid="+this.ropid)
                            .then(rest=>{
                                for (let p = 0; p < rest.data.length; p++) {
                                    console.log(rest.data[p].auth_id)
                                    this.$refs.tree.setChecked(rest.data[p].auth_id, true, false)
                                }

                        })
                    }
                })
            },
            edit(adminsUpdate) {
                this.$refs[adminsUpdate].validate((valid) => {
                    if (valid) {
                        this.$axios.post("http://localhost:8081/AdminsController/update",this.adminsUpdate).then(res=>{
                            this.dialogVisible = false;
                            this.getLi()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }   ,getCheckedKeys () {
                let str = '';
                for (let p = 0; p < this.$refs.tree.getCheckedKeys().length; p++) {
                    console.log(this.$refs.tree.getCheckedKeys()[p]);
                    if (p < this.$refs.tree.getCheckedKeys().length - 1) {
                        str += this.$refs.tree.getCheckedKeys()[p] + ','

                    } else {
                        str += this.$refs.tree.getCheckedKeys()[p]
                    }
                    console.info(str);
                }
                this.$axios.post("http://localhost:8081/AdminsController/roleA?auth_id="+str+"&pid="+this.ropid).then(response => {
                        if (response.data >= 1) {
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogTableVisible = false;
                        } else {
                            this.$message({
                                showClose: true,
                                message: '修改失败！',
                                type: 'error'
                            })
                        }
                    })
            },'roleAdd1':function (id) {
                this.$axios.post("http://localhost:8081/AdminsController/roleA?auth_id="+id+"&pid="+this.ropid)
                    .then(res=>{
                        if(res.data!=""){
                            alert("添加成功")
                        }
                })
            },'showDialog': function (row) {
                this.dialogVisible = true;
                this.adminsUpdate = row;
            },'showdele': function (row) {
                this.$axios.post("http://localhost:8081/AdminsController/delete?aid="+row.aid).then(res=>{
                    this.dialogVisible = false;
                    this.getLi()
                })
            },'showAdd': function () {
                this.dialogVisibled = true;
                this.ruleForm.astate=0;
            },add(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post("http://localhost:8081/AdminsController/add",this.ruleForm).then(res=>{
                            this.dialogVisibled = false;
                            this.getLi()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },'roleAdd': function (row) {
                    this.dialogTableVisible = true;
                    this.ropid=row.pid;
                this.adminpid=this.listd[0].pid;
                    this.getro();
            },handleSizeChange (val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },handleCurrentChange (val) {
                // 改变默认的页数
                this.currentPage = val
            }
        }
    }
</script>

<style scoped>
   .el-table{
        border-bottom: 0px solid #EBEEF5;
    }
    #cs {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 30%;
    }
    .el-main[data-v-ef68022e] {

        color: #333;
        text-align: center;
        line-height: 0;

    }
    .yyy{
        line-height: 0px;
    }
    .el-button--primary {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
    }
    .el-table_6_column_42 is-leaf{
        width: 490px;
    }
</style>
