import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    sys, user
  },
  state: {
    recharge: false
  },
  mutations: {
    recharge (state, val) {
      state.recharge = val
    }
  },
  actions: {
    recharge ({ commit }, val) {
      commit('recharge', val)
    }
  }
})

export default store