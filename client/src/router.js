import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignInRegister from './views/SignInRegister'
import Game from './views/Game.vue'

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

      path : '/game',
      name: 'game',
      component : Game
    },
    {
      path: '/member-area',
      name: 'SignInRegister',
      component: SignInRegister
    }
  ]
})
