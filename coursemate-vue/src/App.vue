<template>

 <router-view></router-view>

</template>

<script>
//PASS USER DATA HERE!!
export default {
  name: 'app',
  data: function (){
        return {
            page: 'home',
            links: ['home']
        }
  },
  mounted() {
    this.$store.dispatch('setAuthenticated');
  }
}
</script>

