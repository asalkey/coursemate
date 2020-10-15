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
import ShowStudyGroupsPage from './components/pages/ShowStudyGroupsPage.vue';
import AddStudyGroupPage from './components/pages/AddStudyGroupPage.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import './custom.scss'

Vue.use(VueRouter);
Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const routes = [
    { path: '/', component: HomePage,name:'home',meta: {guest: true} },
    { path: '/login', component: LoginPage,name:'login',meta: {guest: true} },
    { path: '/password/reset', component: PasswordResetPage,name:'reset',meta: {guest: true} },
    { path: '/register', component: RegisterPage,name:'register',meta: { guest:true} },
    { path: '/dashboard/settings', component: SettingsPage,name:'settings', meta: { user: true } },
    { path: '/dashboard/studygroups/:id', component: ShowStudyGroupsPage,name:'showstudygroups', meta: { user: true } },
    { path: '/dashboard/studygroup', component: AddStudyGroupPage,name:'addstudygroup', meta: { user: true } },
    { path: '/dashboard', component: CoursesListPage,name:'showcourses', meta: { user: true } }
]

const router = new VueRouter({
    routes: routes,
    mode:'history'
})

function isLoggedIn() {
  return store.getters.getAuthenticated;
}

router.beforeEach((to, from, next) => {
  let isLoggedIn = true;

  if (to.matched.some(record => record.meta.user)) {
    if (!isLoggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isLoggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
