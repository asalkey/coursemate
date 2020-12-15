<template>
    <div class="dashboard">
        <Header></Header>
        <main class="h-md-100">
            <div class="container">
                <div class="d-flex flex-md-row flex-sm-column">
                    <template v-if="hasStudyGroups">
                        <div class="col-md-8 col-sm-12 order-md-2 order-sm-2">
                            <template v-if="studygroups && studygroups.length > 0">

                                    <b-list-group>
                                      <b-list-group-item class="flex-column align-items-start" v-for="studygroup in studygroups" v-bind:key="studygroup.id">
                                        <div class="d-flex w-100 justify-content-between">
                                          <h5 class="mb-1">{{studygroup.description}}</h5>
                                          <button class="btn btn-outline-info" @click="toggleSubmit(studygroup.id,toggleType)">{{toggle(studygroup.id)}}</button>
                                        </div>

                                        <p class="mb-1">
                                          {{studygroup.notes}}
                                        </p>
                                       <template v-if="studygroup.remote" class="mb-1">
                                           <b-icon icon="link-45deg" style="font-size: 5rem;" class="mr-2"></b-icon><a target="_blank" :href="studygroup.link">{{studygroup.link}}</a>
                                        </template>
                                        <template v-else>
                                            <p><b-icon icon="geo-alt" style="font-size: 5rem;" class="mr-2"></b-icon> {{studygroup.address}} {{studygroup.city}}, {{studygroup.state}} </p>
                                        </template>

                                        <div class="d-flex w-100 justify-content-between mt-3">
                                            <span>
                                               <b-badge variant="info">{{studygroup.users.length}}</b-badge><small> attending</small>
                                            </span>
                                            <span>
                                                <span class="pr-2"><b-icon-calendar></b-icon-calendar><small> {{studygroup.date}} </small></span>
                                                <span><b-icon-clock></b-icon-clock><small> {{studygroup.time}} </small></span>
                                            </span>
                                        </div>
                                      </b-list-group-item>
                                    </b-list-group>

                            </template>
                            <template v-else>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="323.231 340.229 206.551 295.112" width="206.551pt" height="295.112pt"><path d=" M 526.65 509.043 C 526.65 545.747 521.875 595.422 506.02 595.422 C 497.377 595.422 495.35 578.95 495.35 509.043 C 495.35 472.34 502.357 462.508 511 462.508 C 519.644 462.508 526.65 472.34 526.65 509.043 Z " fill="rgb(170,218,233)"/><path d=" M 326.362 509.043 C 326.362 545.747 331.137 595.422 346.992 595.422 C 355.635 595.422 357.662 578.95 357.662 509.043 C 357.662 472.34 350.655 462.508 342.012 462.508 C 333.368 462.508 326.362 472.34 326.362 509.043 Z " fill="rgb(170,218,233)"/><path d=" M 461.911 612.875 C 471.448 605.44 483.731 612.713 482.762 622.896 C 481.792 633.08 475.327 635.341 459.972 635.341 C 444.617 635.341 437.505 632.271 437.505 627.099 C 437.505 621.927 437.699 617.33 437.699 617.33 C 437.699 617.33 437.321 605.925 451.89 605.925 C 460.16 605.925 461.911 612.875 461.911 612.875 Z " fill="rgb(129,177,195)"/><path d=" M 434.518 575.438 L 437.699 617.33 L 442.677 613.036 L 447.041 617.33 L 450.435 612.391 L 456.416 617.33 L 461.911 612.875 L 465.306 573.922 L 434.518 575.438 Z " fill="rgb(170,218,233)"/><path d=" M 391.102 612.875 C 381.565 605.44 369.282 612.713 370.251 622.896 C 371.221 633.08 377.686 635.341 393.041 635.341 C 408.396 635.341 415.508 632.271 415.508 627.099 C 415.508 621.927 415.314 617.33 415.314 617.33 C 415.314 617.33 415.692 605.925 401.123 605.925 C 392.853 605.925 391.102 612.875 391.102 612.875 Z " fill="rgb(129,177,195)"/><path d=" M 418.495 575.438 L 415.314 617.33 L 410.336 613.036 L 405.972 617.33 L 402.578 612.391 L 396.597 617.33 L 391.102 612.875 L 387.707 573.922 L 418.495 575.438 Z " fill="rgb(170,218,233)"/><path d=" M 426.506 591.689 C 422.956 608.379 402.029 597.046 402.029 588.63 C 395.155 601.154 382.201 591.189 376.698 577.024 C 362.511 586.114 357.043 553.194 361.951 536.964 C 350.012 544.556 345.968 518.366 354.087 502.812 C 340.21 512.005 332.678 485.829 335.238 468.208 C 322.217 473.958 324.887 442.294 331.909 427.638 C 317.393 437.73 323.054 400.134 334.511 388.677 C 318.472 388.677 337.718 363.014 360.4 363.014 C 346.766 349.379 377.588 345.142 395.002 353.088 C 384.92 334.914 413.046 337.639 426.506 351.099 C 439.966 337.639 468.092 334.914 458.01 353.088 C 475.424 345.142 506.246 349.379 492.612 363.014 C 515.294 363.014 534.54 388.677 518.501 388.677 C 529.958 400.134 535.619 437.73 521.103 427.638 C 528.125 442.294 530.795 473.958 517.774 468.208 C 520.334 485.829 512.802 512.005 498.925 502.812 C 507.044 518.366 503 544.556 491.061 536.964 C 495.969 553.194 490.501 586.114 476.314 577.024 C 470.811 591.189 457.857 601.154 450.983 588.63 C 450.983 597.046 430.056 608.379 426.506 591.689 Z " fill="rgb(204,234,244)"/><path d=" M 513.658 436.101 C 513.658 477.232 489.751 505.101 426.507 505.101 C 363.264 505.101 339.356 477.232 339.356 436.101 C 339.356 391.949 363.264 367.102 426.507 367.102 C 489.751 367.102 513.658 391.949 513.658 436.101 Z " fill="rgb(170,218,233)"/><path d=" M 425.728 458.073 C 453.354 458.073 464.48 474.375 464.48 482.653 C 464.48 484.919 462.645 486.755 460.38 486.755 L 391.075 486.755 C 388.809 486.755 386.974 484.919 386.974 482.653 C 386.974 474.375 398.1 458.073 425.728 458.073 Z " fill="rgb(14,77,108)"/><path d=" M 387.536 422.942 C 387.536 415.078 381.16 408.702 373.296 408.702 C 365.431 408.702 359.056 415.078 359.056 422.942 C 359.056 430.805 365.431 437.18 373.296 437.18 C 381.16 437.18 387.536 430.805 387.536 422.942 Z " fill="rgb(14,77,108)"/><path d=" M 492.399 422.942 C 492.399 415.078 486.023 408.702 478.159 408.702 C 470.294 408.702 463.92 415.078 463.92 422.942 C 463.92 430.805 470.294 437.18 478.159 437.18 C 486.023 437.18 492.399 430.805 492.399 422.942 Z " fill="rgb(14,77,108)"/></svg>
                                </span>
                                <span>
                                    <h1>uh oh .. nothing here</h1>
                                    <b-button class="btn btn-danger" :to="{ name: 'addstudygroup', params: { id: this.$route.params.id }}"> add a study group</b-button>
                                </span>
                            </template>
                        </div>
                        <div class="col-md-4 col-sm-12 order-md-2 order-sm-1 mb-2">
                            <h4> Filter </h4>
                            <form ref="filterForm" method="get" @submit.prevent="filterSubmit">
                                <b-input-group class="mb-3">
                                  <b-input-group-prepend>
                                    <b-input-group-text>
                                        <b-icon icon="search" />
                                    </b-input-group-text>
                                  </b-input-group-prepend>
                                  <b-form-input v-model="filter.search" placeholder="enter keywords...">
                                </b-form-input>
                                </b-input-group>
                                <div class="form-group">
                                    <b-form-datepicker v-model="filter.date" id="datepicker-placeholder" placeholder="Choose a date" local="en"></b-form-datepicker>
                                </div>
                                <div class="form-group">
                                    <b-form-timepicker v-model="filter.time" id="timepicker-placeholder" placeholder="Choose a time" local="en"></b-form-timepicker>
                                </div>
                                <button type="submit" class="btn btn-outline-info"> Filter </button>
                                <span @click="reset" class="btn btn-outline-danger ml-3"> Reset </span>
                            </form>
                        </div>
                    </template>
                    <template v-else>
                        <span class="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="323.231 340.229 206.551 295.112" width="206.551pt" height="295.112pt"><path d=" M 526.65 509.043 C 526.65 545.747 521.875 595.422 506.02 595.422 C 497.377 595.422 495.35 578.95 495.35 509.043 C 495.35 472.34 502.357 462.508 511 462.508 C 519.644 462.508 526.65 472.34 526.65 509.043 Z " fill="rgb(170,218,233)"/><path d=" M 326.362 509.043 C 326.362 545.747 331.137 595.422 346.992 595.422 C 355.635 595.422 357.662 578.95 357.662 509.043 C 357.662 472.34 350.655 462.508 342.012 462.508 C 333.368 462.508 326.362 472.34 326.362 509.043 Z " fill="rgb(170,218,233)"/><path d=" M 461.911 612.875 C 471.448 605.44 483.731 612.713 482.762 622.896 C 481.792 633.08 475.327 635.341 459.972 635.341 C 444.617 635.341 437.505 632.271 437.505 627.099 C 437.505 621.927 437.699 617.33 437.699 617.33 C 437.699 617.33 437.321 605.925 451.89 605.925 C 460.16 605.925 461.911 612.875 461.911 612.875 Z " fill="rgb(129,177,195)"/><path d=" M 434.518 575.438 L 437.699 617.33 L 442.677 613.036 L 447.041 617.33 L 450.435 612.391 L 456.416 617.33 L 461.911 612.875 L 465.306 573.922 L 434.518 575.438 Z " fill="rgb(170,218,233)"/><path d=" M 391.102 612.875 C 381.565 605.44 369.282 612.713 370.251 622.896 C 371.221 633.08 377.686 635.341 393.041 635.341 C 408.396 635.341 415.508 632.271 415.508 627.099 C 415.508 621.927 415.314 617.33 415.314 617.33 C 415.314 617.33 415.692 605.925 401.123 605.925 C 392.853 605.925 391.102 612.875 391.102 612.875 Z " fill="rgb(129,177,195)"/><path d=" M 418.495 575.438 L 415.314 617.33 L 410.336 613.036 L 405.972 617.33 L 402.578 612.391 L 396.597 617.33 L 391.102 612.875 L 387.707 573.922 L 418.495 575.438 Z " fill="rgb(170,218,233)"/><path d=" M 426.506 591.689 C 422.956 608.379 402.029 597.046 402.029 588.63 C 395.155 601.154 382.201 591.189 376.698 577.024 C 362.511 586.114 357.043 553.194 361.951 536.964 C 350.012 544.556 345.968 518.366 354.087 502.812 C 340.21 512.005 332.678 485.829 335.238 468.208 C 322.217 473.958 324.887 442.294 331.909 427.638 C 317.393 437.73 323.054 400.134 334.511 388.677 C 318.472 388.677 337.718 363.014 360.4 363.014 C 346.766 349.379 377.588 345.142 395.002 353.088 C 384.92 334.914 413.046 337.639 426.506 351.099 C 439.966 337.639 468.092 334.914 458.01 353.088 C 475.424 345.142 506.246 349.379 492.612 363.014 C 515.294 363.014 534.54 388.677 518.501 388.677 C 529.958 400.134 535.619 437.73 521.103 427.638 C 528.125 442.294 530.795 473.958 517.774 468.208 C 520.334 485.829 512.802 512.005 498.925 502.812 C 507.044 518.366 503 544.556 491.061 536.964 C 495.969 553.194 490.501 586.114 476.314 577.024 C 470.811 591.189 457.857 601.154 450.983 588.63 C 450.983 597.046 430.056 608.379 426.506 591.689 Z " fill="rgb(204,234,244)"/><path d=" M 513.658 436.101 C 513.658 477.232 489.751 505.101 426.507 505.101 C 363.264 505.101 339.356 477.232 339.356 436.101 C 339.356 391.949 363.264 367.102 426.507 367.102 C 489.751 367.102 513.658 391.949 513.658 436.101 Z " fill="rgb(170,218,233)"/><path d=" M 425.728 458.073 C 453.354 458.073 464.48 474.375 464.48 482.653 C 464.48 484.919 462.645 486.755 460.38 486.755 L 391.075 486.755 C 388.809 486.755 386.974 484.919 386.974 482.653 C 386.974 474.375 398.1 458.073 425.728 458.073 Z " fill="rgb(14,77,108)"/><path d=" M 387.536 422.942 C 387.536 415.078 381.16 408.702 373.296 408.702 C 365.431 408.702 359.056 415.078 359.056 422.942 C 359.056 430.805 365.431 437.18 373.296 437.18 C 381.16 437.18 387.536 430.805 387.536 422.942 Z " fill="rgb(14,77,108)"/><path d=" M 492.399 422.942 C 492.399 415.078 486.023 408.702 478.159 408.702 C 470.294 408.702 463.92 415.078 463.92 422.942 C 463.92 430.805 470.294 437.18 478.159 437.18 C 486.023 437.18 492.399 430.805 492.399 422.942 Z " fill="rgb(14,77,108)"/></svg>
                        </span>
                        <span>
                            <h1>uh oh .. there's no study groups</h1>
                            <b-button class="btn btn-danger" :to="{ name: 'addstudygroup', params: { id: this.$route.params.id }}"> add a study group</b-button>
                         </span>
                    </template>
                </div>
            </div>
        </main>
    </div>
</template>

<script>



import { BFormDatepicker,BFormTimepicker} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';

import * as app from './../../api.js';

export default {
    name: 'StudyGroupsListPage',
    components:{Header},
    props: ['courseName'],
    data:function(){
        return {
            buttons: [
              { caption: 'Remote', state: true },
              { caption: 'Near me', state: true },
            ],
            hasData () {
             return this.studygroups.length > 0 ? true : false;
            },
            isFiltered: true,
            check:null,
            filter:{
                date:null,
                time:null,
                course_id:this.$route.params.id,
                search:null,
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
        },
        hasStudyGroups(){
            return this.$store.state.hasStudyGroups;
        }
    },
    mounted() {
        this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
    },
    methods:{
        reset () {
            this.filter.date = null;
            this.filter.time = null;
            this.filter.search = null;
            this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
        },
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
                app.instance.put(`/api/studygroups/${id}`,{data:type}).then(response=>{
                    this.$store.dispatch('setStudyGroups',{id:this.$route.params.id});
                    this.toggle(id);
                }).catch(error => {
                        //validation
                });

        },
        filterSubmit: function(){
            this.$store.dispatch('filterStudyGroup',this.filter);
        }

    }
}
</script>
