<template>
  <header class="header">
    <span class="fs-14 m-r-25">{{ user.login_name }}</span>
    <img :src="require('../../assets/quit.png')" alt="退出登录" @click="logout" style="cursor: pointer;" />
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