<template>
	<div class="main">
		<h1>Profile</h1>
		<Summary :summary-data="profile.summary"></Summary>
		<Experience :exp-data="profile.experience"></Experience>
		<Education :edu-data="profile.education"></Education>
		<Skills :skill-data="profile.skills"></Skills>
		<Accomplishments :accomp-data="profile.accomplishments"></Accomplishments>
	</div>
</template>

<script>
import Summary from './Summary.vue'
import Experience from './Experience.vue'
import Education from './Education.vue'
import Skills from './Skills.vue'
import Accomplishments from './Accomplishments.vue'
import user from '../../JSON/user.json'
import axios from 'axios'

export default {
  name: 'Profile',

  created() {
    axios('http://127.0.0.1:8081/users/test', {
        method: "get",
      })
      .then(response =>{
        this.profile = response.data;
        console.log(this.profile);
        //console.log(response.data.summary.name);
      })
      .catch(e => {
        this.errors.push(e);
      })
  },
  
  data () {
    return {
      profile: {
        summary: {
          name: "",
          occupation: "",
          school: "",
          company: "",
          position: "",
          job: "",
          selfIntro: ""
        },
        experience: [],
        education: [],
        skills: [],
        accomplishments: {
          courses: [],
          projects: [],
          languages: [],
          tests: []
        }
      }
    }
  },

  components: {
  	Summary, 
  	Experience, 
  	Education, 
  	Skills, 
  	Accomplishments
  },

  methods: {
  	test() {
  		console.log("data:");
  		console.log(this.profile.experience);
  	}
  },

  updated() {
    console.log("Opreation happens!");
  }
}
</script>

<style scoped>
.main {
	margin-left: 20%;
	margin-right: 20%;
}
h1 {
	text-align: center;
}
</style>