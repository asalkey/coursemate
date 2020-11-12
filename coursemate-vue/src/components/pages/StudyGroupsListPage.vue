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
                            <h6 class="my-0">{{studygroup.description}}</h6>
                            <p>{{studygroup.notes}}</p>
                            <template v-if="studygroup.remote">
                                <p>{{studygroup.link}}</p>
                            </template>
                            <template v-else>
                                <p>{{studygroup.address}} {{studygroup.state}},{{studygroup.city}} </p>
                            </template>
                            <p>{{studygroup.date}} {{studygroup.time}}</p>
                        </div>
                            {{studygroup}}
                        <button @click="toggleSubmit(studygroup.id,toggleType)">{{toggle(studygroup.id)}}</button>
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
            time:null,
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
        }
    },
    mounted() {
        this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
    },
    methods:{
        logout: function(){
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        },
        toggle: function(id){
                let sgIndex = this.studygroups.findIndex(studygroup => studygroup.id == id);
                let userIndex = this.studygroups[sgIndex].users.findIndex(user => user.id == 1);
                let isCreator = (userIndex != -1) ? this.studygroups[sgIndex].users[userIndex].pivot.creator : null;
                let toggleType;

                switch (isCreator) {
                    case 1:
                        this.toggleType = 'cancel';
                        break;
                    case 2:
                        this.toggleType = 'unattend';
                        break;
                    default:
                        this.toggleType = 'join';
                }


                return this.toggleType;
        },
        toggleSubmit: function(id,type){

            switch (type) {
                case 'join':
                    axios.put('/api/studygroups/' + this.$route.params.id,type).then(response=>{
                        this.toggle(id);
                    }).catch(error => {
                            //validation
                    });
                    break;
                case 'unattend':
                    axios.put('/studygroups/api/studygroups/' + this.$route.params.id,type).then(response=>{
                        this.toggle(id);
                    }).catch(error => {
                            //validation
                    });
                    break;
                case 'cancel':
                    axios.put('/api/studygroups/' + this.$route.params.id,{data:'cancel'}).then(response=>{
                       this.toggle(id);
                    }).catch(error => {
                            console.log(error);
                    });
            }


        }

    }
}
</script>
