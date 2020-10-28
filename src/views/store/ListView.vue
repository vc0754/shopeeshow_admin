<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>
    
    <h3 class="section_title">{{ $t('store_management') }}</h3>

    <div class="add" @click="dialogVisible = true">
      <img alt="" src="../../assets/add.svg">
      <span class="m-l-10">{{ $t('binding_stores') }}</span>
    </div>

    <h3 class="section_title">{{ $t('bound_store') }}</h3>
    
    <el-row :gutter="46" class="row01" style="margin-right: 20px;">
      <el-col :md="8" :lg="6" v-for="(item, index) in items" :key="index">
        <div class="block_wrap">
          <div class="flex flex-column flex-x-center" style="height:74px;">
            <span class="store_name">{{ $t('shop_name') }} : {{ item.ShopName }}</span>
            <span>{{ $t('site') }} : {{ show_country(item.Country) }}</span>
            <!-- <span>汇率 : 0.456</span> -->
          </div>
          <img alt="" src="../../assets/close.svg" class="close" @click="close(item.ShopId)">
        </div>
      </el-col>
    </el-row>

    <!-- <pre>{{ items }}</pre> -->
    
    <el-dialog :title="$t('binding_stores')" width="607px" :visible.sync="dialogVisible" class="store-form">
      <el-form ref="formStore" :model="formStore">
        <el-form-item :label="$t('please_enter_the_store_link_in_the_box_below')" style="margin-bottom:15px;">
          <el-input v-model="formStore.url" placeholder="http://" style="width:430px;" />
            
          <el-button type="primary" v-if="send_code">{{ send_code }}{{ $t('after_second_expire') }}</el-button>
          <el-button :type="send_text === $t('send_again') ? 'info' : 'primary'" @click="sendCode" v-else>{{ send_text }}</el-button>
        </el-form-item>

        <el-form-item :label="$t('please_input_the_verification_code_received_by_customer_service_in_the_following_box')">
          <el-input v-model="formStore.captcha" placeholder="" style="width:430px;" />
          <el-button type="primary" @click="submit">{{ $t('confirm') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <el-dialog width="596px" :visible.sync="dialogVisible2" class="store-success-tip">
      <img src="../../assets/big_right_icon.svg" alt="">
      <h3>{{ $t('congratulations_successful_binding') }}</h3>
      <p>{{ $t('you_can_view_it_later_on_the_store_management_page') }}</p>
      <router-link to="/task/add" class="btn">{{ $t('publish_tasks_now') }}</router-link>
    </el-dialog>
  </section>
</template>


<script>
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      countries: [],    // 国家
      items: [],
      formStore: {
        url: '',
        captcha: ''
      },
      dialogVisible: false,
      dialogVisible2: false,
      send_text: '',
      countID: 0,
      send_code: 0
    }
  },
  computed: {
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    countdown() {
      this.countID = setInterval(() => {
        --this.send_code
        if (this.send_code === 0) clearInterval(this.countID)
      }, 1000);
    },
    get_country() {
      this.$http.get('/Config/GetCountry').then(res => {
        this.countries = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    show_country(id) {
      let item = this.countries.find(item => item.Id === id)
      return item.Name
    },

    // 发送验证码
    sendCode() {
      if (!this.formStore.url) return this.$message.error(this.$t('please_enter_the_store_link'))
      this.$http.get('/UserShop/SendShopCode', {
        params: {
          ShopUrl: this.formStore.url
        }
      }).then(res => {
        this.send_code = 30
        this.countdown()
        this.send_text = this.$t('send_again')
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },

    // 绑定
    submit() {
      if (!this.formStore.url) return this.$message.error(this.$t('please_enter_the_store_link'))
      if (!this.formStore.captcha) return this.$message.error(this.$t('please_enter_the_verification_code'))

      this.$http.post('/UserShop/Bind', {
        ShopUrl: this.formStore.url,
        Code: this.formStore.captcha
      }).then(() => {
        this.dialogVisible2 = true

        this.dialogVisible = false
        this.formStore = {
          url: '',
          captcha: ''
        }
        this.query()
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
    this.send_text = this.$t('send_captcha')
    this.get_country()
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

.store_name {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 绑定店铺
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
  .el-button--primary,
  .el-button--info {
    width: 93px; height: 32px;
    padding: 0; border-radius: 0;
    margin-left: 20px;
  }
}

// 绑定成功提示
.store-success-tip {
  .el-dialog__header { display: none; }
  .el-dialog__body {
    padding: 40px;
    display: flex; flex-direction: column; align-items: center;
  }
  h3 {
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    margin: 15px 0;
  }
  p {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999;
    margin: 10px 0 40px;
  }
  .btn {
    color: #fff; background-color: rgba(70, 161, 255, 1);
    width: 165px; height: 42px; line-height: 42px;
    border-radius: 20px;
    text-align: center;
  }
}
</style>