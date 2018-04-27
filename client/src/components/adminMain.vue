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
        <li v-for="user in users" class="mr-3 mt-3 col-12 row">
          <div class="col-4">
            {{user["username"]}}
          </div>
          <div class="col-4">
            {{user["category"]}}
          </div>
          <div class="col-4">
            <a v-on:click="delete_user">
              <span class="fa fa-trash"></span>
            </a>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
let users = [
  {
    username: "Yifeng Liu",
    category: "employee"
  },
  {
    username: "Yifeng Liu",
    category: "employee"
  }
]
export default {
  name: 'adminMain',
  data () {
    return {
      users: users
    }
  },
  created(){

  },
  methods:{
    delete_user: function(){
      console.log("delete_user");
    }
  }
}
</script>
<style scoped>
  .fa-trash{
    cursor: pointer;
  }
</style>
