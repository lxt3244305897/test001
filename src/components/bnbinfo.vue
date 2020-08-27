<template>
    <div>
        <el-button type="text" @click="showDialogs()">添加</el-button>
        <el-table :data="list1" width="100%" height="500px" :stripe="true" border>
            <el-table-column prop="bnbid" label="民宿信息Id"></el-table-column>
            <el-table-column prop="bnbname" label="民宿名称"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="province" label="所在省"></el-table-column>
            <el-table-column prop="city" label="所在市"></el-table-column>
            <el-table-column prop="town" label="所在区县"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column prop="rname" label="房屋类型"></el-table-column>
            <el-table-column prop="lnotes" label="宜居人数"></el-table-column>
            <el-table-column prop="hname" label="户型"></el-table-column>
            <el-table-column prop="title" label="房源描述"></el-table-column>
            <el-table-column prop="shower" label="淋浴">
                <template slot-scope="scope">
                      {{scope.row.shower==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="air" label="空调">
                <template slot-scope="scope">
                    {{scope.row.air==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="Television" label="电视机">
                <template slot-scope="scope">
                    {{scope.row.Television==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="network" label="网络">
                <template slot-scope="scope">
                    {{scope.row.network==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="Heating" label="暖气">
                <template slot-scope="scope">
                    {{scope.row.Heating==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="guard" label="独卫">
                <template slot-scope="scope">
                    {{scope.row.guard==0?'可用':'不可用'}}
                </template>
            </el-table-column>
            <el-table-column prop="bedroom" label="卧室"></el-table-column>
            <el-table-column prop="room" label="客厅"></el-table-column>
            <el-table-column prop="toilet" label="洗手间"></el-table-column>
            <el-table-column prop="kitchen" label="厨房"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'bnbinfo',
  data: function () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      rules: {
      },
      tep: {},
      tep1: {},
      list1: []
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8080/bnbinfo/list')
        .then(response => {
          if (response.data != null) {
            this.list1 = response.data
          }
        })
    },
    showDialog: function (row) {
      this.dialogVisible = true
      this.tep = row
    },
    showDialogs: function () {
      this.dialogVisible1 = true
      this.tep1 = {}
    }

  }

}
</script>

<style scoped>

</style>
