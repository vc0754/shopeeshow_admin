<template>
  <section class="wrap">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>普通用户</el-breadcrumb-item>
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
            <el-table-column prop="date" label="用户名" width="150"></el-table-column>
            <el-table-column prop="name" label="授权账号" width="150"></el-table-column>
            <el-table-column prop="address" label="APP邀请码"></el-table-column>
            <el-table-column prop="address" label="手机号码"></el-table-column>
            <el-table-column prop="address" label="等级"></el-table-column>
            <el-table-column prop="address" label="推荐人"></el-table-column>
            <el-table-column prop="address" label="账户余额"></el-table-column>
            <el-table-column prop="address" label="注册时间"></el-table-column>
            <el-table-column prop="address" label="状态"></el-table-column>
            <el-table-column label="操作">
              <router-link to="/user/detail">明细</router-link>
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
        <el-tab-pane label="第一等级（5）" name="tab2">
          
        </el-tab-pane>
        <el-tab-pane label="第二等级（2）" name="tab3">
          
        </el-tab-pane>
        <el-tab-pane label="第三等级（2）" name="tab4">
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserListView',
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