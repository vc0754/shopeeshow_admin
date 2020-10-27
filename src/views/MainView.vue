<template>
  <section class="wrap_center">
    <h3 class="section_title">{{ $t('home') }}</h3>

    <div class="swipers">
      <img alt="" src="../assets/slider.png" >
    </div>

    <h3 class="section_title">{{ $t('operation_process') }}</h3>

    <el-row :gutter="46" class="row00">
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
    
    
    <h3 class="section_title">{{ $t('business_announcement') }}</h3>

    <div class="row">
      <div class="col_left">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <div class="link" @click="to_detail(item.Id)">
              <p>{{ item.Title }}</p>
              <span>{{ item.CreateTime | date }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="col_right">
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
      <p>{{ $t('contact_email') }}： 888888@gmail.com</p>
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
    query () {
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
    query2() {
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
    this.query()
    this.query2()
  }
}
</script>

<style lang="less" >
.swipers { background-color: rgba(70, 161, 255, 1); height: 292px;}

.row {
  display: flex;
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
    &:nth-child(4) { background-image: url('../assets/icon07.png');}
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
</style>