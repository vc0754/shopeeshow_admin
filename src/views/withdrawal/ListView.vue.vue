<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div>
        <el-form-item label="" style="margin: 0;">
          <el-select v-model="form.region" style="width:105px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
          <el-input v-model="form.input" placeholder="请输入内容" style="width:260px;"></el-input>
        </el-form-item>
      </div>
      <el-button type="primary" round>搜索</el-button>
    </el-form>

    <div class="formTable bg-white" style="padding: 30px 60px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部（10）" name="tab1">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="用户昵称" width="150"></el-table-column>
            <el-table-column prop="name" label="手机号" width="140"></el-table-column>
            <el-table-column prop="address" label="支付宝账号" width="150"></el-table-column>
            <el-table-column prop="address" label="姓名" width="130"></el-table-column>
            <el-table-column prop="address" label="提现金额" width="140"></el-table-column>
            <el-table-column prop="address" label="提现类型" width="150"></el-table-column>
            <el-table-column prop="address" label="支付宝交易号" width="165"></el-table-column>
            <el-table-column prop="address" label="提现状态" width="90"></el-table-column>
            <el-table-column prop="address" label="申请提现时间" width="140"></el-table-column>
            <el-table-column prop="address" label="处理时间" width="140"></el-table-column>
            <el-table-column label="操作">
              <span @click="modify">修改支付宝交易号</span>
              <span @click="payment">打款</span>
              <span @click="reject">驳回</span>
              <router-link to="/withdrawal/detail">提现记录</router-link>
            </el-table-column>
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
          
        </el-tab-pane>
        <el-tab-pane label="提现成功（2）" name="tab3">
          
        </el-tab-pane>
        <el-tab-pane label="驳回（3）" name="tab4">
          
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="打款修改支付宝交易号" :visible.sync="dialogVisibleModify" width="460px" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleModify = false" round>取 消</el-button>
        <el-button type="primary" @click="dialogVisibleModify = false" round>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="驳回" :visible.sync="dialogVisibleReject" width="460px" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleReject = false" round>取 消</el-button>
        <el-button type="primary" @click="dialogVisibleReject = false" round>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="打款" :visible.sync="dialogVisiblePayment" width="460px" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePayment = false" round>取 消</el-button>
        <el-button type="primary" @click="dialogVisiblePayment = false" round>确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'UserListView',
  components: {},
  data () {
    return {
      dialogVisibleModify: false,
      dialogVisibleReject: false,
      dialogVisiblePayment: false,
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
    modify() {
      this.dialogVisibleModify = true
    },
    reject() {
      this.dialogVisibleReject = true
    },
    payment() {
      this.dialogVisiblePayment = true
    },
    handleClose() {
      // done
      // this.$confirm('确认关闭？').then(_ => {
      //   done();
      // }).catch(_ => {});
    },
    query() {
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