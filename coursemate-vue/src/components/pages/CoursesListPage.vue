<template>
    <div class="dashboard">
        <Header></Header>
        <main>
        {{user}}
            <div class="container">
                <div class="d-flex flex-row">
                    <div class="mb-3 col-12">
                          <b-list-group v-for="course in courses" v-bind:key="course.id" >
                              <li class="d-flex list-group-item justify-content-between lh-condensed">
                                   <router-link tag="div" :to="{ name: 'showstudygroups', params: { id: course.id }}">
                                     <h6 class="my-0">{{course.number}}</h6>
                                  </router-link>
                                  <b-icon-trash @click='deleteCourse(course.id)'></b-icon-trash>
                             </li>
                        </b-list-group>

                    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                      <form class="card p-2" @submit.prevent="handleSubmit(onSubmit)">
                        <b-input-group>
                             <ValidationProvider name="courseID" rules="required" v-slot="validationContext" class="col-11">
                                  <b-form-input list="course-id" v-model="courseData.number" class="form-control" placeholder="Course ID" :state="getValidationState(validationContext)" autocomplete="off"></b-form-input>
                                  <datalist id="course-id">
                                    <option v-for="schoolCourse in schoolCourses" v-bind:key="schoolCourse.id">{{ schoolCourse.number }}</option>
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
            courseData:{
                number:''
            }
        }
    },
    props: ['user'],
    computed: {
        courses(){
            return this.$store.state.courses;
        },
        schoolCourses(){
            return this.$store.state.allCourses;
        }
    },
    created() {
        this.$store.dispatch('setCourses');

        this.$store.dispatch('allCourses');


    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit: function(){
            axios.post('/api/courses',this.courseData).then(response=>{
                this.$store.dispatch('setCourses');
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        },
        deleteCourse: function(id){
            axios.delete(`/api/courses/${id}`).then(response=>{
                this.$store.dispatch('setCourses');
            }).catch(error => {
            });
        }
    }
}
</script>
