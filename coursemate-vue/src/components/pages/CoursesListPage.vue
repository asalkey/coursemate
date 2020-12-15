<template>
    <div class="dashboard">
        <Header :user="user"></Header>
        <main class="h-md-100">
            <div class="container">
                <div class="d-flex flex-row">
                    <div class="mb-3 col-12">
                         <transition name="fade">
                            <template v-if="userCourses && userCourses.length > 0">
                                <b-list-group>
                                      <li class="d-flex list-group-item justify-content-between lh-condensed"  v-for="userCourse in userCourses" v-bind:key="userCourse.id" >
                                          <h6 class="my-0" >{{userCourse.number}}</h6>
                                          <b-button-group>
                                            <b-button :to="{ name: 'showstudygroups', params: { id: userCourse.id,course:userCourse.number }}"><b-icon-eye ></b-icon-eye> View Study Groups</b-button>
                                            <b-button @click='deleteCourse(userCourse.id)'> <b-icon-trash ></b-icon-trash> Remove Course</b-button>
                                          </b-button-group>
                                     </li>
                                </b-list-group>
                            </template>
                            <template v-else>
                                <div class="d-flex flex-row">
                                    <div class="col-4 yeti">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="871.32 20.658 206.551 295.112" width="206.551pt" height="295.112pt"><path d=" M 1074.739 189.472 C 1074.739 226.175 1069.964 275.851 1054.109 275.851 C 1045.466 275.851 1043.439 259.378 1043.439 189.472 C 1043.439 152.768 1050.446 142.936 1059.089 142.936 C 1067.733 142.936 1074.739 152.768 1074.739 189.472 Z " fill="rgb(170,218,233)"/><path d=" M 874.451 189.472 C 874.451 226.175 879.226 275.851 895.081 275.851 C 903.724 275.851 905.751 259.378 905.751 189.472 C 905.751 152.768 898.744 142.936 890.101 142.936 C 881.457 142.936 874.451 152.768 874.451 189.472 Z " fill="rgb(170,218,233)"/><path d=" M 1010 293.303 C 1019.536 285.868 1031.819 293.141 1030.85 303.324 C 1029.88 313.508 1023.416 315.77 1008.06 315.77 C 992.706 315.77 985.594 312.699 985.594 307.527 C 985.594 302.355 985.787 297.758 985.787 297.758 C 985.787 297.758 985.409 286.354 999.979 286.354 C 1008.248 286.354 1010 293.303 1010 293.303 Z " fill="rgb(129,177,195)"/><path d=" M 982.606 255.867 L 985.787 297.758 L 990.765 293.465 L 995.129 297.758 L 998.523 292.819 L 1004.504 297.758 L 1009.999 293.303 L 1013.394 254.35 L 982.606 255.867 Z " fill="rgb(170,218,233)"/><path d=" M 939.191 293.303 C 929.654 285.868 917.371 293.141 918.34 303.324 C 919.31 313.508 925.775 315.77 941.13 315.77 C 956.485 315.77 963.597 312.699 963.597 307.527 C 963.597 302.355 963.403 297.758 963.403 297.758 C 963.403 297.758 963.781 286.354 949.212 286.354 C 940.942 286.354 939.191 293.303 939.191 293.303 Z " fill="rgb(129,177,195)"/><path d=" M 966.584 255.867 L 963.403 297.758 L 958.425 293.465 L 954.061 297.758 L 950.667 292.819 L 944.686 297.758 L 939.191 293.303 L 935.796 254.35 L 966.584 255.867 Z " fill="rgb(170,218,233)"/><path d=" M 974.595 272.118 C 971.045 288.808 950.118 277.475 950.118 269.059 C 943.244 281.583 930.29 271.618 924.787 257.453 C 910.6 266.543 905.132 233.623 910.04 217.393 C 898.101 224.985 894.057 198.795 902.176 183.241 C 888.299 192.434 880.767 166.258 883.327 148.637 C 870.306 154.387 872.976 122.723 879.998 108.067 C 865.482 118.159 871.143 80.563 882.6 69.106 C 866.561 69.106 885.807 43.443 908.489 43.443 C 894.855 29.808 925.677 25.571 943.091 33.517 C 933.009 15.343 961.135 18.068 974.595 31.528 C 988.055 18.068 1016.181 15.343 1006.099 33.517 C 1023.513 25.571 1054.335 29.808 1040.701 43.443 C 1063.383 43.443 1082.629 69.106 1066.59 69.106 C 1078.047 80.563 1083.708 118.159 1069.192 108.067 C 1076.214 122.723 1078.884 154.387 1065.863 148.637 C 1068.423 166.258 1060.891 192.434 1047.014 183.241 C 1055.133 198.795 1051.089 224.985 1039.15 217.393 C 1044.058 233.623 1038.59 266.543 1024.403 257.453 C 1018.9 271.618 1005.946 281.583 999.072 269.059 C 999.072 277.475 978.145 288.808 974.595 272.118 Z " fill="rgb(204,234,244)"/><path d=" M 1061.747 116.529 C 1061.747 157.66 1037.84 185.529 974.596 185.529 C 911.353 185.529 887.445 157.66 887.445 116.529 C 887.445 72.377 911.353 47.53 974.596 47.53 C 1037.84 47.53 1061.747 72.377 1061.747 116.529 Z " fill="rgb(170,218,233)"/><path d=" M 935.528 102.701 C 935.528 94.838 929.152 88.461 921.288 88.461 C 913.424 88.461 907.049 94.838 907.049 102.701 C 907.049 110.565 913.424 116.941 921.288 116.941 C 929.152 116.941 935.528 110.565 935.528 102.701 Z " fill="rgb(14,77,108)"/><path d=" M 1040.391 102.701 C 1040.391 94.838 1034.016 88.461 1026.151 88.461 C 1018.287 88.461 1011.912 94.838 1011.912 102.701 C 1011.912 110.565 1018.287 116.941 1026.151 116.941 C 1034.016 116.941 1040.391 110.565 1040.391 102.701 Z " fill="rgb(14,77,108)"/><path d=" M 996.07 157.987 L 951.37 157.987 C 947.971 157.987 945.218 155.232 945.218 151.835 C 945.218 148.438 947.971 145.683 951.37 145.683 L 996.07 145.683 C 999.467 145.683 1002.221 148.438 1002.221 151.835 C 1002.221 155.232 999.467 157.987 996.07 157.987 Z " fill="rgb(14,77,108)"/></svg>
                                    </div>
                                    <div class="col-6 notice">
                                        <h2>Uh oh.. you don't have any courses yet! Add courses to your course list</h2>
                                    </div>
                                </div>
                            </template>
                        </transition>
                        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                          <form @submit.prevent="handleSubmit(onSubmit)">
                             <ValidationProvider name="number" rules="required" v-slot="validationContext" >
                                    <b-input-group class="mt-3">
                                      <b-form-input list="course-id" v-model="courseData.number" placeholder="Course ID" :state="getValidationState(validationContext)" autocomplete="off"></b-form-input>
                                      <datalist id="course-id">
                                        <option v-for="schoolCourse in schoolCourses" v-bind:key="schoolCourse.id">{{ schoolCourse.number }}</option>
                                      </datalist>
                                      <b-input-group-append>
                                        <b-button type="submit" variant="info">+ Add</b-button>
                                      </b-input-group-append>
                                      <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                    </b-input-group>
                            </ValidationProvider>
                          </form>
                        </ValidationObserver>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>



import {BListGroup} from 'bootstrap-vue'
import Header from './../DashboardHeader.vue';
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import * as app from './../../api.js';

export default {
    name: 'CoursesListPage',
    components:{Header,BListGroup,ValidationProvider,ValidationObserver},
    data:function(){
        return {
            courseData:{
                number:''
            }
        }
    },
    props: ['user'],
    computed: {
        userCourses(){
            return this.$store.state.userCourses;
        },
        schoolCourses(){
            return this.$store.state.allCourses;
        }
    },
    created() {
        this.$store.dispatch('userCourses');
        this.$store.dispatch('allCourses');
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit: function(){
            this.courseData.number = this.courseData.number.toUpperCase();
            app.instance.post('/api/courses',this.courseData).then(response=>{
                this.$store.dispatch('userCourses');
            }).catch(error => {
                this.$refs.form.setErrors(error.response.data.errors);
                return;
            });

        },
        deleteCourse: function(id){
            app.instance.delete(`/api/courses/${id}`).then(response=>{
                this.$store.dispatch('userCourses');
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style>
.yeti svg{
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
}

.notice h1 {
    font-weight: bolder;
    letter-spacing: 0px;
    background: antiquewhite;
    padding: 20px;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

</style>
