<template>
    <div class="dashboard">
        <Header></Header>
        <main class="container">
           <div class="row">
                <router-link :to="{ name: 'addstudygroup', params: { id: this.$route.params.id }}">Add study group</router-link>
                <div class="col-8">
                    <ul v-for="studygroup in studygroups" v-bind:key="studygroup.id">
                      <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <p>{{studygroup.description}}</p>
                            <span v-if="check == 'leave' || check == 'cancel'">
                                <p><span>Notes: </span>{{studygroup.notes}}</p>
                                <template v-if="studygroup.remote">
                                    <a href="studygroup.link">{{studygroup.link}}</a>
                                </template>
                                <template v-else>
                                    <p><span>Address: </span> {{studygroup.address}} {{studygroup.state}},{{studygroup.city}} </p>
                                </template>
                                <p><span>Time: </span> {{studygroup.date}}</p>
                                <p><span>Date: </span> {{studygroup.time}} </p>
                            </span>
                        </div>
                        <button class="btn btn-success" @click="toggleSubmit(studygroup.id,toggleType)">{{toggle(studygroup.id)}}</button>
                      </li>
                    </ul>
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
            date:null,
            check:null,
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

        }

    }
}
</script>
