<template>
    <div class="dashboard">
        <Header></Header>
        <main class="container">
           <div class="row">
                <div class="col-8">
                    <router-link :to="{ name: 'addstudygroup', params: { id: this.$route.params.id }}">Add study group</router-link>
                    <ul v-for="studygroup in studygroups" v-bind:key="studygroup.id">
                      <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div class="col-6">
                            <h2>{{studygroup.description}}</h2>
                            <span v-if="check == 'leave' || check == 'cancel'">
                                <p>{{studygroup.notes}}</p>
                                <template v-if="studygroup.remote">
                                   <b-icon-link45deg></b-icon-link45deg><a href="studygroup.link">{{studygroup.link}}</a>
                                </template>
                                <template v-else>
                                    <p><span>Address: </span> {{studygroup.address}} {{studygroup.state}},{{studygroup.city}} </p>
                                </template>
                                <p><b-icon-clock></b-icon-clock> {{studygroup.date}}</p>
                                <p><b-icon-calendar></b-icon-calendar>{{studygroup.time}} </p>
                            </span>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-success" @click="toggleSubmit(studygroup.id,toggleType)">{{toggle(studygroup.id)}}</button>
                        </div>
                      </li>
                    </ul>
                </div>
                <div class="mb-3 col-4">
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
