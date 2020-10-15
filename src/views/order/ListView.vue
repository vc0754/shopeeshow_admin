<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>拼多多订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form ref="form" :model="form" label-width="85px" class="formDaterange bg-white flex flex-x-between flex-y-bottom">
      <div class="flex-grow">
        <div class="flex">
          <el-form-item label="订单编号：">
            <el-input v-model="form.input" placeholder="请输入订单编号" style="width:260px;"></el-input>
          </el-form-item>
          
          <el-form-item label="商品标题：" class="m-l-20">
            <el-input v-model="form.input" placeholder="请输入商品标题" style="width:260px;"></el-input>
          </el-form-item>
          
          <el-form-item label="下单用户：" class="m-l-20">
            <el-select v-model="form.region" style="width:105px;">
              <el-option label="用户昵称" value="shanghai"></el-option>
            </el-select>
            <el-input v-model="form.input" placeholder="请输入内容" style="width:260px;"></el-input>
          </el-form-item>
        </div>

        <el-row>
          <el-col :span="12">
            <el-form-item label="付款时间：" style="margin: 0;">
              <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </div>
      <el-button type="primary" round>搜索</el-button>
    </el-form>

    <div class="formTable bg-white" style="padding: 30px 60px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有订单（10）" name="tab1">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="订单号" width="180"></el-table-column>
            <el-table-column prop="name" label="商品标题" width="260"></el-table-column>
            <el-table-column prop="address" label="付款金额" width="120"></el-table-column>
            <el-table-column prop="address" label="税后佣金" width="120"></el-table-column>
            <el-table-column prop="address" label="佣金比例" width="120"></el-table-column>
            <el-table-column prop="address" label="自购佣金" width="120"></el-table-column>
            <el-table-column prop="address" label="自购用户" width="150"></el-table-column>
            <el-table-column prop="address" label="订单状态" width="116"></el-table-column>
            <el-table-column prop="address" label="付款时间" width="170"></el-table-column>
            <el-table-column prop="address" label="结算时间"></el-table-column>
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
        <el-tab-pane label="已付款（5）" name="tab2">
          
        </el-tab-pane>
        <el-tab-pane label="已结算（2）" name="tab3">
          
        </el-tab-pane>
        <el-tab-pane label="已失效（2）" name="tab4">
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OrderListView',
  components: {},
  data () {
    return {
      form: {
        name: '',
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
    this.query()
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
