<template>
	<div class="main">
		<h1>Experience</h1>
		<div>
			<div>{{title}}</div>
			<div>{{place}}</div>
			<div>{{time}}</div>
			<div>{{position}}</div>
			<ul v-for="item in work">
				<li>{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Experience',
  
  data () {
    return {
    	title: 'Research Assistant',
    	place: 'Duke University',
    	time: '2017 - 2018',
    	position: 'Durham, NC, USA',
    	work: ['Machine Learning', 'Distributed Systems', 'C++ Developer']
    }
  }
}
</script>

<style scoped>
.main {
	border-style: dashed;
	margin: 2%;
}
</style>