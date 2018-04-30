<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand col-md-5 col-5" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
      <router-link role ="button" class="nav-item nav-link btn btn-outline-success" :to="{ path: '/' }">Sign Out</router-link>
    </nav>
    <div class="mt-2 text-center">
      <h2>User List</h2>
      <ol class="row">
        <li v-for="user in users" :index = "user.id" class="mr-3 mt-3 col-12 row">
          <div class="col-4">
            {{user["firstName"]}} {{user["lastName"]}} {{user["username"]}}
          </div>
          <div class="col-4">
            Employer: {{user["isEmployer"]}}
          </div>
          <div class="col-4">
            <a v-on:click="delete_user(user.username)">
              <span class="fa fa-trash"></span>
            </a>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config.js'

axios.defaults.withCredentials=true;

export default {
  name: 'adminMain',
  data () {
    return {
      users: null
    }
  },
  created(){
      axios(config.domain + ':8081/admin', {
        method: "get",
        withCredentials: true
      })
      .then(response => {
        this.users = response["data"]["data"];
        console.log(this.users);
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods:{
    delete_user: function(username){
      axios(config.domain + ':8081/admin/delete', {
        method: "post",
        data : {username: username}
      })
      .then(response => {
        if (response["data"]["success"]){
          console.log("1");
          axios(config.domain + ':8081/admin', {
            method: "get",
            withCredentials: true
          })
          .then(response => {
            console.log(response);
            this.users = response["data"]["data"];
          })
          .catch(e => {
            this.errors.push(e);
          });
        }
      })
      .catch(e => {
        this.errors.push(e);
      });
    }
  }
}
</script>
<style scoped>
  .fa-trash{
    cursor: pointer;
  }
</style>
