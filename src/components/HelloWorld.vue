<template>
  <div>
              <!-- 必须去声明绑定的数据模型 -->
              <el-input v-model="aname"></el-input>
              <el-button @click="login()">查询</el-button>
      <el-table :data="pageInfo.slice((currentPage-1)*PageSize,currentPage*PageSize) " width="100%" height="550px" :stripe="true" border>
          <!-- prop显示绑定的数据的属性 -->

          <el-table-column prop="aid" label="编号"></el-table-column>
          <el-table-column prop="aname" label="姓名"></el-table-column>
          <el-table-column prop="apwd" label="年龄"></el-table-column>
          <el-table-column label="操作" fixed="right" width="100px">
              <template slot-scope="scope">
                  <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
                  <el-button type="text" @click="deleleById(scope.row)">删除</el-button>
              </template>
          </el-table-column>
          <div>

          </div>
      </el-table>
      <div>
          <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
          </el-pagination>

      </div>
      <el-dialog width="40%" title="修改员工" :visible="dialogVisible">
          <el-form label-width="100px" label-suffix="：" :model="emp" class="form" :rules="rules" ref="fm">
              <el-form-item label="编号" prop="aid">
                  <!-- 必须去声明绑定的数据模型 -->
                  <el-input v-model="emp.aid"></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="aname">
                  <el-input v-model="emp.aname"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="apwd">
                  <el-input v-model="emp.apwd"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="edit()">确 定</el-button>
              <el-button type="success" @click="dialogVisible = false">取 消</el-button>
          </div>
      </el-dialog>
  </div>
<script>
export default {
  name: 'HelloWorld',
    data(){
      return{
          dialogVisible: false,
          emp: {},
          rules: {},
          pageInfo: [],
          pageSizes: [1, 2, 3, 4],
          aname:"",
// 每页显示的条数
          PageSize: 2,
// 默认显示第几页
          currentPage: 1,
// 总条数
          total: 1


      }
    },created:function () {
     this.login();
    },methods:{
      showDialog: function (row) {
            this.dialogVisible = true;
            this.emp = row;
        },
        deleleById: function (row) {
            this.$axios.post("http://localhost:8090/webStoot/admin1/delete?aid="+row.aid).then(res=>{
                this.login();
            })
        },
        edit:function(){
            this.$axios.post("http://localhost:8090/webStoot/admin1/update",this.emp).then(res=>{
                console.log(res);
                if(res.data>=1){
                    this.dialogVisible = false;
                    this.login();
                }else {
                    this.dialogVisible = false;
                }
            })
        },login:function () {
            this.$axios.post("http://localhost:8090/webStoot/admin1/select?aname="+this.aname).then(res=>{
                if(res.data!=""){
                    var st = res.data;
                    this.total=st.length;
                   this.pageInfo=st;
                }
            })
      },handleSizeChange(val) {
            this.PageSize = val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage = 1
        // handleSizeChange(val) {
        //     this.pageInfo.size=val;
        //     this.$axios.post("http://localhost:8090/webStoot/admin1/select?pageSize="+val).then(res=>{
        //         if(res.data!=""){
        //             var st = res.data;
        //             this.pageInfo=st;
        //         }
        //     })
        },
        handleCurrentChange(val) {
            this.currentPage = val

            // this.$axios.post("http://localhost:8090/webStoot/admin1/select?page="+val).then(res=>{
            //     if(res.data!=""){
            //         var st = res.data;
            //         this.pageInfo=st;
            //     }
            // })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
