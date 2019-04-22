import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/firebase'
import swal from 'sweetalert'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    errorUsername: '',
    errorPassword: '',
    errorLogin: ''
  },
  mutations: {
    setUsernameError(state, payload) {
      state.errorUsername = payload
    },
    setPasswordError(state, payload) {
      state.errorPassword = payload
    },
    setId(state, payload) {
      state.id = payload
    },
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setErrorLogin(state, payload) {
      state.errorLogin = payload
    }
  },
  actions: {
    userRegistration({ commit }, { username, password  }) {
      const data = {
        username: username,
        password: password
      }

      firebase
        .collection("Users")
        .add(data)
        .then(({ data }) => {
          router.push('/')
          swal("Register berhasil!!", "Harap LOGIN terlebih dahulu untuk melanjutkan!!", "success")
        })
        .catch((err) => {
          if (response.data) {
            if (response.data.username != undefined) {
              commit('setUsernameError', response.data.username.message)
            } else {
              commit('setUsernameError', '')
            }

            if (response.data.password != undefined) {
              commit('setPasswordError', response.data.password.message)
            } else {
              commit('setPasswordError', '')
            }
          }
        })
    },
    userLogin({ commit }, { username, password }) {
      const data = {
        username: username,
        password: password
      }

      firebase
        .collection("Users")
        .onSnapshot(snapshot => {
          let users = [];
          snapshot.forEach(change => {
            users.push({ id: change.id, ...change.data() });
          });
          
          for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
              if (users[i].password == password) {
                commit('setUsername', users[i].username)
                router.push('/')
              } else {
                commit('setErrorLogin', 'Username atau Password anda salah')
              }
            } else {
              commit('setErrorLogin', 'Username atau Password anda salah')
            }
          }
        });
    },
    userLogout({ commit }) {
      localStorage.clear()
      commit('setId', '')
      commit('setIsLogin', false)
      commit('setUsername', '')
      commit('setRole', '')
      router.push('/')
      swal("Good Bye", "success")
    }
    
  },
  getters: {
    errorUsername(state) {
      return state.errorUsername
    },
    errorPassword(state) {
      return state.errorPassword
    },
    errorLogin(state) {
      return state.errorLogin
    },
    isUsername(state) {
      return state.username
    }
  }
})
