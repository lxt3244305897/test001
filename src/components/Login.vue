<template>
    <div>
        <el-container>
        <el-header style="text-align: right; font-size: 12px" >
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
            </el-dropdown>
        </el-header>
            <el-aside default-active="1-4-1" width="auto">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" >
                    <div v-for="lis in this.listd">
                    <el-submenu :index="lis.auth_id">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span slot="title">{{lis.auth_name}}</span>
                        </template>
                        <div v-for="li in lis.qxfp1">
                            <el-menu-item-group>
                                <el-menu-item index="1-1">{{li.auth_name}}</el-menu-item>
                            </el-menu-item-group>
                        </div>
                    </el-submenu>
                    </div>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
    </el-container>

    </div>

</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                listc:[],
                listd:[]
            }
        },created:function () {
            this.listc=localStorage.getItem('acc');
            this.listd=localStorage.getItem('abb');
            console.log(this.listd);
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        padding:0px;
    }
    .el-aside{
        color: #333;
        text-align: center;
        line-height: 50px;
        height: 800px;
    }
    .el-table{
        padding:0px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        padding:0px;
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
    span{
        font-size: 25px;
        padding-left: 40px;
        margin-right: 60px;
    }
</style>
