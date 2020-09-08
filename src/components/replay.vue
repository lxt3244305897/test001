<template>
    <div>

    <el-table :data="this.replay1"  border style="width: 100%;">
        <el-table-column  label="评论id" prop="rid"></el-table-column>
        <el-table-column  label="评论用户" prop="uname"></el-table-column>
        <el-table-column  label="评论内容" prop="context"></el-table-column>
        <el-table-column  label="评论时间" prop="rtime"></el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        name: "replay",
        data(){
            return{
                replay1:{},
            }
        },created:function () {
            this.replay();
        },methods:{
            replay:function () {
                this.$axios.post("http://localhost:8081/UsersController/queryreply").then(res=>{
                    if(res.data!=""){
                        this.replay1=res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
