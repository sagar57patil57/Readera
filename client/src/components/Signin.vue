<template>
  <div class="container-fluid">
      <br>

    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">

            <!-- error started -->
            <transition name="fade">
                <div class="alert alert-danger alert-dismissible" v-show="error">
                    <button type="button" class="close" data-dismiss="alert" @click="error = !error">&times;</button>
                        {{ error }}
                </div>
            </transition>
        <!-- error ended -->

            <form method="post">
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="handleSignin">Submit</button>
            </form>

        </div>
        <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserService from '../Service/users'
import router from '../router'

export default {
  data(){
    return {
        email: '',
        password: '',
        error: ''
    }
    },
  methods: {
    async handleSignin() {
        let user = {
            email: this.email,
            password: this.password
        }
        this.$store.dispatch('signinUser', user)
    }
  }
}
</script>

<style>
    
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 2s;
    }
    .fade-leave{
        /* */
    }
    .fade-leave-active{
        transition: opacity 0s;
        opacity: 0;
    }

</style>