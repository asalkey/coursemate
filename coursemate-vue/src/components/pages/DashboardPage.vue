<template>
    <div class="dashboard">
        <navigation></navigation>
        <div class="hero d-flex justify-content-center">
            <h1> Harvard University</h1>
        </div>
        <div class="d-flex">
            <div class="container card">
                <h5>Custom Headers</h5>
                <TabView class="tabview-custom">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-calendar"></i>
                            <span>Header I</span>
                        </template>
                        <Dashboard></Dashboard>
                    </TabPanel>
                    <TabPanel>
                        <template #header>
                            <span>Header II</span>
                            <i class="pi pi-user"></i>
                        </template>
                        <AddStudyGroup></AddStudyGroup>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>

<script>


import Navigation from './../Nav.vue';
import Dashboard from './dashboard/Dashboard.vue';
import AddStudyGroup from './dashboard/AddStudyGroup.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'DashboardPage',
    components:{Navigation,TabView,TabPanel,Dashboard,AddStudyGroup},
    data:function(){
        return {
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
            }
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
