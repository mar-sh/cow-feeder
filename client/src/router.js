import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignInRegister from './views/SignInRegister'
import Room from './views/Room.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/room/:roomID',
      name: 'room',
      component: Room
    },
    {
      path: '/member-area',
      name: 'SignInRegister',
      component: SignInRegister
    }
  ]
})
