import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default new Vuex.Store({
  state: {
    authenticated: false,
    courses:null,
    studygroups:null,
    schools:null
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload;
    },
    setCourses(state, payload) {
      state.courses = payload;
    },
    setStudyGroups(state, payload) {
      state.studygroups = payload;
    },
    setSchools(state, payload) {
      state.schools = payload;
    },
  },
  actions: {
    setAuthenticated(state) {
        axios.get('/api/user').then(response=>{
            state.commit("setAuthenticated", true);
        }).catch(() => {
            state.commit("setAuthenticated", false);
        });
    },
    setCourses(state){
        axios.get('/api/courses').then(response=>{
            state.commit("setCourses", response.data);
        }).catch(() => {
            state.commit("setCourses", 'no');
        });
    },
    setStudyGroups(state){
        axios.get('/api/studygroups').then(response=>{
            state.commit("setStudyGroups", response.data);
        }).catch(() => {
            state.commit("setStudyGroups", 'no');
        });
    },
    setSchools(state){
        axios.get('/api/schools').then(response=>{
            state.commit("setSchools", response.data);
        }).catch(() => {
            state.commit("setSchools", 'no');
        });
    },

  },
  getters: {
    getAuthenticated: state => state.authenticated,
    getCourse(state) {
        return function (school_id) {
             return state.products.find(course => course.school_id == school_id);
        }
    },
  }
});
