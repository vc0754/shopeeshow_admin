<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>返回</span>
    </div>

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
      <!-- <pre>{{ form }}</pre> -->

      <el-form-item label="选择店铺：">
        <el-select v-model="form.store_id" style="width:320px;" @change="on_selected_store">
          <el-option :label="item.ShopName" :value="item.Id" v-for="(item, index) in stores" :key="index"></el-option>
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
            <img :src="`http://${goods.MainPic}`" alt="">
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
          <el-radio label="1">下单付款
            <span class="orange">（需要在表格核对后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）</span>
          </el-radio>
          <el-radio label="2">货到付款
            <span class="orange">（需要在收货后24小时内安排返款，否则刷手前往退款，特殊情况请联系客服处理！）</span>
          </el-radio>
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

    <!-- <pre>{{ form }}</pre>
    <pre>{{ detail }}</pre> -->

    <template v-if="step === 2">
      <div class="formBatch">
        <h5>批量设置（在下方栏中选择内容进行批量填充）</h5>
        <div class="flex flex-wrap flex-y-center">
          <el-select v-model="form2.selected" style="width:90px;">
            <el-option label="全部" value="all"></el-option>
          </el-select>

          <el-input v-model="form2.keyword" placeholder="关键词" style="width:162px;" class="m-l-10"></el-input>
          <el-input v-model="form2.price" placeholder="产品下单价格" style="width:108px;" class="m-l-10"></el-input>
          <el-input v-model="form2.amount" placeholder="数量" style="width:78px;" class="m-l-10"></el-input>
          <el-input v-model="form2.pingyu" placeholder="评语" style="width:313px;" class="m-l-10"></el-input>

          <div class="flex flex-y-center m-l-10">
            <el-checkbox-group v-model="form2.type1">
              <el-checkbox :label="`关注店铺（+${fav_shop_price}元）`" name="type"></el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="form2.type2">
              <el-checkbox :label="`收藏商品（+${fav_goods_price}元）`" name="type"></el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="form2.type3">
              <el-checkbox :label="`加入购物车（+${add_cart_price}元）`" name="type"></el-checkbox>
            </el-checkbox-group>
          </div>
          
          <el-button type="primary" @click="on_setting">立即设置</el-button>
          <el-button type="primary" @click="addplus_cancel" v-if="AddplusForm.add">取消加购</el-button>
          <el-button type="primary" @click="addplus" v-else>批量加购</el-button>
        </div>
      </div>

      <!-- 批量 -->
      <div class="formTable formTable2">
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>

          <el-table-column label="关键词" min-width="150">
            <template slot-scope="scope">
              <el-input placeholder="关键词" style="width:116px;" v-model="scope.row.keyword"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="产品下单价格" min-width="120">
            <template slot-scope="scope">
              <el-input placeholder="价格" style="width:97px;" class="grayinput" v-model="scope.row.price" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="数量" width="100">
            <template slot-scope="scope">
              <el-input placeholder="数量" style="width:79px;" class="grayinput" v-model="scope.row.amount" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="评语" width="200">
            <template slot-scope="scope">
              <el-input placeholder="评语" style="width:180px;" v-model="scope.row.pingyu"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="晒图" width="100">
            <div>
              <el-upload
                :action="`${this.$http.defaults.baseURL}/File/UploadFile`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>

            </div>
          </el-table-column>

          <el-table-column label="特殊要求（颜色，尺寸等）" width="200">
            <template slot-scope="scope">
              <el-input placeholder="备注" style="width:180px;" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">关注店铺</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ fav_shop_price }}元)</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_1 }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">收藏商品</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ fav_goods_price }}元)</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_2 }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">加入购物车</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ add_cart_price }}元)</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_3 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预估付款金额" min-width="100">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.price_yugu | fixed2 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预估佣金" min-width="90">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.yongjin_yugu | fixed2 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="小计" min-width="90">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.total | fixed2 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 加购 -->
      <div class="formTable" v-if="AddplusForm.add">
        <el-table stripe :data="[{}]" style="width: 100%">
          <el-table-column label="加购商品信息（以下为每条订单的加购商品信息）" width="440">
            <div class="flex flex-y-center">
              <img :src="`http://${AddplusForm.img}`" alt="" style="width:47px;height:47px;">
              <div class="p-l-15 text-left">{{ AddplusForm.url }}</div>
            </div>
          </el-table-column>

          <el-table-column label="数量" width="80px">
            <span>{{ AddplusForm.amount }}</span>
          </el-table-column>

          <el-table-column label="金额" width="150px">
            <span>{{ AddplusForm.price | fixed2 }}</span>
          </el-table-column>

          <el-table-column></el-table-column>
        </el-table>
      </div>
      
      <!-- 合计 -->
      <div class="formTable">
        <el-table stripe :data="[{}]" style="width: 100%">
          <el-table-column label="合计" width="163">
            预估
          </el-table-column>

          <el-table-column label="关注、收藏、加购">
            <span class="red fs-14">{{ sub_total_1 | fixed2 }}</span>
          </el-table-column>

          <el-table-column label="预估付款金额">
            <span class="red fs-14">{{ sub_total_2 | fixed2 }}</span>
          </el-table-column>

          <el-table-column label="佣金">
            <span class="red fs-14">{{ sub_total_3 | fixed2 }}</span>
          </el-table-column>

          <el-table-column>
            <template #header>
              <div class="flex flex-y-center">
                <img :src="form.flag" alt="" style="width:16px;height:16px;margin-right:6px;">
                <span>合计金额（{{ form.currency }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all | fixed2 }}</span>
          </el-table-column>

          <el-table-column>
            <template #header>
              <div class="flex flex-y-center">
                <img :src="flag_1" alt="" style="width:16px;height:16px;margin-right:6px;">
                <span>人民币（汇率：{{ ratio_1 }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all * ratio_1 | fixed2 }}</span>
          </el-table-column>

          <el-table-column>
            <template #header>
              <div class="flex flex-y-center">
                <img :src="flag_2" alt="" style="width:16px;height:16px;margin-right:6px;">
                <span>美元（汇率：{{ ratio_2 }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all * ratio_2 | fixed2 }}</span>
          </el-table-column>
        </el-table>
      </div>

      <div class="submitAll" style="padding-bottom:30px;">
        <el-button type="primary" @click="submit" :disabled="!submit_abled" v-loading.fullscreen.lock="fullscreenLoading">确认无误发布</el-button>
      </div>
    </template>

    
    <!-- 加购对话框 -->
    <el-dialog title="加购商品" width="1000px" :visible.sync="dialogVisibleAddplus" class="addplus-form">
      <el-table stripe :data="[{}]" style="width: 100%;">
        <el-table-column label="商品链接" width="400">
          <el-input v-model="AddplusForm.url" placeholder="" @blur="on_addplus_input_blured"></el-input>
        </el-table-column>

        <el-table-column label="商品标题" min-width="180">
          <div class="title">{{ AddplusForm.title }}</div>
        </el-table-column>

        <el-table-column label="主图" width="70">
          <img :src="`http://${AddplusForm.img}`" alt="">
        </el-table-column>

        <el-table-column label="件数" width="80">
          <el-input v-model="AddplusForm.amount" placeholder=""></el-input>
        </el-table-column>

        <el-table-column label="下单金额" width="100">
          <el-input v-model="AddplusForm.price" placeholder=""></el-input>
        </el-table-column>
      </el-table>
      <div slot="footer" class="flex flex-x-right flex-y-center">
        <el-button type="primary" @click="addplus_confirm">确定</el-button>
        <el-button @click="dialogVisibleAddplus = false">退出</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
