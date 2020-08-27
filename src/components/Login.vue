<template>
    <div>
        <el-container>
        <el-header style="text-align: right; font-size: 12px" >
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>欢迎:{{$route.params.u[0].aname}}</span>
        </el-header>
        <el-container>
            <el-aside default-active="1-4-1" width="auto">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <div v-for="lis in $route.params.lis">
                    <el-submenu :index="lis.auth_id">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span slot="title">{{   lis.auth_name}}</span>
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
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="true">合上</el-radio-button><br>
                <el-radio-button :label="false">展开</el-radio-button>
            </el-radio-group>
            <el-main>

                <router-view/>
                <el-table :data="tableData" width="auto" >
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
    </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(12).fill(item),
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
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
