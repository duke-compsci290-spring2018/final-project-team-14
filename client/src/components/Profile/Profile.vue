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

export default {
  name: 'Profile',
  
  data () {
    return {
      profile: user
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