<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('mission_details') }}</h3>

    <el-form ref="detail" :model="detail"  label-width="160px" class="border bg-white p-t-30 p-r-35 p-b-25 p-l-10 m-b-50" v-if="detail.Title">
      <div class="preview flex" style="padding-left:68px;">
        <div class="thumb">
          <img :src="`http://${detail.MainPic}`" alt="" v-if="detail.MainPic">
        </div>
        <div class="info">
          <h6 class="m-t-10 m-b-10">{{ detail.Title }}</h6>
          <div>
            <span>{{ $t('commodity_ID') }}: {{ detail.ItemId }}</span>
            <span class="m-l-20">{{ $t('sales_volume') }}: {{ detail.SaleCount }}</span>
          </div>
        </div>
      </div>

      <el-form-item :label="`${$t('shop')}:`" style="margin: 0;">
        <span>{{ detail.ShopName }}</span>
      </el-form-item>

      <el-form-item :label="`${$t('site')}:`" style="margin: 0;">
        <span>{{ detail.CountryName }}</span>
      </el-form-item>

      <el-form-item :label="`${$t('currency')}:`" style="margin: 0;">
        <div class="flex flex-y-center">
          <span>{{ currency }}</span>
          <img :src="flag" alt="" style="width:20px;height:20px;margin-left:6px;" v-if="flag">
        </div>
      </el-form-item>

      <el-form-item :label="`${$t('pay_it_method')}:`" style="margin: 0;">
        <div v-if="detail.PayMode === 1">{{ $t('order_payment') }}<span class="orange">（{{ $t('tip6') }}）</span></div>
        <div v-if="detail.PayMode === 2">{{ $t('cash_on_delivery') }}<span class="orange">（{{ $t('tip7') }}）</span></div>
      </el-form-item>

      <el-form-item :label="`${$t('odd_number_of_published_tasks')}:`" style="margin: 0;">
        <span>{{ detail.Detail.length }}</span>
      </el-form-item>
    </el-form>

    <!-- <pre>{{ form }}</pre> -->
    
    <ul class="color-tip">
      <li>{{ $t('estimate') }}</li>
      <li>{{ $t('actual') }}</li>
    </ul>

    <div class="formTable m-b-20">
      <el-table stripe :data="detail.Detail" v-loading="loading" style="width: 100%;">
        <el-table-column type="index" :label="$t('serial_number')" width="55"></el-table-column>

        <el-table-column prop="SearchKey" :label="$t('keyword')" min-width="80"></el-table-column>

        <el-table-column :label="$t('order_price')" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderPrice | fixed2 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="BuyCount" :label="$t('number')" width="75"></el-table-column>

        <el-table-column prop="Comment" :label="$t('comment')" min-width="280"></el-table-column>

        <el-table-column :label="$t('picture')" width="92">
          <template slot-scope="scope">
            <div class="thumbs" v-for="(item, index) in scope.row.CommentPic" :key="index">
              <img :src="`http://${item}`" alt="">
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="Remark" :label="$t('special_requirements')" min-width="100"></el-table-column>
        <el-table-column prop="Spec" :label="$t('special_model')" min-width="160"></el-table-column>
        <el-table-column prop="Sp_NickName" :label="$t('buyer_nickname')" width="80"></el-table-column>
        <el-table-column prop="Sp_OrderNo" :label="$t('order_number')" min-width="180"></el-table-column>
        <el-table-column prop="StateStr" :label="$t('order_status')" min-width="80"></el-table-column>
        <el-table-column prop="SurplusPayTime" :label="$t('remaining_payment_time')" min-width="120"></el-table-column>

        <el-table-column :label="$t('pay_attention_to_and_collect_additional_purchase_amount')" min-width="150">
          <template slot-scope="scope">
            <span>{{ (scope.row.FollowShop_Cost * 1 + scope.row.CollectGoods_Cost * 1 + scope.row.AddShoppingCart_Cost * 1) | fixed2 }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('payment_amount')" min-width="95">
          <template slot-scope="scope">
            <div class="flex flex-column">
              <span class="red">{{ scope.row.Pub_OrderCost | fixed2 }}</span>
              <span>{{ scope.row.TotalCost | fixed2 }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('commission')" min-width="65">
          <template slot-scope="scope">
            <div class="flex flex-column">
              <span class="red">{{ scope.row.Pub_CommissionCost | fixed2 }}</span>
              <span>{{ scope.row.CommissionCost | fixed2 }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 加购 -->
    <div class="formTable m-b-20" v-if="AddplusForm.add">
      <el-table stripe :data="[{}]" style="width: 100%">
        <el-table-column label="加购商品信息（以下为每条订单的加购商品信息）" width="440">
          <div class="flex flex-y-center">
            <img :src="`http://${AddplusForm.img}`" alt="" style="width:47px;height:47px;" v-if="AddplusForm.img">
            <div class="p-l-15 text-left">{{ AddplusForm.url }}</div>
          </div>
        </el-table-column>

        <el-table-column :label="$t('title')" min-width="260px">
          <span>{{ AddplusForm.title }}</span>
        </el-table-column>

        <el-table-column :label="$t('number')" width="80px">
          <span>{{ AddplusForm.amount }}</span>
        </el-table-column>

        <el-table-column :label="$t('amount_of_money')" width="150px">
          <span>{{ AddplusForm.price | fixed2 }}</span>
        </el-table-column>

        <el-table-column></el-table-column>
      </el-table>
    </div>
    
    <!-- 合计 -->
    <div class="formTable">
      <el-table stripe :data="[{}]" v-loading="loading" style="width: 100%;">
        <el-table-column :label="$t('total')">
          <div class="flex flex-column">
            <span>{{ $t('estimate') }}</span>
            <span>{{ $t('actual') }}</span>
          </div>
        </el-table-column>

        <el-table-column :label="$t('pay_attention_to_and_collect_additional_purchase_amount')" min-width="150">
          {{ sub_total_1 | fixed2 }}
        </el-table-column>

        <el-table-column :label="$t('estimated_payment_amount')">
          <div class="flex flex-column">
            <span class="red">{{ sub_total_2 | fixed2 }}</span>
            <span>{{ sub_total_3 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column :label="$t('commission')">
          <div class="flex flex-column">
            <span class="red">{{ sub_total_4 | fixed2 }}</span>
            <span>{{ sub_total_5 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-x-center flex-y-center">
              <img :src="flag" alt="" style="width:16px;height:16px;margin-right:6px;" v-if="flag">
              <span>{{ $t('total_amount') }}（{{ currency }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-x-center flex-y-center">
              <img :src="flag_1" alt="" style="width:16px;height:16px;margin-right:6px;" v-if="flag_1">
              <span>{{ $t('rmb') }}（{{ $t('exchange_rate') }}：{{ ratio_1 }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all * ratio_1 | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 * ratio_1 | fixed2 }}</span>
          </div>
        </el-table-column>

        <!-- <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-y-center">
              <img :src="flag_2" alt="" style="width:16px;height:16px;margin-right:6px;">
              <span>{{ $t('usd') }}（{{ $t('exchange_rate') }}：{{ ratio_2 }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all * ratio_2 | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 * ratio_2 | fixed2 }}</span>
          </div>
        </el-table-column> -->
      </el-table>
    </div>

      
    <!-- <pre>{{ detail }}</pre> -->
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      detail: {},
      ratios: [],       // 汇率

      AddplusForm: {                // 加购商品信息
        add: false,
        url: '',
        title: '',
        img: '',
        amount: 0,
        price: 0
      },

      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      currencies: []
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    },
    fixed2(str) {
      if (!str) return '-'
      return str.toFixed(2)
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    flag() {
      let item = this.currencies.find(item => item.Id === this.detail.CountryId)
      return item && item.Flag || ''
    },
    currency() {
      let item = this.currencies.find(item => item.Id === this.detail.CurrencyId)
      return item && item.Name || ''
    },
    ratio_1() {
      let item = this.ratios.find(item => item.To === 9 && item.Transfer === this.detail.CountryId)
      return item && item.Rate || 0
    },
    ratio_2() {
      let item = this.ratios.find(item => item.To === 10 && item.Transfer === this.detail.CountryId)
      return item && item.Rate || 0
    },
    flag_1() {
      let item = this.currencies.find(item => item.Name === 'CNY')
      return item && item.Flag || ''
    },
    flag_2() {
      let item = this.currencies.find(item => item.Name === 'USD')
      return item && item.Flag || ''
    },
    sub_total_1() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += (item.FollowShop_Cost * 1 + item.CollectGoods_Cost * 1 + item.AddShoppingCart_Cost * 1)
      })
      return total
    },
    sub_total_2() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.Pub_OrderCost * 1
      })
      return total
    },
    sub_total_3() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.TotalCost * 1
      })
      return total
    },
    sub_total_4() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.Pub_CommissionCost * 1
      })
      return total
    },
    sub_total_5() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.CommissionCost * 1
      })
      return total
    },
    sub_total_all() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.Pub_TotalCost * 1
      })
      return total
    },
    sub_total_all2() {
      let total = 0
      this.detail.Detail && this.detail.Detail.map(item => {
        total += item.TotalCost * 1
      })
      return total
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    countryShowName(id) {
      let item = this.countries.find(item => item.Id === id)
      return item ? item.Name : id
    },
    query () {
      this.loading = true
      this.$http.get('/Task/Detail', {
        params: {
          OrderNo: this.id
        }
      }).then(res => {
        res.Data.Detail.map(item => {
          item.CommentPic = item.CommentPic ? JSON.parse(item.CommentPic) : []
          return item
        })
        // res.Data.CommentPic = JSON.parse(res.Data.CommentPic)

        this.detail = res.Data

        this.AddplusForm.add = res.Data.AddedGoods.Url ? true : false
        this.AddplusForm.url = res.Data.AddedGoods.Url
        this.AddplusForm.title = res.Data.AddedGoods.Title
        this.AddplusForm.img = res.Data.AddedGoods.MainPic
        this.AddplusForm.amount = res.Data.AddedGoods.BuyCount
        this.AddplusForm.price = res.Data.AddedGoods.OrderPrice

        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.data.Message)
      });
    },
    get_ratio() {
      this.$http.get('/Config/GetExchangeRate').then(res => {
        this.ratios = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    get_currency() {
      this.$http.get('/Config/GetCurrency').then(res => {
        this.currencies = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    goto(path) {
      this.$router.push(path)
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.query()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.query()
    }
  },
  watch: {
  },
  mounted() {
    this.get_currency()
    this.get_ratio()
    this.query()
  }
}
</script>

<style lang="less" scoped>
.thumb {
  background-color: #ccc;
  width: 48px; height: 48px;
  margin-right: 8px;
  flex-shrink: 0;
}

.color-tip {
  float: right; font-size: 12px;
  display: flex; align-items: center; top: -20px; right: 20px;
  position: relative;
  li {
    display: flex; align-items: center; margin-left: 20px;
    &::before {
      content: '';
      width: 9px; height: 9px; display: block; margin-right: 6px;
      border-radius: 50%;
    }
    &:first-child::before { background-color: #C00017;}
    &:last-child::before { background-color: #777;}
  }
}

// 预览
.preview {
  display: flex; margin-bottom: 10px;
  .thumb {
    background-color: #ccc;
    width: 80px; height: 80px; margin-right: 15px;
    flex-shrink: 0;
  }
  .info {
    flex-grow: 1;
  }
}

.orange { color: #FF5500;}
.red { color: #C00017;}

.thumbs {
  display: flex;
  img { width: 36px; height: 36px; margin: 2px;}
}
</style>