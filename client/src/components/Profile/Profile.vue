<template>
	<div>
		<h1>Profile</h1>
		<Summary></Summary>
		<Experience></Experience>
		<Education></Education>
		<Skills></Skills>
		<Accomplishments></Accomplishments>		
	</div>
</template>

<script>
import Summary from './Summary.vue'
import Experience from './Experience.vue'
import Education from './Education.vue'
import Skills from './Skills.vue'
import Accomplishments from './Accomplishments.vue'

export default {
  name: 'Profile',
  
  data () {
    return {
      
    }
  },

  components: {
  	Summary, 
  	Experience, 
  	Education, 
  	Skills, 
  	Accomplishments
  }
}
</script>

<style scoped>
</style>