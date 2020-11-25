import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as app from './../api.js';

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
    allCourses(state, payload) {
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
    userCourses(state, payload) {
      state.allCourses = payload;
    },
  },
  actions: {
    async login({dispatch},payload){
        await app.instance.get('/sanctum/csrf-cookie');
        await app.instance.post('/login',payload);
    },
    async logout({dispatch},payload){
        try{
            await app.instance.get('/sanctum/csrf-cookie');
            await app.instance.post('/login',payload);
        }catch(error){
            console.log(error);
        }
    },
    async register({dispatch},payload){
        try{
            await app.instance.get('/sanctum/csrf-cookie');
            await app.instance.post('/login',payload);
        }catch(error){
            console.log(error);
        }
    },
    async setUser({commit}) {
        try{
            let response = await app.instance.get('/api/user');
            commit("setAuthenticated", true);
            commit("setUser", response.data);
        }catch{
            commit("setAuthenticated",false);
        }
    },
    allCourses({commit},payload){
        app.instance.get('/api/courses' + payload).then(response=>{
            commit("setCourses", response.data);
        }).catch(() => {
            commit("setCourses", false);
        });
    },
    setStudyGroups({commit},payload){
        app.instance.get('/api/studygroups/'  + payload.id).then(response=>{
            commit("setStudyGroups", response.data);
        }).catch(() => {
            commit("setStudyGroups", false);
        });
    },
    async findStudyGroup({commit},payload){
        try{
            let response = app.instance.get(`/api/studygroups/${payload.id}/${payload.params}`);
            commit("setStudyGroups", response.data);
        }catch{
            commit("setStudyGroups", false);
        }
    },
    async schoolSearch({state,commit},payload){
        try{
            let response = await app.instance.get('/api/schools/search/' + payload);
            console.log(response);
            commit("setSchools", response.data);
        }catch{
            commit("setSchools",false);
        }
    },
    async userCourses({state,commit},payload){
       let response = await app.instance.get('/api/courses/search/' +  state.user.school_id);
       commit("userCourses", response.data);
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
