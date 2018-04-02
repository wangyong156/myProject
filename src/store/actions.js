export default {
  //Token
  saveToken({commit}, payload) {
    commit('saveToken', payload)
  },
  //register phone
  saveRegisterPhone({commit}, payload) {
    commit('saveRegisterPhone', payload)
  },
  saveBankList({commit}, payload) {
    commit('bankList', payload)
  }
}