export default {
  name: 'TaskAddView',
  components: {},
  data () {
    return {
      fullscreenLoading: false,     // 全屏加载
      dialogVisibleAddplus: false,  // 加购商品对话框
      AddplusForm: {                // 加购商品信息
        add: false,
        url: '',
        title: '',
        img: '',
        amount: 0,
        price: 0
      },

      currencies: [],   // 币种
      countries: [],    // 国家
      stores: [],       // 店铺
      cast: [],         // 费用规则
      ratios: [],       // 汇率
      
      detail: {},

      form: {
        store: '',      // 选择店铺
        store_id: null,    // 店铺ID
        country: '',    // 国家
        country_id: 0,  // 国家ID
        currency_id: 0, // 货币ID
        flag: '',       // 旗帜
        currency: '',   // 币种
        url: '',        // 宝贝链接
        payment: '',    // 支付方式
        number: ''      // 任务数
      },
      goods: {},        // 自动获取的宝贝

      step: 1,

      form2: {          // 批量操作表单
        selected: 'all',
        keyword: '',
        price: '',
        amount: '',
        pingyu: '',
        type1: false,
        type2: false,
        type3: false
      },

      dialogImageUrl: '',
      dialogVisible: false,
      
      tableData: []       // 批量数据
    }
  },
  filters: {
    fixed2(str) {
      if (!str) return '-'
      return (str * 1).toFixed(2)
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    next_abled() {
      return Boolean(this.form.store_id && this.form.country && this.form.currency && this.form.url && this.form.payment && this.form.number)
    },
    submit_abled() {
      return Boolean(this.form.store_id && this.form.url && this.form.payment && this.goods.Title && this.tableData.length)
    },
    yongjin_price() {
      let item = this.cast.find(item => item.County === this.form.country_id)
      return item && item.Order_Commission || 0
    },
    fav_shop_price() {
      let item = this.cast.find(item => item.County === this.form.country_id)
      return item && item.FollowShop_Commission || 0
    },
    fav_goods_price() {
      let item = this.cast.find(item => item.County === this.form.country_id)
      return item && item.CollectGoods_Commission || 0
    },
    add_cart_price() {
      let item = this.cast.find(item => item.County === this.form.country_id)
      return item && item.AddShoppingCart_Commission || 0
    },
    sub_total_1() {
      let total = 0
      this.tableData.map(item => {
        total += item.price_1 + item.price_2 + item.price_3
      })
      return total
    },
    sub_total_2() {
      let total = 0
      this.tableData.map(item => {
        total += item.price_yugu
      })
      return total
    },
    sub_total_3() {
      let total = 0
      this.tableData.map(item => {
        total += item.yongjin_yugu
      })
      return total
    },
    sub_total_all() {
      let total = 0
      this.tableData.map(item => {
        total += item.total
      })
      return total
    },
    ratio_1() {
      let item = this.ratios.find(item => item.To === 9 && item.Transfer === this.form.currency_id)
      return item && item.Rate || 0
    },
    ratio_2() {
      let item = this.ratios.find(item => item.To === 10 && item.Transfer === this.form.currency_id)
      return item && item.Rate || 0
    },
    flag_1() {
      let item = this.currencies.find(item => item.Name === 'CNY')
      return item && item.Flag || ''
    },
    flag_2() {
      let item = this.currencies.find(item => item.Name === 'USD')
      return item && item.Flag || ''
    }
  },
  methods: {
    on_addplus_input_blured() {
      if (!this.AddplusForm.url) return
      this.$http.post('/Task/GetGoodsInfo', {
        GoodsUrl: this.AddplusForm.url
      }).then(res => {
        this.AddplusForm.title = res.Data.Title
        this.AddplusForm.img = res.Data.MainPic
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    addplus() {
      this.dialogVisibleAddplus = true
    },
    addplus_confirm() {
      if (this.AddplusForm.url && this.AddplusForm.title && this.AddplusForm.amount && this.AddplusForm.price) {
        this.AddplusForm.add = true
        this.dialogVisibleAddplus = false
        this.calculate()
      }
    },
    addplus_cancel() {
      this.AddplusForm.add = false
      this.calculate()
    },
    goback() {
      this.$router.go(-1)
    },
    query_detail () {
      this.$http.get('/Task/Detail', {
        params: {
          OrderNo: this.id
        }
      }).then(res => {
        this.detail = res.Data

        // let store = this.stores.find(item => item.Id === val)
        // let country = this.countries.find(item => item.Id === store.Country)
        let currency = this.currencies.find(item => item.Id === this.detail.CurrencyId)

        this.form.store = this.detail.ShopName
        this.form.store_id = this.detail.UserShopId
        this.form.country = this.detail.CountryName
        this.form.country_id = this.detail.CountryId
        this.form.flag = currency.Flag
        this.form.currency = currency.Name
        this.form.url = this.detail.Url
        this.form.payment = this.detail.PayMode.toFixed(0)
        this.form.number = this.detail.Detail.length
        this.goods.ItemId = this.detail.ItemId
        this.goods.MainPic = this.detail.MainPic
        this.goods.SaleCount = this.detail.SaleCount
        this.goods.Title = this.detail.Title
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    on_selected_store(val) {
      let store = this.stores.find(item => item.Id === val)
      let country = this.countries.find(item => item.Id === store.Country)
      let currency = this.currencies.find(item => item.Id === country.CurrencyId)
      this.form.store = store.ShopName
      this.form.country = country.Name
      this.form.country_id = store.Country
      this.form.currency = currency.Name
      this.form.currency_id = currency.Id
      this.form.flag = currency.Flag
      this.step = 1
      this.tableData = []
    },
    on_input_blured() {
      if (!this.form.url) return
      this.$http.post('/Task/GetGoodsInfo', {
        // GoodsUrl: encodeURI(this.form.url)
        GoodsUrl: this.form.url
      }).then(res => {
        this.goods = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    on_next_step() {
      this.step++
      if (this.step > 2) this.step = 2
      let items = []
      for (let i = 0; i < this.form.number; ++i) {
        items.push({
          keyword: '',
          price: 0,
          amount: 0,
          CommentPic: [],
          pingyu: '',
          remark: '',
          price_1: 0,
          price_1_bool: false,
          price_2: 0,
          price_2_bool: false,
          price_3: 0,
          price_3_bool: false,
          price_yugu: 0,
          yongjin_yugu: 0,
          total: 0
        })
      }
      this.tableData = items
    },
    on_cancel() {
      this.form = {
        store: '',      // 选择店铺
        store_id: null,    // 店铺ID
        country: '',    // 国家
        country_id: 0,  // 国家ID
        currency_id: 0, // 货币ID
        flag: '',       // 旗帜
        currency: '',   // 币种
        url: '',        // 宝贝链接
        payment: '',    // 支付方式
        number: ''      // 任务数
      }
      this.goods = {}
      this.step = 1
    },
    on_setting() {
      if (this.form2.selected !== 'all') return
      this.calculate()
    },

    // 计算
    calculate() {
      this.tableData.map(item => {
        if (this.form2.keyword) item.keyword = this.form2.keyword
        if (this.form2.price) item.price = parseFloat(this.form2.price)
        if (this.form2.amount) item.amount = parseInt(this.form2.amount)
        if (this.form2.pingyu) item.pingyu = this.form2.pingyu
        if (this.form2.type1) {
          item.price_1 = this.fav_shop_price
          item.price_1_bool = true
        } else {
          item.price_1_bool = false
        }
        if (this.form2.type2) {
          item.price_2 = this.fav_goods_price
          item.price_2_bool = true
        } else {
          item.price_2_bool = false
        }
        if (this.form2.type3) {
          item.price_3 = this.add_cart_price
          item.price_3_bool = true
        } else {
          item.price_3_bool = false
        }
        item.price_yugu = parseFloat(item.price * item.amount + (this.AddplusForm.add ? this.AddplusForm.amount * this.AddplusForm.price: 0))
        item.yongjin_yugu = this.yongjin_price
        item.total = parseFloat(item.price_yugu + item.yongjin_yugu + item.price_1 + item.price_2 + item.price_3)
        return item
      })
    },
    
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    get_cast() {
      this.$http.get('/Config/GetCountryCast').then(res => {
        this.cast = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    get_ratio() {
      this.$http.get('/Config/GetExchangeRate').then(res => {
        this.ratios = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
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
        this.countries = res.Data
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },

    query () {
      this.$http.get('/UserShop/GetList').then(res => {
        this.stores = res.Data
        if (this.id) this.query_detail()
      }).catch(err => {
        this.$message.error(err.data.Message)
      });
    },
    submit() {
      this.fullscreenLoading = true;
      
      let detail = []
      this.tableData.map(item => {
        detail.push({
          SearchKey: item.keyword,
          BuyCount: item.amount,
          OrderPrice: item.price,
          Comment: item.pingyu,
          CommentPic: item.CommentPic,
          Remark: item.remark,
          FollowShop: item.price_1_bool,
          CollectGoods: item.price_2_bool,
          AddShoppingCart: item.price_3_bool
        })
      })
      let params = {
        Url: this.form.url,
        Title: this.goods.Title,
        MainPic: this.goods.MainPic,
        SaleCount: this.goods.SaleCount,
        UserShopId: this.form.store_id,
        Detail: detail,
        AddedGoods: {
          Url: this.AddplusForm.url,
          Title: this.AddplusForm.title,
          MainPic: this.AddplusForm.img,
          BuyCount: parseFloat(this.AddplusForm.amount),
          OrderPrice: parseFloat(this.AddplusForm.price),
          Comment: '',
          CommentPic: [],
          Remark: ''
        },
        PayMode: parseInt(this.form.payment),
        TotalCost: parseFloat((this.sub_total_all).toFixed(2))
      }
      this.$http.post('/Task/Add', params).then(() => {
        this.fullscreenLoading = false
        this.$message.success('添加成功')
        this.$router.replace({ path: '/task/list' })
      }).catch(err => {
        this.fullscreenLoading = false
        this.$message.error(err.data.Message)
      })
    }
  },
  mounted() {
    this.get_country()
    this.get_currency()
    this.get_cast()
    this.get_ratio()
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

  .el-checkbox__inner { background-color: #d7d7d7; border-color: #d7d7d7; border-radius: 50%;}
  .el-checkbox__inner::after {
    transform: rotate(45deg) scaleY(1);
  }
  .el-checkbox__label { padding-left: 5px;}
  .el-checkbox__input.is-checked + .el-checkbox__label { color: #606266;}
}

.formTable { margin-bottom: 20px;}
.formTable2 {
  .el-input__inner { border-radius: 0; height: 35px; line-height: 35px; padding: 0 10px;}
}

.red { color: #C00017;}

.el-radio__input.is-checked+.el-radio__label { color: #606266;}

.grayinput .el-input__inner { background-color: #f2f2f2; border-color: #eaeaea; text-align: center;}
.orange { color: #FF5500;}

.el-upload-list--picture-card .el-upload-list__item { width: 22px; height: 22px; margin: 0 2px 2px 0;}
.el-upload-list__item.is-success .el-upload-list__item-status-label { visibility: hidden;}
// .el-upload-list--picture-card .el-upload-list__item-actions span { visibility: hidden;}
.el-upload--picture-card { width: 22px; height: 22px;}

.addplus-form {
  .el-dialog__header {
    background-color: rgba(243, 246, 249, 1);
    border: solid 1px rgba(215, 215, 215, 1);
    text-align: center;
    height: 59px; padding: 0;
    display: flex; justify-content: center; align-items: center;
    .el-dialog__title {
      font-size: 16px;
    }
  }
  .title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
}
</style>