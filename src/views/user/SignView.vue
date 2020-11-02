<template>
  <div class="login-wrapper">
    <div class="login-container">

      <div class="sign-page">
        <div class="brand">
          <img alt="" :src="sys.logo">
        </div>

        <el-form class="sign-content" ref="formPSW" :model="formPSW" :rules="rules">
          <el-form-item prop="UserName">
            <el-input v-model="formPSW.UserName" :placeholder="$t('sign.account')" />
          </el-form-item>

          <el-form-item prop="Pwd">
            <el-input type="password" v-model="formPSW.Pwd" :placeholder="$t('sign.pwd')" :maxlength="20" />
          </el-form-item>
          
          <el-form-item style="margin-bottom: 5px;" prop="captcha">
            <el-input v-model="formPSW.captcha" :placeholder="$t('sign.captcha')" :maxlength="6" style="width:165px;" />
            <s-identify :identifyCode="identifyCode" :contentWidth="contentWidth" :contentHeight="contentHeight" class="captcha" @click.native="refreshCode"></s-identify>
          </el-form-item>
          
          <el-form-item>
            <el-checkbox v-model="formPSW.checked">
              <span class="fs-12">{{ $t('sign.forgot') }}</span>
            </el-checkbox>
          </el-form-item>
        </el-form>

        <div class="sign-button">
          <el-button type="primary" round :loading="loading" @click="handleSubmit('formPSW')">{{ $t('sign.label') }}</el-button>
        </div>
        
        <div class="sign-meta">
          <router-link to="/lost-password" class="fg">{{ $t('sign.forgot') }}</router-link>
          <div>{{ $t('sign.no_account') }}
            <router-link to="/register" class="m-l-10">{{ $t('register.label') }}</router-link>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_SIGNIN } from '@/store/modules/user'
import SIdentify  from '@/components/sidentify'
export default {
  name: 'SignView',
  components: {
    SIdentify
  },
  data () {
    return {
      contentWidth: 100,
      contentHeight: 34,
      identifyCodes: '23456890',
      identifyCode: '',
      formPSW: {
        // UserName: '',
        // Pwd: '',
        UserName: '980436963@qq.com',
        Pwd: '123',
        captcha: '',
        checked: false
      },
      rules: {
        UserName: [
          { required: true, message: '邮箱必须', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'change' }
        ],
        Pwd: [
          { required: true, message: '密码必须', trigger: 'blur' },
          // { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/, message: '长度8-20位，必须包含大小写英文字母，数字', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码必须', trigger: 'blur' },
        ]
      },
      loading: false
    }
  },
  computed: mapState({ sys: state => state.sys }),
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
    // ?UserName=${this.formPSW.UserName}&Pwd=${this.formPSW.Pwd}
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) return; // this.$message.error('提交失败!');
        if (this.formPSW.captcha !== this.identifyCode) return this.$message.error('验证码不匹配!');
        this.$http.post(`/User/Login`, this.formPSW).then(res => {
          sessionStorage.setItem('token', res.Data.JwtToken)
          this.$store.dispatch(USER_SIGNIN, {
            username: res.Data.UserName,
            email: res.Data.Email,
            created: res.Data.CreateTime
          })
          this.$router.replace({ path: '/' })
        }).catch(err => {
          this.$message.error(err.data.Message)
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
  // display: flex; flex-direction: column; align-items: center;
  
  .brand {
    width: 100%; margin-bottom: 24px;
  }
  
  .sign-content {
    width: 100%;
  }

  .sign-button {
    margin-bottom: 22px; width: 100%;
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

  .captcha {
    position: absolute; top: 0px; right: 0px;
  }
}
</style>
