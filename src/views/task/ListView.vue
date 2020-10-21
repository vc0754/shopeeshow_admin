<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>返回</span>
    </div>

    <h3 class="section_title">发布任务</h3>
    
    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex flex-wrap">
        <el-form-item label="任务编号：" style="margin: 0;">
          <el-input v-model="form.OrderNo" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item label="站点：" style="margin: 0;">
          <el-select v-model="form.country" style="width:150px;">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in countries" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称：" style="margin: 0;" class="m-l-15">
          <el-input v-model="form.name" placeholder="模糊匹配" style="width:155px;"></el-input>
        </el-form-item>

        <el-form-item label="任务状态：" style="margin: 0;" class="m-l-15">
          <el-select v-model="form.status" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in statuses" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间：" style="margin: 0;">
          <el-select v-model="form.times" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in select_times" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex p-l-20">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" class="m-l-20">导出 Excel</el-button>
      </div>
    </el-form>

    <!-- <pre>{{ form }}</pre> -->

    <div class="add" @click="goto('/task/add')">
      <img alt="" src="../../assets/add.svg">
      <span class="m-l-10">发布任务</span>
    </div>

    <div class="formTable">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部（13）" name="tab1"></el-tab-pane>
        <el-tab-pane label="待审核（4）" name="tab2"></el-tab-pane>
        <el-tab-pane label="进行中（5）" name="tab3"></el-tab-pane>
        <el-tab-pane label="被驳回（1）" name="tab4"></el-tab-pane>
        <el-tab-pane label="任务结束（3）" name="tab5"></el-tab-pane>
      </el-tabs>
      
      <el-table stripe :data="items" v-loading="loading" style="width: 100%;">
        <el-table-column label="任务编号" width="170">
          <template slot-scope="scope">
            <span>{{ scope.row.OrderNo }}</span>
            <span>{{ scope.row.PayModeStr }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ShopName" label="店铺名" width="180"></el-table-column>

        <el-table-column prop="CountryId" label="站点" width="120">
          <template slot-scope="scope">
            <span>{{ countryShowName(scope.row.CountryId) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="报名商品" min-width="380">
          <template slot-scope="scope">
            <div class="flex flex-y-center text-left p-l-15 p-r-15">
              <img :src="`http://${scope.row.MainPic}`" alt="" class="thumb" />
              <div class="flex flex-column lh-150">
                <span>Id: {{ scope.row.ItemId }}</span>
                <span>{{ scope.row.Title }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="提交时间" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="width:70px;margin:0 auto;">{{ scope.row.CreateTime | date }}</div>
          </template>
        </el-table-column>

        <el-table-column label="状态" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="color:#D43030;padding:0 15px;">{{ scope.row.StateStr }}</div>
          </template>
        </el-table-column>

        <el-table-column label="任务完成进度" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="padding:0 15px;">
              <p class="m-b-10">已完成：{{ scope.row.SuccCount }}/{{ scope.row.TaskCount }}</p>
              <el-progress :percentage="scope.row.SuccCount/scope.row.TaskCount*100" :show-text="false"></el-progress>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <router-link :to="`/task/detail?id=${scope.row.OrderNo}`">任务详情</router-link>
            <router-link to="/task/detail" class="m-l-20">再次发布</router-link>
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
        status: '',
        times: 30
      },
      activeName: 'tab1',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      items: [],
      loading: false,
      select_times: [
        { label: '近30日', value: 30 },
        { label: '近90日', value: 90 }
      ],
      countries: [],
      statuses: [
        { label: '全部', value: ''},
        { label: '待审核', value: 1},
        { label: '进行中', value: 2},
        { label: '被驳回', value: 3},
        { label: '任务结束', value: 4}
      ]
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
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
        State: this.form.status
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
        res.Data.unshift({ Id: '', Name: '全部' })
        this.countries = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    goto(path) {
      this.$router.push(path)
    },
    handleClick() {
      if (this.activeName === 'tab1') this.form.status =  ''
      if (this.activeName === 'tab2') this.form.status =  1
      if (this.activeName === 'tab3') this.form.status =  2
      if (this.activeName === 'tab4') this.form.status =  3
      if (this.activeName === 'tab5') this.form.status =  4
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