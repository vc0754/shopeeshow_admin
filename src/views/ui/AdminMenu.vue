<template>
  <nav>
    <header class="nav-header">
      <router-link to="/" class="brand">
        <img alt="" src="../../assets/logo.png">
        <span>嘻街后台管理系统</span>
      </router-link>
    </header>

    <el-menu default-active="1" @open="handleOpen" @close="handleClose" router class="p-t-20">

      <el-menu-item index="/">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>APP 管理</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/setting">APP 设置</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
        <i class="el-icon-setting"></i>
          <span>数据统计</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/statistics">数据账单</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
        <i class="el-icon-setting"></i>
          <span>用户管理</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/users">普通用户</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
        <i class="el-icon-setting"></i>
          <span>订单管理</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/orders">淘宝订单</el-menu-item>
        <el-menu-item style="padding-left:50px;" index="/orders">拼多多订单</el-menu-item>
        <el-menu-item style="padding-left:50px;" index="/orders">京东订单</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
        <i class="el-icon-setting"></i>
          <span>账号管理</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/account">淘宝账号</el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
        <i class="el-icon-setting"></i>
          <span>提现管理</span>
        </template> 
        <el-menu-item style="padding-left:50px;" index="/withdrawal/setting">提现设置</el-menu-item>
        <el-menu-item style="padding-left:50px;" index="/withdrawal">提现列表</el-menu-item>
      </el-submenu>
      
      <div class="line"></div>

      <template v-for="(item, index) in menus">
        <el-submenu :index="`sub_${index}`" :key="index" v-if="item.children.length">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-if="item.children.length">
            <el-menu-item style="padding-left:50px;" :index="subitem.path" v-for="(subitem, index2) in item.children" :key="index2">{{ subitem.meta.title }}</el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item :index="item.path" :key="index" v-else>
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
      
      

    </el-menu>
  </nav>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      menus: []
    }
  },
  computed: {
  },
  methods: {
    query () {
      this.$http.post('/api/Authority/Menu').then(res => {
        this.menus = res.data
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.query()
  }
}
</script>

<style lang="less" scoped>
.line { border-bottom: solid 1px rgba(0,0,0,0.24); margin: 15px 0;}
</style>