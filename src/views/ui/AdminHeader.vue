<template>
  <header class="header">
    <div class="flex flex-grow">
      <img src="../../assets/toggle.svg" alt="" class="" />
      <span class="fs-12 m-l-10" style="color:#333;">{{ $t('brand') }}</span>
    </div>
    <div class="flex">
      <ul class="opt">
        <li class="" @click="lang">
          <img :src="icon1[isOver1]" style="cursor: pointer;" @mouseover="isOver1 = 1" @mouseleave="isOver1 = 0" />
          <span>{{ lan }}</span>
        </li>
        <!-- <li class="m-l-25">
          <img :src="icon2[isOver2]" style="cursor: pointer;" @mouseover="isOver2 = 1" @mouseleave="isOver2 = 0" />
          <span>{{ $t('setting') }}</span>
        </li> -->
        <li class="m-l-25" @click="logout">
          <img :src="icon3[isOver3]" style="cursor: pointer;" @mouseover="isOver3 = 1" @mouseleave="isOver3 = 0" />
          <span>{{ $t('quit') }}</span>
        </li>
      </ul>
      <span class="fs-12 m-l-25">{{ user.username }}</span>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_SIGNOUT } from '@/store/modules/user'
export default {
  name: 'AdminHeader',
  data () {
    return {
      isOver1: 0,
      isOver2: 0,
      isOver3: 0,
      icon1: [
        require('../../assets/lan.svg'),
        require('../../assets/lan2.svg'),
      ],
      icon2: [
        require('../../assets/setting.svg'),
        require('../../assets/setting2.svg'),
      ],
      icon3: [
        require('../../assets/quit.svg'),
        require('../../assets/quit2.svg'),
      ]
    }
  },
  computed: mapState({
    user: state => state.user,
    lan() {
      let lan = localStorage.getItem('language') || navigator.language || 'zh-CN';
      if (lan === 'zh-CN') {
        return this.$t('lan.english')
      } else {
        return this.$t('lan.chinese')
      }
    }
  }),
  methods: {
    ...mapActions([ USER_SIGNOUT ]),
    lang() {
      // let lans = []
      let lan = localStorage.getItem('language') || navigator.language || 'zh-CN';
      if (lan === 'zh-CN') {
        this._i18n.locale = 'en-US';
        // locale.use(enLocale)
        localStorage.setItem('language', 'en-US')
      } else {
        this._i18n.locale = 'zh-CN';
        localStorage.setItem('language', 'zh-CN')
      }
      // $.cookie("language", this._i18n.locale === "" ?this._i18n.locale = "zh-CN" : this._i18n.locale,{ expires: 1, path: '/' });
    },
    logout() {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/sign' })
    }
  }
}
</script>

<style lang="less" scoped>
.opt {
  font-size: 11px;
  display: flex;
  li {
    position: relative;
    span {
      white-space: nowrap;
      visibility: hidden;
      position: absolute; left: 50%; top: 22px;
      transform: translate3d(-50%, 0, 0);
    }
    &:hover {
      span { visibility: visible;}
    }
  }
}
</style>