<template>
  <div class="register-page">
    <div class="brand">
      <img alt="" :src="sys.logo">
    </div>
        
    <el-form class="sign-content" ref="formData" :model="formData" :rules="rules">
      <el-form-item prop="Email">
        <el-input v-model="formData.Email" :placeholder="$t('input_your_account')" />
      </el-form-item>

      <el-form-item prop="UserName">
        <el-input v-model="formData.UserName" :placeholder="$t('input_nickname')" @blur="usernameExist" />
        <img src="../assets/exist_0.svg" alt="" v-if="is_username_exist === false" class="tip">
        <img src="../assets/exist_1.svg" alt="" v-if="is_username_exist === true" class="tip">
      </el-form-item>
      
      <el-form-item prop="Code">
        <el-input v-model="formData.Code" :placeholder="$t('input_captcha')" :maxlength="6" style="width:172px;" />
            
        <el-button class="sendSMS" type="primary" round v-if="send_code">{{ send_code }}{{ $t('after_second_expire') }}</el-button>
        <el-button class="sendSMS" :type="send_text === $t('send_again') ? 'info' : 'primary'" round :loading="loading" @click="sendCode" v-else>{{ send_text }}</el-button>
      </el-form-item>

      <el-form-item prop="Pwd">
        <el-input type="password" v-model="formData.Pwd" :placeholder="$t('input_pwd')" :maxlength="8" />
      </el-form-item>

      <el-form-item>
        <el-input type="password" v-model="formData.Pwd2" :placeholder="$t('input_new_pwd_again')" :maxlength="8" />
      </el-form-item>
    </el-form>

    <div class="sign-button">
      <el-button type="primary" round :loading="loading" @click="handle_submit">{{ $t('register.label') }}</el-button>
    </div>
    
    <div class="sign-meta">
      <div>{{ $t('already_sign') }}
        <router-link to="/sign">{{ $t('go_sign') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      rules: {
        Email: [
          { required: true, message: '邮箱必须', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'change' }
        ],
        Pwd: [
          { required: true, message: '密码必须', trigger: 'blur' },
          { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/, message: '长度8-20位，必须包含大小写英文字母，数字', trigger: 'blur' }
        ],
        UserName: [
          { required: true, message: '昵称必须', trigger: 'blur' },
        ],
        Code: [
          { required: true, message: '验证码必须', trigger: 'blur' },
        ]
      },
      loading: false,
      is_username_exist: null,
      send_text: '',
      countID: 0,
      send_code: 0
    }
  },
  computed: mapState({
    sys: state => state.sys,
    InvitationCode () {
      return this.$route.query.InvitationCode
    }
  }),
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
        params: {
          Email: this.formData.Email,
          SmsType: 1
        }
      }).then(res => {
        this.send_code = 30
        this.countdown()
        this.send_text = '重新发送'
        console.log(res)

        this.$notify({
          title: '验证码已发送',
          message: '如果未收到邮件，请查看你的垃圾箱',
          type: 'success'
        });

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
      this.$router.replace({ path: '/' });
    },

    // 提交表单
    handle_submit() {
      this.$refs['formData'].validate(valid => {
        if (!valid) return; // this.$message.error('提交失败!');

        // if (!this.formData.Email) return this.$message.error('请输入你的注册邮箱')
        // if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formData.Email)) return this.$message.error('邮箱格式不正确')
        
        // if (!this.formData.UserName) return this.$message.error('请输入昵称')
        // if (!this.formData.Code) return this.$message.error('请输入验证码')
        // if (!this.formData.Pwd) return this.$message.error('请输入密码')
        // if (!this.formData.Pwd2) return this.$message.error('请再次输入密码')
        if (this.formData.Pwd !== this.formData.Pwd2) return this.$message.error('两次密码不一致')

        // if (this.formData.Email && this.formData.UserName && this.formData.Code && this.formData.Pwd && this.formData.Pwd2) {
          this.$http.post('/User/EmailRegister', {
            Email: this.formData.Email,
            UserName: this.formData.UserName,
            Code: this.formData.Code,
            InvitationCode: this.InvitationCode,
            Pwd: this.formData.Pwd,
            Pwd2: this.formData.Pwd2
          }).then(res => {
            console.log(res)
            // this.$store.dispatch(USER_SIGNIN, res)
            this.$Message.success('注册成功!')
            this.handle_registered()
          }).catch(err => {
            this.$message.error(err.data.Message)
          });
        // }
      })
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.send_text = this.$t('send_captcha')
  }
}
</script>

<style lang="less">
// 注册
.register-page {
  background-color: #fff;
  width: 392px; height: 478px;
  padding: 30px 60px;
  // display: flex; flex-direction: column; align-items: center;

  .el-form-item__error { z-index: 99;}
  
  .brand { width: 100%; padding: 0; margin-bottom: 10px;}

  .tip { position: absolute; top: 50%; right: -25px; transform: translate3d(0, -50%, 0);}

  // .el-form-item { margin-bottom: 12px; }

  .sendSMS { border-radius: 0; width: 93px; height: 32px; padding: 0; margin: 1px 0; float: right;}

  .sign-content {
    width: 100%;
  }

  .sign-button {
    margin-bottom: 20px; width: 100%;
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