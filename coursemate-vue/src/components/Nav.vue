<template>
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:3%">Coursemate </a>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item"><router-link :to='{name: "login"}' class='nav-link'> Login </router-link></li>
            <li class="nav-item"><router-link :to='{name: "register"}' class='nav-link'> Register  </router-link></li>
            <li class="nav-item"><router-link :to='{name: "dashboard"}' class='nav-link'>Dashboard</router-link></li>
            <li class="nav-item"><router-link :to='{name: "settings"}' class='nav-link'>Settings</router-link></li>
            <li class="nav-item"><router-link :to='{name: "logout"}' class='nav-link'>Logout</router-link></li>
        </ul>
    </nav>
</template>
