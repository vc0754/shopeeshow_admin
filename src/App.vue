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
          logo: res.Data.Logo,
          site: res.Data.Name
        });
        let link = document.querySelector('link[rel*="icon"]') || document.createElement("link")
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = res.Data.SmallLogo;
        document.getElementsByTagName("head")[0].appendChild(link);

        // console.log(link)
      })
    }
  },
  mounted() {
    this.query()
  }
}
</script>

<style lang="less">
// 上传文件
.upload-form {
  .el-dialog__header {
    background-color: rgba(243, 246, 249, 1);
    border-bottom: solid 1px rgba(215, 215, 215, 1);
    font-size: 16px; height: 59px; line-height: 59px;
    text-align: center; padding: 0;
  }
  .el-dialog__body { padding: 26px;}
  .el-button--primary {
    font-size: 18px;
    width: 120px; height: 42px;
    padding: 0; border-radius: 0;
  }
}
</style>