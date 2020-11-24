<template>

 <router-view :user="user"></router-view>

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
        return this.$store.state.user;
    }
  },
  created() {
    console.log('test');
  }
}
</script>

