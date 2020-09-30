<template>
    <div>
       <div class="d-md-flex h-md-100 align-items-center">
            <!-- First Half -->

            <div class="col-md-6 p-0 bg-indigo h-md-100">
                <div class="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <div class="logoarea pt-5 pb-5">
                          <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:5%">Coursemate </a>
                          <img class="img-fluid" src="@/assets/images/2785836.jpg"/>
                    </div>
                </div>
            </div>

            <!-- Second Half -->

            <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
                <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                  <form class="needs-validation" novalidate="" @submit.prevent="login">
                    <div class="mb-3">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" id="email" placeholder="you@example.com">
                      <div class="invalid-feedback">
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="address">Password</label>
                      <input type="password" class="form-control" id="password" required="">
                      <div class="invalid-feedback">
                      </div>
                    </div>
                    <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                  </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'LoginPage',
    methods:{
        login: function(){
            console.log(this);
        }
    }
}
</script>
