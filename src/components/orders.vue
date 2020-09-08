<template>
    <div>

    <el-table :data="this.orders"  border style="width: 100%;">
        <el-table-column  label="订单Id" prop="oid"></el-table-column>
        <el-table-column  label="订单单号" prop="Order_num"></el-table-column>
        <el-table-column label="订单状态" prop="astate">
        <template slot-scope="scope">
            {{scope.row.state==0?'已结束':'进行中'}}
        </template>
    </el-table-column>
        <el-table-column  label="房源名称" prop="bnbname"></el-table-column>
        <el-table-column  label="用户名称" prop="uname"></el-table-column>
        <el-table-column  label="创建订单时间" prop="createTime"></el-table-column>
        <el-table-column  label="订单备注" prop="order_notes"></el-table-column>
        <el-table-column  label="订单金额" prop="order_price"></el-table-column>
        <el-table-column  label="入住人数" prop="order_people"></el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        name: "replay",
        data(){
            return{
                orders:{},
            }
        },created:function () {
            this.order();
        },methods:{
            order:function () {
                    this.$axios.post("http://localhost:8081/UsersController/queryodrers").then(res=>{
                    if(res.data!=""){
                        this.orders=res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
