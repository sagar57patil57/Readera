<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>

import TheHeader from './components/TheHeader.vue'
import axios from 'axios'
import UserService from './Service/users'

export default {
  name: 'app',
  components: {
    'the-header': TheHeader
  },
  async created() {
      try{
          let res = await UserService.getMe()
          console.log(res)
          this.$store.state.user = res
          this.name = res.name
          this.email = res.email
          this.$store.state.tokenId = localStorage.getItem('xauthtoken')
      } catch(err) {
          console.log(err)
      }
  }
}
</script>

<style>
a:hover{
        text-decoration: none;
    }
</style>
