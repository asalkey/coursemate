<template>
<div>
    {{user}}
  <b-navbar toggleable="lg">
    <b-navbar-brand href="#"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:3%">Coursemate</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="!getAuthenticated">
            <b-nav-item  :to='{name: "login"}' class='nav-link'> Login </b-nav-item>
            <b-nav-item  :to='{name: "register"}' class='nav-link'> Register</b-nav-item>
        </template>
        <template v-else>
            <b-nav-item :to='{name: "showcourses"}' class='nav-link'>Dashboard</b-nav-item>
            <!---<b-nav-item :to='{name: "settings"}' class='nav-link'>Settings</b-nav-item> -->
            <b-nav-item class='nav-link' @click='logout'>Logout</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/" aria-label="Bootstrap"> </a>
        <ul class="navbar-nav ml-auto">

        </ul>
    </nav>
 </div>
</template>

<script>
import { mapGetters,mapActions} from 'vuex';
export default {
    computed:{
        ...mapGetters(["getAuthenticated"])
    },
    props: ['user'],
    methods:{
        logout: function(){
            this.$store.dispatch('logout').then((res) => {
                this.$router.push({name:'home'});
            }).catch((error) => {
                console.log(error);
            });
        }
    }

}
</script>
