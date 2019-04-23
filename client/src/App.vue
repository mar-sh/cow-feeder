<template>
  <div id="app">
    <MainNavbar v-if="this.$route.name !== 'room'"></MainNavbar>
    <div class="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MainNavbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    MainNavbar
  },
  methods: {
    ...mapMutations([
      'setIsLogin'
    ])
  },
  created() {
    if(localStorage.getItem('user')) {
      this.setIsLogin(true)
    } else {
      this.setIsLogin(false)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: #2c3e50;
  background-color: transparent !important;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  max-width: 100%;

}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
</style>
