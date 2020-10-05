import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//const url = "https://icanhazdadjoke.com";
//const headers = { Accept: "application/json" };

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default new Vuex.Store({
  state: {
    authenticated: false,
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload;
    }
  },
  actions: {
    setAuthenticated(state) {
        axios.get('/api/user').then(response=>{
            state.commit("setAuthenticated", true);
        }).catch(() => {
            state.commit("setAuthenticated", false);
        });
    }
  },
  getters: {
    getAuthenticated: state => state.authenticated,
  }
});
