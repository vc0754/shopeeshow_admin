<template>
  <section class="wrap">
    <h3 class="section_title">发布任务</h3>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex">
        <el-form-item label="任务编号：" style="margin: 0;">
          <el-input v-model="form.input" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item label="站点：" style="margin: 0;">
          <el-select v-model="form.region" style="width:150px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称：" style="margin: 0;" class="m-l-15">
          <el-input v-model="form.input" placeholder="模糊匹配" style="width:155px;"></el-input>
        </el-form-item>

        <el-form-item label="任务状态：" style="margin: 0;" class="m-l-15">
          <el-select v-model="form.region" style="width:155px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间：" style="margin: 0;">
          <el-select v-model="form.region" style="width:155px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex p-l-20">
        <el-button type="primary">查询</el-button>
        <el-button type="primary" class="m-l-20">导出 Excel</el-button>
      </div>
    </el-form>

    <div class="add" @click="goto('/task/add')">
      <img alt="" src="../../assets/add.svg">
      <span class="m-l-10">发布任务</span>
    </div>

    <div class="formTable">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部（13）" name="tab1">
          <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="任务编号" width="163"></el-table-column>
            <el-table-column prop="store" label="店铺名" width="176"></el-table-column>
            <el-table-column prop="site" label="站点"></el-table-column>
            <el-table-column prop="address" label="报名商品" width="380"></el-table-column>
            <el-table-column prop="date" label="提交时间"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="progress" label="任务完成进度"></el-table-column>
            <el-table-column label="操作" width="190">
              <router-link to="/user/detail">任务详情</router-link>
              <router-link to="/user/detail" class="m-l-20">再次发布</router-link>
            </el-table-column>
          </el-table>
          
          <div class="flex flex-x-right p-t-30 p-b-30">
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
        <el-tab-pane label="待审核（4）" name="tab2">
          
        </el-tab-pane>
        <el-tab-pane label="进行中（5）" name="tab3">
          
        </el-tab-pane>
        <el-tab-pane label="被驳回（1）" name="tab4">
          
        </el-tab-pane>
        <el-tab-pane label="任务结束（3）" name="tab5">
          
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
      activeName: 'tab1',
      currentPage: 5,
      tableData: [
        {
          id: '43420024420024',
          date: '2016-05-02',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-04',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-01',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-03',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        },{
          id: '43420024420024',
          date: '2016-05-02',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-04',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: 'Id：545022457447\n迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-01',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }, {
          id: '43420024420024',
          date: '2016-05-03',
          name: '王小虎',
          store: '墨香天下图书专营店',
          site: '泰国站',
          address: '迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008',
          status: '待审核',
          progress: 5
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    query () {
      this.$http.get('/Task/Search', {
        PageIndex: 1,
        PageSize: 1,
        StartTime: '',
        EndTime: '',
        CountryId: '',
        OrderNo: '',
        Title: '',
        State: 1
      }).then(res => {
        console.log(res)
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    goto(path) {
      this.$router.push(path)
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
.add {
  background-color: #fff; color: rgb(70, 161, 255); border: solid 1px rgb(215, 215, 215);
  font-size: 14px;
  height: 60px;
  margin-bottom: 28px;;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
}
</style>