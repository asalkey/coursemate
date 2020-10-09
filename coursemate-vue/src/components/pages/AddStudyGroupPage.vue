<template>
    <div class="container">
        <form @submit.prevent="createStudyGroup">
            <div class="form-group">
                <input type="text" v-model="addData.description" placeholder="Exam 2 Help"/>
            </div>
            <div class="form-group">
                <b-form-datepicker v-model="addData.date" placeholder="Choose a date" local="en"></b-form-datepicker>
            </div>
            <div class="form-group">
                <b-form-timepicker v-model="addData.time" placeholder="Choose a time" local="en"></b-form-timepicker>
            </div>
            <div class="form-group">
                <input type="checkbox" v-model="addData.remote"/>
            </div>
            <div class="form-group">
                <input type="url" name="link" v-model="addData.link" placeholder="zoom link"/>
            </div>
            <div class="form-group">
                <input type="text" name="address" v-model="addData.address" placeholder="address"/>
            </div>
            <div class="form-group">
                <input type="text" name="city" v-model="addData.city" placeholder="city"/>
            </div>
            <div class="form-group">
                <input type="text" name="state" v-model="addData.state" placeholder="state"/>
            </div>
            <div class="form-group">
                <textarea name="notes"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
   </div>
</template>

<script>
import { BFormDatepicker,BFormTimepicker} from 'bootstrap-vue'

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'AddStudyGroupPage',
    components:{BFormTimepicker,BFormDatepicker},
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
        createStudyGroup: function(){
            axios.post('/api/studygroups',this.addData).then(response=>{
                console.log(response);
            }).catch(error => {
                    //validation
            });

        }
    }
}
</script>

