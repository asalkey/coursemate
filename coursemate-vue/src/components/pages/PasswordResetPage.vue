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
                  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(reset)">
                            <div class="form-group">
                                <ValidationProvider name="email" rules="required|email" v-slot="validationContext">
                                    <b-form-input type="text" v-model="formData.email" placeholder="email" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <button type="submit" class="btn btn-primary">Reset</button>
                        </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'PasswordResetPage',
    components:{ValidationProvider,ValidationObserver},
    data:function(){
        return {
            formData: {
                email: '',
            }
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        reset: function(){

               axios.post('/password/email',this.formData)
               .then(response=>{
                    console.log(response);
                    //this.$router.push({name:'Dashboard'});
               }).catch(error => {
                    //validation
                    console.log(error);
                });

        }
    }
}
</script>
