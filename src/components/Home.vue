<template>
    <div>
        <span class="a">欢迎{{$route.params.u[0].pid}}</span>
        <span class="a">欢迎{{$route.params.lis}}</span>
        <el-container>
            <el-header>
                <el-dropdown style="float: right">

                    <i class="el-icon-arrow-down"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
                        <el-dropdown-item command="Logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
                        <!--&lt;!&ndash; 可展开的导航 &ndash;&gt;-->
                        <div v-for="lis in $route.params.lis">
                        <el-submenu :index="lis.auth_id">
                            <template slot="title">{{lis.auth_name}}</template>
                            <div v-for="li in lis.qxfp1">
                                <el-menu-item :index="lis.auth_id-li.auth_id">
                                    <template slot="title">{{li.auth_name}}</template>
                                </el-menu-item>
                            </div>
                        </el-submenu>

                        </div>
                  </el-menu>
                </el-aside>
                <el-main>
                    <!-- 二级路由 -->
                        <router-view/>
                    </el-main>
            </el-container>
            <el-footer height="30px">
            </el-footer>
        </el-container>
    </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: lavender;
        line-height: 60px;
    }
    .el-aside {
        height: 600px;
    }
    .a{
        color: #409EFF;
        cursor: pointer;
    }
</style>
