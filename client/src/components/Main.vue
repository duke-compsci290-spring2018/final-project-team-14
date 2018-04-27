
<template>
  <div >
    <MainNav/>
    <form class="form-inline d-flex justify-content-center" v-on:submit.prevent="search">
      <input type="text" class="form-control col-4" placeholder="Search Jobs" v-model="search_position">
      <input type="text" class="form-control col-4 ml-2" placeholder="Search Location" v-model="search_location">
      <button type="submit" class="btn btn-outline-light ml-2">Search</button>
    </form>
    <ul>
      <li v-for="(job, index) in jobs" :key= "job.id" class="mr-3 mt-3">
        <Job :job="job" />
      </li>
    </ul>
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
import Job from "./Job.vue";
import axios from 'axios';
import $ from 'jquery';
axios.defaults.withCredentials=true;
export default {
  name: 'Main',
  data(){
    return{
      firstName: null,
      lastName: null,
      jobs: null,
      search_position: null,
      search_location: null
    }
  },
  created(){
    axios('http://127.0.0.1:8081/profile', {
      method: "get",
      withCredentials: true
    })
    .then(response =>{
      // if the cookie has the correct user info, then direct route to main page
      console.log(response);
      if (!response["data"]["success"]){
        this.$router.push({ path: `/`});
      }
    })
    .catch(e => {
      this.errors.push(e);
    });
  },
  components:{
    MainNav,
    Job
  },
  methods:{
    search: function(){
      axios('http://127.0.0.1:8081/search', {
        method: "get",
        params: { position: this.search_position, location: this.search_location}
      })
      .then(response =>{
        this.jobs = [];
        this.jobs = response["data"];
        console.log(this.jobs);
        this.search_position = "";
        this.search_location = "";
      })
      .catch(e => {
        this.errors.push(e);
      })
    }
  }
}
</script>
<style scoped>
  form{
    padding:10px;
    background-color: #5c6f7c;
  }
  li{
    list-style: none;
    display: inline-block;
  }
</style>
