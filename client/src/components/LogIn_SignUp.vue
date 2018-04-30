<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand col-md-5 col-5" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Duke icon">
      </a>
      <form class="form-inline" v-on:submit.prevent="logIn">
        <input class="form-control mr-sm-2" type="email" placeholder="Username" v-model="userName" required>
        <input class="form-control mr-sm-2" type="password" placeholder="Password" v-model="password" required>
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Sign In</button>
      </form>
      <router-link role ="button" class="nav-item nav-link btn btn-outline-secondary" :to="{ path: 'guest' }">Guest</router-link>
      <router-link role ="button" class="nav-item nav-link btn btn-outline-success" :to="{ path: 'adminLogin' }">Administrator</router-link>
    </nav>
    <div class="body">
      <div class="card text-center">
        <div class="card-header">
          <h4>Be Great at What You Do</h4>
          <h6>Get started - its free</h6>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="signUp">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="firstName" required>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="lastName" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="signIn_password" required>
            </div>
            <div class="form-group">
              <label for="company">Company</label>
              <input type="text" class="form-control" id="company" v-model="company" required>
            </div>
            <div class="form-group">
              <label for="identity">Identity</label>
              <select class="custom-select" id="identity" required v-model="category">
                <option value="1">Employee</option>
                <option value="2">Employer</option>
              </select>
            </div>
            <button class="btn btn-primary">Join Now</button>
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
  name: 'LogIn_SignUp',
  data () {
    return {
      userName: null,
      password: null,
      firstName: null,
      lastName: null,
      category: null,
      email: null,
      company: null,
      signIn_password:null
    }
  },
  created(){
  },
  methods:{
    logIn: function(){
      axios(config.domain + ':8081/auth', {
        method: "post",
        data: { username: this.userName, password: this.password }
      })
      .then(response => {
        if (response["data"]["success"]){
          this.$router.push({ path: `/main`});
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
    },
    signUp: function(){
      axios(config.domain + ':8081/signup', {
        method: "post",
        data:{
          username: this.email,
          password: this.signIn_password,
          firstName: this.firstName,
          lastName: this.lastName,
          category: this.category,
          company: this.company
        }
      })
      .then(response =>{
        if (response["data"]["success"]){
          this.$router.push({ path: `/main`});
        }
        else{
          this.email = "";
          this.signIn_password = "";
          this.firstName = "";
          this.lastName = "";
          alert("Email has been registered.");
        }
      })
      .catch(e => {
        this.errors.push(e);
      })
    }
  }
}
</script>
<style scoped>
.body{
  height: 85vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../assets/signIn.jpg");
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
  height: 640px;
  transform: translate(-50%, -50%);
}
</style>
