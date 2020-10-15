<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据账单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form ref="form" :model="form" label-width="55px" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div>
        <el-form-item label="时间：" style="margin: 0;">
          <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" style="width:307px;">
          </el-date-picker>
        </el-form-item>
      </div>
      <el-button type="primary" round>搜索</el-button>
    </el-form>

    <div class="formTable bg-white" style="padding: 30px 60px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="淘宝" name="first">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="总成交额" width="180"></el-table-column>
            <el-table-column prop="name" label="总佣金" width="180"></el-table-column>
            <el-table-column prop="address" label="团队获得佣金"></el-table-column>
            <el-table-column prop="address" label="获得利润"></el-table-column>
            <el-table-column prop="address" label="结算订单数"></el-table-column>
            <el-table-column prop="address" label="日期"></el-table-column>
          </el-table>
          
          <div class="flex flex-x-right p-t-40 p-b-10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>

        </el-tab-pane>
        <el-tab-pane label="拼多多" name="second">
          
        </el-tab-pane>
        <el-tab-pane label="东京" name="third">
          
        </el-tab-pane>
      </el-tabs>
    </div>


    <!-- <el-page-header @back="goBack" content="详情页面"></el-page-header> -->
  </section>
</template>

<script>
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      form: {
        name: '',
      },
      date: '',
      activeName: 'first',
      currentPage: 5,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
  },
  methods: {
    query () {
      this.$http.post('/api/Home/GetTotalStatistics').then(res => {
        console.log(res)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  watch: {
  },
  mounted() {
    this.query()
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
