<template>
  <section class="wrap full-height">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item>淘宝账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="bg-white" style="padding: 50px 58px;">
      <h3 class="section_title">授权账号信息</h3>
      
      <div class="authTaobao" v-if="!is_auth">
        <el-button type="info">
          <img src="../../assets/icon_tb.png" alt="">
          淘宝账号登录授权
        </el-button>
        <div class="flex flex-y-center">
          <img src="../../assets/icon_click.png" alt="">
          <span>请点击授权</span>
        </div>
      </div>

      <div class="formTable taobaoTable" v-else>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="淘宝号" width="250"></el-table-column>
          <el-table-column prop="name" label="授权到期时间" width="230"></el-table-column>
          <el-table-column prop="address" label="渠道PID" width="350"></el-table-column>
          <el-table-column prop="address" label="是否开启渠道模式" width="220"></el-table-column>
          <el-table-column prop="address" label="授权剩余天数" width="220"></el-table-column>
          <el-table-column label="操作">
            <router-link to="/user/detail">更新授权</router-link>
            <router-link to="/user/detail" class="m-l-20">开启渠道模式</router-link>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  name: 'TaoBao',
  components: {},
  data () {
    return {
      is_auth: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
    }
  },
  watch: {
  },
  mounted () {
    // this.query()
  },
  beforeCreate() {
    document.getElementsByTagName('body')[0].className = `${document.getElementsByTagName('body')[0].className} setting_wrap`
  },
  beforeDestroy() {
    document.body.removeAttribute('class', 'setting_wrap')
  }
}
</script>