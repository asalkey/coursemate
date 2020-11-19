import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default new Vuex.Store({
  state: {
    authenticated: null,
    courses:null,
    studygroups:null,
    schools:null,
    user:null,
    allCourses:null
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
    setUser(state, payload){
      state.user = payload;
    },
    allCourses(state, payload) {
      state.allCourses = payload;
    },
  },
  actions: {
    setAuthenticated(state) {
        axios.get('/api/user').then(response=>{
            state.commit("setAuthenticated", true);
            state.commit("setUser", response.data);
        }).catch(() => {
            state.commit("setAuthenticated", false);
        });
    },
    setCourses(state){
        axios.get('/api/courses').then(response=>{
            state.commit("setCourses", response.data);
        }).catch(() => {
            state.commit("setCourses", false);
        });
    },
    setStudyGroups({commit},payload){
        axios.get('/api/studygroups/'  + payload.id).then(response=>{
            commit("setStudyGroups", response.data);
        }).catch(() => {
            commit("setStudyGroups", false);
        });
    },
    setSchools(state){
        axios.get('/api/schools').then(response=>{
            state.commit("setSchools", response.data);
        }).catch(() => {
            state.commit("setSchools", 'no');
        });
    },
    allCourses({commit},payload){
        axios.get('/api/courses/search/' + payload.id).then(response=>{
            commit("allCourses", response.data);
        }).catch(() => {
            commit("allCourses", 'no');
        });
    },

  },
  getters: {
    getAuthenticated: (state) => state.authenticated,
    getCourse(state) {
        return function (school_id) {
             return state.products.find(course => course.school_id == school_id);
        }
    },
  }
});
