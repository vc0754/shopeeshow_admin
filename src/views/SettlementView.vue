<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('settlement_center') }}</h3>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex">
        <el-form-item :label="`${$t('task_number')}:`" style="margin: 0;">
          <el-input v-model="form.OrderNo" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item :label="`${$t('site')}:`" style="margin: 0;">
          <el-select v-model="form.country" style="width:150px;">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in countries" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="`${$t('trade_name')}:`" style="margin: 0;" class="m-l-15">
          <el-input v-model="form.name" :placeholder="$t('fuzzy_matching')" style="width:155px;"></el-input>
        </el-form-item>

        <el-form-item :label="`${$t('time')}:`" style="margin: 0;">
          <el-select v-model="form.times" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in select_times" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" @click="onSearch">{{ $t('query') }}</el-button>
      <!-- <el-button type="primary" @click="onReset">重置</el-button> -->
    </el-form>

    <div class="add" @click="payit">
      <img alt="" src="../assets/money.svg">
      <span class="m-l-10">{{ $t('pay_immediately') }}</span>
    </div>

    <div class="formTable">
      <!-- <el-checkbox :indeterminate="a" v-model="b">全选</el-checkbox> -->

      <el-table stripe :data="items" v-loading="loading" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @expand-change="expand_change">
        <el-table-column type="selection" :selectable="checkbox_select" width="55"></el-table-column>
        
        <el-table-column type="expand" width="35">
          <template slot-scope="props">
            
            <el-table stripe border :data="props.row.Detail" style="width: 100%" :ref="`multipleTable2_${props.row.Id}`" @selection-change="handleSelectionChange2">
              <el-table-column type="selection" :selectable="checkbox_select" width="55"></el-table-column>

              <el-table-column type="index" :label="$t('serial_number')" width="80"></el-table-column>

              <el-table-column :label="$t('order_number')" min-width="190">
                <template slot-scope="scope">
                  <span>{{ scope.row.SubOrderNo }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('order_status')" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.StateStr }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('buyer_nickname')" min-width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.Sp_NickName }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('payment_amount')" min-width="150">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_OrderCost | fixed2 }}</span>
                    <span>{{ scope.row.OrderCost | fixed2 }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column :label="$t('commission')" min-width="150">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_CommissionCost | fixed2 }}</span>
                    <span>{{ scope.row.CommissionCost | fixed2 }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column :label="$t('total')" min-width="150">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_TotalCost | fixed2 }}</span>
                    <span>{{ scope.row.TotalCost | fixed2 }}</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="230">
          <template slot-scope="scope">
            <div class="text-left">
              <div>{{ $t('task_number') }}：<span class="gray">{{ scope.row.OrderNo }}</span></div>
              <div>{{ $t('submission_time') }}：<span class="gray">{{ scope.row.CreateTime | date }}</span></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="170">
          <template slot-scope="scope">
            <div>{{ $t('store_name') }}：<span class="gray">{{ scope.row.ShopUserName }}</span></div>
            <div>{{ $t('site') }}：<span class="gray">{{ countryShowName(scope.row.CountryId) }}</span></div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="350">
          <template slot-scope="scope">
            <div class="flex flex-y-center text-left p-l-15 p-r-15">
              <img :src="scope.row.MainPic" alt="" class="thumb" />
              <div class="flex flex-column lh-150">
                <span class="gray">Id: {{ scope.row.ItemId }}</span>
                <span>{{ scope.row.Title }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="100">
          <template slot-scope="scope">
            <div class="lh-120" style="padding:0 15px;">
              <p class="m-b-10">{{ $t('completed') }}：{{ scope.row.SuccCount }}/{{ scope.row.TaskCount }}</p>
              <el-progress :percentage="scope.row.SuccCount/scope.row.TaskCount*100" :show-text="false"></el-progress>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="120">
          <template slot-scope="scope">
            <p>{{ $t('to_be_paid') }}：{{ scope.row.WaitPayCost | fixed2 }}</p>
            <p>{{ $t('paid') }}：{{ scope.row.PaySuccCost | fixed2 }}</p>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="flex flex-x-right p-t-40 p-b-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- <pre>{{ multipleSelection }}</pre> -->
      <!-- <pre>{{ multipleSelection2 }}</pre> -->
      <!-- <pre>{{ payment_country }}</pre> -->
      <!-- <pre>{{ selected_orders_sn }}</pre> -->
      <!-- <pre>{{ selected_orders_country }}</pre> -->
      <!-- <pre>{{ selected_orders_currency }}</pre> -->
      <!-- <pre>{{ selected_orders_total }}</pre> -->
    
      <el-dialog :title="`${$t('paying')}...`" width="944px" :visible.sync="dialogVisible" @closed="dialogClosed" class="payment-form">
        <div class="col-left">
          <h3>{{ $t('please_choose_a_payment_method') }}：</h3>
          <ul class="payment_channels">
            <li v-for="(item, index) in payment_channels" :key="index" @click="payment_channel_selected(item.Id)" :class="item.selected ? 'current' : ''">
              <img :src="item.Logo" :alt="item.Name">
            </li>
          </ul>
          <div class="payment_wrap" v-html="payment_content"></div>
        </div>
        <div class="col-right">
          <el-form ref="formPayment" :model="formPayment" label-width="130px">
            <!-- <el-form-item label="支付时间：" style="margin-bottom: 0px;">
              <span>123</span>
            </el-form-item>

            <el-form-item label="支付流水号：" style="margin-bottom: 35px;">
              <span>ABC</span>
            </el-form-item> -->

            <el-form-item :label="`${$t('payment_amount')}：`" style="margin-bottom: 0px;">
              <strong>{{ selected_orders_total | fixed2 }}</strong>
            </el-form-item>

            <el-form-item :label="`${$t('exchange_rate')}：`" style="margin-bottom: 35px;">
              <span>{{ selected_orders_to_payment_ratio }}</span>
            </el-form-item>

            <el-form-item :label="`${$t('payment_after_exchange')}：`" style="margin-bottom: 40px;">
              <strong class="blue">{{ payment_total | fixed2 }}</strong>
            </el-form-item>

            <el-form-item :label="`${$t('payment_order_number')}：`">
              <el-input v-model="formPayment.sn" />
            </el-form-item>

            <div class="flex flex-column flex-y-center">
              <el-button type="primary" @click="payment_submit" class="payment_submit">{{ $t('payment_completed') }}</el-button>
              <div class="tip">{{ $t('tip5') }}</div>
            </div>
          </el-form>

          <div class="col-ex">
            <div class="row">
              <span><img :src="selected_orders_currency.Flag" alt="" class="flag"></span>
              <span>({{ selected_orders_currency.Name }})</span>
            </div>
            <img src="../assets/ex.png" alt="" class="icon">
            <div class="row">
              <span><img :src="payment_currency.Flag" alt="" class="flag"></span>
              <span>({{ payment_currency.Name }})</span>
            </div>
          </div>
        </div>
        
      </el-dialog>
      
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'UserListView',
  components: {},
  data () {
    return {
      a: true,
      b: true,
      countries: [],        // 国家
      currencies: [],       // 货币
      ratios: [],           // 汇率

      multipleSelection: [],
      multipleSelection2: [],
      // sub_orders_parent_order: [],      // 选中的子订单对应的父订单
      sub_orders_parent_order_CountryId: 0,    // 选中的子订单对应的父订单的国家的ID

      payment_channels: [],
      form: {
        OrderNo: '',
        name: '',
        country: '',
        times: 30
      },
      formPayment: {
        sn: ''
      },
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      items: [],
      loading: false
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    },
    fixed2(str) {
      if (!str) return '-'
      return (str * 1).toFixed(4)
    }
  },
  computed: {
    select_times() {
      return [
        { label: this.$t('nearly_30_days'), value: 30 },
        { label: this.$t('nearly_90_days'), value: 90 }
      ]
    },
    start_time() {
      if (this.form.times === 30) {
        return moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00');
      } else if (this.form.times === 90) {
        return moment().subtract(90, 'days').format('YYYY-MM-DD 00:00:00');
      } else {
        return moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00');
      }
    },
    end_time() {
      return moment().format('YYYY-MM-DD 23:59:59');
    },
    
    payment_channel_id() {
      let item = this.payment_channels.find(item => item.selected)
      return item ? item.Id : ''
    },
    payment_content() {
      let item = this.payment_channels.find(item => item.selected)
      return item ? item.Content : ''
    },
    payment_currency_id() {
      let item = this.payment_channels.find(item => item.selected)
      return item ? item.CurrencyId : ''
    },
    payment_currency() {
      let item = this.currencies.find(item => item.Id === this.payment_currency_id)
      return item ? item : ''
    },
    payment_country() {
      let item = this.countries.find(item => item.CurrencyId === this.payment_currency.Id)
      return item ? item : ''
    },
    payment_total() {
      return this.selected_orders_total * this.selected_orders_to_payment_ratio
    },

    // 选中的子订单号
    selected_orders_sn() {
      return this.multipleSelection2.map(item => item.SubOrderNo)
    },
    // 选中的子订单总计金额
    selected_orders_total() {
      let total = 0
      this.multipleSelection2.map(item => {
        // total += item.Pub_TotalCost
        total += item.TotalCost
      })
      return total
    },
    // 选中的子订单对应的国家
    selected_orders_country() {
      let item = this.items.find(item => {
        return item.Detail.find(item2 => {
          return this.selected_orders_sn.includes(item2.SubOrderNo)
        })
      })
      let country_id = item && item.CountryId || 0
      return this.countries.find(item => item.Id === country_id) || {}
    },
    // 选中的子订单对应的货币
    selected_orders_currency() {
      let item  = this.currencies.find(item => item.Id === this.selected_orders_country.CurrencyId)
      return item || {}
    },
    // 选中的子订单与支付方式对应的汇率
    selected_orders_to_payment_ratio() {
      let item = this.ratios.find(item => item.Transfer === this.selected_orders_currency.Id && item.To === this.payment_currency.Id)
      return item && item.Rate || 0
    }
  },
  methods: {
    // 获取国家
    get_countries() {
      this.$http.get('/Config/GetCountry').then(res => {
        res.Data.unshift({ Id: '', Name: this.$t('all') })
        this.countries = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    // 获取货币
    get_currencies() {
      this.$http.get('/Config/GetCurrency').then(res => {
        this.currencies = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    // 获取汇率
    get_ratios() {
      this.$http.get('/Config/GetExchangeRate').then(res => {
        this.ratios = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
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
    // 支付提交
    payment_submit() {
      // if (!this.formPayment.sn) return this.$message.error('支付订单号必须')

      this.$http.post('/SettlementCenter/Pay', {
        PaymentModeId: this.payment_channel_id,
        PayCost: (this.payment_total * 1).toFixed(4) * 1,
        PayOrderNo: this.formPayment.sn,
        TaskSubOrderNo: this.selected_orders_sn
      }).then(res => {
        console.log('xxxxxx')
        console.log(res)

        this.dialogVisible = false
        this.onSearch()
        this.formPayment.sn = ''

        this.$message.success(res.data.Message)
      }).catch(err => {
        this.$message.error(err.data.Message)
      })
    },
    // 检查行状态，返回用于 table checkbox 是否禁用
    checkbox_select(row){
      return row.State === 3 || row.State === 5 || row.State === 6 ? 1 : 0
    },

    expand_change(row, expandedRows, expanded) {
      console.log(row, expandedRows, expanded)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
      
      if (val.length) {
        val.map(item => {
          let childrens = item.Detail.filter(item2 => item2.State === 3 || item2.State === 5 || item2.State === 6)
          if (childrens.length) {
            if (this.$refs[`multipleTable2_${item.Id}`]) {
              childrens.forEach(row => {
                if (!this.multipleSelection2.includes(row)) {
                  this.$refs[`multipleTable2_${item.Id}`].toggleRowSelection(row)
                }
              })
            } else {
              this.multipleSelection2 = childrens
            }
            // console.log(`multipleTable2_${item.Id}`)
          }
        })
      } else {
        this.items.map(item => {
          if (this.$refs[`multipleTable2_${item.Id}`]) {
            this.$refs[`multipleTable2_${item.Id}`].clearSelection()
          } else {
            this.multipleSelection2 = []
          }
        })
      }
    },
    
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
      
      // console.log(val)
      // let parents = this.items.filter(item => {
      //   return item.Detail.find(item2 => {
      //     return this.selected_orders_sn.includes(item2.SubOrderNo)
      //   })
      // })
      // if (parents.length) {
      //   parents.forEach(row => {
      //     if (!this.multipleSelection.includes(row)) {
      //       this.$refs.multipleTable.toggleRowSelection(row)
      //     }
      //   })
      // } else {
      //   this.$refs.multipleTable.clearSelection()
      // }
      
      // // 父级
      // let selected_orders_sn = val.map(item => item.SubOrderNo)
      // let item = this.items.find(item => {
      //   return item.Detail.find(item2 => {
      //     return selected_orders_sn.includes(item2.SubOrderNo)
      //   })
      // })
      // // this.sub_orders_parent_order = item || []
      // this.sub_orders_parent_order_CountryId = item && item.CountryId || 0
    },
    
    onReset() {
      this.$http.get('/SettlementCenter/ResetData').then(res => {
        console.log(res)
      })
    },
    goback() {
      this.$router.go(-1)
    },
    payit() {
      if (!this.selected_orders_sn.length) return this.$message.error(this.$t('please_select_the_order_to_pay_first'))
      this.dialogVisible = true
    },
    countryShowName(id) {
      let item = this.countries.find(item => item.Id === id)
      return item ? item.Name : id
    },

    // 关闭
    dialogClosed() {
      this.formPayment.sn = ''
    },

    onSearch () {
      let params = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        StartTime: this.start_time,
        EndTime: this.end_time,
        CountryId: this.form.country,
        OrderNo: this.form.OrderNo,
        Title: this.form.name,
        State: 1
      }
      // console.log(params)
      this.loading = true
      this.$http.get('/SettlementCenter/Search', { params }).then(res => {
        // console.log(res)
        this.items = res.Data
        this.total = res.Total
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.data.Message)
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSearch()
    }
  },
  mounted () {
    this.get_countries()
    this.get_currencies()
    this.get_ratios()
    this.get_payments()
    this.onSearch()
  }
}
</script>

<style lang="less">
.payment-form {
  .payment_channels {
    padding: 25px 0;
    display: flex; justify-content: flex-start;
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
    overflow: hidden;
  }
  .el-form-item__content { line-height: 32px;}
  .el-button--primary { width: 126px; height: 32px;}
  .tip { font-size: 12px; margin-top: 10px; color: #a6a6a6;}
}

.col-ex {
  position: absolute; top: 20px; right: 30px;
  .row {
    font-size: 12px;
    display: flex; flex-direction: column; justify-content: center;
    img { margin: 0 auto 5px;}
    span { text-align: center;}
  }
  .icon { padding: 15px 8px;}
}

.add {
  background-color: #fff; color: rgb(70, 161, 255); border: solid 1px rgb(215, 215, 215);
  font-size: 14px;
  height: 60px;
  margin-bottom: 28px;;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
}
.thumb {
  background-color: #ccc;
  width: 48px; height: 48px;
  margin-right: 8px;
  flex-shrink: 0;
}
.gray { color: #aaa;}
.red { color: #C00017;}

.payment-form {
  .el-dialog__header {
    background-color: rgba(234, 243, 253, 1);
    border-bottom: solid 1px rgba(215, 215, 215, 1);
    font-size: 16px; height: 59px; line-height: 59px;
    text-align: center; padding: 0;
  }
  .el-dialog__body {
    display: flex;
    padding: 0;
    .col-left {
      width: 613px; height: 445px;
      padding: 20px;
    }
    .col-right {
      flex-grow: 1;
      border-left: dashed 1px #d7d7d7;
      padding: 20px;
      position: relative;
    }
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

.blue { color: #46a1ff;}
</style>