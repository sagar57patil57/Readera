<template>
  <div id="header">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item" v-show="isAuth">
        <router-link to="/"><a class="nav-link">Home</a></router-link>
      </li>
      <li class="nav-item" v-show="isAuth">
        <router-link to="/me"><a class="nav-link">Dashboard</a></router-link>
      </li>
      <li class="nav-item" v-show="isAuth">
        <router-link to="/show/all"><a class="nav-link">List</a></router-link>
      </li>
      <li class="nav-item" v-show="isAuth">
        <router-link to="/story/add"><a class="nav-link">New Story</a></router-link>
      </li>
      <li class="nav-item" v-show="!isAuth">
        <router-link to="/signin"><a class="nav-link">Signin</a></router-link>
      </li>
      <li class="nav-item" v-show="!isAuth">
        <router-link to="/signup"><a class="nav-link">Signup</a></router-link>
      </li>
      <li class="nav-item" v-show="isAuth">
        <button class="btn btn-dark btn-sm" @click.prevent="logout">Logout</button>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import router from '../router'

export default {
  methods: {
    logout(){
      localStorage.removeItem('xauthtoken')
      this.$store.state.tokenId = null
      this.$store.state.user = {}
      router.replace('/signin')
    }
  },
  computed: {
    isAuth(){
      let tp = this.$store.state.user
      return Object.keys(tp).length !== 0
    }
  },
}
</script>

<style>

</style>
