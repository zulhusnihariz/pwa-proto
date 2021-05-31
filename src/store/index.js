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
    isLoggedIn: false,
    startTime: null,
    endTime: null,
    covidData: []
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
    },
    setStartTime(state, startTime) {
      state.startTime = startTime;
    },
    setEndTime(state, endTime) {
      state.endTime = endTime;
    },

    setCovidData(state, covidData) {
      state.covidData = covidData;
    }
  },

  actions: {
    setUser({ commit }) {
      commit("setUser");
    },
    resetUser({ commit }) {
      commit("resetUser");
    },
    setStartTime({ commit }, startTime) {
      commit("setStartTime", startTime);
    },
    setEndTime({ commit }, endTime) {
      commit("setEndTime", endTime);
    },
    setCovidData({ commit }, covidData) {
      commit("setCovidData", covidData);
    }
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getStartTime(state) {
      return state.startTime;
    },
    getEndTime(state) {
      return state.endTime;
    },
    getCovidData(state) {
      return state.covidData;
    }
  }
});

export default store;
