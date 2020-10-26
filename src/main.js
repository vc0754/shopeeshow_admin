import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import ui from '@/ui'

import App from './App.vue'
import Axios from '@/plugins/axios'

Vue.use(Axios)

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  i18n,
  ui,
  render: h => h(App),
}).$mount('#app')

export default vue