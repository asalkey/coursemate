<template>
      <div class="dashboard">
        <Header :user="user"></Header>
        <main class="h-md-100">
            <div class="container d-flex justify-content-center">
                <div class="col-6">
                    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <div class="form-group">
                                 <ValidationProvider name="description" rules="required" v-slot="validationContext">
                                    <b-form-input type="text" v-model="addData.description" placeholder="Exam 2 Help" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="date" rules="required"  v-slot="validationContext">
                                    <b-form-datepicker v-model="addData.date" placeholder="Choose a date" local="en" :state="getValidationState(validationContext)"></b-form-datepicker>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider name="time" rules="required" v-slot="validationContext">
                                    <b-form-timepicker v-model="addData.time" placeholder="Choose a time" local="en" :state="getValidationState(validationContext)" ></b-form-timepicker>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                    <b-form-checkbox v-model="addData.remote" >Remote?</b-form-checkbox>
                            </div>
                            <span v-if="addData.remote">
                                <div class="form-group">
                                    <ValidationProvider name="link" :rules="`${addData.remote ? 'required' : ''}`" v-slot="validationContext">
                                        <b-form-input type="url" v-model="addData.link" placeholder="zoom link" :state="getValidationState(validationContext)"></b-form-input>
                                        <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                            </span>
                            <span v-else>
                                <div class="form-group">
                                    <ValidationProvider name="address" :rules="`${!addData.remote ? 'required' : ''}`" v-slot="validationContext">
                                        <b-form-input type="text" v-model="addData.address" placeholder="address" :state="getValidationState(validationContext)"></b-form-input>
                                        <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider name="city" :rules="`${!addData.remote ? 'required' : ''}`" v-slot="validationContext">
                                        <b-form-input type="text" v-model="addData.city" placeholder="city" :state="getValidationState(validationContext)"></b-form-input>
                                        <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider name="state" :rules="`${!addData.remote ? 'required' : ''}`" v-slot="validationContext">
                                        <b-form-input type="text" v-model="addData.state" placeholder="state" :state="getValidationState(validationContext)"></b-form-input>
                                        <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                     </ValidationProvider>
                                </div>
                            </span>
                            <div class="form-group">
                                <ValidationProvider name="notes" rules="required" v-slot="validationContext">
                                    <b-form-textarea placeholder="notes" v-model="addData.notes" :state="getValidationState(validationContext)"></b-form-textarea>
                                    <div class="invalid-feedback" >{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
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

import * as app from './../../api.js';

export default {
    name: 'AddStudyGroupPage',
     props: ['user'],
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
                course_id:this.$route.params.id,
            }
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit: function(){
            app.instance.post('/api/studygroups',this.addData).then(response=>{
                this.$router.push({name:'showstudygroups'});
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        }
    }
}
</script>

