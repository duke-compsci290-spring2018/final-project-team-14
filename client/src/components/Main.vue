
<template>
  <div>
    <MainNav/>
    <form class="form-inline d-flex justify-content-center" v-on:submit.prevent="search" v-if='isEmployee'>
      <input type="text" class="form-control col-4" placeholder="Search Jobs" v-model="search_position">
      <input type="text" class="form-control col-4 ml-2" placeholder="Search Location" v-model="search_location">
      <button type="submit" class="btn btn-outline-light ml-2">Search</button>
    </form>
    <ul v-if='isEmployee'>
      <li v-for="(job, index) in jobs" :key= "job.id" class="mr-3 mt-3">
        <Job :job="job" />
      </li>
    </ul>
    <div class="mt-2">
      <h4 class="text-center">Employee List</h4>
      <ul>
        <li v-for="(user, index) in users" :key = "index" class="mr-1 mt-1">
          <div class="card" style="width: 15rem;" >
            <div class="card-body">
              <h5>{{user["firstName"]}} {{user["lastName"]}}</h5>
              <h6>{{user["category"]}}</h6>
            </div>
            <div class="card-footer">
              <button role ="button" class="btn btn-info" href="#">View Info</button>
              <button class="btn btn-success" @click="add(user)" >Add</button>
            </div>
          </div>
        </li>
      </ul>
      <h4 class="text-center">Candidate List</h4>
      <ul>
        <li v-for="(candidate, index) in candidates" :key = "index" class="mr-1 mt-1">
          <div class="card" style="width: 15rem;" >
            <div class="card-body">
              <h5>{{candidate["firstName"]}} {{candidate["lastName"]}}</h5>
              <h6>{{candidate["category"]}}</h6>
            </div>
            <div class="card-footer">
              <button role ="button" class="btn btn-info" href="#">View Info</button>
              <button class="btn btn-success" @click="delete_candidate(index)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      search_location: null,
      user_info:null,
      isEmployee:null,
      users: null,
      candidates: null
    }
  },
  created(){
    axios('http://127.0.0.1:8081/profile', {
      method: "get",
      withCredentials: true
    })
    .then(response =>{
      if (!response["data"]["success"]){
        this.$router.push({ path: `/`});
      }
      else{
        this.user_info = response["data"]["data"];
        this.isEmployer = !response["data"]["data"]["isEmployer"];
        this.candidates = [];
        axios('http://127.0.0.1:8081/admin', {
          method: "get",
          withCredentials: true
        })
        .then(response => {
          console.log(response);
          this.users = response["data"]["data"].filter(user => !user["isEmployer"]);
        })
        .catch(e => {
          this.errors.push(e);
        });
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
        this.search_position = "";
        this.search_location = "";
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    add: function(candidate){
      console.log("add");
      this.candidates.push(candidate);
    },
    delete_candidate: function(index){
      this.candidates.splice(index);
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
