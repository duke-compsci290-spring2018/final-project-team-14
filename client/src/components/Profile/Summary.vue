<template>
	<div class="main">
		<h1>Summary</h1>
		<div>
			<img src="../../assets/kedaya.png">
			<div>{{name}}</div>
		</div>
		<div>{{identity}}</div>
		<div>{{school}}</div>
		<div>{{company}}</div>
		<div>{{position}}</div>
		<button @click="getSummary">show</button>
	</div>
</template>

<script>
var summary = {
	"avatar": "../../assets/kedaya.png",
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
      avatar: '',
      name: '',
      identity: '',
      school: '',
      company: '',
      position: ''
    }
  },

  methods: {
  	getSummary() {
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
}
</style>