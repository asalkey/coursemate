<template>
    <div>
        <div class="d-md-flex h-md-100 align-items-center">
            <!-- First Half -->

            <div class="col-md-6 p-0 bg-indigo h-md-100">
                <div class="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <div class="logoarea pt-5 pb-5">
                          <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:5%">Coursemate </a>
                          <img class="img-fluid d-none d-sm-none d-md-block d-lg-block" src="@/assets/images/2785837.png"/>
                    </div>
                </div>
            </div>

            <!-- Second Half -->

            <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
                <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                     <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(register)">
                            <div class="form-group">
                              <label for="name">Name</label>
                               <ValidationProvider name="name" rules="required" v-slot="validationContext">
                                    <b-form-input type="text" v-model="formData.name" placeholder="Jane Doe" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>

                            <div class="form-group">
                              <label for="email">Email</label>
                               <ValidationProvider name="email" rules="required" v-slot="validationContext">
                                    <b-form-input type="email" v-model="formData.email" placeholder="you@example.com" :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>

                            <div class="form-group">
                              <label for="password">Password</label>
                              <ValidationProvider name="password" rules="required" v-slot="validationContext">
                                <b-form-input type="password" v-model="formData.password"  :state="getValidationState(validationContext)"></b-form-input>
                                <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                               </ValidationProvider>
                            </div>

                            <div class="form-group">
                              <label for="password_confirmation">Confirm Password</label>
                              <ValidationProvider name="password_confirmation" rules="required" v-slot="validationContext">
                                    <b-form-input type="password" v-model="formData.password_confirmation"  :state="getValidationState(validationContext)"></b-form-input>
                                    <div class="invalid-feedback">{{ validationContext.errors[0] }}</div>
                                </ValidationProvider>
                            </div>


                            <div class="mb-3">
                              <label for="school">School: {{school_name}}</label>
                              <ValidationProvider name="School" rules="required" v-slot="{ errors }">
                                  <b-form-input @keyup="schoolSearch" v-model="schoolInput" class="schools" placeholder="search for your school..."></b-form-input>
                                  <div class="select">
                                      <span v-for="school in schools" v-bind:key="school.id" >
                                        <div class="option" @click="schoolChoice(school.id,school.name)">{{ school.name }}</div>
                                      </span>
                                  </div>
                                  <div class="alert alert-danger" v-if="errors[0]">{{ errors[0] }}</div>
                              </ValidationProvider>
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" >Register</button>
                      </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ValidationProvider,ValidationObserver} from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

export default {
    name: 'PasswordResetPage',
    components:{ValidationProvider,ValidationObserver},
    data:function(){
        return {
            schoolPick (value){
              let getOption = document.querySelectorAll(`#schools-list option[value="${value}"]`)[0];
              let getOptionID = (getOption) ? getOption.dataset.id : null;

              return (getOptionID) ? getOptionID : null;

            },
            schoolDisplay:'',
            school_name:null,
            formData: {
                email: '',
                password: '',
                password_confirmation: '',
                school_id:'',
            }
        }
    },
    computed: {
        schools() {
           return this.$store.state.schools;
        },
        schoolInput: {
            get() {
              return this.schoolDisplay
            },
            set(value) {
              this.formData.school_id = this.schoolPick(value);

              this.schoolDisplay = value;
            }
        },
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        register: function(){
            this.$store.dispatch('register',this.formData).then((res) => {
                this.$store.dispatch('setUser').then((res) => {
                    this.$router.push({name:'showcourses'});
                }).catch((error) => {
                    alert(error)
                });
            }).catch((error) => {
              alert(error)
            });
        },
        schoolSearch: function(term){
            this.$store.dispatch('schoolSearch', this.schoolInput);
        },
        schoolChoice: function(id,name){
            this.formData.school_id = id;
            this.school_name = name;
        }
    }
}
</script>

<style>
 .select{
    height:80px;
    overflow-x: scroll;
 }

 .option{
    cursor:pointer;
  }

  .option:hover{
    background:yellow;
   }
</style>
