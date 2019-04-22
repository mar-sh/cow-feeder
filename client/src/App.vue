<template>
  <div id="app">
    <MainNavbar></MainNavbar>
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
import MainNavbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    MainNavbar
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
