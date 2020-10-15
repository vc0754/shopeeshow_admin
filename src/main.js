import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import ui from '@/ui'

import App from './App.vue'
import Axios from '@/plugins/axios'

Vue.use(Axios)

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  ui,
  render: h => h(App),
}).$mount('#app')

export default vue