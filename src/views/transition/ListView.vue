<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('payment_flow') }}</h3>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex flex-wrap">
        <el-form-item :label="$t('payment_number')" style="margin: 0;">
          <el-input v-model="form.OrderNo" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item :label="$t('payment_order_number')" style="margin: 0;">
          <el-input v-model="form.PayOrderNo" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item :label="$t('payment_time')" style="margin: 0;">
          <el-select v-model="form.times" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in select_times" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('payment_status')" style="margin: 0;" class="m-l-15">
          <el-select v-model="form.status" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in statuses" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <div class="m-l-15">
          <el-button type="primary" @click="onSearch">{{ $t('query') }}</el-button>
        </div>
      </div>
    </el-form>
    
    <div class="formTable">
      <el-table stripe :data="items" v-loading="loading" style="width: 100%">
        <el-table-column type="index" :label="$t('serial_number')" width="78"></el-table-column>

        <el-table-column :label="$t('payment_time')" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.CreateTime | date }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="OrderNo" :label="$t('payment_number')" min-width="180"></el-table-column>

        <el-table-column :label="$t('payment_amount2')" min-width="200">
          <template slot-scope="scope">
            <div class="flex flex-x-center">
              <span>{{ scope.row.PayCost | fixed2 }}</span>
              <span>（{{ scope.row.PayCurrencyName }}）</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="PayOrderNo" :label="$t('payment_order_number')" min-width="220"></el-table-column>
        <el-table-column prop="PaymentModeName" :label="$t('payment_method')" min-width="120"></el-table-column>
        <el-table-column prop="State" :label="$t('payment_status')" min-width="116">
          <template slot-scope="scope">
            <span class="gray">{{ scope.row.StateStr }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="RejectReason" :label="$t('reasons_for_rejection')"></el-table-column>
      </el-table>
      
      <div class="flex flex-x-right p-t-40 p-b-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- <pre>{{ items }}</pre> -->
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'OrderListView',
  components: {},
  data () {
    return {
      form: {
        OrderNo: '',
        PayOrderNo: '',
        status: '',
        times: 30
      },
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
      return str.toFixed(4)
    }
  },
  computed: {
    select_times() {
      return [
        { label: this.$t('nearly_30_days'), value: 30 },
        { label: this.$t('nearly_90_days'), value: 90 }
      ]
    },
    statuses() {
      return [
        { label: this.$t('all'), value: ''},
        { label: this.$t('success'), value: 1},
        { label: this.$t('rejected'), value: 2},
        { label: this.$t('to_be_reviewed'), value: 3}
      ]
    },
    start_time() {
      if (this.form.times === 30) {
        return moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
      } else if (this.form.times === 90) {
        return moment().subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
      } else {
        return moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
      }
    },
    end_time() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    stateShowName(id) {
      let item = this.statuses.find(item => item.value === id)
      return item ? item.label : id
    },
    onSearch () {
      let params = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        StartTime: this.start_time,
        EndTime: this.end_time,
        OrderNo: this.form.OrderNo,
        PayOrderNo: this.form.PayOrderNo,
        State: this.form.status
      }
      // console.log(params)
      this.loading = true
      this.$http.get('/SettlementCenter/SearchPayBill', { params }).then(res => {
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
  watch: {
  },
  mounted () {
    this.onSearch()
  },
  beforeCreate () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
.container-fluid {
  padding-top: 30px;
}

.breadcrumb {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  display: flex; align-items: center;
}
</style>
