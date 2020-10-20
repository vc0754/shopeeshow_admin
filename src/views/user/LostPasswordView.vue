<template>
  <div class="login-wrapper">
    <div class="login-container">

      <div class="sign-page">
        <div class="brand">
          <img alt="" src="../../assets/logo.png">
          <div>
            <span>Shopee</span>
            <span>show</span>
          </div>
        </div>
        
        <el-form class="sign-content" ref="formPSW" :model="formPSW">
          <el-form-item>
            <el-input v-model="formPSW.Email" placeholder="请输入你的注册邮箱" />
          </el-form-item>
          
          <el-form-item>
            <el-input v-model="formPSW.Code" placeholder="请输入验证码" :maxlength="6" style="width:172px;" />
            
            <el-button class="sendSMS" type="primary" round v-if="send_code">{{ send_code }}秒后过期</el-button>
            <el-button class="sendSMS" :type="send_text === '重新发送' ? 'info' : 'primary'" round :loading="loading" @click="sendCode" v-else>{{ send_text }}</el-button>
          </el-form-item>

          <el-form-item>
            <el-input type="password" v-model="formPSW.Pwd" placeholder="请输入新密码" :maxlength="6" />
          </el-form-item>

          <el-form-item>
            <el-input type="password" v-model="formPSW.Pwd2" placeholder="再次输入密码" :maxlength="6" />
          </el-form-item>
        </el-form>

        <div class="sign-button">
          <el-button type="primary" round :loading="loading" @click="handleSubmit">确定</el-button>
        </div>
        
        <div class="sign-meta">
          <router-link to="/sign" class="fg">返回登录</router-link>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LostPasswordView',
  data () {
    return {
      formPSW: {
        Email: '',
        Code: '',
        Pwd: '',
        Pwd2: '',
      },
      loading: false,
      send_text: '发送验证码',
      countID: 0,
      send_code: 0
    }
  },
  computed: {
  },
  methods: {
    countdown() {
      this.countID = setInterval(() => {
        --this.send_code
        if (this.send_code === 0) clearInterval(this.countID)
      }, 1000);
    },
    // 发送验证码
    sendCode() {
      if (!this.formPSW.Email) return this.$message.error('请输入你的注册邮箱')
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formPSW.Email)) return this.$message.error('邮箱格式不正确')
      this.$http.get('/User/SendEmailCode', {
        params: {
          Email: this.formPSW.Email,
          SmsType: 2
        }
      }).then(res => {
        this.send_code = 30
        this.countdown()
        this.send_text = '重新发送'
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
    // 提交表单
    handleSubmit() {
      if (!this.formPSW.Email) return this.$message.error('请输入你的注册邮箱')
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formPSW.Email)) return this.$message.error('邮箱格式不正确')
      
      if (!this.formPSW.Code) return this.$message.error('请输入验证码')
      if (!this.formPSW.Pwd) return this.$message.error('请输入新密码')
      if (!this.formPSW.Pwd2) return this.$message.error('请再次输入密码')
      if (this.formPSW.Pwd !== this.formPSW.Pwd2) return this.$message.error('两次密码不一致')
      
      this.$http.post('/User/EmailForgetPwd', this.formPSW).then(res => {
        console.log(res)
        // this.$router.replace({ path: '/' })
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  background-color: rgba(70, 161, 255, 1);
  width: 100%; height: 100%;
  position: absolute;
}
.login-container {
  position: absolute; left: 50%; top: 50%;
  transform: translate3d(-50%, -64%, 0);
}

.sign-page {
  background-color: #fff;
  width: 392px; height: 478px;
  padding: 38px 60px;
  display: flex; flex-direction: column; align-items: center;
  
  .brand { width: 100%; margin-bottom: 14px; }

  .el-form-item {
    margin-bottom: 10px;
  }

  .sendSMS { border-radius: 0; width: 93px; height: 32px; padding: 0; float: right;}

  .sign-content {
    width: 100%; margin-bottom: 20px;
  }

  .sign-button {
    margin-bottom: 15px; width: 100%;
    display: flex; justify-content: flex-end;
    button {
      width: 120px; height: 34px; line-height: 34px; padding: 0;
    }
  }

  .sign-meta {
    color: #666;
    font-size: 12px;
    width: 100%;
    padding: 10px 0;
    border-top: solid 1px #ccc;
    display: flex; justify-content: space-between;
    a {
      color: #46A1FF;
      &.fg { color: #aaa;}
    }
  }
}
</style>
