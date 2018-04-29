<template>
  <div class="main">
      <div>
        <div v-if="chatting">
          <div v-for="item in megs" id="m">
            <div style="text-align: right;" class="me" v-if="item.self">
              <span class="message">{{item.message}}</span>
              <span class="name">{{item.userName}}</span>
            </div>
            <div style="text-align: left;" class="others" v-else>
              <span class="name">{{item.userName}}</span>
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

export default {
  name: 'Chatroom',

  data () {
    return {
      socket: '',
      user: '',
      message: '',
      megs: [],
      chatting: false
    }
  },

  created() {
    var that = this;
    console.log("chat room created()");
    axios('http://127.0.0.1:8081/users/profile', {
        method: "get",
        withCredentials: true
      })
      .then(response =>{
        console.log(response.data.summary.name);
        this.user = response.data.summary.name;

        this.socket = io('http://127.0.0.1:8082');
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
        this.socket.emit('sendMessage', {userName: this.user, message: this.message, self: false});
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
