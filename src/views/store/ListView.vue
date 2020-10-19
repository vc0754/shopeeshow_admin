<template>
  <section class="wrap">
    <h3 class="section_title">店铺管理</h3>

    <div class="add" @click="dialogVisible = true">
      <img alt="" src="../../assets/add.svg">
      <span class="m-l-10">绑定店铺</span>
    </div>

    <h3 class="section_title">已绑定店铺</h3>
    
    <el-row :gutter="46" class="row01" style="margin-right: 20px;">
      <el-col :md="8" :lg="6" v-for="(item, index) in items" :key="index">
        <div class="block_wrap">
          <div class="flex flex-column">
            <span>店名 : {{ item.ShopName }}</span>
            <span>站点 : {{ item.Location }}</span>
            <!-- <span>汇率 : 0.456</span> -->
          </div>
          <img alt="" src="../../assets/close.svg" class="close" @click="close(item.ShopId)">
        </div>
      </el-col>
    </el-row>

    <!-- <pre>{{ items }}</pre> -->
    
    <el-dialog title="绑定店铺" width="607px" :visible.sync="dialogVisible" class="store-form">
      <el-form ref="formStore" :model="formStore">
        <el-form-item label="请在下框输入店铺链接" style="margin-bottom:15px;">
          <el-input v-model="formStore.url" placeholder="http://" style="width:430px;" />
            
          <el-button type="primary" v-if="send_code">{{ send_code }}秒后过期</el-button>
          <el-button :type="send_text === '重新发送' ? 'info' : 'primary'" @click="sendCode" v-else>{{ send_text }}</el-button>
        </el-form-item>

        <el-form-item label="请在下框输入聊聊客服收到的验证码">
          <el-input v-model="formStore.captcha" placeholder="" style="width:430px;" />
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>


<script>
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      items: [],
      formStore: {
        url: '',
        captcha: ''
      },
      dialogVisible: false,
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
      if (!this.formStore.url) return this.$message.error('请输入店铺链接')
      this.$http.get('/UserShop/SendShopCode', {
        ShopUrl: this.formStore.url
      }).then(res => {
        this.send_code = 30
        this.countdown()
        this.send_text = '重新发送'
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },

    // 绑定
    submit() {
      if (!this.formStore.url) return this.$message.error('请输入店铺链接')
      if (!this.formStore.captcha) return this.$message.error('请输入验证码')

      this.$http.post('/UserShop/Bind', {
        ShopUrl: this.formStore.url,
        Code: this.formStore.captcha
      }).then(res => {
        console.log(res)
        this.dialogVisible = false
        this.formStore = {
          url: '',
          captcha: ''
        }
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
    
    // 查询列表
    query () {
      this.$http.get('/UserShop/GetList').then(res => {
        this.items = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
    // 接触绑定
    close(id) {
      this.$http.post('/UserShop/UnBind', {
        UserShopId: id
      }).then(res => {
        console.log(res)
        // this.query()
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    }
  },
  watch: {
  },
  mounted () {
    this.query()
  },
  beforeCreate () {
  },
  beforeDestroy() {
  }
}
</script>

<style lang="less">
.add {
  background-color: #fff; color: rgb(70, 161, 255);
  font-size: 14px;
  height: 60px;
  border: solid 1px rgb(215, 215, 215);
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
}

.store-form {
  .el-dialog__header {
    background-color: rgba(243, 246, 249, 1);
    border-bottom: solid 1px rgba(215, 215, 215, 1);
    font-size: 16px; height: 59px; line-height: 59px;
    text-align: center; padding: 0;
  }
  .el-dialog__body { padding: 32px;}

  .el-form-item__label {
    line-height: 32px;
  }
  .el-input {
    line-height: 32px;
  }
  .el-input__inner {
    height: 32px; line-height: 32px; border-radius: 0;
  }
  .el-button--primary {
    width: 93px; height: 32px;
    padding: 0; border-radius: 0;
    margin-left: 20px;
  }
}
</style>