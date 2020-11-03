<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('publish_task') }}</h3>
    
    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex flex-wrap">
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

        <el-form-item :label="`${$t('task_status')}`" style="margin: 0;" class="m-l-15">
          <el-select v-model="form.status" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in statuses" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="`${$t('time')}:`" style="margin: 0;">
          <el-select v-model="form.times" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in select_times" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex p-l-20">
        <el-button type="primary" @click="onSearch">{{ $t('query') }}</el-button>
        <!-- <el-button type="primary" class="m-l-20">导出 Excel</el-button> -->
      </div>
    </el-form>

    <!-- <pre>{{ form }}</pre> -->

    <div class="add" @click="goto('/task/add')">
      <img alt="" src="../../assets/add.svg">
      <span class="m-l-10">{{ $t('publish_task') }}</span>
    </div>

    <div class="formTable">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`${item.label}（${item.number}）`" :name="`tab${item.value}`" v-for="(item, index) in statuses" :key="index"></el-tab-pane>
      </el-tabs>
      
      <el-table stripe :data="items" v-loading="loading" style="width: 100%;">
        <el-table-column :label="$t('task_number')" width="170">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderNo }}</span>
            <span>{{ scope.row.PayModeStr }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ShopName" :label="$t('store_name')" width="180"></el-table-column>

        <el-table-column prop="CountryId" :label="$t('site')" width="120">
          <template slot-scope="scope">
            <span>{{ countryShowName(scope.row.CountryId) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('registered_products')" min-width="380">
          <template slot-scope="scope">
            <div class="flex flex-y-center text-left p-l-15 p-r-15">
              <img :src="`http://${scope.row.MainPic}`" alt="" class="thumb" v-if="scope.row.MainPic !== 'null'" />
              <div class="flex flex-column lh-150">
                <span>Id: {{ scope.row.ItemId }}</span>
                <span>{{ scope.row.Title }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('submission_time')" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="width:70px;margin:0 auto;">{{ scope.row.CreateTime | date }}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('status')" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="color:#D43030;padding:0 15px;">{{ scope.row.StateStr }}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('task_completion_progress')" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="padding:0 15px;">
              <p class="m-b-10">{{ $t('completed') }}：{{ scope.row.SuccCount }}/{{ scope.row.TaskCount }}</p>
              <el-progress :percentage="scope.row.SuccCount/scope.row.TaskCount*100" :show-text="false"></el-progress>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('operation')" width="190">
          <template slot-scope="scope">
            <router-link :to="`/task/detail?id=${scope.row.OrderNo}`">{{ $t('mission_details') }}</router-link>
            <router-link :to="`/task/add?id=${scope.row.OrderNo}`" class="m-l-20">{{ $t('re_release') }}</router-link>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="flex flex-x-right p-t-30 p-b-30">
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
      
      <!-- <pre>{{ items }}</pre> -->
    </div>

  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      form: {
        OrderNo: '',
        name: '',
        country: '',
        status: 9999,
        times: 30
      },
      activeName: 'tab9999',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      items: [],
      loading: false,
      countries: [],
      sta: [
        { number: 0},
        { number: 0},
        { number: 0},
        { number: 0},
        { number: 0}
      ]
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
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
        { label: this.$t('all'), value: 9999, number: this.sta[0].number},
        { label: this.$t('to_be_reviewed'), value: 1, number: this.sta[1].number},
        { label: this.$t('have_in_hand'), value: 3, number: this.sta[2].number},
        { label: this.$t('rejected'), value: 2, number: this.sta[3].number},
        { label: this.$t('end_of_mission'), value: 4, number: this.sta[4].number}
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
    countryShowName(id) {
      let item = this.countries.find(item => item.Id === id)
      return item ? item.Name : id
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
        State: this.form.status === 9999 ? '' : this.form.status
      }
      // console.log(params)
      this.loading = true
      this.$http.get('/Task/Search', { params }).then(res => {
        // console.log(res)
        this.items = res.Data
        this.total = res.Total
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.data.Message)
      });
    },
    get_country() {
      this.$http.get('/Config/GetCountry').then(res => {
        res.Data.unshift({ Id: '', Name: this.$t('all') })
        this.countries = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    get_counts() {
      this.$http.get('/Task/Search_StateCount', {
        params: {
          StartTime: this.start_time,
          EndTime: this.end_time,
          CountryId: this.form.country,
          OrderNo:  this.form.OrderNo,
          Title: this.form.name,
        }
      }).then(res => {
        this.sta[0].number = res.Data.SumCount
        this.sta[1].number = res.Data.WaitVerifyCount
        this.sta[2].number = res.Data.TaskIngCount
        this.sta[3].number = res.Data.VerifyFailCount
        this.sta[4].number = res.Data.TaskEndCount
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    goto(path) {
      this.$router.push(path)
    },
    handleClick() {
      this.form.status = parseInt(this.activeName.substring(3))
      this.onSearch()
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
  mounted() {
    this.get_counts()
    this.get_country()
    this.onSearch()
  }
}
</script>

<style lang="less" scoped>
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
</style>