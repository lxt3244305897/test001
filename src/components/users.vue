<template>
    <div>
        <el-table :data="this.users"  border style="width: 100%;">
            <el-table-column  resizable label="编号" prop="uid"></el-table-column>
            <el-table-column  resizable label="昵称" prop="uname"></el-table-column>
            <el-table-column label="性别" prop="usex">
                <template slot-scope="scope">
                    {{scope.row.usex==0?'男':'女'}}
                </template>
            </el-table-column>
            <el-table-column  label="姓名" prop="truename"></el-table-column>
            <el-table-column  label="身份证" prop="idcard"></el-table-column>
            <el-table-column  label="地址" prop="address"></el-table-column>
            <el-table-column  label="邮箱" prop="email"></el-table-column>

            <el-table-column label="状态" prop="ustate">
                <template slot-scope="scope">
                    {{scope.row.ustate==0?'认证房东':'不是房东'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "users",
        data(){
            return{
                users:{},
            }
        },created:function () {
            this.user();
        },methods:{
            user:function () {
                this.$axios.post("http://localhost:8081/UsersController/queryUsers").then(res=>{
                    if(res.data!=""){
                        this.users=res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
