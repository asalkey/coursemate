<template>
    <div>
        <navigation></navigation>
        <div class="d-flex flex-row bg">

                <div class="col-6 tagline">
                    <h1> Study with <span>classmates</span></h1>
                    <p>Join in-person and online study groups for your classes.</p>
                    <router-link :to='{name: "register"}' class="btn btn-style-1 btn-green"> join a study group </router-link>
                    <router-link :to='{name: "register"}' class="btn btn-style-1 btn-purple"> create a study group </router-link>
                </div>
                <div class="col-6">
                    <img class="img-fluid d-none d-sm-none d-md-block d-lg-block" src="@/assets/images/Slice.png" alt="" title=""/>
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
