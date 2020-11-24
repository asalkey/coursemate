import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import SettingsPage from './components/pages/SettingsPage.vue';
import PasswordResetPage from './components/pages/PasswordResetPage.vue';
import CoursesListPage from './components/pages/CoursesListPage.vue';
import StudyGroupsListPage from './components/pages/StudyGroupsListPage.vue';
import AddStudyGroupPage from './components/pages/AddStudyGroupPage.vue';

import  './assets/styles/custom.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import _ from "lodash";

Vue.use(VueRouter);
Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const routes = [
    { path: '/', component: HomePage,name:'home'},
    { path: '/login', component: LoginPage,name:'login',meta: {guest: true} },
    { path: '/password/reset', component: PasswordResetPage,name:'reset',meta: {guest: true} },
    { path: '/register', component: RegisterPage,name:'register',meta: { guest:true} },
    { path: '/dashboard/settings', component: SettingsPage,name:'settings', meta: { user: true } },
    { path: '/dashboard/:id/groups', component: StudyGroupsListPage,name:'showstudygroups', meta: { user: true } },
    { path: '/dashboard/:id/groups/new', component: AddStudyGroupPage,name:'addstudygroup', meta: { user: true } },
    { path: '/dashboard', component: CoursesListPage,name:'showcourses', meta: { user: true } }
]

const router = new VueRouter({
    routes: routes,
    mode:'history'
})

router.beforeEach((to, from, next) => {
    console.log("router");

  next()
})

store.dispatch('setUser').then(()=>{
    new Vue({
      render: h => h(App),
      router: router,
      store: store,
    }).$mount('#app')
});
