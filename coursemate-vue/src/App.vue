<template>

 <router-view></router-view>

</template>

<script>
export default {
  name: 'app',
  data: function (){
        return {
            page: 'home',
            links: ['home']
        }
  }
}
</script>
<style>
  @import './assets/styles/custom.css';
</style>

