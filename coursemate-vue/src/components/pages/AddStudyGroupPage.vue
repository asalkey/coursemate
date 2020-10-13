<template>
      <div class="dashboard">
        <Header></Header>
        <main>
            <div class="container d-flex justify-content-center">
                <div class="col-6">
                    <ValidationObserver ref="form" v-slot="{ invalid }">
                        <form class="needs-validation" novalidate="" @submit.prevent="create">
                            <div class="form-group">
                                 <ValidationProvider name="description" rules="required" v-slot="{ errors }">
                                    <b-form-input type="text" v-model="addData.description" placeholder="Exam 2 Help"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="date" rules="required"  v-slot="{ errors }">
                                    <b-form-datepicker v-model="addData.date" placeholder="Choose a date" local="en"></b-form-datepicker>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="time" rules="required" v-slot="{ errors }">
                                    <b-form-timepicker v-model="addData.time" placeholder="Choose a time" local="en"></b-form-timepicker>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="remote" rules="required" v-slot="{ errors }">
                                    <b-form-input type="checkbox" v-model="addData.remote"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="link" rules="required" v-slot="{ errors }">
                                    <b-form-input type="url" v-model="addData.link" placeholder="zoom link"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="address" rules="required" v-slot="{ errors }">
                                    <b-form-input type="text" v-model="addData.address" placeholder="address"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="city" rules="required" v-slot="{ errors }">
                                    <b-form-input type="text" v-model="addData.city" placeholder="city"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="state" rules="required" v-slot="{ errors }">
                                    <b-form-input type="text" v-model="addData.state" placeholder="state"></b-form-input>
                                    <div class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</div>
                                 </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="notes" rules="required" v-slot="{ errors }">
                                    <b-form-textarea></b-form-textarea>
                                    <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="invalid">Submit</button>
                        </form>
                    </ValidationObserver>
                </div>
           </div>
        </main>
    </div>
</template>

<script>
import Header from './../DashboardHeader.vue';
import { BFormDatepicker,BFormTimepicker,BFormInput,BFormTextarea} from 'bootstrap-vue'
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
    name: 'AddStudyGroupPage',
    components:{Header,BFormTextarea,BFormTimepicker,BFormDatepicker,ValidationProvider,ValidationObserver},
    data:function(){
        return {
            addData: {
                date: '',
                description:'',
                address:'',
                time:'',
                city:'',
                state:'',
                notes:'',
                remote:false,
                link:'',
            }
        }
    },
    methods:{
        create: function(){
            console.log(this.$refs.form);
            axios.post('/api/studygroups',this.addData).then(response=>{
                console.log(response);
            }).catch(error => {
                console.log(this);

            });

        }
    }
}
</script>

