<template>
  <div class="main">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Athletics_logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <router-link class="nav-item nav-link active" :to="{ path: '/main' }" @click.native="disconnect">Home</router-link>
        <router-link class="nav-item nav-link" :to="{ path: '/user/profile' }" @click.native="disconnect">Profile</router-link>
        <router-link class="nav-item nav-link" :to="{ path: '/chatroom' }">Chatroom</router-link>
        <a class="nav-item nav-link" v-on:click="signOut">Sign Out</a>
      </div>
    </div>
  </nav>
      <div>
        <div v-if="chatting">
          <div v-for="item in megs" id="m">
            <div style="text-align: right;" class="me" v-if="item.self">
              <span class="message">{{item.message}}</span>
              <span class="name">{{item.realName}}</span>
            </div>
            <div style="text-align: left;" class="others" v-else>
              <span class="name">{{item.realName}}</span>
              <span class="message">{{item.message}}</span>
            </div>            
          </div>
          <div class="chatbox">
              <input type="text" placeholder="" v-model="message" @keyup.enter="sendMessage">
              <button type="button" class="btn btn-sm btn-info" @click="sendMessage">Send</button>
          </div>
        </div>

        <div class="login mx-auto" v-else>
          <h1 class="my-3">Chat Room</h1>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'
import MainNav from './MainNav'

export default {
  name: 'Chatroom',
  components:{
    MainNav
  },
  data () {
    return {
      socket: '',
      user: '',
      name: '',
      message: '',
      megs: [],
      chatting: false
    }
  },

  created() {
    var that = this;
    console.log("chat room created()");
    axios(config.domain + ':8081/users/chat', {
        method: "get",
        withCredentials: true
      })
      .then(response =>{
        console.log(response.data.data.username);
        this.user = response.data.data.username;
        this.name = response.data.data.firstName + ' ' + response.data.data.lastName;

        this.socket = io(config.domain + ':8082');
        this.socket.emit('login', {userName: this.user});

         /*log in succeed*/
        this.socket.on('loginSuccess', function(data) {
          if (data.userName === that.user){
              that.beginChat();
          }
          else {
              console.log(data.userName + '!=' + that.user)
          }
        });

        /*log in fail*/
        this.socket.on('loginFail', function() {
          alert('This user name already exists, please change one');
        }); 
      })
      .catch(e => {
        this.errors.push(e);
      });
  },

  methods: {
    signOut: function(){
      axios(config.domain + ':8081/logout', {
        method: "get",
        withCredentials: true
      })
      .then(response =>{
        this.$router.push({ path: `/`});
        this.socket.close();
      })
      .catch(e => {
        this.errors.push(e);
      });
    },

    disconnect() {
      console.log(this.socket);
      this.socket.close();
    },

    beginChat() {
      this.chatting = true;
      var that = this;

      /* notification: new user joins */
      this.socket.on('add', function(data) {
        console.log(data.userName + ' joins this chatroom');
      });

      /* receive message */
      this.socket.on('receiveMessage', function(data) {       
        if (data.userName === that.user) {
          data.self = true;
          console.log(data.message);
        }
        else {
          data.self = false;
          console.log(data.userName + ': ' + data.message);
        }
        that.megs.push(data);
      });

      /* notification: someone exits */
      this.socket.on('leave', function(name) {
          console.log(name + " exits");
      });
    },

    sendMessage() {
      if (this.message) {
        this.socket.emit('sendMessage', {userName: this.user, realName: this.name, message: this.message, self: false});
        this.message = '';
      }
    }
  }
}
</script>

<style scoped>
.main {
  margin: 2%;
}

.login {
  margin-top: 5%;
  text-align: center;
}

.chatbox {
  left: 1%;
  position: fixed;
  background-color: #ffffff;
  bottom: 3px;
  width: 100%;
}

.chatbox input {
  width: 88%;
}

.chatbox button {
  width: 10%;
}

#m {
  padding: 0.5%;
}

.name {
  background-color: lightblue;
  border: 2px solid #efffff;
  border-radius: 5px;
  padding: 5px;
}

.message {
  border-radius: 5px;
  background-color: #eeeeee;
  border: 2px solid #efffff;
  padding: 5px;
}

.me .message {
  background-color: #B0E46E;
}
</style>
