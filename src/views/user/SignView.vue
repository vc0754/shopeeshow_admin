<template>
  <div class="login-wrapper" :style="{ backgroundImage: `url(${require('../../assets/bg.png')})`}">
    <div class="login-container">

      <div class="sign-page" :style="{ backgroundImage: `url(${require('../../assets/login.png')})`}">
        <h1>登录 Login</h1>
        <el-form class="sign-content" ref="formPSW" :model="formPSW" :rules="formValidatePSW">
          <el-form-item prop="username">
            <el-input v-model="formPSW.username" placeholder="账户" />
          </el-form-item>

          <el-form-item prop="pwd">
            <el-input type="password" v-model="formPSW.pwd" placeholder="密码" :maxlength="6" />
          </el-form-item>
          
          <el-form-item prop="captcha">
            <el-input v-model="formPSW.captcha" placeholder="验证码" :maxlength="6" />
            <s-identify :identifyCode="identifyCode" class="captcha"></s-identify>
          </el-form-item>
        </el-form>

        <div class="sign-button">
          <el-button type="primary" round :loading="loading" @click="handleSubmit('formPSW')">登录</el-button>
        </div>
        
        <div class="sign-meta">
          <div>
            <router-link to="/lost-password">忘记密码？</router-link>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '@/store/modules/user'
import SIdentify  from '@/components/sidentify'
export default {
  name: 'SignView',
  components: {
    SIdentify
  },
  data () {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      formPSW: {
        username: '18800000111',
        pwd: '123456',
        captcha: ''
      },
      formValidatePSW: {
        username: [
          { required: true, message: '账号必须', trigger: 'blur' },
          // { type: 'string', min: 4, message: '账号长度最少4位', trigger: 'blur' },
          // { pattern: /^[a-zA-Z0-9_.]*$/, message: '只允许英文字母，数字和下划线(_)和点符号(.)', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码必须', trigger: 'blur' },
          // { type: 'string', min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码必须', trigger: 'blur' },
        ]
      },
      loading: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([USER_SIGNIN]),
    
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },

    // 提交表单
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) return; // this.$message.error('提交失败!');
        if (this.formPSW.captcha !== this.identifyCode) return this.$message.error('验证码不匹配!');
        this.$http.post(`/api/Home/Login?username=${this.formPSW.username}&pwd=${this.formPSW.pwd}`, this.formPSW).then(res => {
          sessionStorage.setItem('token', res.data.webToKen)
          this.$store.dispatch(USER_SIGNIN, res.data)
          this.$router.replace({ path: '/' })
        }).catch(err => {
          this.$message.error(err.data.message)
        })
      })
    },
  },
  created() {
    this.refreshCode()
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  background-color: #222; background-position: center center; background-repeat: no-repeat; background-size: cover;
  width: 100%; height: 100%;
  position: absolute;
}
.login-container {
  position: absolute; left: 50%; top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.sign-page {
  background-color: #fff; background-repeat: no-repeat;
  width: 850px; height: 530px;
  border-radius: 8px;
  box-shadow: 0px 8px 30px 0px rgba(173, 43, 81, 0.44);
  padding: 40px 40px 40px 490px;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  
  h1 {
    font-size: 16px;
    font-family: 'MicrosoftYaHei';
    color: rgba(0, 0, 0, 0.85);
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.85);
    margin-bottom: 56px;
    align-self: flex-start;
  }

  .sign-content {
    width: 100%;
    margin-bottom: 58px;
  }

  .sign-button {
    width: 100%; margin-bottom: 28px;
    button {
      background: #EC4B4B;
      box-shadow: 0px 5px 10px 0px rgba(254, 91, 91, 0.46);
      width: 100%;
      border-color: #EC4B4B;
    }
  }

  .sign-meta {
    font-size: 12px;
    a {
      color: #EC4B4B;
    }
  }

  .captcha {
    position: absolute; top: 4px; right: 8px;
  }
}
</style>
