<template>
  <nav>
    <header class="nav-header">
      <router-link to="/" class="brand">
        <img alt="" :src="sys.logo">
      </router-link>
    </header>
    
    <div class="color_block"></div>

    <el-menu default-active="1" router class="p-t-20">

      <el-menu-item index="/">
        <div slot="title">
          <img alt="" src="../../assets/home.svg">
          <span>首页</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/store/list">
        <div slot="title">
          <img alt="" src="../../assets/store.svg">
          <span>店铺管理</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/task/list">
        <div slot="title">
          <img alt="" src="../../assets/task.svg">
          <span>任务管理</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/settlement">
        <div slot="title">
          <img alt="" src="../../assets/settlement.svg">
          <span>结算中心</span>
        </div>
      </el-menu-item>

      <el-menu-item index="/transition">
        <div slot="title">
          <img alt="" src="../../assets/trans2.svg">
          <span>支付流水</span>
        </div>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdminMenu',
  data () {
    return {
      menus: []
    }
  },
  computed: mapState({ sys: state => state.sys }),
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.line { border-bottom: solid 1px rgba(0,0,0,0.24); margin: 15px 0;}
</style>