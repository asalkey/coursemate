<template>
    <div>
        <div class="d-md-flex flex-row">
            <div class="col-md-6 first-block">
                <div class="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <div class="logoarea pt-5 pb-5">
                          <a class="navbar-brand" href="/" aria-label="Bootstrap"> <img src="https://image.flaticon.com/icons/svg/2232/2232688.svg" style="width:5%">Coursemate </a>
                          <img class="img-fluid d-none d-sm-none d-md-block d-lg-block" src="@/assets/images/2785837.png"/>
                    </div>
                </div>
            </div>

            <!-- Second Half -->

            <div class="col-md-6 pt-5 second-block">
                <div class="d-md-flex h-md-100 justify-content-center">

                     <ValidationObserver ref="form" v-slot="{ handleSubmit }" class="form-wrap">
                        <h2 class="text-center">Register</h2>
                        <hr>
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
                               <ValidationProvider name="email" rules="required|email" v-slot="validationContext">
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
                              <div class="school-search ">
                                    <ValidationProvider name="school_id" rules="required" v-slot="validationContext">
                                        <span class="btn-secondary dropdown p-2" @click="schoolDropDown.menu = !schoolDropDown.menu">{{schoolDropDown.value}}</span>
                                        <div class="wrap" v-show="schoolDropDown.menu">
                                            <input @keyup="schoolSearch($event.target.value)" class="schools" placeholder="search for your school..." :state="getValidationState(validationContext)" />
                                            <b-list-group class="menu">
                                              <span v-for="school in schools" v-bind:key="school.id" >
                                                <b-list-group-item button @click=schoolChoice(school.id,school.name)>{{ school.name }}</b-list-group-item>
                                              </span>
                                            </b-list-group>
                                        </div>
                                        <input type="number" v-model="formData.school_id" style="display:none" readonly />
                                        <div class="invalid-feedback" v-bind:style="validationContext.errors[0] ? 'display:block;' : 'display:none;'">{{ validationContext.errors[0] }}</div>
                                    </ValidationProvider>
                              </div>
                            </div>
                            <button class="mb-3 btn btn-primary btn-lg btn-block" type="submit" >Register</button>
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
            schoolDropDown:{
                menu: false,
                value: "Select your school...",
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
                    console.log(error);
                });
            }).catch((error) => {
              this.$refs.form.setErrors(error.response.data.errors);
              return;
            });
        },
        schoolSearch: function(term){
            this.$store.dispatch('schoolSearch', term);
        },
        schoolChoice: function(id,name){
            this.formData.school_id = id;
            this.schoolDropDown.value = name;
            this.schoolDropDown.menu = false;
        }
    }
}
</script>

<style>
  .second-block{
    background: #f8f9fa;
    border-left: thin solid #eaebec;
  }
 .school-search .menu{
    height: 80px;
    overflow-y: scroll;
 }

 .school-search .dropdown{
    width: 100%;
    display: block;
    overflow:hidden;
    cursor:pointer;
  }

  .school-search .schools{
    width:100%;
   }

  .school-search .wrap{

    border: thin solid lightgray;
    padding: 2%;

   }

   .form-wrap{
    width:35vw;
   }

 .option{
    cursor:pointer;
  }

  .option:hover{
    background:yellow;
   }
</style>
