import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

const url = 'http://localhost:3000/api'

export const store = new Vuex.Store({

    state: {
        tokenId: null,
        user: {},
        stories: [],
        currentStory: {},
        currentPart: {}
    },

    getters: {
        fun: (state) => {
            return state.x
        },
        getStories: (state) => {
            return state.stories
        },
        getFullStory: (state) => {
            console.log("CURRENTSTORY", state.currentStory)
            return state.currentStory
        },
        isCurrentUser: (state) => {
            console.log(state.currentStory.user_id == state.user._id)
            return state.currentStory.user_id == state.user._id
        },

        getFullPart: (state) => {
            return state.currentPart
        }
    },

    mutations: {
        authUser: (state, payload) => {
            state.tokenId = payload.tokenId
            state.user = payload.user
        },

        addStory: (state, payload) => {
            state.stories.push(payload)
        },

        addPart: (state, payload) => {
            state.currentStory.parts.push(payload)
        },

        setStories: (state, payload) => {
            state.stories = payload
            console.log("Thike", state.stories)
        },

        setCurrentStory: (state, payload) => {
            state.currentStory = payload
        },

        addComment: (state, payload) => {
            state.currentStory.comments.push(payload)
        },

        setFullPart: (state, payload) => {
            state.currentPart = payload
        },

        liked: (state, payload) => {
            state.currentStory.numberOfLikes = state.currentStory.numberOfLikes+1
        }
    },

    actions: {
        signupUser({commit, dispatch}, payload) {
            console.log("ACTION_signup", payload)
            axios.post(url + '/users', payload)
                 .then(res => {
                    commit('authUser', { tokenId: res.data.token, user: res.data.obj })
                    console.log("resdata", res.data)
                    localStorage.setItem('xauthtoken', res.data.token)
                    router.replace('/me')
                 })
                 .catch((err) => {
                    //this.error = 'Invalid data'
                    console.log(err)
                 })
        },

        signinUser({commit, dispatch}, payload) {
            axios.post(url + '/auth', payload)
                 .then(res => {
                    commit('authUser', { tokenId: res.data.token, user: res.data.obj })
                    localStorage.setItem('xauthtoken', res.data.token)
                    router.replace('/me')
                 })
        },

        addStory({commit, dispatch}, payload) {
            axios.post(url + '/story/add', payload)
                 .then(res => {
                    console.log("Hi", res.data)
                    commit('addStory', res.data)
                 })
            router.replace('/')
        },

        getStories({ commit, state }) {
            axios.get(url + '/story/all')
                 .then(res => {
                    console.log("BROCK", res.data.stories)
                    commit('setStories', res.data.stories)

                 })
        },

        getFullStory({commit, dispatch}, payload) {
            console.log("PAYLOAD", payload)
            axios.get(url + '/story/' + payload)
                 .then(res => {
                    console.log("NEW", res.data.stories[0])
                    commit('setCurrentStory', res.data.stories[0])

                 })
        },

        addComment({commit, state}, payload) {
            //console.log(payload.id, state.user.name, payload.commentText)
            const data = { userName:state.user.name, comment:payload.commentText }
            axios.post(url + '/story/comment/' + payload.id, data)
                 .then(res => {
                    console.log("Hi", res.data)
                    commit('addComment', data)
                 })
        },

        addPart({commit, state}, payload) {
            axios.post(url + '/story/' + payload.sid, payload.part)
                 .then(res => {
                    console.log("Hi", res.data)
                    commit('addPart', payload.part)
                 })

            router.replace('/story/' + payload.sid)
        },

        getFullPart({commit, dispatch}, payload) {
            axios.get(url + '/story/' + payload.sid + '/' + payload.pid)
                 .then(res => {
                    commit('setFullPart', res.data.stories)

                 })
        },

        deleteStory({commit, dispatch}, payload) {
            axios.delete(url + '/story/' + payload.id)
                 .then(res => {
                    commit('deleteStory')
                    console.log("done delete")
                 })

            router.replace('/')
        },

        like({commit, state}, payload) {
            axios.post(url + '/story/like/' + payload.id, { uID:state.user._id})
                 .then(res => {
                    if(res.data.mssg === 'INC'){
                        commit('liked')
                    }
                    console.log("like", res.data)
                 })
        }
    }

})