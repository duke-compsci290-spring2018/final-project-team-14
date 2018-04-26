<template>
	<div class="main">
		<h1>Accomplishments</h1>
		<section class="module">
			<h2>Courses</h2>
			<div v-for="item in courses">
				<div>{{item}}</div>
			</div>
		</section>

		<section class="module">
			<h2>Projects</h2>
			<div v-for="item in projects">
				<div>{{item.name}}</div>
				<div>{{item.time}}</div>
				<ul v-for="w in item.work">
					<li>{{w}}</li>
				</ul>
			</div>
		</section>

		<section class="module">
			<h2>Languages</h2>
			<div v-for="item in languages">
				<div>{{item.name}}: {{item.proficiency}}</div>
			</div>
		</section>

		<section class="module">
			<h2>Honor & Award</h2>
			<div v-for="item in honor">
				<div>{{item.name}}: {{item.time}}</div>
			</div>
		</section>

		<section class="module">
			<h2>Test Score</h2>
			<div v-for="item in testScores">
				<div>{{item.name}}: {{item.score}}</div>
			</div>
		</section>

	</div>
</template>

<script>
export default {
  name: 'Accomplishments',
  
  data () {
    return {
    	courses: ['Calculus', 'Physics', 'Deep Learning', 'OOP', 'Robust Server', 'COmputer Graphics'],
    	projects: [
    		{
    			name: 'RSVP System',
    			time: 'Jan 2018 - March 2018',
    			work: ['Front end: Vue.js', 'Back end: MySQL']
    		},

    		{
    			name: 'RSVP System 2',
    			time: 'Jan 2018 - March 2018',
    			work: ['Front end: React.js', 'Back end: MongoDB']
    		}
    	],
    	languages: [
    		{
    			name: 'Chinese',
    			proficiency: 'Native'
    		},

    		{
    			name: 'English',
    			proficiency: 'Fluent'
    		}
    	],
    	honor: [
    		{
    			name: 'Best Paper',
    			time: '2017'
    		}
    	],
    	testScores: [
    		{
    			name: 'TOEFL',
    			score: '116'
    		},

    		{
    			name: 'GRE',
    			score: '330 + 6'
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

.module {
	border-style: dotted;
	margin: 1%;
}
</style>