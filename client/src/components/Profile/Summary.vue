<template>
	<div class="main">
		<h1>Summary</h1>
		<div>
			<img :src="avatar">
			<div>{{name}}</div>
		</div>
		<div>{{identity}}</div>
		<div>{{school}}</div>
		<div>{{company}}</div>
		<div>{{position}}</div>
		<div v-if="show">
			<h5>Self-Indroduction</h5>
			<p>{{summary}}</p>
		</div>
		<button @click="getSummary">show</button>
	</div>
</template>

<script>
var summary = {
	"avatar": require("../../assets/kedaya.png"),
	"name": "Stefen",
	"identity": "MS Student in Computer Science at Duke Uinversity",
	"school": "Duke University",
	"company": "",
	"position": "Durham, NC, USA"
}

export default {
  name: 'Summary',
  
  data () {
    return {
      avatar: require('../../assets/jienigui.png'),
      name: '',
      identity: '',
      school: '',
      company: '',
      position: '',
      summary: 'Good at OOP',
      show: false
    }
  },

  methods: {
  	getSummary() {
  		this.show = !this.show;
  		this.avatar = summary.avatar;
  		this.name = summary.name;
  		this.identity = summary.identity;
  		this.school = summary.school;
  		this.company = summary.company;
  		this.position = summary.position;
  	}
  }
}
</script>

<style scoped>
.main {
	text-align: center;
	border-style: dashed;
	margin: 2%;
}

img {
	width: 10%;
}
</style>