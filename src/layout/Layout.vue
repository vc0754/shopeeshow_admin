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