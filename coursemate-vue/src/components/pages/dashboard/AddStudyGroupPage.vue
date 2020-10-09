<template>
    <div>
        <form>
            <input type="text" v-model="addData.description"/>
            <b-form-datepicker v-model="addData.date" placeholder="Choose a date" local="en"></b-form-datepicker>
            <b-form-timepicker v-model="addData.time" placeholder="Choose a time" local="en"></b-form-timepicker>
            <input type="checkbox" v-model="addData.remote"/>
            <input type="url" name="link" v-model="addData.link"/>
            <input type="text" name="address" v-model="addData.address"/>
            <input type="text" name="city" v-model="addData.city"/>
            <input type="text" name="state" v-model="addData.state"/>
            <textarea name="notes"></textarea>
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
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        }
    }
}
</script>

