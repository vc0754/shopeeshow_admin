<template>
  <div id="app" class="fixed-header">
    <AdminMenu />
    <div class="container">
      <AdminHeader />
      <main class="wrapper">
        <div class="content">
          <router-view />
        </div>
      </main>
    </div>
    
    <el-dialog :title="`${$t('recharge')}`" width="534px" :visible="dialogVisible" :show-close="false" @closed="dialogClosed" class="recharge-form">
      <p>{{ $t('recharge_tip') }}</p>
      
      <ul class="payment_channels">
        <li v-for="(item, index) in payment_channels" :key="index" @click="payment_channel_selected(item.Id)" :class="item.selected ? 'current' : ''">
          <img :src="item.Logo" :alt="item.Name">
        </li>
      </ul>
      <div class="payment_wrap" v-html="payment_content"></div>
      
      <el-form ref="formRecharge" :model="formRecharge" label-width="130px">
        <el-form-item :label="`${$t('recharge_amount')}：`" style="margin-bottom: 0px;">
          <el-input v-model="formRecharge.amount" />
        </el-form-item>

        <el-form-item :label="`${$t('recharge_sn')}：`" style="margin-bottom: 20px;">
          <el-input v-model="formRecharge.sn" />
        </el-form-item>

        <div class="flex flex-x-right flex-y-center">
          <el-button type="primary" @click="recharge_submit_pending" class="recharge_button">{{ $t('recharge_submit_pending') }}</el-button>
          <el-button type="primary" @click="recharge_cancel" class="recharge_button">{{ $t('recharge_cancel') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AdminMenu from '@/views/ui/AdminMenu'
import AdminHeader from '@/views/ui/AdminHeader'
export default {
  name: 'app',
  components: {
    AdminMenu, AdminHeader
  },
  data () {
    return {
      // dialogVisible: true,
      formRecharge: {
        amount: '',
        sn: ''
      },
      payment_channels: [],
    }
  },
  computed: {
    dialogVisible() {
      return this.$store.state.recharge
    },
    payment_content() {
      let item = this.payment_channels.find(item => item.selected)
      return item ? item.Content : ''
    },
    PayChannelId() {
      let item = this.payment_channels.find(item => item.selected)
      return item ? item.Id : 0
    }
  },
  methods: {
    // 关闭充值对话框
    dialogClosed() {
      this.formRecharge.amount = ''
      this.formRecharge.sn = ''
    },

    // 提交审核
    recharge_submit_pending() {
      if (!this.formRecharge.amount || !this.formRecharge.sn || !this.PayChannelId) return this.$message.error('请填写完善再提交')
      this.$http.post('/SettlementCenter/Recharge', {
        PaymentModeId: this.PayChannelId,
        PayCost: this.formRecharge.amount * 1,
        PayOrderNo: this.formRecharge.sn
      }).then(res => {
        console.log(res)
        // this.$message.success('已提交')
        this.recharge_cancel()
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    },

    // 放弃充值
    recharge_cancel() {
      this.$store.dispatch('recharge', false)
      // this.dialogVisible = false
      this.dialogClosed()
    },
    // 获取支付方式
    get_payments() {
      this.$http.get('/SettlementCenter/GetPaymentMode').then(res => {
        let index = 0
        this.payment_channels = res.Data.map(item => {
          item.selected = index === 0 ? true : false
          ++index
          return item
        })
      })
    },
    // 选择支付方式
    payment_channel_selected(id) {
      this.payment_channels.map(item => {
        item.selected = item.Id === id ? true : false
      })
    },
  },
  mounted () {
    this.get_payments()
  }
}
</script>

<style lang="less">
.quickmenus {
  background-color: #fff;
  position: fixed; right: 3px; bottom: 180px; z-index: 999;
  ul {
    border: solid 1px rgba(234, 234, 234, 1);
    li {
      width: 46px; height: 42px;
      border-bottom: solid 1px rgba(234, 234, 234, 1);
      display: flex; justify-content: center; align-items: center;
      cursor: pointer;
      &:first-child { background-color: rgba(70, 161, 255, 1);}
      &:last-child { border-bottom: none;}
    }
  }
}
.recharge-form {
  .el-dialog__header {
    background-color: rgba(234, 243, 253, 1);
    border-bottom: solid 1px rgba(215, 215, 215, 1);
    font-size: 16px; height: 59px; line-height: 59px;
    text-align: center; padding: 0;
  }
  .el-dialog__body {
    .payment_channels {
      padding: 15px 0;
      display: flex; justify-content: center;
      li {
        width: 127px; height: 55px;
        border-radius: 10px; margin: 0 6px;
        border: solid 1px #d7d7d7;
        display: flex; justify-content: center; align-items: center;
        position: relative; cursor: pointer;
        &.current {
          &::after {
            content: ''; background: url('../assets/payment_current.png') no-repeat;
            display: block; width: 67px; height: 43px;
            position: absolute; bottom: 0; right: 0;
          }
        }
      }
    }
    .payment_wrap {
      background-color: #fcfcfc;
      width: 100%; height: 280px;
      overflow: hidden; margin-bottom: 25px;
      img { margin: 0 auto;}
    }
    .el-form-item { padding: 0 60px;}
  }

  .el-form-item__label {
    line-height: 32px;
  }
  .el-input {
    line-height: 32px;
  }
  .el-input__inner {
    height: 32px; line-height: 32px; border-radius: 0; padding: 0 8px;
  }
  .el-button--primary {
    width: 126px; height: 32px;
    padding: 0; border-radius: 0;
  }
}
</style>