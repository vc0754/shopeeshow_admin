<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>返回</span>
    </div>

    <h3 class="section_title">任务详情</h3>

    <el-form ref="detail" :model="detail"  label-width="160px" class="border bg-white p-t-30 p-r-35 p-b-25 p-l-10 m-b-50" v-if="detail.Title">
      <div class="preview flex" style="padding-left:68px;">
        <div class="thumb">
          <img :src="`http://${detail.MainPic}`" alt="">
        </div>
        <div class="info">
          <h6 class="m-t-10 m-b-10">{{ detail.Title }}</h6>
          <div>
            <span>商品ID: {{ detail.ItemId }}</span>
            <span class="m-l-20">销量: {{ detail.SaleCount }}</span>
          </div>
        </div>
      </div>

      <el-form-item label="店铺:" style="margin: 0;">
        <span>{{ detail.ShopName }}</span>
      </el-form-item>

      <el-form-item label="站点：" style="margin: 0;">
        <span>{{ detail.CountryName }}</span>
      </el-form-item>

      <el-form-item label="币种：" style="margin: 0;">
        <div class="flex flex-y-center">
          <span>{{ currency }}</span>
          <img :src="flag" alt="" style="width:20px;height:20px;margin-left:6px;">
        </div>
      </el-form-item>

      <el-form-item label="付款方式：" style="margin: 0;">
        <div v-if="detail.PayMode === 1">下单付款<span class="orange">（需要在表格核对后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）</span></div>
        <div v-if="detail.PayMode === 2">货到付款<span class="orange">（需要在收货后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）</span></div>
      </el-form-item>

      <el-form-item label="发布任务数单数：" style="margin: 0;">
        <span>{{ detail.Detail.length }}</span>
      </el-form-item>
    </el-form>

    <!-- <pre>{{ form }}</pre> -->
    
    <ul class="color-tip">
      <li>预估</li>
      <li>实际</li>
    </ul>

    <div class="formTable m-b-20">
      <el-table stripe :data="detail.Detail" v-loading="loading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="55"></el-table-column>

        <el-table-column prop="SearchKey" label="关键词"></el-table-column>

        <el-table-column label="下单价格">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderPrice | fixed2 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="BuyCount" label="数量"></el-table-column>
        <el-table-column prop="Comment" label="评语"></el-table-column>
        <el-table-column prop="CommentPic" label="图片"></el-table-column>
        <el-table-column prop="Remark" label="特殊要求备注" min-width="180"></el-table-column>
        <el-table-column prop="Sp_NickName" label="买家昵称"></el-table-column>
        <el-table-column prop="SubOrderNo" label="下单单号" min-width="180"></el-table-column>
        <el-table-column prop="StateStr" label="订单状态"></el-table-column>
        <el-table-column prop="SurplusPayTime" label="剩余支付时间" min-width="130"></el-table-column>

        <el-table-column label="关注、收藏、加购金额" min-width="150">
          <template slot-scope="scope">
            <span>{{ (scope.row.FollowShop_Cost * 1 + scope.row.CollectGoods_Cost * 1 + scope.row.AddShoppingCart_Cost * 1) | fixed2 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="付款金额">
          <template slot-scope="scope">
            <div class="flex flex-column">
              <span class="red">{{ scope.row.Pub_OrderCost | fixed2 }}</span>
              <span>{{ scope.row.TotalCost | fixed2 }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="佣金">
          <template slot-scope="scope">
            <div class="flex flex-column">
              <span class="red">{{ scope.row.Pub_CommissionCost | fixed2 }}</span>
              <span>{{ scope.row.CommissionCost | fixed2 }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="formTable">
      <el-table stripe :data="[{}]" v-loading="loading" style="width: 100%;">
        <el-table-column label="合计">
          <div class="flex flex-column">
            <span>预估</span>
            <span>实际</span>
          </div>
        </el-table-column>

        <el-table-column label="关注、收藏、加购金额" min-width="150">
          {{ sub_total_1 | fixed2 }}
        </el-table-column>

        <el-table-column label="预估付款金额">
          <div class="flex flex-column">
            <span class="red">{{ sub_total_2 | fixed2 }}</span>
            <span>{{ sub_total_3 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column label="佣金">
          <div class="flex flex-column">
            <span class="red">{{ sub_total_4 | fixed2 }}</span>
            <span>{{ sub_total_5 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-y-center">
              <img :src="flag" alt="" style="width:16px;height:16px;margin-right:6px;">
              <span>合计金额（{{ currency }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-y-center">
              <img :src="flag_1" alt="" style="width:16px;height:16px;margin-right:6px;">
              <span>人民币（汇率：{{ ratio_1 }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all * ratio_1 | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 * ratio_1 | fixed2 }}</span>
          </div>
        </el-table-column>

        <el-table-column min-width="120">
          <template #header>
            <div class="flex flex-y-center">
              <img :src="flag_2" alt="" style="width:16px;height:16px;margin-right:6px;">
              <span>美元（汇率：{{ ratio_2 }}）</span>
            </div>
          </template>
          <div class="flex flex-column">
            <span class="red fs-14">{{ sub_total_all * ratio_2 | fixed2 }}</span>
            <span class="fs-14">{{ sub_total_all2 * ratio_2 | fixed2 }}</span>
          </div>
        </el-table-column>
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
        this.detail = res.Data
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
</style>