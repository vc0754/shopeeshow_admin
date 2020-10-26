import Vue from 'vue'
import VueI18n from 'vue-i18n'

import i_zh_CN from './lang/zh-CN'
import i_en_US from './lang/en-US'

import iview_zh_CN from 'element-ui/lib/locale/lang/zh-CN'
import iview_en_US from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)
Vue.locale = () => {}

const i18n = new VueI18n({
  locale: localStorage.getItem('language') || navigator.language || 'zh-CN',
  messages: {
    'zh-CN': Object.assign(i_zh_CN, iview_zh_CN),
    'en-US': Object.assign(i_en_US, iview_en_US),
  },
  silentTranslationWarn: true
})

// i18n
// "wish_you_good_luck": "Wishing You a Year of Prosperity. <br /> Good Fortune Starts Here!"
// p(v-html='$t("message.wish_you_good_luck")')

Vue.prototype._i18n = i18n

export default i18n