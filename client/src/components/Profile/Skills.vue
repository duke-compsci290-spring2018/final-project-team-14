<template>
	<div class="main">
		<h1>Skills</h1>
		<div v-for="item in skills" class="skill">
			<button class="endorse-btn">+</button>
			<span>{{item.name}}</span>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Skills',
  
  data () {
    return {
      skills: [
      	{
      		name: 'C++',
      		'endorsed': ['Mary', 'Harry']
      	},

      	{
      		name: 'Java',
      		'endorsed': ['Mary', 'Harry']     		
      	},

      	{
      		name: 'Machine Learning',
      		'endorsed': ['Mary', 'Harry']     		
      	}
      ]
    }
  }
}
</script>

<style scoped>
.main {
	border-style: dashed;
	margin: 2%;
}

.endorse-btn {
	border-radius: 35%;
	background-color: lightblue;
}

.skill {
	margin: 1%;
}
</style>