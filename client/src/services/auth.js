import Vue from 'vue'
 
export default {
    user () {
        return this.$store.state.user
    },
 
    check () {
        return localStorage.getItem('xauthtoken') //get token from localStorage 
    }
}