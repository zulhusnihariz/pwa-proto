import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "firebase";
import "firebase/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    isLoggedIn: false
  },

  mutations: {
    setUser(state) {
      state.user = firebase.auth().currentUser;
      state.isLoggedIn = true;
    },

    resetUser(state) {
      firebase.auth().signOut();
      state.user = null;
      state.isLoggedIn = null;
    }
  },

  actions: {
    setUser({ commit }) {
      commit("setUser");
    },
    resetUser({ commit }) {
      commit("resetUser");
    }
  },

  getters: {
    getUser(state) {
      return state.user;
    }
  }
});

export default store;
