<template>
  <header class="header">
    <div class="flex flex-grow">
      <img src="../../assets/toggle.svg" alt="" class="" />
      <span class="fs-12 m-l-10" style="color:#333;">{{ $t('brand') }}</span>
    </div>
    <div class="flex flex-y-center">
      <div class="wallet_quick">
        <div class="balance">
          <img src="../../assets/wallet.png" alt="" class="" style="margin-right: 6px;" />
          <div class="flex flex-column flex-x-center">
            <span class="label">余额：</span>
            <div class="amount">
              <span class="number">{{ user.balance | price }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="balance2 flex flex-column">
          <!-- <div class="flex flex-y-center">
            <span class="label">充值审核中:</span>
            <div class="amount">
              <span class="number">0</span>
              <span>元</span>
            </div>
          </div> -->
          <div class="flex flex-y-center" style="justify-content: flex-end;">
            <span class="label">冻结:</span>
            <div class="amount">
              <span class="number">{{ user.frozen_balance | price }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="opt">
        <li class="" @click="recharge">
          <img :src="icon4[isOver4]" style="cursor: pointer;" @mouseover="isOver4 = 1" @mouseleave="isOver4 = 0" />
          <span>{{ $t('recharge') }}</span>
        </li>
        <li class="m-l-25" @click="lang">
          <img :src="icon1[isOver1]" style="cursor: pointer;" @mouseover="isOver1 = 1" @mouseleave="isOver1 = 0" />
          <span>{{ lan }}</span>
        </li>
        <li class="m-l-25">
          <img :src="icon2[isOver2]" style="cursor: pointer;" @mouseover="isOver2 = 1" @mouseleave="isOver2 = 0" />
          <span>{{ $t('setting') }}</span>
        </li>
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
import { USER_SIGNIN, USER_SIGNOUT } from '@/store/modules/user'
export default {
  name: 'AdminHeader',
  data () {
    return {
      isOver1: 0,
      isOver2: 0,
      isOver3: 0,
      isOver4: 0,
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
      ],
      icon4: [
        require('../../assets/cz.svg'),
        require('../../assets/cz.png'),
      ],
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
  filters: {
    price(str) {
      if (!str) return '0.00'
      return str.toFixed(2)
    }
  },
  methods: {
    ...mapActions([ USER_SIGNIN, USER_SIGNOUT ]),
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
    },
    recharge() {
      this.$store.dispatch('recharge', true)
    },
    get_user_info() {
      this.$http.get('User/GetInfo').then(res => {
        this.$store.dispatch(USER_SIGNIN, {
          balance: res.Data.Balance,
          frozen_balance: res.Data.FrozenBalance
        })
      }).catch(err => {
        console.log(err)
        // this.$message.error(err.data.message)
      })
    }
  },
  mounted () {
    this.get_user_info()
  }
}
</script>

<style lang="less" scoped>
.wallet_quick {
  margin-right: 50px;
  display: flex; align-items: center;
  .balance {
    font-size: 12px;
    display: flex;
    padding-right: 20px;
    .label {}
    .amount {
      padding-top: 2px;
      min-width: 70px;
      text-align: right;
      .number {
        font-size: 13px;
        padding-right: 3px;
      }
    }
  }
  .balance2 {
    font-size: 12px;
    .label {
      color: #fff;
      background-color: rgba(70, 161, 255, 1);
      border-radius: 3px;
      padding: 1px 5px; margin: 1px;
      text-align: right;
    }
    .amount {
      min-width: 50px;
      text-align: right;
      .number {
        color: #D9001B;
        padding-right: 3px;
      }
    }
  }
}
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