<template>
    <div class="login-container"  style="margin-top: -60px;margin-left: -10px;margin-right: -10px;margin-left: 0px">
        <el-tabs>
                <el-form :model="admin1" :rules="rules" ref="admin1" class="login-form" label-width="50px">
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="admin1.account"></el-input></el-form-item>
                    <el-form-item label="密码" prop="apwd">
                        <el-input type="password" v-model="admin1.apwd" auto-complete="off"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="button" @click="submitForm('admin1')">登录</el-button>

                        <el-button @click="resetForm('admin1')">重置</el-button>
                    </el-form-item>
                </el-form>
        </el-tabs>
    </div>
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
                {required:true,message:'密码不能为空',trigger:'blur'}
            ]
        }
    }
  },methods:{
        submitForm(admin1) {
            this.$refs[admin1].validate((valid) => {
                if (valid) {
                    this.$axios.post("http://localhost:8081/AdminsController/queryName?account="+
                        this.admin1.account+"&apwd="+this.admin1.apwd)
                        .then(response=>{
                            if(response.data!=""){
                                this.admin=response.data;
                                localStorage.setItem('acc',JSON.stringify(this.admin[0].aid));
                                this.$axios.post("http://localhost:8081/AdminsController/queryaccount?pid="+this.admin[0].pid)
                                    .then(res=>{
                                        if(res.data!==""){
                                            this.list=res.data;
                                            localStorage.setItem('abb',JSON.stringify(this.list))
                                            this.$router.push({name:'Login',params:{u:this.admin,lis:this.list}})
                                        }
                                    })
                            }else{
                                alert("用户名或者密码错误");
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },resetForm(admin1) {
            this.$refs[admin1].resetFields();
        }
  }
}
</script>

<style scoped>
    .login-form {
        width: 350px;
        margin: 160px auto; /* 上下间距160px，左右自动居中*/
        background-color: rgb(255, 255, 255,0.8); /* 透明背景色 */
        padding: 30px;
        border-radius: 20px; /* 圆角 */
    }

    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../static/timgBBHO7ZJF.jpg")repeat;
    }

    /* 标题 */
    .login-title {
        color: #303133;
        text-align: center;
    }

</style>
