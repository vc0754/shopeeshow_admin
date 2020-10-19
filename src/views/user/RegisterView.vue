<template>
  <div class="login-wrapper">
    <div class="login-container">
      <Register />
    </div>
  </div>
</template>

<script>
import Register from '@/components/Register'
export default {
  name: 'RegisterView',
  components: {
    Register
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  background-color: rgba(70, 161, 255, 1);
  width: 100%; height: 100%;
  position: absolute;
}
.login-container {
  position: absolute; left: 50%; top: 50%;
  transform: translate3d(-50%, -64%, 0);
}
</style>
