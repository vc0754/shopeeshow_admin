<template>
  <section class="wrap">
    <h3 class="section_title">结算中心</h3>

    <el-form ref="form" :model="form" class="formDaterange bg-white flex flex-x-between flex-y-center">
      <div class="flex">
        <el-form-item label="任务编号：" style="margin: 0;">
          <el-input v-model="form.OrderNo" placeholder="" style="width:125px;"></el-input>
        </el-form-item>

        <el-form-item label="站点：" style="margin: 0;">
          <el-select v-model="form.country" style="width:150px;">
            <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in countries" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称：" style="margin: 0;" class="m-l-15">
          <el-input v-model="form.name" placeholder="模糊匹配" style="width:155px;"></el-input>
        </el-form-item>

        <el-form-item label="时间：" style="margin: 0;">
          <el-select v-model="form.times" style="width:155px;">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in select_times" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" @click="onSearch">查询</el-button>
    </el-form>

    <div class="add" @click="DaKuang">
      <img alt="" src="../assets/money.svg">
      <span class="m-l-10">立即打款</span>
    </div>

    <div class="formTable">
      
      <el-table stripe :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand" width="35">
          <template slot-scope="props">
            
            <el-table stripe border :data="props.row.Detail" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column label="序号" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.SubOrderNo }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单号" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.OrderNo }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单状态" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.StateStr }}</span>
                </template>
              </el-table-column>

              <el-table-column label="买家昵称" min-width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.Sp_NickName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="付款金额" min-width="170">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_OrderCost }}</span>
                    <span>{{ scope.row.OrderCost }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="佣金" min-width="170">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_CommissionCost }}</span>
                    <span>{{ scope.row.CommissionCost }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="合计" min-width="170">
                <template slot-scope="scope">
                  <div class="flex flex-column text-right lh-100">
                    <span class="red">{{ scope.row.Pub_TotalCost }}</span>
                    <span>{{ scope.row.TotalCost }}</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="" min-width="180">
          <template slot-scope="scope">
            <div class="text-left">
              <div>任务编号：<span class="gray">{{ scope.row.OrderNo }}</span></div>
              <div>提交时间：<span class="gray">{{ scope.row.CreateTime | date }}</span></div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="" min-width="180">
          <template slot-scope="scope">
            <div>店铺名：<span class="gray">{{ scope.row.ShopName }}</span></div>
            <div>站点：<span class="gray">{{ countryShowName(scope.row.CountryId) }}</span></div>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="" min-width="300">
          <template slot-scope="scope">
            <div class="flex flex-y-center text-left p-l-15 p-r-15">
              <img :src="scope.row.Url" alt="" class="thumb" />
              <div class="flex flex-column lh-150">
                <span class="gray">Id: {{ scope.row.ItemId }}</span>
                <span>{{ scope.row.Title }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="120">
          <template slot-scope="scope">
            <div class="lh-120" style="padding:0 15px;">
              <p class="m-b-10">已完成：{{ scope.row.SuccCount }}/{{ scope.row.TaskCount }}</p>
              <el-progress :percentage="scope.row.SuccCount/scope.row.TaskCount*100" :show-text="false"></el-progress>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" min-width="180">
          <template slot-scope="scope">
            <p>待支付：{{ scope.row.WaitPayCost }}</p>
            <p>已支付：{{ scope.row.PaySuccCost }}</p>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="flex flex-x-right p-t-40 p-b-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- <pre>{{ tableData }}</pre>
      <pre>{{ items }}</pre> -->
    
      <el-dialog title="支付中..." width="944px" :visible.sync="dialogVisible" class="store-form">
        <!-- <el-form ref="formStore" :model="formStore">
          <el-form-item label="请在下框输入店铺链接" style="margin-bottom:15px;">
            <el-input v-model="formStore.url" placeholder="http://" style="width:430px;" />
              
            <el-button type="primary" v-if="send_code">{{ send_code }}秒后过期</el-button>
            <el-button :type="send_text === '重新发送' ? 'info' : 'primary'" @click="sendCode" v-else>{{ send_text }}</el-button>
          </el-form-item>

          <el-form-item label="请在下框输入聊聊客服收到的验证码">
            <el-input v-model="formStore.captcha" placeholder="" style="width:430px;" />
            <el-button type="primary" @click="submit">确 定</el-button>
          </el-form-item>
        </el-form> -->
      </el-dialog>
      
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'UserListView',
  components: {},
  data () {
    return {
      form: {
        OrderNo: '',
        name: '',
        country: '',
        times: 30
      },
      dialogVisible: false,
      currentPage: 5,
      pageSize: 10,
      total: 0,
      items: [],
      loading: false,
      select_times: [
        { label: '近30日', value: 30 },
        { label: '近90日', value: 90 }
      ],
      countries: [],
      tableData: [
        {
          "OrderNo": "SSA4545487323565",
          "ItemId": 56487878,
          "Url": "string",
          "Title": "迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008",
          "MainPic": "string",
          "SaleCount": 0,
          "UserShopId": 0,
          "ShopName": "虾皮SHOWxxx店",
          "CountryId": 1,
          "CountryName": "string",
          "CurrencyId": 0,
          "Currency": "string",
          "TaskCount": 10,
          "SuccCount": 4,
          "WaitSuccCount": 0,
          "WaitPayCost": 1000.00,
          "PaySuccCost": 1200.00,
          "Pub_TotalCost": 0,
          "TotalCost": 0,
          "State": 1,
          "StateStr": "string",
          "VerifyFailMsg": "string",
          "PayMode": 1,
          "PayModeStr": "string",
          "CreateTime": "2020-10-20T04:15:46.231Z",
          "Detail": [
            {
              "SubOrderNo": "1",
              "OrderNo": "5454544454",
              "SearchKey": "string",
              "BuyCount": 0,
              "OrderPrice": 0,
              "Comment": "string",
              "CommentPic": "string",
              "Remark": "string",
              "FollowShop": true,
              "FollowShop_Cost": 0,
              "CollectGoods": true,
              "CollectGoods_Cost": "string",
              "AddShoppingCart": true,
              "AddShoppingCart_Cost": 0,
              "Pub_OrderCost": 180.00,
              "Pub_CommissionCost": 40,
              "Pub_TotalCost": 280,
              "OrderCost": 200.00,
              "CommissionCost": 50,
              "TotalCost": 250,
              "SubmitTime": "2020-10-20T04:15:46.231Z",
              "SurplusPayTime": "2020-10-20T04:15:46.231Z",
              "PayTime": "2020-10-20T04:15:46.231Z",
              "PayBillNo": "string",
              "Sp_OrderNo": "string",
              "Sp_Uid": "string",
              "Sp_NickName": "丢内",
              "State": 1,
              "StateStr": "待支付"
            },
            {
              "SubOrderNo": "2",
              "OrderNo": "5454544454",
              "SearchKey": "string",
              "BuyCount": 0,
              "OrderPrice": 0,
              "Comment": "string",
              "CommentPic": "string",
              "Remark": "string",
              "FollowShop": true,
              "FollowShop_Cost": 0,
              "CollectGoods": true,
              "CollectGoods_Cost": "string",
              "AddShoppingCart": true,
              "AddShoppingCart_Cost": 0,
              "Pub_OrderCost": 180.00,
              "Pub_CommissionCost": 40,
              "Pub_TotalCost": 280,
              "OrderCost": 200.00,
              "CommissionCost": 50,
              "TotalCost": 250,
              "SubmitTime": "2020-10-20T04:15:46.231Z",
              "SurplusPayTime": "2020-10-20T04:15:46.231Z",
              "PayTime": "2020-10-20T04:15:46.231Z",
              "PayBillNo": "string",
              "Sp_OrderNo": "string",
              "Sp_Uid": "string",
              "Sp_NickName": "丢内",
              "State": 7,
              "StateStr": "支付完成"
            }
          ]
        },
        {
          "OrderNo": "SSA4545487323565",
          "ItemId": 56487878,
          "Url": "string",
          "Title": "迈锐博304不锈钢转角水槽双槽套餐厨房洗菜盆圆槽水池淘菜盆M2008",
          "MainPic": "string",
          "SaleCount": 0,
          "UserShopId": 0,
          "ShopName": "虾皮SHOWxxx店",
          "CountryId": 1,
          "CountryName": "string",
          "CurrencyId": 0,
          "Currency": "string",
          "TaskCount": 10,
          "SuccCount": 4,
          "WaitSuccCount": 0,
          "WaitPayCost": 1000.00,
          "PaySuccCost": 1200.00,
          "Pub_TotalCost": 0,
          "TotalCost": 0,
          "State": 1,
          "StateStr": "string",
          "VerifyFailMsg": "string",
          "PayMode": 1,
          "PayModeStr": "string",
          "CreateTime": "2020-10-20T04:15:46.231Z",
          "Detail": [
            {
              "SubOrderNo": "string",
              "OrderNo": "string",
              "SearchKey": "string",
              "BuyCount": 0,
              "OrderPrice": 0,
              "Comment": "string",
              "CommentPic": "string",
              "Remark": "string",
              "FollowShop": true,
              "FollowShop_Cost": 0,
              "CollectGoods": true,
              "CollectGoods_Cost": "string",
              "AddShoppingCart": true,
              "AddShoppingCart_Cost": 0,
              "Pub_OrderCost": 0,
              "Pub_CommissionCost": 0,
              "Pub_TotalCost": 0,
              "OrderCost": 0,
              "CommissionCost": 0,
              "TotalCost": 0,
              "SubmitTime": "2020-10-20T04:15:46.231Z",
              "SurplusPayTime": "2020-10-20T04:15:46.231Z",
              "PayTime": "2020-10-20T04:15:46.231Z",
              "PayBillNo": "string",
              "Sp_OrderNo": "string",
              "Sp_Uid": "string",
              "Sp_NickName": "string",
              "State": 1,
              "StateStr": "string"
            }
          ]
        }
      ]
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    start_time() {
      if (this.form.times === 30) {
        return moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
      } else if (this.form.times === 90) {
        return moment().subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
      } else {
        return moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
      }
    },
    end_time() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    DaKuang() {
      this.dialogVisible = true
    },
    countryShowName(id) {
      let item = this.countries.find(item => item.Id === id)
      return item ? item.Name : id
    },
    handleSelectionChange() {},
    onSearch () {
      let params = {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        StartTime: this.start_time,
        EndTime: this.end_time,
        CountryId: this.form.country,
        OrderNo: this.form.OrderNo,
        Title: this.form.name,
      }
      // console.log(params)
      this.loading = true
      this.$http.get('/SettlementCenter/Search', { params }).then(res => {
        // console.log(res)
        this.items = res.Data
        this.total = res.Total
        this.loading = false
      }).catch(err => {
        this.loading = false
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
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSearch()
    }
  },
  watch: {
  },
  mounted () {
    this.get_country()
    this.onSearch()
  }
}
</script>

<style lang="less">
.add {
  background-color: #fff; color: rgb(70, 161, 255); border: solid 1px rgb(215, 215, 215);
  font-size: 14px;
  height: 60px;
  margin-bottom: 28px;;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
}
.thumb {
  background-color: #ccc;
  width: 48px; height: 48px;
  margin-right: 8px;
  flex-shrink: 0;
}
.gray { color: #aaa;}
.red { color: #C00017;}

.store-form {
  .el-dialog__header {
    background-color: rgba(234, 243, 253, 1);
    border-bottom: solid 1px rgba(215, 215, 215, 1);
    font-size: 16px; height: 59px; line-height: 59px;
    text-align: center; padding: 0;
  }
  .el-dialog__body { padding: 32px;}

  .el-form-item__label {
    line-height: 32px;
  }
  .el-input {
    line-height: 32px;
  }
  .el-input__inner {
    height: 32px; line-height: 32px; border-radius: 0;
  }
  .el-button--primary {
    width: 93px; height: 32px;
    padding: 0; border-radius: 0;
    margin-left: 20px;
  }
}
</style>