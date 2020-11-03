<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('create_tasks') }}</h3>

    <div class="desc">
      <h3>{{ $t('mission_title') }}</h3>
      <p v-html="$t('mission_desc')"></p> 
    </div>

    <el-form ref="form" :model="form" class="formAddTask" label-width="130px">
      <h4>{{ $t('step_1') }}</h4>

      <!-- <pre>https://xiapi.xiapibuy.com/product/282684893/4743308116/</pre> -->
      <!-- <pre>{{ form }}</pre> -->

      <el-form-item :label="`${$t('choose_a_store')}:`">
        <el-select v-model="form.store_id" style="width:320px;" @change="on_selected_store">
          <el-option :label="item.ShopName" :value="item.Id" v-for="(item, index) in stores" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="`${$t('site')}:`" class="disabled">
        <el-input v-model="form.country" placeholder="" style="width:76px;" readonly></el-input>
      </el-form-item>

      <el-form-item :label="`${$t('local_currency')}:`" class="disabled">
        <el-input v-model="form.currency" placeholder="" style="width:76px;" readonly></el-input>
      </el-form-item>
      
      <!-- 第二步 -->
      <h4 class="m-t-35">{{ $t('step_2') }}</h4>

      <el-form-item :label="`${$t('baby_link')}:`">
        <el-input v-model="form.url" placeholder="" @blur="on_input_blured"></el-input>

        <div class="preview flex" v-if="goods.Title">
          <div class="thumb">
            <img :src="`http://${goods.MainPic}`" alt="" v-if="goods.MainPic">
          </div>
          <div class="info">
            <h6>{{ goods.Title }}</h6>
            <div>
              <span>{{ $t('commodity_ID') }}: {{ goods.ItemId }}</span>
              <span class="m-l-20">{{ $t('sales_volume') }}: {{ goods.SaleCount }}</span>
            </div>
          </div>
        </div>
      </el-form-item>
      
      <!-- 第三步 -->
      <h4 class="m-t-35">{{ $t('step_3') }}</h4>

      <el-form-item :label="`${$t('pay_it_method')}:`">
        <el-radio-group v-model="form.payment">
          <el-radio label="1">{{ $t('order_payment') }}
            <span class="orange">（{{ $t('tip8') }}）</span>
          </el-radio>
          <!-- <el-radio label="2">{{ $t('cash_on_delivery') }}
            <span class="orange">（{{ $t('tip9') }}）</span>
          </el-radio> -->
        </el-radio-group>
      </el-form-item>
      
      <!-- 第四步 -->
      <h4 class="m-t-35a">{{ $t('step_4') }}</h4>

      <el-form-item label="" style="margin-left:-70px;">
        <el-radio-group v-model="form.is_add_goods">
          <el-radio label="1">不需要加购商品</el-radio>
          <el-radio label="2">需要加购商品</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <!-- 加购商品 -->
      <div class="m-b-35" v-if="form.is_add_goods === '2'">
        <el-form-item :label="`${$t('product_links')}:`">
          <el-input v-model="AddplusForm.url" placeholder="" style="width:360px;" @blur="on_addplus_input_blured"></el-input>
        </el-form-item>

        <el-form-item :label="`${$t('product_title')}:`">
          <el-input v-model="AddplusForm.title" placeholder="" style="width:360px;" readonly="" class="disabled"></el-input>
        </el-form-item>

        <el-form-item :label="`${$t('main_pic')}:`">
          <img :src="`http://${AddplusForm.img}`" alt="" v-if="AddplusForm.img" width="80">
        </el-form-item>

        <el-form-item :label="`${$t('order_numbers')}:`">
          <el-input v-model="AddplusForm.amount" placeholder="" style="width:76px;"></el-input>
        </el-form-item>

        <el-form-item :label="`${$t('order_amount')}:`">
          <el-input v-model="AddplusForm.price" placeholder="" style="width:76px;"></el-input>
        </el-form-item>
      </div>
      
      <!-- 加购商品 完成 -->


      <el-form-item :label="`${$t('odd_number_of_published_tasks')}:`" class="formNextOptWrap">
        <el-input v-model="form.number" placeholder="" style="width:58px;"></el-input>

        <div class="formNextOpt">
          <el-button type="primary" @click="on_next_step" :disabled="!next_abled">{{ $t('next') }}</el-button>
          <span @click="on_cancel" style="cursor:pointer;">{{ $t('cancel') }}</span>

          <span class="p-l-25 orange">（产品下单价格、数量、加购产品不同时，请单独重新发布任务）</span>
        </div>
      </el-form-item>
    </el-form>

    <!-- <pre>{{ form }}</pre>
    <pre>{{ detail }}</pre> -->

    <template v-if="step === 2">
      <div class="formBatch">
        <h5>{{ $t('batch_setting') }}</h5>
        <div class="flex flex-wrap flex-y-center">
          <el-select v-model="form2.selected" style="width:90px;">
            <el-option :label="$t('all')" value="all"></el-option>
          </el-select>

          <el-input v-model="form2.keyword" :placeholder="$t('keyword')" style="width:162px;" class="m-l-10"></el-input>
          <el-input v-model="form2.price" :placeholder="$t('product_order_price')" style="width:108px;" class="m-l-10"></el-input>
          <el-input v-model="form2.amount" :placeholder="$t('number')" style="width:78px;" class="m-l-10"></el-input>
          <!-- <el-input v-model="form2.pingyu" :placeholder="$t('comment')" style="width:313px;" class="m-l-10"></el-input> -->

          <div class="flex flex-y-center m-l-10">
            <el-checkbox-group v-model="form2.type1">
              <el-checkbox :label="`${$t('focus_on_stores')}（+${fav_shop_price}${$t(`${form.currency}`)}）`" name="type"></el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="form2.type2">
              <el-checkbox :label="`${$t('collection_of_goods')}（+${fav_goods_price}${$t(`${form.currency}`)}）`" name="type"></el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-model="form2.type3">
              <el-checkbox :label="`${$t('add_cart')}（+${add_cart_price}${$t(`${form.currency}`)}）`" name="type"></el-checkbox>
            </el-checkbox-group>
          </div>
          
          <el-button type="primary" @click="on_setting">{{ $t('set_now') }}</el-button>
          <!-- <el-button type="primary" @click="addplus_cancel" v-if="AddplusForm.add">{{ $t('cancel_app_plush') }}</el-button>
          <el-button type="primary" @click="addplus" v-else>{{ $t('app_plush') }}</el-button> -->
        </div>
      </div>

      <!-- 批量 -->
      <div class="formTable formTable2">
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column type="index" :label="$t('serial_number')" width="60"></el-table-column>

          <el-table-column :label="$t('keyword')" min-width="150">
            <template slot-scope="scope">
              <el-input :placeholder="$t('keyword')" style="width:116px;" v-model="scope.row.keyword"></el-input>
            </template>
          </el-table-column>

          <el-table-column :label="$t('product_order_price')" min-width="120">
            <template slot-scope="scope">
              <el-input :placeholder="$t('price')" style="width:97px;" class="grayinput" v-model="scope.row.price" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column :label="$t('number')" width="100">
            <template slot-scope="scope">
              <el-input :placeholder="$t('number')" style="width:79px;" class="grayinput" v-model="scope.row.amount" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column :label="$t('comment')" width="200">
            <template slot-scope="scope">
              <el-input :placeholder="$t('comment')" style="width:180px;" v-model="scope.row.pingyu"></el-input>
            </template>
          </el-table-column>

          <el-table-column :label="$t('add_pic')" width="140">
            <template slot-scope="scope">
              <div class="uploader-thumbs">
                <el-upload name="files" list-type="picture-card"
                  :action="upload_url" :limit="1" :show-file-list="false"
                  :on-success="function(res, file) { return handleBannerSuccess(res, file, scope.$index)}"
                  :on-remove="function(res, file){ return handleBannerRemove(res, scope.$index)}"
                  >
                  <div class="thumb" :style="{backgroundImage: `url(http://${scope.row.CommentPic[0]})`}" v-if="scope.row.CommentPic[0]"></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <!-- scope.$index -->
                  <!-- :file-list="scope.row.CommentPic" -->
                  <!-- <div v-if="scope.row.CommentPic.length"></div> -->
                  <!-- :on-preview="handlePictureCardPreview" -->
                </el-upload>

                <el-upload name="files" list-type="picture-card"
                  :action="upload_url" :limit="1" :show-file-list="false"
                  :on-success="function(res, file) { return handleBannerSuccess(res, file, scope.$index)}"
                  :on-remove="function(res, file){ return handleBannerRemove(res, scope.$index)}"
                  >
                  <div class="thumb" :style="{backgroundImage: `url(http://${scope.row.CommentPic[1]})`}" v-if="scope.row.CommentPic[1]"></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-upload name="files" list-type="picture-card"
                  :action="upload_url" :limit="1" :show-file-list="false"
                  :on-success="function(res, file) { return handleBannerSuccess(res, file, scope.$index)}"
                  :on-remove="function(res, file){ return handleBannerRemove(res, scope.$index)}"
                  >
                  <div class="thumb" :style="{backgroundImage: `url(http://${scope.row.CommentPic[2]})`}" v-if="scope.row.CommentPic[2]"></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-upload name="files" list-type="picture-card"
                  :action="upload_url" :limit="1" :show-file-list="false"
                  :on-success="function(res, file) { return handleBannerSuccess(res, file, scope.$index)}"
                  :on-remove="function(res, file){ return handleBannerRemove(res, scope.$index)}"
                  >
                  <div class="thumb" :style="{backgroundImage: `url(http://${scope.row.CommentPic[3]})`}" v-if="scope.row.CommentPic[3]"></div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          
          <!-- 特殊要求 -->
          <el-table-column :label="$t('special_requirements')" width="200">
            <template slot-scope="scope">
              <el-input :placeholder="$t('remark')" style="width:180px;" v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          
          <!-- 规格型号 -->
          <el-table-column :label="$t('special_model')" min-width="160">
            <template slot-scope="scope">
              <el-input :placeholder="$t('color_size')" style="width:140px;" v-model="scope.row.Spec"></el-input>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">{{ $t('focus_on_stores') }}</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ fav_shop_price }}{{ $t(`${form.currency}`) }})</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_1 }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">{{ $t('collection_of_goods') }}</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ fav_goods_price }}{{ $t(`${form.currency}`) }})</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_2 }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="100">
            <template #header>
              <p class="lh-150">{{ $t('add_cart') }}</p>
              <p style="color:#46A1FF;" class="lh-100">(+{{ add_cart_price }}{{ $t(`${form.currency}`) }})</p>
            </template>

            <template slot-scope="scope">
              <span>{{ scope.row.price_3 }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('estimated_payment_amount')" min-width="100">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.price_yugu | fixed2 }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('estimated_commission')" min-width="90">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.yongjin_yugu | fixed2 }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('subtotal')" min-width="90">
            <template slot-scope="scope">
              <span class="red">{{ scope.row.total | fixed2 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 加购 -->
      <div class="formTable" v-if="AddplusForm.add">
        <el-table stripe :data="[{}]" style="width: 100%">
          <el-table-column :label="$t('tip4')" width="440">
            <div class="flex flex-y-center">
              <img :src="`http://${AddplusForm.img}`" alt="" style="width:47px;height:47px;">
              <div class="p-l-15 text-left">{{ AddplusForm.url }}</div>
            </div>
          </el-table-column>

          <el-table-column :label="$t('title')" min-width="260px">
            <span>{{ AddplusForm.title }}</span>
          </el-table-column>

          <el-table-column :label="$t('number')" width="80px">
            <span>{{ AddplusForm.amount }}</span>
          </el-table-column>

          <el-table-column :label="$t('amount_of_money')" width="150px">
            <span>{{ AddplusForm.price | fixed2 }}</span>
          </el-table-column>

          <el-table-column></el-table-column>
        </el-table>
      </div>
      
      <!-- 合计 -->
      <div class="formTable">
        <el-table stripe :data="[{}]" style="width: 100%">
          <el-table-column :label="$t('total')" width="163">
            {{ $t('estimate') }}
          </el-table-column>

          <el-table-column :label="$t('pay_attention_to_and_collect_additional_purchase_amount')">
            <span class="red fs-14">{{ sub_total_1 | fixed2 }}</span>
          </el-table-column>

          <el-table-column :label="$t('estimated_payment_amount')">
            <span class="red fs-14">{{ sub_total_2 | fixed2 }}</span>
          </el-table-column>

          <el-table-column :label="$t('commission')">
            <span class="red fs-14">{{ sub_total_3 | fixed2 }}</span>
          </el-table-column>

          <el-table-column>
            <template #header>
              <div class="flex flex-x-center flex-y-center">
                <img :src="form.flag" alt="" style="width:16px;height:16px;margin-right:6px;" v-if="form.flag">
                <span>{{ $t('total_amount') }}（{{ form.currency }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all | fixed2 }}</span>
          </el-table-column>

          <el-table-column>
            <template #header>
              <div class="flex flex-x-center flex-y-center">
                <img :src="flag_1" alt="" style="width:16px;height:16px;margin-right:6px;" v-if="flag_1">
                <span>{{ $t('rmb') }}（{{ $t('exchange_rate') }}：{{ ratio_1 }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all * ratio_1 | fixed2 }}</span>
          </el-table-column>

          <!-- <el-table-column>
            <template #header>
              <div class="flex flex-y-center">
                <img :src="flag_2" alt="" style="width:16px;height:16px;margin-right:6px;" v-if="flag_2">
                <span>{{ $t('usd') }}（{{ $t('exchange_rate') }}：{{ ratio_2 }}）</span>
              </div>
            </template>
            <span class="red fs-14">{{ sub_total_all * ratio_2 | fixed2 }}</span>
          </el-table-column> -->
        </el-table>
      </div>

      <div class="submitAll" style="padding-bottom:30px;">
        <el-button type="primary" @click="submit" :disabled="!submit_abled" v-loading.fullscreen.lock="fullscreenLoading">{{ $t('release_without_error') }}</el-button>
      </div>
    </template>

    
    <!-- 加购对话框 -->
    <el-dialog :title="$t('additional_purchase_of_goods')" width="1000px" :visible.sync="dialogVisibleAddplus" class="addplus-form">
      <el-table stripe :data="[{}]" style="width: 100%;">
        <el-table-column :label="$t('product_links')" width="400">
          <el-input v-model="AddplusForm.url" placeholder="" @blur="on_addplus_input_blured"></el-input>
        </el-table-column>

        <el-table-column :label="$t('product_title')" min-width="180">
          <div class="title">{{ AddplusForm.title }}</div>
        </el-table-column>

        <el-table-column :label="$t('main_pic')" width="70">
          <img :src="`http://${AddplusForm.img}`" alt="" v-if="AddplusForm.img">
        </el-table-column>

        <el-table-column :label="$t('order_numbers')" width="80">
          <el-input v-model="AddplusForm.amount" placeholder=""></el-input>
        </el-table-column>

        <el-table-column :label="$t('order_amount')" width="100">
          <el-input v-model="AddplusForm.price" placeholder=""></el-input>
        </el-table-column>
      </el-table>
      <div slot="footer" class="flex flex-x-right flex-y-center">
        <el-button type="primary" @click="addplus_confirm">{{ $t('confirm') }}</el-button>
        <el-button @click="dialogVisibleAddplus = false">{{ $t('quit') }}</el-button>
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
      upload_url: `${this.$http.defaults.baseURL}/File/UploadFile`,
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
        payment: '1',    // 支付方式
        number: '',     // 任务数
        is_add_goods: '1' // 是否加购商品
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
      let abled = false
      if (this.form.store_id && this.form.url && this.form.payment && this.goods.Title && this.tableData.length) {
        abled = true
        this.tableData.map(item => {
          if (!item.keyword) abled = false
          if (!item.price) abled = false
          if (!item.amount) abled = false
        })
      }
      return abled
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
      let item = this.ratios.find(item => item.To == 9 && item.Transfer == this.form.currency_id)
      return item && item.Rate || 0
    },
    ratio_2() {
      let item = this.ratios.find(item => item.To == 10 && item.Transfer == this.form.currency_id)
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
        this.form.currency = currency.Name
        this.form.currency_id = currency.Id
        this.form.flag = currency.Flag
        this.form.url = this.detail.Url
        this.form.payment = this.detail.PayMode.toFixed(0)
        this.form.number = this.detail.Detail.length
        
        if (this.detail.AddedGoods.Title) {
          this.AddplusForm.url = this.detail.AddedGoods.Url
          this.AddplusForm.title = this.detail.AddedGoods.Title
          this.AddplusForm.img = this.detail.AddedGoods.MainPic
          this.AddplusForm.amount = this.detail.AddedGoods.BuyCount
          this.AddplusForm.price = this.detail.AddedGoods.OrderPrice

          this.form.is_add_goods = '2'
        } else {
          this.form.is_add_goods = '1'
        }


        this.goods.ItemId = this.detail.ItemId
        this.goods.MainPic = this.detail.MainPic
        this.goods.SaleCount = this.detail.SaleCount
        this.goods.Title = this.detail.Title

        for(let i = 0; i < this.detail.Detail.length; ++i) {
          this.tableData.push({
            keyword: this.detail.Detail[i].SearchKey,
            price: this.detail.Detail[i].OrderPrice,
            amount: this.detail.Detail[i].BuyCount,
            CommentPic: [],
            Spec: this.detail.Detail[i].Spec,
            pingyu: this.detail.Detail[i].Comment,
            remark: this.detail.Detail[i].Remark,
            price_1: this.detail.Detail[i].FollowShop_Cost,
            price_1_bool: this.detail.Detail[i].FollowShop,
            price_2: this.detail.Detail[i].CollectGoods_Cost,
            price_2_bool: this.detail.Detail[i].CollectGoods,
            price_3: this.detail.Detail[i].AddShoppingCart_Cost,
            price_3_bool: this.detail.Detail[i].AddShoppingCart,
            price_yugu: this.detail.Detail[i].Pub_OrderCost,
            yongjin_yugu: this.detail.Detail[i].Pub_CommissionCost,
            total: this.detail.Detail[i].Pub_TotalCost,
          })
        }
        
        this.step = 2
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
      this.form2 = {
        selected: 'all',
        keyword: '',
        price: '',
        amount: '',
        pingyu: '',
        type1: false,
        type2: false,
        type3: false
      },
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
          Spec: '',
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
      this.calculate()
    },
    on_cancel() {
      // this.goods = {}
      this.form.number = ''
      this.step = 1
      this.form2 = {
        selected: 'all',
        keyword: '',
        price: '',
        amount: '',
        pingyu: '',
        type1: false,
        type2: false,
        type3: false
      },
      this.tableData = []
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
        // if (this.form2.pingyu) item.pingyu = this.form2.pingyu
        if (this.form2.type1) {
          item.price_1 = this.fav_shop_price
          item.price_1_bool = true
        } else {
          item.price_1 = 0
          item.price_1_bool = false
        }
        if (this.form2.type2) {
          item.price_2 = this.fav_goods_price
          item.price_2_bool = true
        } else {
          item.price_2 = 0
          item.price_2_bool = false
        }
        if (this.form2.type3) {
          item.price_3 = this.add_cart_price
          item.price_3_bool = true
        } else {
          item.price_3 = 0
          item.price_3_bool = false
        }
        item.price_yugu = parseFloat(item.price * item.amount + (this.form.is_add_goods === '2' ? this.AddplusForm.amount * this.AddplusForm.price: 0))
        item.yongjin_yugu = this.yongjin_price
        item.total = parseFloat(item.price_yugu + item.yongjin_yugu + item.price_1 + item.price_2 + item.price_3)
        return item
      })
    },
    
    handleBannerSuccess(response, file, index) {
      this.tableData[index].CommentPic.push(response.Data[0])
    },
    handleBannerRemove(response, index) {
      this.tableData[index].CommentPic = this.tableData[index].CommentPic.filter(item => response.response.Data[0] !== item)
    },
    // uploadSuccess(response, file, fileList) {
    //   console.log(response.Data[0])
    //   console.log(file)
    //   console.log(fileList)
    // },
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
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
          Spec: item.Spec,
          FollowShop: item.price_1_bool,
          CollectGoods: item.price_2_bool,
          AddShoppingCart: item.price_3_bool
        })
      })
      let AddedGoods
      if (this.AddplusForm.title) {
        AddedGoods = {
          Url: this.AddplusForm.url,
          Title: this.AddplusForm.title,
          MainPic: this.AddplusForm.img,
          BuyCount: parseFloat(this.AddplusForm.amount),
          OrderPrice: parseFloat(this.AddplusForm.price),
          Comment: '',
          CommentPic: [],
          Remark: ''
        }
      } else {
        AddedGoods = null
      }
      let params = {
        Url: this.form.url,
        Title: this.goods.Title,
        MainPic: this.goods.MainPic,
        SaleCount: this.goods.SaleCount,
        UserShopId: this.form.store_id,
        Detail: detail,
        AddedGoods,
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
.uploader-thumbs {
  display: flex; justify-content: center; flex-wrap: wrap;
  > div {
    margin: 2px; overflow: hidden;
    .thumb {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 42px; height: 42px;
    }
  }
}

.desc {
  background-color: #fff; border: solid 1px rgb(215, 215, 215);
  font-size: 12px; line-height: 1.65;
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
    height: 32px; line-height: 32px; border-radius: 0; padding: 0 8px;
  }
  .disabled .el-input__inner { background-color: #f2f2f2;}
  .el-input__icon { line-height: 32px;}
  // .el-radio-group { margin-bottom: 30px;}
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
    display: flex; margin-left: 50px;
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

.el-upload-list--picture-card .el-upload-list__item { width: 42px; height: 42px; margin: 0 2px 2px 0;}
.el-upload-list__item.is-success .el-upload-list__item-status-label { visibility: hidden;}
// .el-upload-list--picture-card .el-upload-list__item-actions span { visibility: hidden;}
.el-upload--picture-card { width: 42px; height: 42px;}

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