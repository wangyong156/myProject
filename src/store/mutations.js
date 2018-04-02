export default {
  //token
  saveToken(state, payload) {
    localStorage.setItem('token', payload)
    state.token = payload
  },
  //register phone
  saveRegisterPhone(state, payload) {
    state.phone = payload
  },
  saveBankList(state, payload) {
    localStorage.setItem('bankList', payload)
    state.token = payload
  }
}
