<template>
  <section class="wrap full-height">
    <div class="breadcrumb">
      <span>当前位置：</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>APP 管理</el-breadcrumb-item>
        <el-breadcrumb-item>APP 设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="bg-white formWrap">
      <el-form ref="form" :model="form" label-width="100px">
        <div>
          <el-form-item label="导师微信号：" style="margin-bottom: 28px;">
            <el-input value="VX-15691251344" style="width:480px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round>保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </section>
</template>

<script>
export default {
  name: 'SettingView',
  components: {},
  data () {
    return {
      form: {}
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
  mounted() {
    // this.query()
  },
  // beforeCreate() {
  //   document.getElementsByTagName('body')[0].className = `${document.getElementsByTagName('body')[0].className} setting_wrap`
  // },
  // beforeDestroy() {
  //   document.body.removeAttribute('class', 'setting_wrap')
  // }
}
</script>