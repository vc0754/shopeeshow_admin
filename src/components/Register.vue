<template>
  <div class="register-page">
    <div class="brand">
      <img alt="" src="../assets/logo.png">
      <div>
        <span>Shopee</span>
        <span>show</span>
      </div>
    </div>
        
    <el-form class="sign-content" ref="formData" :model="formData">
      <el-form-item>
        <el-input v-model="formData.Email" placeholder="请输入您的邮箱" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="formData.UserName" placeholder="请输入昵称" @blur="usernameExist" />
        <img src="../assets/exist_0.svg" alt="" v-if="is_username_exist === false" class="tip">
        <img src="../assets/exist_1.svg" alt="" v-if="is_username_exist === true" class="tip">
      </el-form-item>
      
      <el-form-item>
        <el-input v-model="formData.Code" placeholder="请输入验证码" :maxlength="6" style="width:172px;" />
            
        <el-button class="sendSMS" type="primary" round v-if="send_code">{{ send_code }}秒后过期</el-button>
        <el-button class="sendSMS" :type="send_text === '重新发送' ? 'info' : 'primary'" round :loading="loading" @click="sendCode" v-else>{{ send_text }}</el-button>
      </el-form-item>

      <el-form-item>
        <el-input type="password" v-model="formData.Pwd" placeholder="请输入密码" :maxlength="6" />
      </el-form-item>

      <el-form-item>
        <el-input type="password" v-model="formData.Pwd2" placeholder="再次输入密码" :maxlength="6" />
      </el-form-item>
    </el-form>

    <div class="sign-button">
      <el-button type="primary" round :loading="loading" @click="handle_submit">注册</el-button>
    </div>
    
    <div class="sign-meta">
      <div>
        已注册？
        <router-link to="/sign">去登录</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '@/store/modules/user'
export default {
  name: 'RegisterComponent',
  components: {},
  props: {
    gotoSign: {
      type: Function,
      default: null
    },
    registerSuccess: {
      type: Function,
      default: null
    },
  },
  data() {
    return {
      formData: {
        Email: '',
        UserName: '',
        Code: '',
        InvitationCode: '',
        Pwd: '',
        Pwd2: ''
      },
      loading: false,
      is_username_exist: null,
      send_text: '发送验证码',
      countID: 0,
      send_code: 0
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([USER_SIGNIN]),
    
    countdown() {
      this.countID = setInterval(() => {
        --this.send_code
        if (this.send_code === 0) clearInterval(this.countID)
      }, 1000);
    },
    
    // 用户名是否被占用
    usernameExist() {
      this.is_username_exist = null
      if (!this.formData.UserName) return
      this.$http.get(`/User/UserNameExists?UserName=${this.formData.UserName}`).then(res => {
        this.is_username_exist = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },

    // 发送验证码
    sendCode() {
      if (!this.formData.Email) return this.$message.error('请输入你的注册邮箱')
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formData.Email)) return this.$message.error('邮箱格式不正确')
      this.$http.get('/User/SendEmailCode', {
        Email: this.formData.Email,
        SmsType: 1
      }).then(res => {
        this.send_code = 30
        this.countdown()
        this.send_text = '重新发送'
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
    
    // 跳转到登陆页面
    goSign() {
      if (this.gotoSign) return this.gotoSign();
      this.$router.push({
        path: '/sign',
        query: {
          type: 'wx'
        }
      });
    },
    
    // 注册成功回调
    handle_registered() {
      if (this.registerSuccess) return this.registerSuccess();
      // this.$router.replace({ path: '/' });
    },

    // 提交表单
    handle_submit() {
      if (!this.formData.Email) return this.$message.error('请输入你的注册邮箱')
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formData.Email)) return this.$message.error('邮箱格式不正确')
      
      if (!this.formData.UserName) return this.$message.error('请输入昵称')
      if (!this.formData.Code) return this.$message.error('请输入验证码')
      if (!this.formData.Pwd) return this.$message.error('请输入密码')
      if (!this.formData.Pwd2) return this.$message.error('请再次输入密码')
      if (this.formData.Pwd !== this.formData.Pwd2) return this.$message.error('两次密码不一致')

      if (this.formData.Email && this.formData.UserName && this.formData.Code && this.formData.Pwd && this.formData.Pwd2) {
        this.$http.post('/User/EmailRegister', this.formData).then(res => {
          console.log(res)
          // this.$store.dispatch(USER_SIGNIN, res)
          // this.$Message.success('注册成功!')
          // this.handle_registered()
        }).catch(err => {
          this.$message.error(err.data.Message)
        });
      }
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="less">
// 注册
.register-page {
  background-color: #fff;
  width: 392px; height: 478px;
  padding: 38px 60px;
  display: flex; flex-direction: column; align-items: center;
  
  .brand { width: 100%; margin-bottom: 22px;}

  .tip { position: absolute; top: 50%; right: -25px; transform: translate3d(0, -50%, 0);}

  .el-form-item { margin-bottom: 12px; }

  .sendSMS { border-radius: 0; width: 93px; height: 32px; padding: 0; margin: 1px 0; float: right;}

  .sign-content {
    width: 100%; margin-bottom: 5px;
  }

  .sign-button {
    margin-bottom: 25px; width: 100%;
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