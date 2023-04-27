<template>
  <div id="app">
    <Navbar v-if="logged" id="app-navbar" :logo="logo_src" :alt="app_name" @logout="logout"/>
    <router-view id="routerView" @login="login"/>
    <Footer v-if="logged" id="app-footer"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import router from './router'
import store from './config/store'
import { mapState } from "vuex";

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        logo_src: '/img/logo-black.png',
        app_name: 'Viga Serviços'
      }
    },
    methods: {
      login() {
        store.commit('setLogged', true)
        router.push('/home')
        
      },
      logout() {
        store.commit('setLogged', false)
        router.push(`/`)
      },
    },
    computed: mapState(['logged']) 
  }

</script>

<style>

  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    display: flex;
    min-height: 250px;
  }

  h2 {
    font-size: 20px;
  }

</style>
