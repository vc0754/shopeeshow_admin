<template>
  <section class="wrap_center">
    <h3 class="section_title">{{ $t('home') }}</h3>

    <div class="swipers">
      <img alt="" src="../assets/slider.png" >
    </div>

    <h3 class="section_title">{{ $t('operation_process') }}</h3>

    <el-row :gutter="24" class="row00">
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon01.png" class="icon">
          <div class="flex flex-column">
            <span>{{ $t('business_binding_store') }}</span>
            <span>{{ $t('store_approved') }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon02.png" class="icon">
          <div class="flex flex-column">
            <span>{{ $t('business_release_task') }}</span>
            <span>{{ $t('set_task_requirements') }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon03.png" class="icon">
          <div class="flex flex-column">
            <span>{{ $t('payment_and_settlement') }}</span>
            <span>{{ $t('check_the_order_and_make_payment') }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon04.png" class="icon">
          <div class="flex flex-column">
            <span>{{ $t('mission_accomplished') }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <div class="row p-t-15 m-b-25">
      <div class="col_left_1" v-if="services.HeadPic">
        <h3 class="section_title">{{ $t('customer_service') }}</h3>
        <div class="service_panel">
          <div class="service_header">
            <div class="avatar">
              <img :src="services.HeadPic ? services.HeadPic : require('../assets/avatar.png')" alt="">
            </div>
            <div class="info">
              <p v-if="services.NickName">{{ services.NickName }}</p>
            </div>
          </div>
          <div class="service_content" v-if="services.Contact">
            <ul>
              <li v-for="(item, index) in services.Contact" :key="index">
                <a :href="item.Link" target="_blank" v-if="item.Link">
                  <div :class="`bg bg_${item.Type}`"></div>
                  <span class="icon" v-if="item.Type === 1">微信</span>
                  <span class="icon" v-if="item.Type === 2">Line</span>
                  <span class="icon" v-if="item.Type === 3">Whatsapp</span>
                  <span class="icon icon4" v-if="item.Type === 4">Facebook</span>
                  <div class="tip" v-if="item.Link">
                    <p>点我和我联系</p>
                  </div>
                  <div class="tip" v-else>
                    <p>点我扫一扫</p>
                    <p>Scan the QR code</p>
                  </div>

                  <div class="hover_show">
                    <img :src="item.QRCode" alt="">
                  </div>
                </a>
                <template v-else>
                  <div :class="`bg bg_${item.Type}`"></div>
                  <span class="icon" v-if="item.Type === 1">微信</span>
                  <span class="icon" v-if="item.Type === 2">Line</span>
                  <span class="icon" v-if="item.Type === 3">Whatsapp</span>
                  <span class="icon icon4" v-if="item.Type === 4">Facebook</span>
                  <div class="tip" v-if="item.Link">
                    <p>点我和我联系</p>
                  </div>
                  <div class="tip" v-else>
                    <p>点我扫一扫</p>
                    <p>Scan the QR code</p>
                  </div>

                  <div class="hover_show">
                    <img :src="item.QRCode" alt="">
                  </div>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col_left">
        <h3 class="section_title">{{ $t('business_announcement') }}</h3>
        <ul v-if="items.length">
          <li v-for="(item, index) in items" :key="index">
            <div class="link" @click="to_detail(item.Id)">
              <p>{{ item.Title }}</p>
              <span>{{ item.CreateTime | date }}</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div class="col_right p-t-60">
        <div class="card card_add" @click="goto('/task/add')">
          <div class="flex">
            <img src="../assets/rocket.png" alt="" class="rocket">
            <div class="flex flex-grow flex-y-center">
              <div class="flex flex-grow flex-column flex-x-center flex-y-bottom">
                <p class="fs-28 m-b-5">{{ $t('create_tasks') }}</p>
                <p>Create Tasks</p>
              </div>
              <img src="../assets/arrow_right.svg" alt="" style="width: 18px; height: 32px; margin-bottom: 18px; margin-left: 15px;">
            </div>
          </div>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">{{ counts.WaitPayCount }}</span>{{ $t('tasks') }}</p>
          <p class="flex flex-y-center" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">{{ $t('tip1') }}
          </p>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">{{ counts.TaskRejectCount }}</span>{{ $t('tasks') }}</p>
          <p class="flex flex-y-center" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">{{ $t('tip2') }}
          </p>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">{{ counts.PayRejectCount }}</span>{{ $t('tasks') }}</p>
          <p class="flex flex-y-center" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">{{ $t('tip3') }}
          </p>
        </div>
      </div>
    </div>

    <footer>
      <p>{{ $t('one_stop_shop_marketing_platform') }}  |  Shopee Show</p>
      <p>{{ $t('online_time') }}： 09：00 - 18：00</p>
    </footer>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      services: {},
      items: {},
      counts: {},
      PageIndex: 1,
      PageSize: 10
    }
  },
  filters: {
    date(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
  },
  methods: {
    GetVipContact() {
      this.$http.get('/Home/GetVipContact').then(res => {
        this.services = res.Data
      }).catch(err => {
        if (err.data && err.data.message) this.$message.error(err.data.message)
      })
    },
    NoticeList() {
      this.$http.get('/Home/NoticeList', {
        params: {
          PageIndex: this.PageIndex,
          PageSize: this.PageSize
        }
      }).then(res => {
        this.items = res.Data
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    },
    GetTaskState() {
      this.$http.get('/Home/GetTaskState').then(res => {
        this.counts = res.Data
      })
    },
    goto(path) {
      this.$router.push(path)
    },
    to_detail(id){
      let detail = this.items.find(item => item.Id === id)
      sessionStorage.setItem('detail', JSON.stringify(detail))
      this.$router.push(`/news/detail/${id}`)
    }
  },
  watch: {
  },
  mounted () {
    this.NoticeList()
    this.GetTaskState()
    this.GetVipContact()
  }
}
</script>

<style lang="less" >
.swipers { background-color: rgba(70, 161, 255, 1); height: 292px;}
.row {
  display: flex;
  .col_left_1 {
    width: 231px;
    margin-right: 20px;
  }
  .col_left {
    flex-grow: 1;
    padding-right: 30px;
    ul {
      margin-bottom: 20px;
      li {
        background-color: #fff; color: #333;
        font-size: 12px;
        .link {
          color: #333; cursor: pointer;
          height: 50px; padding: 0 25px; margin-bottom: 10px;
          display: flex; justify-content: space-between; align-items: center;
          &:hover {
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
  .col_right { width: 345px;}
  .card {
    font-size: 14px; color: #333;
    background-color: #fff; background-repeat: no-repeat; background-position: 92% 20px;
    border: solid 1px #eaeaea; padding: 25px; margin-bottom: 20px;
    .num { font-size: 36px;}
    &:nth-child(2) { background-image: url('../assets/icon05.png');}
    &:nth-child(3) { background-image: url('../assets/icon06.png');}
    &:nth-child(4) { background-image: url('../assets/icon07.png'); margin-bottom: 0;}
  }
  .card_add {
    color: #fff; background-color: rgba(70, 161, 255, 1); padding: 20px 25px 5px 0px;
    .fs-28 { overflow: hidden; white-space: nowrap;}
    cursor: pointer;
    .rocket { opacity: 0.28;}
    &:hover {
      background-color:rgba(62, 181, 232, 1);
    }
  }
}
footer {
  background-color: rgba(70, 161, 255, 1);
  color: #fff;
  font-size: 12px;
  height: 89px;
  display: flex; justify-content: center; align-items: center; flex-direction: column;
  p {
    margin-bottom: 10px;
    &:last-child { margin-bottom: 0;}
  }
}
.container main.wrapper .content { padding-bottom: 0;}

.service_panel {
  background-color: #fff;
  .service_header {
    background: url('../assets/avatar_bg.png') no-repeat center 90px;
    padding: 15px 15px 70px 20px;
    display: flex;
    .avatar { width: 64px; height: 64px; border-radius: 50%; overflow: hidden;
      img { width: 64px; height: 64px;}
    }
    .info {
      color: #555;
      font-size: 13px; line-height: 1.65;
      display: flex; flex-direction: column; justify-content: center;
      padding-left: 15px;
    }
  }
  .service_content {
    ul {
      padding: 0 15px 20px;
      li {
        padding: 25px 0;
        border-top: dashed 1px #eee;
        position: relative;
        cursor: pointer;

        .bg {
          background-repeat: no-repeat;
          background-position: right center;
          width: 100%; height: 100%;
          position: absolute; top: 0; left: 0;
          opacity: .4;
        }

        .bg_1 {
          background-image: url('../assets/service_01.png');
        }
        .bg_2 {
          background-image: url('../assets/service_02.png');
        }
        .bg_3 {
          background-image: url('../assets/service_03.png');
        }
        .bg_4 {
          background-image: url('../assets/service_04.png');
        }

        .icon {
          color: #fff;
          background-color: rgba(0, 195, 0, 0.98);
          font-size: 12px;
          padding: 3px 10px;
          border-radius: 6px;
          opacity: 1;
          transition: opacity 0.75s;
        }
        .icon4 {
          background-color: rgba(66, 95, 155, 1);
        }
        .tip {
          color: #aaa;
          font-size: 12px;
          padding: 8px 0 0;
          opacity: 1;
          transition: opacity 0.75s;
        }

        .hover_show {
          position: absolute; top: 10px; left: 0;
          opacity: 0;
          transition: opacity 0.75s;
        }
        &:hover {
          .icon { opacity: 0;}
          .tip { opacity: 0;}
          .hover_show { opacity: 1; }
        }
      }
    }
  }
}
</style>