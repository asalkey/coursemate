<template>
    <div class="dashboard">
        <Header :user="user"></Header>
        <main class="h-md-100">
            <div class="container">
                <div class="d-flex flex-row">
                    <div class="mb-3 col-12">
                        <h1> Course list </h1>
                        <hr>
                        <template v-if="userCourses.length > 0">
                              <b-list-group v-for="userCourse in userCourses" v-bind:key="userCourse.id" >
                                  <li class="d-flex list-group-item justify-content-between lh-condensed">
                                       <router-link tag="div" class="course-link" :to="{ name: 'showstudygroups', params: { id: userCourse.id }}">
                                         <h6 class="my-0">{{userCourse.number}}</h6>
                                      </router-link>
                                      <b-icon-trash @click='deleteCourse(userCourse.id)'></b-icon-trash>
                                 </li>
                             </b-list-group>
                        </template>
                        <template v-else>
                          <h2>Uh oh.. you don't have any courses yet! Add courses to your course list</h2>
                        </template>

                    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                      <form @submit.prevent="handleSubmit(onSubmit)">

                             <ValidationProvider name="number" rules="required" v-slot="validationContext" >
                                    <b-input-group class="mt-3">
                                      <b-form-input list="course-id" v-model="courseData.number" placeholder="Course ID" :state="getValidationState(validationContext)" autocomplete="off"></b-form-input>
                                      <datalist id="course-id">
                                        <option v-for="schoolCourse in schoolCourses" v-bind:key="schoolCourse.id">{{ schoolCourse.number }}</option>
                                      </datalist>
                                      <b-input-group-append>
                                        <b-button type="submit" variant="info">+ Add</b-button>
                                      </b-input-group-append>
                                      <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                    </b-input-group>
                            </ValidationProvider>

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

import * as app from './../../api.js';

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
        userCourses(){
            return this.$store.state.userCourses;
        },
        schoolCourses(){
            return this.$store.state.allCourses;
        }
    },
    created() {
        this.$store.dispatch('userCourses');
        this.$store.dispatch('allCourses');
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit: function(){
            this.courseData.number = this.courseData.number.toUpperCase();
            app.instance.post('/api/courses',this.courseData).then(response=>{
                this.$store.dispatch('userCourses');
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        },
        deleteCourse: function(id){
            app.instance.delete(`/api/courses/${id}`).then(response=>{
                this.$store.dispatch('userCourses');
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style>
.my-0 {
  cursor: pointer;
}
.my-0:hover {
  color: blue;
}
</style>
