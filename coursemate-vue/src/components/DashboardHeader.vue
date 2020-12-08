<template>
    <header>
        <Navigation :user="user"></Navigation>
        <div class="d-flex flex-row justify-content-center align-content-center">
            <div class="d-flex flex-column">
                <span v-if="$route.name === 'showcourses'">
                   <h1>Course list</h1>
                </span>
                <span v-else-if="$route.name === 'showstudygroups'">
                    <h1>Study groups</h1>
                </span>
                <span v-else-if="$route.name === 'addstudygroup'">
                    <h1>Create a study group </h1>
                </span>
                  <div v-if="$route.name != 'showcourses'">
                    <b-button-group class="mt-3 mb-3">
                      <b-button variant="outline-primary" :to="{ name: 'showcourses'}">
                        <b-icon icon="list-nested"></b-icon> Course List
                      </b-button>
                      <b-button variant="outline-primary" :to="{ name: 'addstudygroup', params: { id: this.$route.params.id }}">
                        <b-icon icon="plus-circle"></b-icon> Create a study group
                      </b-button>
                      <span v-if="$route.name != 'showstudygroups'">
                          <b-button variant="outline-primary" :to="{ name: 'showstudygroups', params: { id: this.$route.params.id }}">
                            <b-icon icon="list-nested"></b-icon> Study Groups
                          </b-button>
                      </span>
                    </b-button-group>
                  </div>
            </div>
        </div>

    </header>
</template>

<script>
import Navigation from './Nav.vue';
export default {
    components:{Navigation},
    props: ['user'],
    mounted() {
        console.log(this.$route);
    }
}
</script>

<style>
    h1{
        font-weight:bold !important;
    }
</style>
