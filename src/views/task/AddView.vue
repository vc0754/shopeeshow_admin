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

      <pre>https://xiapi.xiapibuy.com/product/282684893/4743308116/</pre>
      <pre>{{ form }}</pre>

      <el-form-item label="选择店铺：">
        <el-select v-model="form.store" style="width:320px;" @change="on_selected_store">
          <el-option :label="item.ShopName" :value="item.ShopId" v-for="(item, index) in stores" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="站点：">
        <el-input v-model="form.country" placeholder="" style="width:76px;"></el-input>
      </el-form-item>

      <el-form-item label="本地币种：">
        <el-input v-model="form.currency" placeholder="" style="width:76px;"></el-input>
      </el-form-item>

      <h4 class="m-t-35">第二步：输入链接、自动显示</h4>

      <el-form-item label="宝贝链接：">
        <el-input v-model="form.url" placeholder="" @blur="on_input_blured"></el-input>

        <div class="preview flex" v-if="goods.Title">
          <div class="thumb">
            <img :src="goods.MainPic" alt="">
          </div>
          <div class="info">
            <h6>{{ goods.Title }}</h6>
            <div>
              <span>商品ID: {{ goods.ItemId }}</span>
              <span class="m-l-20">销量: {{ goods.SaleCount }}</span>
            </div>
          </div>
        </div>
      </el-form-item>

      <h4 class="m-t-35">第三步：支付方式</h4>

      <el-form-item label="付款方式：">
        <el-radio-group v-model="form.payment">
          <el-radio label="下单付款（需要在表格核对后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）"></el-radio>
          <el-radio label="货到付款（需要在收货后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="发布任务数单数：" class="formNextOptWrap">
        <el-input v-model="form.number" placeholder="" style="width:58px;"></el-input>

        <div class="formNextOpt">
          <el-button type="primary" @click="on_next_step" :disabled="!next_abled">下一步</el-button>
          <span @click="on_cancel" style="cursor:pointer;">取消</span>
        </div>
      </el-form-item>
    </el-form>

    <template v-if="step === 2">
      <div class="formBatch">
        <h5>批量设置（在下方栏中选择内容进行批量填充）</h5>
        <div class="flex flex-y-center">
          <el-select v-model="form.store" style="width:90px;">
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
    </template>
  </section>
</template>

<script>
export default {
  name: 'TaskAddView',
  components: {},
  data () {
    return {
      currencies: [],   // 币种
      countries: [],    // 国家
      stores: [],       // 店铺

      form: {
        store: '',      // 选择店铺
        country: '',    // 国家
        currency: '',   // 币种
        url: '',        // 宝贝链接
        payment: '',    // 支付方式
        number: ''      // 任务数
      },
      goods: {},        // 自动获取的宝贝

      step: 1,

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
    next_abled() {
      return Boolean(this.form.store && this.form.country && this.form.currency && this.form.url && this.form.payment && this.form.number)
    }
  },
  methods: {
    on_selected_store(val) {
      let store = this.stores.find(item => item.ShopId === val)
      let country = this.countries.find(item => item.Id === store.Country)
      let currency = this.currencies.find(item => item.Id === country.CurrencyId)
      this.form.country = country.Name
      this.form.currency = currency.Name
      console.log(store)
    },
    on_input_blured() {
      if (!this.form.url) return
      this.$http.get('/Task/GetGoodsInfo', {
        params: {
          GoodsUrl: this.form.url
        }
      }).then(res => {
        this.goods = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    on_next_step() {
      this.step++
    },
    on_cancel() {
      this.form = {
        store: '',      // 选择店铺
        country: '',    // 国家
        currency: '',   // 币种
        url: '',        // 宝贝链接
        payment: '',    // 支付方式
        number: ''      // 任务数
      }
      this.goods = {}
    },

    get_currency() {
      this.$http.get('/Config/GetCurrency').then(res => {
        this.currencies = res.Data
      }).catch(err => {
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

    query () {
      this.$http.get('/UserShop/GetList').then(res => {
        this.stores = res.Data
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
  mounted() {
    this.get_country()
    this.get_currency()
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

  // 预览
  .preview {
    padding-top: 15px;
    display: flex;
    .thumb {
      background-color: #ccc;
      width: 80px; height: 80px; margin-right: 15px;
      flex-shrink: 0;
    }
    .info {
      flex-grow: 1;
    }
  }

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