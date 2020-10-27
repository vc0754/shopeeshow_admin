<template>
  <section class="wrap">
    <div class="goback" @click="goback">
      <img src="../../assets/back.svg" alt="">
      <span>{{ $t('goback') }}</span>
    </div>

    <h3 class="section_title">{{ $t('announcement_details') }}</h3>
    
    <div class="wrap2">
      <h1>{{ detail.Title }}</h1>
      <div class="metas">
        商家公告 | {{ detail.CreateTime | date }}
      </div>
      <div class="wrap2_content">
        {{ detail.Content }}
      </div>
    </div>
    
  </section>
</template>


<script>
import moment from 'moment'
export default {
  name: 'DetailView',
  components: {},
  data () {
    return {
      detail: {}
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
    goback() {
      this.$router.go(-1)
    }
  },
  watch: {
  },
  mounted () {
    this.detail = JSON.parse(sessionStorage.getItem('detail'))
    // sessionStorage.removeItem('detail')
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