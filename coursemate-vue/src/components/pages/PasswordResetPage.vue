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
                  <div class="alert alert-danger" role="alert">
                    <p> The email or password is incorrect</p>
                  </div>
                  <form class="needs-validation" novalidate="" @submit.prevent="reset">
                    <div class="mb-3">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" v-model="formData.email" placeholder="you@example.com">
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
    name: 'PasswordResetPage',
    data:function(){
        return {
            formData: {
                email: '',
            }
        }
    },
    methods:{
        reset: function(){
            axios.get('/sanctum/csrf-cookie').then(response => {
               axios.post('/password/email',this.formData)
               .then(response=>{
                    //this.$router.push({name:'Dashboard'});
               }).catch(error => {
                    //validation

                });
            });
        }
    }
}
</script>
