import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './backend/axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
