import Vue from 'vue'
import VueRouter from 'vue-router'
import TGuard from './services/middleware'
Vue.use(VueRouter)


import Signup from './components/Signup.vue'
import Signin from './components/Signin.vue'
import Home from './components/Home.vue'
import DashBoard from './components/DashBoard.vue'
import Addpart from './components/Addpart.vue'
import Addstory from './components/Addstory.vue'
import Liststories from './components/Liststories.vue'
import Fullstory from './components/Fullstory.vue'
import Fullpart from './components/Fullpart.vue'

const routes = [
    { path:"/", component:Home },
    { path:"/story/:thesid/part", component:Addpart },
    { path:"/story/add", component:Addstory },
    { path:"/story/all", component:Liststories },
    { path:"/story/:sid", component:Fullstory },
    { path:"/story/:fullsid/:fullpid", component:Fullpart },
    { path:"/signin", component:Signin, beforeEnter: TGuard.guest },
    { path:"/signup", component:Signup },
    { path:"/me", component:DashBoard }
]

export default new VueRouter({mode: 'history', routes})