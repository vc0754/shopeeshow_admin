<template>
  <section class="wrap_center">
    <h3 class="section_title">首页</h3>

    <div class="swipers">
      <img alt="" src="../assets/slider.png" >
    </div>

    <h3 class="section_title">操作流程</h3>

    <el-row :gutter="46" class="row00">
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon01.png" class="icon">
          <div class="flex flex-column">
            <span>商家绑定店铺</span>
            <span>店铺审核通过</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon02.png" class="icon">
          <div class="flex flex-column">
            <span>商家发布任务</span>
            <span>设置任务要求</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon03.png" class="icon">
          <div class="flex flex-column">
            <span>支付结算</span>
            <span>核对订单并打款</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block_wrap">
          <img alt="" src="../assets/icon04.png" class="icon">
          <div class="flex flex-column">
            <span>任务完成</span>
          </div>
        </div>
      </el-col>
    </el-row>
    
    
    <h3 class="section_title">商家公告</h3>

    <div class="row">
      <div class="col_left">
        <ul>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
          <li>
            <router-link to="/news/detail/1">
              <p>【关于返款服务费的调整公告】</p>
              <span>2020/09/30</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col_right">
        <div class="card card_add" @click="goto('/task/add')">
          <div class="flex">
            <img src="../assets/rocket.png" alt="" class="rocket">
            <div class="flex flex-grow flex-y-center">
              <div class="flex flex-grow flex-column flex-x-center flex-y-bottom">
                <p class="fs-28 m-b-5">发布任务</p>
                <p>Create Tasks</p>
              </div>
              <img src="../assets/arrow_right.svg" alt="" style="width: 18px; height: 32px; margin-bottom: 18px; margin-left: 15px;">
            </div>
          </div>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">12</span>个任务</p>
          <p class="flex" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">24小时内未返款可能导致买手退款
          </p>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">8</span>个任务</p>
          <p class="flex" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">7天内被平台驳回的任务数
          </p>
        </div>

        <div class="card">
          <p class="fs-18 m-b-10"><span class="num m-r-5">6</span>个订单</p>
          <p class="flex" style="color:#aaa;">
            <img src="../assets/alert.svg" alt="" class="m-r-10">当前所有支付被驳回的订单数
          </p>
        </div>
      </div>
    </div>

    <footer>
      <p>一站式商家营销平台  |  Shopee Show</p>
      <p>联系邮箱： 888888@gmail.com</p>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'MainView',
  components: {},
  data () {
    return {
      data: {}
    }
  },
  computed: {
  },
  methods: {
    query () {
      this.$http.post('/api/Home/GetTotalStatistics').then(res => {
        this.data = res.data
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    },
    goto(path) {
      this.$router.push(path)
    }
  },
  watch: {
  },
  mounted () {
    // this.query()
  },
  beforeCreate () {
  },
  beforeDestroy() {
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
        a {
          color: #333;
          height: 50px; padding: 0 25px; margin-bottom: 10px;
          display: flex; justify-content: space-between; align-items: center;
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