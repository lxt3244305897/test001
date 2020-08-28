<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-container>
                <el-aside width="20%">
                                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :router="true">
                                        <div v-for="lis in this.listd">
                                            <el-submenu :index="lis.auth_id">
                                                <template slot="title">
                                                    <i class="el-icon-message"></i>
                                                    <span slot="title">{{lis.auth_name}}</span>
                                                </template>
                                                <div v-for="li in lis.qxfp1">
                                                    <el-menu-item-group :index="li.auth_Url">
                                                        <el-menu-item >{{li.auth_name}}</el-menu-item>
                                                    </el-menu-item-group>
                                                </div>
                                            </el-submenu>
                                        </div>
                            </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                listc:[],
                listd:[]
            }
        },created:function () {
            this.listc=localStorage.getItem('acc');
            this.listd=JSON.parse(localStorage.getItem('abb'));
            console.log(this.listd);
        },methods:{

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
