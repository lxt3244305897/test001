<template>
    <div>
        <div class="yyy">
        <el-button type="primary" @click="showAdd()">添加管理员</el-button>
        <el-input v-model="aname"></el-input>
        <el-button @click="getLi()">查询</el-button>
        </div>
        <el-table :data="this.getList.slice((currentPage-1)*PageSize,currentPage*PageSize)" border style="width: 100%">
            <el-table-column label="编号" prop="aid" width="180"></el-table-column>
            <el-table-column label="账号" prop="account"></el-table-column>
            <el-table-column label="密码" prop="apwd"></el-table-column>
            <el-table-column label="状态" prop="astate">
                <template slot-scope="scope">
                    {{scope.row.astate==0?'可用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="aname"></el-table-column>
            <el-table-column label="电话" prop="atel"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
                    <el-button type="text" @click="showdele(scope.row)">删除</el-button>
                    <el-button type="text" @click="roleAdd(scope.row)">分配权限</el-button>
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

        <el-dialog width="20%"  :title=title :visible.sync="dialogVisible">
            <el-form label-width="80px" label-suffix="：" :model="adminsUpdate" class="form" >
                <el-form-item label="编号" prop="aid">
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="adminsUpdate.aid"></el-input>
                </el-form-item>

                <el-form-item  label="账号" prop="account" >
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="adminsUpdate.account"></el-input>
                </el-form-item>
                <el-form-item  label="密码" prop="apwd" >
                    <!-- 必须去声明绑定的数据模型 -->
                    <el-input v-model="adminsUpdate.apwd"></el-input>
                </el-form-item>
                <template>
                    <el-form-item  label="状态" prop="astate" >

                        <el-radio v-model="adminsUpdate.astate"  :label="0">可用</el-radio>
                        <el-radio v-model="adminsUpdate.astate"  :label="1">禁用</el-radio>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-show="editB" @click="edit()">修改</el-button>
                <el-button type="primary" v-show="adduser" @click="add()">添加</el-button>
                <el-button type="success" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "admins",
        data() {
            return {
                title: "修改员工",
                editB: false,
                dialogVisible: false,
                dialogTableVisible: false,
                adduser: false,
                adminsUpdate: {},
                getList: [],
                adminRole:[],
                addBtnLoading:false,
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
            this.listd=JSON.parse(localStorage.getItem('acc'));
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
            edit:function () {
                this.$axios.post("http://localhost:8081/AdminsController/update",this.adminsUpdate).then(res=>{
                    this.dialogVisible = false;
                    this.getLi()
                })
            },getCheckedKeys () {
                let str = ''
                for (let p = 0; p < this.$refs.tree.getCheckedKeys().length; p++) {
                    console.log(this.$refs.tree.getCheckedKeys()[p])
                    if (p < this.$refs.tree.getCheckedKeys().length - 1) {
                        str += this.$refs.tree.getCheckedKeys()[p] + ','
                    } else {
                        str += this.$refs.tree.getCheckedKeys()[p]
                    }
                }
                this.$axios.post("http://localhost:8081/AdminsController/roleA?auth_id="+str+"&pid="+this.ropid).then(response => {
                        if (response.data >= 1) {
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            })
                            this.authorityVisible = false
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
                this.editB = true;
                this.adduser = false
                this.title="修改信息"
            },'showdele': function (row) {
                this.$axios.post("http://localhost:8081/AdminsController/delete?aid="+row.aid).then(res=>{
                    this.dialogVisible = false;
                    this.getLi()
                })
            },'showAdd': function () {
                this.adminsUpdate = {astate: 0};
                this.dialogVisible = true;
                this.adduser = true;
                this.editB = false;
                this.title="添加管理员"
            },
            'add':function () {
                this.$axios.post("http://localhost:8081/AdminsController/add",this.adminsUpdate).then(res=>{
                    this.dialogVisible = false;
                    this.getLi()
                })
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
    .el-input {
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
</style>
