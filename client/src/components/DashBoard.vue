<template>
  <div>
    {{ name }} - {{ email }}
  </div>
</template>

<script>
import axios from 'axios'
import UserService from '../Service/users'

export default {
  data(){
    return{
      name: 'null',
      email: 'null'
    }
  },

  async created() {
      try{
          //let res = await UserService.getMe()
          //console.log(res)
          //this.$store.state.user = res
          this.name = this.$store.state.user.name
          this.email = this.$store.state.user.email
          //this.$store.state.tokenId = localStorage.getItem('xauthtoken')
      } catch(err) {
          console.log(err)
      }
  }
}
</script>

<style>

</style>