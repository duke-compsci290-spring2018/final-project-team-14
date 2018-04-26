
<template>
  <div >
    <MainNav/>
    <form class="form-inline d-flex justify-content-center" v-on:submit.prevent="search">
      <input type="text" class="form-control col-4" placeholder="Search Jobs">
      <input type="text" class="form-control col-4 ml-2" placeholder="Search Location">
      <button type="submit" class="btn btn-outline-light ml-2">Search</button>
    </form>
    <ul>
      <li v-for="job in jobs" class="mr-3 mt-3">
        <Job :job="job" />
      </li>
    </ul>
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
import Job from "./Job.vue";
import data from "../JSON/data.json"
import axios from 'axios';
axios.defaults.withCredentials=true;
export default {
  name: 'Main',
  data(){
    return{
      firstName: null,
      lastName: null,
      jobs: data
    }
  },
  created(){
    axios('http://127.0.0.1:8081/main', {
      method: "get",
      withCredentials: true
    })
    .then(response =>{
      // if the cookie has the correct user info, then direct route to main page
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
