<template>
	<div class="main">
		<h1>Education</h1>
		<div v-for="item in schools" class="school">
			<div>{{item.name}}</div>
			<div>{{item.time}}</div>
			<div>{{item.degree}}</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Education',
  
  data () {
    return {
      schools: [
      	{
      		name: 'Duke University',
      		time: '2017 - 2019',
      		degree: 'Master'
      	},

      	{
      		name: 'Duke University',
      		time: '2013 - 2017',
      		degree: 'Bachelor'
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

.school {
	border-style: dotted;
	margin: 1%;
}
</style>