<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand col-md-5 col-5" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
      <router-link role ="button" class="nav-item nav-link btn btn-outline-success" :to="{ path: '/' }">Login</router-link>
    </nav>
    <div class="body">
      <div class="card text-center">
        <div class="card-header">
          <h4>Administrator Login</h4>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="signIn">
            <div class="form-group">
              <label for="email">Username</label>
              <input type="email" class="form-control" id="email" v-model="userName" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button class="btn btn-primary">Sign In</button>
          </form>
        </div>
     </div>
    </div>
    <footer class="container">
      <div class="row">
        <div class="col-12 contact d-flex justify-content-center">
          <a class="btn btn-social-icon btn-google-linkedin big-icon" href="https://www.linkedin.com/in/yifeng-liu-364ab280/"><span class="fa fa-linkedin fa-3x"></span></a>
          <a class="btn btn-social-icon btn-github big-icon" href="https://github.com/two-for-five"><span class="fa fa-github fa-3x"></span></a>
          <a class = "btn btn-social-icon big-icon" href="mailto:yl487@duke.edu"><span class="fa fa-envelope fa-3x"></span></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config.js'

axios.defaults.withCredentials=true;
export default {
  name: 'adminLogin',
  data () {
    return {
      userName: null,
      password: null
    }
  },
  created(){
  },
  methods:{
    signIn: function(){
      axios(config.domain + ':8081/admin/auth', {
        method: "post",
        data: { username: this.userName, password: this.password }
      })
      .then(response => {
        console.log(response);
        if (response["data"]["success"]){
          this.$router.push({ path: `/adminMain`});
        }
        else{
          this.userName = "";
          this.password = "";
          alert("Username or password is not correct.");
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
.body{
  height: 85vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../assets/admin.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  position: relative;
}
.card{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  transform: translate(-50%, -50%);
}
</style>
