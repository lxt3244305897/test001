<template>
    <div>
    <el-button type="text" @click="showDialogs()">添加</el-button>
    <el-table :data="list" width="100%" height="500px" :stripe="true" border>
        <el-table-column prop="rid" label="房型Id"></el-table-column>
        <el-table-column prop="rname" label="房型名称"></el-table-column>
        <el-table-column prop="notes" label="房型说明"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100px">
            <template slot-scope="scope">
                <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
                <el-button type="text" @click="del(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog width="40%" title="修改房型" :visible="dialogVisible">
        <el-form label-width="100px" label-suffix=":" :model="tep" class="form" :rules="rules" ref="fm">
            <el-form-item label="房型编号" prop="rid">
                <el-input v-model="tep.rid"></el-input>
            </el-form-item>
            <el-form-item label="房型名称" prop="rname">
                <el-input v-model="tep.rname"></el-input>
            </el-form-item>
            <el-form-item label="房型说明" prop="notes">
                <el-input v-model="tep.notes"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="edit()">确 定</el-button>
            <el-button type="success" @click="dialogVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    <el-dialog width="40%" title="添加员工" :visible="dialogVisible1">
        <el-form label-width="100px" label-suffix=":" :model="tep1" class="form" :rules="rules" ref="fm">
            <el-form-item label="编号" prop="rid">
                <el-input v-model="tep1.rid"></el-input>
            </el-form-item>
            <el-form-item label="房型名称" prop="rname">
                <el-input v-model="tep1.rname"></el-input>
            </el-form-item>
            <el-form-item label="房型说明" prop="notes">
                <el-input v-model="tep1.notes"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add()">确 定</el-button>
            <el-button type="success" @click="dialogVisible1 = false">取 消</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'rommtype',
  data: function () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      rules: {
        rname: [
          {required: true, message: '请输入房源名称', trigger: 'blur'},
          {min: 2, max: 6, message: '长度在2-6个字之间', trigger: 'blur'}
        ],
        notes: [
          {required: true, message: '请输入房源说明', trigger: 'blur'},
          {min: 4, max: 20, message: '长度在4-20个字之间', trigger: 'blur'}
        ]
      },
      tep: {},
      tep1: {},
      list: []
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8080/rommtype/list')
        .then(response => {
          if (response.data != null) {
            this.list = response.data
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
    },
    edit: function () {
      this.$axios.post('http://localhost:8080/rommtype/update', this.tep).then(response => {
        if (this.tep !== '') {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.listAll()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    del: function (row) {
      this.$axios.post('http://localhost:8080/rommtype/del', row).then(res => {
        if (row !== '') {
          this.$message.success('删除成功')
          this.listAll()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    add: function () {
      this.$axios.post('http://localhost:8080/rommtype/add', this.tep1).then(res => {
        if (this.tep1 !== '') {
          this.$message.success('添加成功')
          this.dialogVisible1 = false
          this.listAll()
        } else {
          this.$message.error('添加失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
