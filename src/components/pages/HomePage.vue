<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:3%">Coursemate </a>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><router-link :to='{name: "login"}' class='nav-link'> Login </router-link></li>
                    <li class="nav-item"><router-link :to='{name: "register"}' class='nav-link'> Register </router-link></li>
                </ul>

        </nav>
        <div class="container-fluid">
            <div class="row bg">
                <div class="col-6 tagline">
                    <h1> Study with <span>classmates</span></h1>
                    <p>Join in-person and online study groups for your classes.</p>
                    <router-link :to='{name: "join"}' class="btn btn-style-1 btn-green"> join a study group </router-link>
                    <router-link :to='{name: "create"}' class="btn btn-style-1 btn-purple"> create a study group </router-link>
                </div>
                <div class="col-6">
                    <img class="img-fluid" src="@/assets/images/Slice.png" alt="" title=""/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data: function (){
        return{
        }
    }
}
</script>
