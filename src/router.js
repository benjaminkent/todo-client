import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: "signup",
      component: SignUp
    }
  ]
})
