import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import SettingsPage from './components/pages/SettingsPage.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
    { path: '/', component: HomePage,name:'home' },
    { path: '/login', component: LoginPage,name:'login' },
    { path: '/register', component: RegisterPage,name:'register' },
    { path: '/settings', component: SettingsPage,name:'settings' }
]

const router = new VueRouter({
    routes: routes,
    mode:'history'
})


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
