<template>
    <div class="dashboard">
        <Header></Header>
        <main>
            <div class="container">
                <div class="d-flex flex-row">



                    <div class="mb-3 col-4">

                      <b-list-group>
                          <b-list-group-item href="#" active class="d-flex justify-content-between lh-condensed">
                           <div>
                            <h6 class="my-0">-</h6>
                            <small class="text-muted">-</small>
                          </div>
                          <span class="text-muted">-</span>
                          </b-list-group-item>
                     </b-list-group>

                      <form class="card p-2">
                        <b-input-group>
                              <b-form-input list="course-id" class="form-control" placeholder="Course ID"></b-form-input>
                              <datalist id="course-id">
                                <option>Manual Option</option>
                                <option v-for="courseID in courseIDs" v-bind:key="courseID.id">{{ courseID }}</option>
                              </datalist>

                              <b-form-input list="course-name" class="form-control" placeholder="Course Name"></b-form-input>
                              <datalist id="course-name">
                                <option v-for="courseName in courseNames" v-bind:key="courseName.id">{{ courseName }}</option>
                              </datalist>

                          <b-input-group-append>
                            <b-button variant="outline-secondary">+ Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>



import {BListGroup} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'CoursesListPage',
    components:{Header,BListGroup},
    data:function(){
        return {
            courseNames: ['Intro to Javascript', 'Digital Media Capstone', 'Web Development With PHP'],
            courseIDs: ['DGM1322', 'CS150', 'DGM22'],
        }
    },
    methods:{
        onSubmit: function(){
            axios.post('/api/courses',this.addData).then(response=>{
                console.log(response);
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        }
    }
}
</script>
