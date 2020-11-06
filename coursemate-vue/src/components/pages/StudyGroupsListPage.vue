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
                        <b-button :pressed.sync="myToggle" variant="primary">{{toggle}}</b-button>
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
            time:null
        }
    },
    computed: {
        studygroups: function() {
            return this.$store.state.studygroups;
        },
        toggle: function(){
            let creator = true;
            let toggleText = 'join';

            if(creator){
                toggleText = 'cancel';
            }else if(!creator){
                toggleText = 'unattend';
            }

            return toggleText;
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
        attend: function(){
            console.log(this.studygroups);

        }

    }
}
</script>
