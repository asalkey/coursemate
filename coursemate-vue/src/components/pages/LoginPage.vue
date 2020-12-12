<template>
    <div>
        <div class="d-md-flex flex-row">
            <div class="col-md-6 first-block">
                <div class="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <div class="logoarea pt-5 pb-5">
                          <b-navbar-brand :to='{name: "home"}'>Coursemate</b-navbar-brand>
                          <img class="img-fluid d-none d-sm-none d-md-block d-lg-block" src="@/assets/images/2785837.png"/>
                    </div>
                </div>
            </div>

            <!-- Second Half -->

            <div class="col-md-6 pt-5 second-block">
                <div class="d-md-flex align-items-center  h-md-100 justify-content-center">

                     <ValidationObserver ref="form" v-slot="{ handleSubmit }" class="form-wrap">
                        <h2 class="text-center">Sign in</h2>
                        <hr>
                        <form @submit.prevent="handleSubmit(login)">
                            <div class="form-group">
                              <label for="email">Email</label>
                               <ValidationProvider name="email" rules="required|email" v-slot="validationContext">
                                    <b-form-input type="email" v-model="formData.email" placeholder="example@example.com" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>

                            <div class="form-group">
                              <label for="password">Password</label>
                               <ValidationProvider name="password" rules="required" v-slot="validationContext">
                                    <b-form-input type="password" v-model="formData.password" placeholder="*****" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <button class="mb-3 btn btn-primary btn-lg btn-block" type="submit" >Sign in</button>
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

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

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
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        login: function(){
            this.$store.dispatch('login',this.formData).then((res) => {
                this.$store.dispatch('setUser').then((res) => {
                    this.$router.push({name:'showcourses'});
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
              this.$refs.form.setErrors(error.response.data.errors);
              return;
            });
        }
    }
}
</script>
