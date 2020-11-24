import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://68.183.127.208/app';

export default new Vuex.Store({
  state: {
    authenticated: null,
    courses:null,
    studygroups:null,
    schools:null,
    user:null,
    apple:'hey',
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
    async login({dispatch},payload){
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/login',payload);
    },
    async logout({dispatch},payload){
        try{
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login',payload);
        }catch(error){
            console.log(error);
        }
    },
    async register({dispatch},payload){
        try{
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login',payload);
        }catch(error){
            console.log(error);
        }
    },
    async setUser({commit}) {
        try{
            let response = await axios.get('/api/user');
            commit("setAuthenticated", true);
            commit("setUser", response.data);
        }catch{
            commit("setAuthenticated",false);
        }
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
    async allCourses({state,commit},payload){
       let response = await axios.get('/api/courses/search/' +  state.user.school_id);
       commit("allCourses", response.data);
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
