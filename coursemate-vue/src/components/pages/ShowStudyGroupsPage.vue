<template>
    <div class="dashboard">
        <Header></Header>
        <main>
            <div class="container">
                <div class="d-flex flex-row">
                    <b-list-group class="list-group mb-3 col-8">
                      <b-list-group-item class="d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">-</h6>
                            <small class="text-muted">-</small>
                        </div>
                        <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
                      </b-list-group-item>
                    </b-list-group>



                    <div class="mb-3 col-4">
                       <b-button-group size="sm">
                          <b-button
                            v-for="(btn, idx) in buttons"
                            :key="idx"
                            :pressed.sync="btn.state"
                            variant="primary"
                          >
                            {{ btn.caption }}
                          </b-button>
                        </b-button-group>
<b-form-datepicker id="datepicker-placeholder" placeholder="Choose a date" local="en"></b-form-datepicker>
                      <b-form-timepicker id="timepicker-placeholder" placeholder="Choose a time" local="en"></b-form-timepicker>
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



import { BFormDatepicker,BButton,BFormTimepicker,BListGroup} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'ShowStudyGroupsPage',
    components:{Header,BFormTimepicker,BFormDatepicker,BButton,BListGroup},
    data:function(){
        return {
            buttons: [
              { caption: 'Remote', state: true },
              { caption: 'Near me', state: true },
            ],
            courseNames: ['Intro to Javascript', 'Digital Media Capstone', 'Web Development With PHP'],
            courseIDs: ['DGM1322', 'CS150', 'DGM22'],
            date:null,
            time:null,
        }
    },
    methods:{
        logout: function(){
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        },
        createStudyGroup: function(){
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        },
        createCourse: function(){
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        }
    }
}
</script>
