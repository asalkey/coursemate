<template>
    <div class="dashboard">
        <Header></Header>
        <main>
            <div class="container">
                <div class="d-flex flex-md-row flex-sm-column">
                    <div class="col-md-8 col-sm-12">
                        <span v-for="studygroup in studygroups" v-bind:key="studygroup.id">

                            <b-list-group>
                              <b-list-group-item href="#" class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                  <h5 class="mb-1">{{studygroup.description}}</h5>
                                  <button class="btn btn-outline-info" @click="toggleSubmit(studygroup.id,toggleType)">{{toggle(studygroup.id)}}</button>
                                </div>
                                <p class="mb-1">
                                  {{studygroup.notes}}
                                </p>
                               <template v-if="studygroup.remote" class="mb-1">
                                   <b-icon icon="link-45deg" class="rounded-circle bg-secondary p-1" style="font-size: 5rem;color:#fff;"></b-icon><a href="studygroup.link">{{studygroup.link}}</a>
                                </template>
                                <template v-else>
                                    <p><span>Address: </span> {{studygroup.address}} {{studygroup.state}},{{studygroup.city}} </p>
                                </template>
                                <div class="d-flex w-100 justify-content-between mt-3">
                                    <span>
                                        <b-badge variant="info">4</b-badge><small> attending</small>
                                    </span>
                                    <span>
                                        <span class="pr-2"><b-icon-calendar></b-icon-calendar><small> {{studygroup.date}} </small></span>
                                        <span><b-icon-clock></b-icon-clock><small> {{studygroup.time}} </small></span>
                                    </span>
                                </div>
                              </b-list-group-item>
                            </b-list-group>
                        </span>
                    </div>
                    <div class="col-md-4 col-sm-12 d-none d-sm-none d-md-block d-lg-block">
                        <h4> Filter </h4>
                        <form method="get" @submit.prevent="filterSubmit">
                            <!--<div class="form-group">
                                <b-button-group size="sm">
                                      <b-button v-for="(btn, idx) in buttons" :key="idx" :pressed.sync="btn.state" variant="primary">
                                        {{ btn.caption }}
                                      </b-button>
                                </b-button-group>
                            </div> -->
                            <div class="form-group">
                                <b-form-datepicker v-model="filter.date" id="datepicker-placeholder" placeholder="Choose a date" local="en"></b-form-datepicker>
                            </div>
                            <div class="form-group">
                                <b-form-timepicker v-model="filter.time" id="timepicker-placeholder" placeholder="Choose a time" local="en"></b-form-timepicker>
                            </div>
                            <button type="submit" class="btn btn-outline-info"> Filter </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>



import { BFormDatepicker,BFormTimepicker} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'StudyGroupsListPage',
    components:{Header},
    data:function(){
        return {
            buttons: [
              { caption: 'Remote', state: true },
              { caption: 'Near me', state: true },
            ],
            check:null,
            filter:{
                date:null,
                time:null,
                course_id:this.$route.params.id,
            },
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
    computed: {
        studygroups: function() {
            return this.$store.state.studygroups;
        },
        user(){
            return this.$store.state.user;
        }
    },
    mounted() {
        this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
    },
    methods:{
        toggle: function(id){
                let sgIndex = this.studygroups.findIndex(studygroup => studygroup.id == id);
                let userIndex = this.studygroups[sgIndex].users.findIndex(user => user.id == this.user.id);
                let isCreator = (userIndex != -1) ? this.studygroups[sgIndex].users[userIndex].pivot.creator : null;
                let toggleType;

                switch (isCreator) {
                    case 1:
                        this.toggleType = 'cancel';
                        break;
                    case 0:
                        this.toggleType = 'leave';
                        break;
                    default:
                        this.toggleType = 'join';
                }

                this.check = this.toggleType;
                return this.toggleType;
        },
        toggleSubmit: function(id,type){

                axios.put(`/api/studygroups/${id}`,{data:type}).then(response=>{
                    this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
                    this.toggle(id);
                }).catch(error => {
                        //validation
                });

        },
        filterSubmit: function(){
            console.log(this.filter);
            this.$store.dispatch('filterStudyGroup',this.filter);
        }

    }
}
</script>
