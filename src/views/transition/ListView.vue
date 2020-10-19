<template>
  <section class="wrap">
    <h3 class="section_title">支付流水</h3>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex">
        <el-form-item label="支付编号：" style="margin: 0;">
          <el-input v-model="form.input" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item label="支付订单号：" style="margin: 0;">
          <el-input v-model="form.input" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item label="支付时间：" style="margin: 0;">
          <el-select v-model="form.region" style="width:155px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="支付状态：" style="margin: 0;" class="m-l-15">
          <el-select v-model="form.region" style="width:155px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <div class="m-l-15">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
    </el-form>

    <div class="formTable">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" width="78"></el-table-column>
        <el-table-column prop="date" label="支付时间" width="230"></el-table-column>
        <el-table-column prop="date" label="支付编号" width="220"></el-table-column>
        <el-table-column prop="name" label="支付金额" width="200"></el-table-column>
        <el-table-column prop="address" label="支付订单号" width="220"></el-table-column>
        <el-table-column prop="address" label="支付方式" width="120"></el-table-column>
        <el-table-column prop="address" label="订单状态" width="116"></el-table-column>
        <el-table-column prop="address" label="驳回原因"></el-table-column>
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
      }, {
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
      this.$http.get('/SettlementCenter/SearchPayBill').then(res => {
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
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
