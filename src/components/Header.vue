<template>
  <b-navbar class="navbar" toggleable>
    <b-navbar-brand to="/" class="navbar-title">Recipes App</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse class="navbar-collapse" id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item v-if="isLoggedIn" to="/recipes">Recipes</b-nav-item>
        <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import { userMixin } from '../mixins/userMixin';
  export default {
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    },
    mixins: [
      userMixin
    ]
    // ! umesto computed-a, sada koristimo mixin iz userMixin-a
    // computed: {
    //   ...mapState(['userProfile']),
    //   isLoggedIn() {
    //     return Object.keys(this.userProfile).length > 1
    //   }
    // }
  }
</script>

<style scoped>
  * {
    font-family: 'Indie Flower', cursive;
    font-size: 35px;
    font-weight: bold;
  }
  .navbar {
    background: rgb(248, 192, 107);
  }
  .navbar-title {
    color: rgb(54, 54, 54);
  }
  .navbar-collapse {
    color: rgb(54, 54, 54);
  }
</style>
