<template>
	<div>
		<MainNav/>
		<div class="main">
			<Summary :summary-data="profile.summary" @summaryChanged="updateSummary"></Summary>
			<Experience :exp-data="profile.experience" @expChanged="updateData"></Experience>
			<Education :edu-data="profile.education" @eduChanged="updateData"></Education>
			<Skills :skill-data="profile.skills" @skillChanged="updateData"></Skills>
			<Accomplishments :accomp-data="profile.accomplishments" @accompChanged="updateData"></Accomplishments>
		</div>
	</div>
</template>

<script>
import MainNav from "./../MainNav.vue";
import Summary from './Summary.vue'
import Experience from './Experience.vue'
import Education from './Education.vue'
import Skills from './Skills.vue'
import Accomplishments from './Accomplishments.vue'
import user from '../../JSON/user.json'
import axios from 'axios'
import config from '../../config.js'

export default {
  name: 'Profile',

  created() {
    axios(config.domain + ':8081/users/profile', {
        method: "get",
				withCredentials: true
      })
      .then(response =>{
				console.log(response);
        this.profile = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },

  data () {
    return {
      profile: {
        summary: {
          name: '',
          occupation: '',
          school: '',
          company: '',
          position: '',
          job: '',
          selfIntro: ''
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
  	Accomplishments,
		MainNav
  },

  methods: {
    updateData(data) {
      console.log(data);
      axios(config.domain + ':8081/users/profile', {
        method: "post",
        data: {profile: this.profile}
      })
      .then(response =>{
        console.log(response);
      })
      .catch(e => {
        this.errors.push(e);
      });
    },

    updateSummary(data) {
      console.log("Change summary!");
      console.log(data);
      this.profile.summary = data;
      axios(config.domain + ':8081/users/profile', {
        method: "post",
        data: {profile: this.profile}
      })
      .then(response =>{
        console.log(response);
      })
      .catch(e => {
        this.errors.push(e);
      });
    },

  	test() {
  		console.log("data:");
  		console.log(this.profile.experience);
  	}
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
