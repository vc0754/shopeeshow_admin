<template>
  <section class="wrap">
    <h3 class="section_title">公告详情</h3>
    
    <div class="wrap2">
      <h1>【关于返款服务费的调整公告】</h1>
      <div class="metas">
        商家公告 | 2019-10-10 11:15
      </div>
      <div class="wrap2_content">
        <p>AAAA</p>
        <p>BBBB</p>
      </div>
    </div>
    
  </section>
</template>


<script>
export default {
  name: 'DetailView',
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

<style lang="less" scoped>
.wrap2 {
  background-color: #fff;
  font-size: 14px;
  border: solid 1px rgb(215, 215, 215);
  padding: 50px;
  h1 { font-size: 26px; text-align: center; margin-bottom: 15px;}
  .metas { text-align: center; margin-bottom: 30px;}
  p { margin-bottom: 15px;}
}
</style>