<template>
  <div id="app" class="fixed-header">
    <AdminMenu />
    <div class="container">
      <AdminHeader />
      <main class="wrapper">
        <div class="content">
          <router-view />
        </div>
      </main>
      <div class="quickmenus">
        <ul>
          <li>
            <img alt="" src="../assets/top.svg">
          </li>
          <li>
            <img alt="" src="../assets/client.svg">
          </li>
          <li>
            <img alt="" src="../assets/wechat.svg">
          </li>
          <li>
            <img alt="" src="../assets/education.svg">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminMenu from '@/views/ui/AdminMenu'
import AdminHeader from '@/views/ui/AdminHeader'
export default {
  name: 'app',
  components: {
    AdminMenu, AdminHeader
  }
}
</script>

<style lang="less" scoped>
.quickmenus {
  background-color: #fff;
  position: fixed; right: 3px; bottom: 180px; z-index: 999;
  ul {
    border: solid 1px rgba(234, 234, 234, 1);
    li {
      width: 46px; height: 42px;
      border-bottom: solid 1px rgba(234, 234, 234, 1);
      display: flex; justify-content: center; align-items: center;
      cursor: pointer;
      &:first-child { background-color: rgba(70, 161, 255, 1);}
      &:last-child { border-bottom: none;}
    }
  }
}
</style>