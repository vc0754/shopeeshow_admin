import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN'
export const USER_SIGNOUT = 'USER_SIGNOUT'

export default {
  state: JSON.parse(sessionStorage.getItem('user')) || {
    webToKen: ''
  },
  getters: {
    is_sign(state) {
      return Boolean(state.webToKen)
    },
  },
  mutations: {
    [USER_SIGNIN] (state, user) {
      Object.assign(state, user)
      sessionStorage.setItem('user', JSON.stringify(state))
    },
    [USER_SIGNOUT] (state) {
      sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
      this.state.user = { webToKen: '' }
    }
  },
  actions: {
    [USER_SIGNIN] ({ commit }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT] ({ commit }) {
      commit(USER_SIGNOUT)
    }
  }
}