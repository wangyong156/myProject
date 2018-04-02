import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state={
    token:'',
    bankList:'',
    pubkey:"-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/4z1XpxhDUUMR2FAVDivOoRlheMXrTG4MaAq718xdBOmhfCuQlj8o1X8c1eOGt3hnt3JlkLdYh6dPhVfOsD0nXD5Etpb2X8udw/TwKh70pS94hvysLcuKkjdQfIkx+c54YOtIXhc2Pxb6f0HhNhChgJDfz/Ygx67DP7w6XJB57QIDAQAB-----END PUBLIC KEY-----",
    phone:'',
   // commonkey:"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDK39UZuExZ/LydZzZxLlF57nrowot4ATvQnhMG+iq/6QO9URCjDT5WkeN77bkUGnxxQNz3lRFRLZzQNqB81lgtsfdh/K/pVKZ4oPzJTpMLOXbxxlHhfFNDYIvpF/TZx/mYEj7f3K7+HfNq/JRf4Fq8jgjQ8p2GL5j6uyiCYgdQywIDAQAB"
      commonkey:"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChMRzbRbNqutRD8DEa52AJP+eenq+hiOKMjAHZtyb50HCypTqyJoJBoZ8doLBoH84D/XUsLEafqMFwicl4JOmNc/Uix+Glq6lsVpvTo7foIpx6+yuujp8yoLIFixPwq3WHZAHUIeCmJx8JoRjDeNJVMrnP0HrHIZRM2ADEN8mE7QIDAQAB"
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
