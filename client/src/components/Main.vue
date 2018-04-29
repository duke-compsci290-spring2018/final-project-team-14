
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
    <div class="mt-2" v-else>
      <h4 class="text-center">Employee List</h4>
      <ul>
        <li v-for="(user, index) in users" :key = "index" class="mr-1 mt-1">
          <div class="card" style="width: 15rem;" >
            <div class="card-body">
              <h5>{{user["firstName"]}} {{user["lastName"]}}</h5>
              <h6>{{user["category"]}}</h6>
            </div>
            <div class="card-footer">
              <button role ="button" class="btn btn-info" data-toggle="modal" :data-target="'#model' + index" @click = "get_employee_info(user)">View Info</button>
              <div class="modal fade" :id="'model' + index">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <div class="text-center">
                        <h4>{{employee_info.summary.name}}</h4>
                        <p>{{employee_info.summary.occupation}}</p>
                        <p>{{employee_info.summary.position}}</p>
                        <p>{{employee_info.summary.selfIntro}}</p>
                      </div>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <h3>Education: </h3>
                      <ul>
                        <li v-for="school in employee_info.education" class="education">
                          <h5>{{school.name}} &nbsp; &nbsp; &nbsp;{{school.timeStart}} - {{school.timeEnd}}</h5>
                          <p>{{school.degree}} {{school.major}}</p>
                        </li>
                      </ul>
                      <h3>Experiences: </h3>
                      <ul>
                        <li v-for = "exp in employee_info.experience" class="education">
                          <h5>{{exp.title}} &nbsp; &nbsp; &nbsp; {{exp.timeStart}} - {{exp.timeEnd}}</h5>
                          <h6>{{exp.place}} &nbsp; &nbsp; &nbsp; {{exp.position}}</h6>
                          <p>{{exp.work}}</p>
                        </li>
                      </ul>
                      <h3>Skills: </h3>
                      <ol>
                        <li v-for = "skill in employee_info.skills" class="education">
                          <p>{{skill}}</p>
                        </li>
                      </ol>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-success" @click="add(user)" >Add</button>
            </div>
          </div>
        </li>
      </ul>
      <h4 class="text-center">Candidate List</h4>
      <ul>
        <li v-for="(candidate, index) in candidates" :key = "candidate.username" class="mr-1 mt-1">
          <div class="card" style="width: 20rem;" >
            <div class="card-body">
              <h5>{{candidate["user"]["firstName"]}} {{candidate["user"]["lastName"]}}</h5>
              <h6>{{candidate["status"]}}</h6>
            </div>
            <div class="card-footer">
              <button role ="button" class="btn btn-info" data-toggle="modal" :data-target="'#model' + index" @click = "get_employee_info(candidate.user)">View Info</button>
              <button role ="button" class="btn btn-success">Skype</button>
              <button class="btn btn-danger" @click="delete_candidate(candidate)">Delete</button>
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
      jobs: null,
      search_position: null,
      search_location: null,
      user_info:null,
      isEmployee:null,
      users: null,
      candidates: null,
      employee_info: null
    }
  },
  created(){
    this.employee_info = {
      "summary" : {
        "name" : "",
        "occupation" : "",
        "position" : "",
        "selfIntro" : ""
      },
      "experience" : "",
      "skills" : "",
      "education" : ""
    }

    axios('http://127.0.0.1:8081/profile', {
      method: "get",
      withCredentials: true
    })
    .then(response =>{
      console.log(response);
      if (!response["data"]["success"]){
        this.$router.push({ path: `/`});
      }
      else{
        this.user_info = response["data"]["data"]["user"];
        this.isEmployee = response["data"]["data"]["user"]["isEmployer"] ? false: true;
        this.candidates = response["data"]["data"]["list"];

        // get the user
        axios('http://127.0.0.1:8081/admin', {
          method: "get",
          withCredentials: true
        })
        .then(response => {
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
    get_employee_info: function(user){
      console.log(user)
      axios(`http://127.0.0.1:8081/users/profile/${user["username"]}`, {
        method: "get"
      })
      .then(response =>{
        console.log(response);
        this.employee_info = response["data"];
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
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
    },
    add: function(candidate){
      axios('http://127.0.0.1:8081/candidate', {
        method: "post",
        data: { isAdd: true, username: candidate["username"]}
      })
      .then(response =>{
        axios('http://127.0.0.1:8081/profile', {
          method: "get",
          withCredentials: true
        })
        .then(response =>{
          this.candidates = response["data"]["data"]["list"];
        })
        .catch(e => {
          this.errors.push(e);
        })
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    delete_candidate: function(candidate){
      axios('http://127.0.0.1:8081/candidate', {
        method: "post",
        data: { isAdd: false, username: candidate["user"]["username"]}
      })
      .then(response =>{
        console.log(response);
        axios('http://127.0.0.1:8081/profile', {
          method: "get",
          withCredentials: true
        })
        .then(response =>{
          this.candidates = response["data"]["data"]["list"];
        })
        .catch(e => {
          this.errors.push(e);
        })
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
  .education{
    display: block;
  }
</style>
