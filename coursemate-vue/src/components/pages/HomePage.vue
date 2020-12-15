<template>
    <div>
        <navigation></navigation>
        <div class="d-flex flex-row bg h-md-100">

                <div class="col-6 tagline">
                    <h1> Study with <span>classmates</span></h1>
                    <p>Coursemate helps you find and schedule study groups. Meet with classmates in-person or online. </p>
                    <span class="d-none d-sm-none d-md-block d-lg-block">
                    <router-link :to='{name: "register"}' class="btn btn-style-1 btn-green mr-3"> join a study group </router-link>
                    <router-link :to='{name: "register"}' class="btn btn-style-1 btn-purple"> create a study group </router-link>
                    </span>
                </div>
                <div class="col-5">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe class="embed-responsive-item" src="https://youtu.be/5FqqiXmwzTY" allowfullscreen></iframe>
                    </div>
                </div>

        </div>
    </div>
</template>

<script>
import Navigation from './../Nav.vue';
export default {
    name: 'HomePage',
    components:{Navigation},
    data: function (){
        return{
        }
    }
}
</script>
