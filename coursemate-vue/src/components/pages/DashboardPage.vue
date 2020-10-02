<template>
    <div>
        <navigation></navigation>
        <div class="container">
            <div class="row" style="text-align:center">
                <div class="col-12">
                    <image style="width:5%" src="harvard.png" />
                    <h1 style="display:inline;text-transform: uppercase;text-align: center;font-weight: 800;font-stretch: expanded;font-synthesis: weight;letter-spacing: 1px;color: #353535;"> Harvard University</h1>
                </div>
            </div>
            <div class="row">
                <button type="button" class="btn btn-info" style="/*! text-align: center; */margin-left: 42%;">+ add study group</button>
            </div>


            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">All study groups</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Attending</a>
              </li>
            </ul>

            <ul class="list-group mb-3">

                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Piano 101 exam help</h6>
                    <small class="text-muted">10/20/20 - online</small>
                      <br>
                    Attending <span class="badge badge-info">5</span>
                  </div>
                    </li>
            </ul>

            <div class="mb-3">
                <h3> Filter</h3>
                <span>Location: remote - near me </span>
                <br>
                <br>
                <span>Date: <input type="date"/> </span>
                <br>
                <br>
                <span>Time: <input type="time" /> </span>
                <br>
                <br>
                <ul>
                    <li> All classes </li>
                    <li> (x) Piano 101 </li>
                </ul>
                <button> + add a class </button>
            </div>

        </div>
    </div>
</template>

<script>
import Navigation from './../Nav.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default {
    name: 'DashboardPage',
    components:{Navigation},
    methods:{
        logut: function(){
            axios.post('/logout').then(response=>{
                this.$router.push({name:'home'});
            }).catch(error => {
                    //validation
            });

        }
    }
}
</script>
