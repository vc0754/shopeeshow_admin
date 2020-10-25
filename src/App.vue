<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'
import { SYS_REG } from '@/store/modules/sys'
export default {
  name: 'App',
  methods: {
    ...mapActions([SYS_REG]),
    query() {
      this.$http.get('/Config/GetBrandConfig').then(res => {
        this.$store.dispatch(SYS_REG, {
          logo: `http://${res.Data.Logo}`,
          site: res.Data.Name
        })
      })
    }
  },
  mounted() {
    this.query()
  }
}
</script>