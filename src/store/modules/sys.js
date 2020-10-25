
export const SYS_REG = 'SYS_REG'

export default {
  state: JSON.parse(sessionStorage.getItem('system')) || {
    logo: ''
  },
  mutations: {
    [SYS_REG] (state, sys) {
      Object.assign(state, sys)
      sessionStorage.setItem('system', JSON.stringify(state))
    }
  },
  actions: {
    [SYS_REG] ({ commit }, sys) {
      commit(SYS_REG, sys)
    }
  }
}