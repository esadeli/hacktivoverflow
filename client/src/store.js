import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    err: '',
    userbasicinfo: {},
    listoftopics: [],
    detailobj: {}
  },
  mutations: {
    gettoken (state, payload) {
      state.token = payload
    },
    geterror (state, payload) {
      state.err = payload
    },
    getuserbasicinfo (state, payload) {
      state.userbasicinfo = payload
    },
    getlistoftopics (state, payload) {
      state.listoftopics = payload
    },
    getdetailobj (state, payload) {
      state.detailobj = payload
    }
  },
  actions: {
    loginobj (context, payload) {
      axios({
        method: 'POST',
        url: 'https://hacktivoverflow23api.efratsadeli.tech/user/login',
        data: payload
      })
        .then(user => {
          let token = user.data.token
          localStorage.setItem('token', user.data.token)
          context.commit('gettoken', user.data.token)
          context.commit('geterror', '')

          // get user basic info
          axios({
            method: 'GET',
            url: 'https://hacktivoverflow23api.efratsadeli.tech/users/getbasicinfo',
            headers: {
              token: token
            }
          })
            .then(info => {
              context.commit('getuserbasicinfo', info.data.data)
            })
            .catch(error => {
              console.log('ERROR Get User info ', error)
            })
        })
        .catch(error => {
          console.log('ERROR State Login----', error)
          context.commit('gettoken', '')
          context.commit('geterror', error.response.data)
        })
    },
    registerobj (context, payload) {
      axios({
        method: 'POST',
        url: 'https://hacktivoverflow23api.efratsadeli.tech/user/register',
        data: payload
      })
        .then(user => {
          let token = user.data.token
          localStorage.setItem('token', user.data.token)
          context.commit('gettoken', user.data.token)
          context.commit('geterror', '')

          axios({
            method: 'GET',
            url: 'https://hacktivoverflow23api.efratsadeli.tech/users/getbasicinfo',
            headers: {
              token: token
            }
          })
            .then(info => {
              context.commit('getuserbasicinfo', info.data.data)
            })
            .catch(error => {
              console.log('ERROR Get User info ', error)
            })
        })
        .catch(error => {
          console.log('ERROR State Register----', error)
          context.commit('gettoken', '')
          context.commit('geterror', error.response.data)
        })
    },
    logingoogle (context, payload) {
      axios({
        method: 'POST',
        url: 'https://hacktivoverflow23api.efratsadeli.tech/user/logingoogle',
        data: {
          googletoken: payload
        }
      })
        .then(user => {
          let token = user.data.token
          localStorage.setItem('token', user.data.token)
          context.commit('gettoken', user.data.token)
          context.commit('geterror', '')
          axios({
            method: 'GET',
            url: 'https://hacktivoverflow23api.efratsadeli.tech/users/getbasicinfo',
            headers: {
              token: token
            }
          })
            .then(info => {
              context.commit('getuserbasicinfo', info.data.data)
            })
            .catch(error => {
              console.log('ERROR Get User info ', error)
            })
        })
        .catch(error => {
          console.log('ERROR State Login Google ----', error)
          context.commit('gettoken', '')
          context.commit('geterror', error.response.data)
        })
    },
    logoutobj (context, payload) {
      context.commit('getuserbasicinfo', '')
      context.commit('gettoken', '')
      context.commit('geterror', '')
    },
    listoftopics (context, payload) {
      axios({
        method: 'GET',
        url: 'https://hacktivoverflow23api.efratsadeli.tech/topics/lists'
      })
        .then(topics => {
          context.commit('getlistoftopics', topics.data.data)
        })
        .catch(error => {
          console.log('ERROR Get list of topics', error)
        })
    },
    searchtopic (context, payload) {
      axios({
        method: 'POST',
        url: 'https://hacktivoverflow23api.efratsadeli.tech/topics/search',
        data: {
          keyword: payload
        }
      })
        .then(topics => {
          context.commit('getlistoftopics', topics.data.data)
        })
        .catch(error => {
          console.log('ERROR Get list of topics', error)
        })
    },
    getdetailobj (context, payload) {
      axios({
        method: 'GET',
        url: `https://hacktivoverflow23api.efratsadeli.tech/topics/${payload}`
      })
        .then(topic => {
          context.commit('getdetailobj', topic.data.data)
        })
        .catch(error => {
          console.log('ERROR Get detail topic', error)
        })
    }
  }
})
