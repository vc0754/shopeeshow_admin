<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
        <el-breadcrumb-item>提现记录</el-breadcrumb-item>
      </el-breadcrumb>
      <span>返回</span>
    </div>

    <div class="formTable bg-white" style="padding: 30px 60px;">
      <h2>嘻街用户002（13656434586）的提现记录</h2>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部（10）" name="tab1">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用户名" width="252"></el-table-column>
            <el-table-column prop="name" label="提现类型" width="220"></el-table-column>
            <el-table-column prop="address" label="提现金额" width="220"></el-table-column>
            <el-table-column prop="address" label="支付宝交易订单号" width="240"></el-table-column>
            <el-table-column prop="address" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="address" label="处理时间" width="200"></el-table-column>
            <el-table-column prop="address" label="提现状态" width="180"></el-table-column>
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

        <el-tab-pane label="审核中（5）" name="tab2">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用户名" width="252"></el-table-column>
            <el-table-column prop="name" label="提现类型" width="220"></el-table-column>
            <el-table-column prop="address" label="提现金额" width="220"></el-table-column>
            <el-table-column prop="address" label="支付宝交易订单号" width="240"></el-table-column>
            <el-table-column prop="address" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="address" label="处理时间" width="200"></el-table-column>
            <el-table-column prop="address" label="提现状态" width="180"></el-table-column>
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
        
        <el-tab-pane label="提现成功（2）" name="tab3">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用户名" width="252"></el-table-column>
            <el-table-column prop="name" label="提现类型" width="220"></el-table-column>
            <el-table-column prop="address" label="提现金额" width="220"></el-table-column>
            <el-table-column prop="address" label="支付宝交易订单号" width="240"></el-table-column>
            <el-table-column prop="address" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="address" label="处理时间" width="200"></el-table-column>
            <el-table-column prop="address" label="提现状态" width="180"></el-table-column>
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
        
        <el-tab-pane label="驳回（3）" name="tab4">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用户名" width="252"></el-table-column>
            <el-table-column prop="name" label="提现类型" width="220"></el-table-column>
            <el-table-column prop="address" label="提现金额" width="220"></el-table-column>
            <el-table-column prop="address" label="支付宝交易订单号" width="240"></el-table-column>
            <el-table-column prop="address" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="address" label="处理时间" width="200"></el-table-column>
            <el-table-column prop="address" label="提现状态" width="180"></el-table-column>
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
      </el-tabs>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserDetailView',
  components: {},
  data () {
    return {
      form: {
        input: '',
        region: '',
      },
      date: '',
      activeName: 'tab1',
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
  mounted () {
    // this.query()
  }
}
</script>