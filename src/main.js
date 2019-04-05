import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  router,
  store,
  plainAxiosInstance,
  securedAxiosInstance,
  render: h => h(App)
}).$mount('#app')
