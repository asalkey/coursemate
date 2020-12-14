import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as app from './../api.js';

export default new Vuex.Store({
  state: {
    authenticated: null,
    userCourses:null,
    studygroups:null,
    schools:null,
    user:null,
    allCourses:null,
    hasStudyGroups:null,
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload;
    },
    allCourses(state, payload) {
      state.allCourses = payload;
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
      state.userCourses = payload;
    },
    hasStudyGroups(state,payload){
      state.hasStudyGroups = payload;
    }
  },
  actions: {
    async login({dispatch},payload){
        await app.instance.get('/sanctum/csrf-cookie');
        await app.instance.post('/login',payload);
        return dispatch('setUser');

    },
    async logout({dispatch},payload){
        await app.instance.get('/sanctum/csrf-cookie');
        await app.instance.post('logout',payload);
        return dispatch('setUser');

    },
    async register({dispatch},payload){
        await app.instance.get('/sanctum/csrf-cookie');
        await app.instance.post('/register',payload);
        return dispatch('setUser');
    },
    async setUser({commit}) {
        try{
            let response = await app.instance.get('/api/user');
            commit("setAuthenticated", true);
            commit("setUser", response.data);
        }catch{
            commit("setUser", false);
            commit("setAuthenticated",false);
        }
    },
    async allCourses({state,commit},payload){
        try{
            let response = await app.instance.get('/api/courses/search/' +  state.user.school_id);
            commit("allCourses", response.data);
        }catch{
            commit("allCourses", false);
        }
    },
    setStudyGroups({commit},payload){
        app.instance.get('/api/studygroups/'  + payload.id).then(response=>{
            commit("setStudyGroups", response.data);

            if(response.data.length > 0){
                commit("hasStudyGroups", true);
            }else{
                commit("hasStudyGroups", false);
            }
        }).catch(() => {
            commit("setStudyGroups", false);
            commit("hasStudyGroups", false);
        });
    },
    async filterStudyGroup({commit},payload){
        try{
            let response = await app.instance.get('/api/s', {params:payload});
            console.log(payload);
            commit("setStudyGroups", response.data);
        }catch{
            commit("setStudyGroups", false);
        }
    },
    async schoolSearch({state,commit},payload){
        try{
            let response = await app.instance.get('/api/schools/search/' + payload);
            commit("setSchools", response.data);
        }catch{
            commit("setSchools",false);
        }
    },
    async userCourses({state,commit},payload){
        let response = await app.instance.get('/api/courses');
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
