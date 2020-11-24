<template>
    <div class="d-md-flex h-md-100 align-items-center">
        <div class="col-md-6 p-0 bg-indigo h-md-100">
            <div class="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                <div class="logoarea pt-5 pb-5">
                    <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:5%">Coursemate </a>
                    <img class="img-fluid" src="@/assets/images/2785837.png"/>
                </div>
            </div>
        </div>
        <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
            <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center">

                <ValidationObserver v-slot="{ invalid }">
                    <form class="p-5" @submit.prevent="login">
                        <h3 class="mb-4 text-center">Sign In</h3>
                        <div class="form-group">
                            <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                                <input type="email" class="form-control" v-model="formData.email" placeholder="you@example.com" required="required">
                                <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                                <input type="password" class="form-control" v-model="formData.password" required="required">
                                <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                            </ValidationProvider>
                        </div>
                        <button type="submit" class="btn btn-success btn-round btn-block shadow-sm" :disabled="invalid">Sign in</button>
                        <small class="d-block mt-4 text-center"><router-link :to='{name: "reset"}' class='nav-link'> Forgot your password? </router-link></small>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});


import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/app';

export default {
    name: 'LoginPage',
    data:function(){
        return {
            formData: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        ValidationProvider,ValidationObserver
    },
    methods:{
        login: function(){
            this.$store.dispatch('login',this.formData).then((res) => {
                this.$store.dispatch('setUser').then((res) => {
                    this.$router.push({name:'showcourses'});
                }).catch((error) => {
                    alert(error)
                });
            }).catch((error) => {
              alert(error)
            });
        }
    }
}
</script>
