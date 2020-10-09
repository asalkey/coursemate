<template>
    <header>
        <navigation></navigation>
        <div class="hero d-flex flex-column align-content-center">
            <h1> Harvard University</h1>
            <ul class="navbar-nav">
                <li class="nav-item"><router-link :to='{name: "dashboard"}' class='nav-link'> Dashboard </router-link></li>
                <li class="nav-item"><router-link :to='{name: "settings"}' class='nav-link'> Settings</router-link></li>
            </ul>
        </div>
    </header>
</template>
