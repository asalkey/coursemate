<template>

 <router-view v-bind:user="user"></router-view>

</template>

<script>
export default {
  name: 'app',
  data: function (){
        return {
            page: 'home',
            links: ['home']
        }
  },
  computed: {
    user(){
        console.log(this.$store.state.user);
        return this.$store.state.user;
    }
  },
  created() {
  }
}
</script>

