import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import babelPolyfill from 'babel-polyfill'
import axios from 'axios'
import router from './router'

Vue.use(VueResource)
Vue.use(VueRouter)

axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.xauthtoken = localStorage.getItem('xauthtoken')
  return config
})
//axios.defaults.headers.common['xauthtoken'] = localStorage.getItem('xauthtoken')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
