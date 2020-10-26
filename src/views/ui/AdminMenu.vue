<template>
  <nav>
    <header class="nav-header">
      <router-link to="/" class="brand">
        <img alt="" :src="sys.logo">
      </router-link>
    </header>
    
    <div class="color_block"></div>

    <el-menu :default-active="default_active" router class="p-t-20" :collapse="isCollapse">

      <el-menu-item :index="item.url" v-for="(item, index) in menus" :key="index">
        <div slot="title">
          <img alt="" :src="item.icon">
          <span>{{ item.label }}</span>
        </div>
      </el-menu-item>

      <!-- <el-menu-item index="/transition">
        <i class="el-icon-setting"></i>
        <span slot="title">支付流水</span>
      </el-menu-item> -->
    </el-menu>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdminMenu',
  data () {
    return {
      isCollapse: false,
      menus: [
        {
          url: '/',
          icon: require('../../assets/home.svg'),
          label: this.$t('nav.shouye')
        },
        {
          url: '/store/list',
          icon: require('../../assets/store.svg'),
          label: this.$t('nav.dianpuguanli')
        },
        {
          url: '/task/list',
          icon: require('../../assets/task.svg'),
          label: this.$t('nav.renwuguanli')
        },
        {
          url: '/settlement',
          icon: require('../../assets/settlement.svg'),
          label: this.$t('nav.jiesuanzhongxin')
        },
        {
          url: '/transition',
          icon: require('../../assets/trans2.svg'),
          label: this.$t('nav.zhifuliushui')
        }
      ]
    }
  },
  computed: mapState({
    sys: state => state.sys,
    default_active() {
      return `${window.location.pathname}${window.location.search}` || '/'
    }
  }),
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.line { border-bottom: solid 1px rgba(0,0,0,0.24); margin: 15px 0;}
</style>