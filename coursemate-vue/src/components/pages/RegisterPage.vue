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
                  <ValidationObserver v-slot="{ invalid }">
                      <form class="needs-validation" novalidate="" @submit.prevent="register">
                        <div class="mb-3">
                          <label for="name">Name</label>
                          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                            <input type="name" class="form-control" v-model="formData.name" placeholder="you@example.com">
                            <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>

                        <div class="mb-3">
                          <label for="email">Email</label>
                          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                            <input type="email" class="form-control" v-model="formData.email" placeholder="you@example.com">
                            <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>

                        <div class="mb-3">
                          <label for="password">Password</label>
                          <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                            <input type="password" class="form-control" v-model="formData.password" required="">
                            <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>

                        <div class="mb-3">
                          <label for="password_confirmation">Confirm Password</label>
                          <ValidationProvider name="Confirm Password" rules="required" v-slot="{ errors }">
                              <input type="password" class="form-control" v-model="formData.password_confirmation" required="">
                              <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>


                        <div class="mb-3">
                          <label for="school">School</label>
                          <ValidationProvider name="School" rules="required" v-slot="{ errors }">
                              <b-form-input list="schools-list" v-model="schoolInput" :data-id="0" class="schools" placeholder="enter your school's name..."></b-form-input>
                              <datalist id="schools-list">
                                <option v-for="school in schools" v-bind:key="school.id" :data-id="school.id" :value="school.name">{{ school.name }}</option>
                              </datalist>
                              <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                          </ValidationProvider>
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" type="submit" :disabled="invalid">Register</button>
                      </form>
                    </ValidationObserver>
                </div>
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

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'PasswordResetPage',
    components:{ValidationProvider,ValidationObserver},
    data:function(){
        return {
            schoolPick (value){
              let getOption = document.querySelectorAll(`#schools-list option[value="${value}"]`)[0];
              let getOptionID = (getOption) ? getOption.dataset.id : null;

              return (getOptionID) ? getOptionID : null;

            },
            schoolDisplay:'',
            formData: {
                email: '',
                password: '',
                password_confirmation: '',
                school_id:'',
            }
        }
    },
    computed: {
        schools() {
           return this.$store.state.schools;
        },
        schoolInput: {
            get() {
              return this.schoolDisplay
            },
            set(value) {
              this.formData.school_id = this.schoolPick(value);

              this.schoolDisplay = value;
            }
        },
    },
    mounted() {
        this.$store.dispatch('setSchools');
    },
    methods:{
        register: function(){
            axios.get('/sanctum/csrf-cookie').then(response => {
               axios.post('/register',this.formData)
               .then(response=>{
                    this.$router.push({name:'Dashboard'});
               }).catch(error => {
                    //validation

                });
            });
        }
    }
}
</script>
