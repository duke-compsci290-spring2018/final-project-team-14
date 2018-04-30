<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Duke icon">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <router-link class="nav-item nav-link active" :to="{ path: '/main' }" >Home</router-link>
        <router-link class="nav-item nav-link" :to="{ path: '/user/profile' }" >Profile</router-link>
        <router-link class="nav-item nav-link" :to="{ path: '/chatroom' }" >Chatroom</router-link>
        <a class="nav-item nav-link" v-on:click="signOut">Sign Out</a>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import config from '../config.js'

axios.defaults.withCredentials=true;
export default {
  name: 'MainNav',
  data () {
    return {
    }
  },
  methods:{
    signOut: function(){
      axios(config.domain + ':8081/logout', {
        method: "get",
        withCredentials: true
      })
      .then(response =>{
        this.$router.push({ path: `/`});
      })
      .catch(e => {
        this.errors.push(e);
      });
    }
  }
}
</script>
<style scoped>
</style>
