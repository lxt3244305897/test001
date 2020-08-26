<template>
    <p class="login">
        <el-tabs>
            <el-tab-pane label="登录" name="first">
                <el-form :model="admin1" :rules="rules" ref="admin1" label-width="50px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="account"><el-input v-model="admin1.account"></el-input></el-form-item>

                    <el-form-item label="密码" prop="apwd"><el-input type="password" v-model="admin1.apwd" auto-complete="off"></el-input></el-form-item>

                    <el-form-item>
                        <el-button type="button" @click="login()">登录</el-button>

                        <el-button @click="resetForm('admin1')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

         <el-tab-pane label="注册" name="second">
                <register></register>
            </el-tab-pane>
        </el-tabs>
    </p>
</template>

<script>
    import register from '../components/register';
export default {
  name: 'Test',
  data: function () {
    return {
      admin1:{},
      admin:{},
      list:{}
      ,rules:{
            account:[
                // require:进行校验,默认校验非空  message:提示信息  trigger:触发校验的事件
                {required:true,message:'用户名不能为空',trigger:'blur'},
                {min:5,max:10,message:'用户名是3-10位',trigger:['change','blur']},
                // 自定义校验规则
                {trigger:['change','blur'],
                    validator:function(rule,value,callback){
                        if(value.indexOf('_') == -1){
                            callback();
                        }else{
                            callback(new Error("用户名不能包含_特殊字符"));
                        }
                    }
                },
            ],
            apwd:[
                {required:true,message:'用户名不能为空',trigger:'blur'}
            ]
        }
    }
  },methods:{
    login: function () {
      this.$axios.post("http://localhost:8081/AdminsController/queryName?account="+
        this.admin1.account+"&apwd="+this.admin1.apwd)
        .then(response=>{
            if(response.data!=''){
                this.admin=response.data;
                this.$axios.post("http://localhost:8081/AdminsController/queryaccount?pid="+this.admin[0].pid)
                    .then(res=>{
                        if(res.data!=""){
                            alert(res.data);
                            this.list=res.data;
                            console.log(this.list)
                            this.$router.push({name:'Login',params:{u:this.admin,lis:this.list}})
                        }
                    })
          }else{
            alert("用户名或者密码错误");
          }
      }).catch(err=>{
            alert("请输入用户名或密码");
      })
    },resetForm(admin1) {
            this.$refs[admin1].resetFields();
        }
  },components: {
        register
    }
}
</script>

<style scoped>
  .login {
      width: 700px;
      height: 1000px;

      margin: 0 auto;
  }

</style>
