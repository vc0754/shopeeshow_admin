<template>
  <header class="header">
    <div class="flex">
      <img src="../../assets/toggle.svg" alt="" style="cursor: pointer;" class="" />
      <span class="fs-12 m-l-10" style="color:#333;">店铺商家端管理后台</span>
    </div>
    <div class="flex">
      <img src="../../assets/lan.svg" alt="语言" style="cursor: pointer;" class="" />
      <img src="../../assets/setting.svg" alt="设置" style="cursor: pointer;" class="m-l-25" />
      <img src="../../assets/quit.svg" alt="退出登录" @click="logout" style="cursor: pointer;" class="m-l-25" />
      <span class="fs-12 m-l-25">{{ user.username }}</span>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_SIGNOUT } from '@/store/modules/user'
export default {
  name: 'AdminHeader',
  computed: mapState({ user: state => state.user }),
  methods: {
    ...mapActions([ USER_SIGNOUT ]),
    logout () {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/sign' })
    }
  }
}
</script>