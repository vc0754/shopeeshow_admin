<template>
  <section class="wrap">
    <h3 class="section_title">结算中心</h3>

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

        <el-form-item label="时间：" style="margin: 0;">
          <el-select v-model="form.region" style="width:155px;">
            <el-option label="用户昵称" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" round>查询</el-button>
    </el-form>

    <div class="add">
      <img alt="" src="../assets/money.svg">
      <span class="m-l-10">立即打款</span>
    </div>

    <div class="formTable">
      
      <el-table stripe
        :data="tableData" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="address" label="">
          <span>任务编号：SSA4545487323565</span><br/>
          <span>提交时间：2020-09-23 18:12:33</span>
        </el-table-column>

        <el-table-column prop="address" label="">
          <p>店铺名：虾皮SHOWxxx店</p>
          <p>站点：台湾站</p>
        </el-table-column>

        <el-table-column prop="address" label="">
          <p>ID：56487878</p>
          <p>迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008</p>
        </el-table-column>

        <el-table-column prop="progress" label="">
          <p>已完成：5/10</p>
          <el-progress :percentage="50" :show-text="false"></el-progress>
        </el-table-column>

        <el-table-column label="">
          <p>待支付：1000.00</p>
          <p>已支付：1200.00</p>
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
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        children: [{
          id: 11,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 12,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        children: [{
          id: 21,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 22,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        children: [{
          id: 41,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 42,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }]
    }
  },
  computed: {
  },
  methods: {
    handleSelectionChange() {},
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