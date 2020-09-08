<template>
    <div>
        <el-table :data="list1"  border style="width: 100%;">
            <el-table-column label="房源标题"  prop="fid"></el-table-column>
            <el-table-column label="个性描述"  prop="province" ></el-table-column>
            <el-table-column label="内部情况"  prop="lnotes" ></el-table-column>
            <el-table-column  label="交通情况"  prop="hname"></el-table-column>
            <el-table-column label="周边景点"  prop="fname" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "bnbin",
        data () {
            return {
                list1:[]
            }
        },
        created: function () {
            this.listAll()
        },
        methods: {
            listAll: function () {
                this.$axios.post('http://localhost:8081/UsersController/querybin')
                    .then(response => {
                        if (response.data != null) {
                            this.list1 = response.data;
                            console.log(this.list1);
                            console.log(response.data);
                        }
                    })
            }
        }

    }
</script>

<style scoped>

</style>
