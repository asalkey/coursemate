<template>
    <header>
        <Navigation></Navigation>
        <div class="hero d-flex flex-column">
            <h1 class="d-flex justify-content-center"> Harvard University</h1>
            <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                <ul class="navbar-nav">
                    <li class="nav-item">
                         <b-icon icon="house-fill"></b-icon>
                        <router-link :to='{name: "dashboard"}' class='nav-link'> Dashboard </router-link></li>
                    <li class="nav-item">
                         <b-icon icon="plus-circle-fill"></b-icon>
                        <router-link :to='{name: "settings"}' class='nav-link'> Settings</router-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import Navigation from './Nav.vue';
export default {
    components:{Navigation},
}
</script>
