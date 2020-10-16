<template>
    <div class="dashboard">
        <Header></Header>
        <main>
            {{user.school_id}}
            <div class="container">
                <div class="d-flex flex-row">
                    <div class="mb-3">
                      <b-list-group>
                          <b-list-group-item href="#" active class="d-flex justify-content-between lh-condensed">
                           <div>
                            <h6 class="my-0">-</h6>
                            <small class="text-muted">-</small>
                          </div>
                          <span class="text-muted">-</span>
                          </b-list-group-item>
                     </b-list-group>
                    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                      <form class="card p-2" @submit.prevent="handleSubmit(onSubmit)">
                        <b-input-group>
                             <ValidationProvider name="courseID" rules="required" v-slot="validationContext">
                                  <b-form-input list="course-id" v-model="courseData.number" class="form-control" placeholder="Course ID" :state="getValidationState(validationContext)"></b-form-input>
                                  <datalist id="course-id">
                                    <option v-for="courseID in courseIDs" v-bind:key="courseID.id">{{ courseID }}</option>
                                  </datalist>
                                  <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                            </ValidationProvider>
                            <ValidationProvider name="courseName" rules="required" v-slot="validationContext">
                              <b-form-input list="course-name" v-model="courseData.name" class="form-control" placeholder="Course Name" :state="getValidationState(validationContext)"></b-form-input>
                              <datalist id="course-name">
                                <option v-for="courseName in courseNames" v-bind:key="courseName.id">{{ courseName }}</option>
                              </datalist>
                              <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                            </ValidationProvider>
                          <b-input-group-append>
                            <b-button type="submit" variant="outline-secondary">+ Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </form>
                    </ValidationObserver>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>



import {BListGroup} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'CoursesListPage',
    components:{Header,BListGroup,ValidationProvider,ValidationObserver},
    data:function(){
        return {
            courseName:'',
            courseID:'',
            courseNames: ['Intro to Javascript', 'Digital Media Capstone', 'Web Development With PHP'],
            courseIDs: ['DGM1322', 'CS150', 'DGM22'],
            courseData:{
                name:'',
                number:''
            }
        }
    },
    computed: {
        courses(){
            return this.$store.state.courses;
        },
        user(){
            return this.$store.state.user;
        }
    },
    mounted() {
        this.$store.dispatch('setAuthenticated');
        this.$store.dispatch('setCourses');
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit: function(){
            axios.post('/api/courses',this.courseData).then(response=>{
                console.log(response);
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        }
    }
}
</script>
