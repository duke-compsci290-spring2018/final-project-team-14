<template>
	<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link class="nav-item nav-link" :to="{ path: '/' }" >Sign Out</router-link>
        </div>
      </div>
    </nav>
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
import Job from "./Job.vue";
import axios from 'axios';
axios.defaults.withCredentials=true;
export default {
  name: 'Guest',
  data () {
    return {
      search_position: null,
      search_location: null,
      jobs: null
    }
  },
  components:{
    Job
  },
  methods: {
    search: function(){
      axios('http://127.0.0.1:8081/search', {
        method: "get",
        params: { position: this.search_position, location: this.search_location}
      })
      .then(response =>{
        this.jobs = response["data"];
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
