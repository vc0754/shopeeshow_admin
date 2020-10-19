<template>
  <section class="wrap">
    <h3 class="section_title">发布任务</h3>

    <div class="desc">
      <h3>任务说明</h3>
      <p>任务流程：用户搜索打标关键词 - 指定竞品多天打标操作 - 搜索下单</p>
      <p>如何打标：搜索长尾词 - 指定竞品收藏、加购，多天反复操作，确保标签深度</p>
      <p>核心功能：多天操作，路径随机性更强，标签用户购买，权重提升更快，快速打开搜索入口</p>
    </div>

    <el-form ref="form" :model="form" class="formAddTask" label-width="130px">
      <h4>第一步：选择店铺</h4>

      <el-form-item label="选择店铺：">
        <el-select v-model="form.region" style="width:320px;">
          <el-option label="用户昵称" value="shanghai"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="站点：">
        <el-input v-model="form.input" placeholder="" style="width:76px;"></el-input>
      </el-form-item>

      <el-form-item label="本地币种：">
        <el-input v-model="form.input" placeholder="" style="width:76px;"></el-input>
      </el-form-item>

      <h4 class="m-t-35">第二步：输入链接、自动显示</h4>

      <el-form-item label="宝贝链接：">
        <el-input v-model="form.input" placeholder=""></el-input>
        <div class="preview flex">
          <div class="thumb">
            <img src="" alt="">
          </div>
          <div class="info">
            <h6>产品名</h6>
            <div>
              <span>商品ID: 789464465416546</span>
              <span class="m-l-20">销量: 16542</span>
            </div>
          </div>
        </div>
      </el-form-item>

      <h4 class="m-t-35">第三步：支付方式</h4>

      <el-form-item label="付款方式：">
        <el-radio-group v-model="form.resource">
          <el-radio label="下单付款（需要在表格核对后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）"></el-radio>
          <el-radio label="货到付款（需要在收货后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="发布任务数单数：" class="formNextOptWrap">
        <el-input v-model="form.input" placeholder="" style="width:58px;"></el-input>

        <div class="formNextOpt">
          <el-button type="primary">下一步</el-button>
          <span>取消</span>
        </div>
      </el-form-item>
    </el-form>

    <div class="formBatch">
      <h5>批量设置（在下方栏中选择内容进行批量填充）</h5>
      <div class="flex flex-y-center">
        <el-select v-model="form.region" style="width:90px;">
          <el-option label="用户昵称" value="shanghai"></el-option>
        </el-select>

        <el-input v-model="form.input" placeholder="关键词" style="width:162px;" class="m-l-10"></el-input>
        <el-input v-model="form.input" placeholder="产品下单价格" style="width:108px;" class="m-l-10"></el-input>
        <el-input v-model="form.input" placeholder="数量" style="width:78px;" class="m-l-10"></el-input>
        <el-input v-model="form.input" placeholder="评语" style="width:313px;" class="m-l-10"></el-input>

        <div class="flex flex-y-center m-l-10">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="关注店铺（+1元）" name="type"></el-checkbox>
          </el-checkbox-group>

          <el-checkbox-group v-model="form.type">
            <el-checkbox label="收藏商品（+1元）" name="type"></el-checkbox>
          </el-checkbox-group>

          <el-checkbox-group v-model="form.type">
            <el-checkbox label="加入购物车（+1元）" name="type"></el-checkbox>
          </el-checkbox-group>
        </div>
        
        <el-button type="primary">立即设置</el-button>
        <el-button type="primary">批量加购</el-button>
      </div>
    </div>

    <div class="formTable">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="store" label="关键词" width="150"></el-table-column>
        <el-table-column prop="site" label="产品下单价格" width="120"></el-table-column>
        <el-table-column prop="address" label="数量" width="100"></el-table-column>
        <el-table-column prop="date" label="评语" width="200"></el-table-column>
        <el-table-column prop="status" label="晒图" width="100"></el-table-column>
        <el-table-column prop="progress" label="特殊要求请备注" width="200"></el-table-column>

        <el-table-column prop="progress" label="关注店铺" width="115"></el-table-column>
        <el-table-column prop="progress" label="收藏商品" width="115"></el-table-column>
        <el-table-column prop="progress" label="加入购物车" width="115"></el-table-column>

        <el-table-column prop="progress" label="预估付款金额" width="115"></el-table-column>
        <el-table-column prop="progress" label="预估佣金" width="115"></el-table-column>
        <el-table-column prop="progress" label="小计"></el-table-column>
      </el-table>
    </div>

    <div class="formTable">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="类型" width="163"></el-table-column>
        <el-table-column prop="store" label="付款金额" width="176"></el-table-column>
        <el-table-column prop="site" label="手续费"></el-table-column>
        <el-table-column prop="address" label="佣金" width="380"></el-table-column>
        <el-table-column prop="date" label="合计金额（台币）"></el-table-column>
        <el-table-column prop="status" label="人民币（汇率：0.66）"></el-table-column>
        <el-table-column prop="progress" label="美元（汇率：0.80）"></el-table-column>
      </el-table>
    </div>

    <div class="submitAll">
      <el-button type="primary">确认无误发布</el-button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'TaskAddView',
  components: {},
  data () {
    return {
      form: {
        name: '',
        type: ''
      },
      date: '',
      activeName: 'tab1',
      currentPage: 5,
      tableData: [{
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

<style lang="less">
.desc {
  background-color: #fff; border: solid 1px rgb(215, 215, 215);
  font-size: 14px; line-height: 1.65;
  padding: 15px 25px; margin-bottom: 20px;
  h3 { font-size: 18px; font-weight: bold; margin-bottom: 8px;}
}

.formAddTask {
  background-color: #fff; border: solid 1px rgb(215, 215, 215);
  font-size: 14px; line-height: 1.65;
  padding: 25px 35px; margin-bottom: 20px;
  h4 { margin-bottom: 20px; font-weight: bold;}
  .el-form-item { margin-bottom: 10px;}
  .el-form-item__label { line-height: 32px;}
  .el-form-item__content { line-height: 32px;}
  .el-input__inner {
    background-color: #f2f2f2;
    height: 32px; line-height: 32px; border-radius: 0; padding: 0 8px;
  }
  .el-input__icon { line-height: 32px;}
  .el-radio-group { margin-bottom: 30px;}
  .el-radio { display: block; margin-bottom: 5px; padding: 10px 0;}
  .preview { padding-top: 15px;}

  .formNextOpt {
    width: 300px; display: flex; margin-left: 50px;
    .el-button--primary { width: 63px; height: 32px; line-height: 32px; border-radius: 0; padding: 0; margin-right: 25px;}
  }

  .formNextOptWrap {
    .el-form-item__content { display: flex;}
  }
}

.formBatch {
  background-color: #fff; border: solid 1px rgb(215, 215, 215);
  font-size: 14px; line-height: 1.65;
  padding: 18px 25px; margin-bottom: 20px;
  h5 { margin-bottom: 15px;}
  .el-input__inner { height: 32px; line-height: 32px; border-radius: 0; padding: 10px;}
  .el-input--suffix .el-input__inner { padding-right: 30px;}
  .el-input__icon { line-height: 32px;}
  .el-button--primary { height: 32px; line-height: 32px; padding: 0; border-radius: 0; width: 100px;}
  .el-checkbox-group { margin-left: 8px;}
  .el-checkbox__inner { border-radius: 50%;}
}

.formTable { margin-bottom: 20px;}
</style>