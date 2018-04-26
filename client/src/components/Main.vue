
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

export default {
  name: 'Main',
  data(){
    return{
      jobs: data
    }
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
