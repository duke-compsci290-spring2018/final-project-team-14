<template>
	<div class="all border border-primary rounded">
		<div class="edit-btn">
			<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#edit-summary">Edit</button>
		</div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="edit-summary" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Profile - Summary</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Name</span></div>
                                <input type="text" name="userName" placeholder="Your Name" class="form-control" v-model="cur.name">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Occupation</span></div>
                                <input type="text" name="occupation" placeholder="Example: MS Student at Duke University" class="form-control" v-model="cur.occupation">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">School</span></div>
                                <input type="text" name="school" placeholder="Your School" class="form-control" v-model="cur.school">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Company</span></div>
                                <input type="text" name="company" placeholder="Your Company" class="form-control" v-model="cur.company">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Position</span></div>
                                <input type="text" name="position" placeholder="Current Position" class="form-control" v-model="cur.position">
                            </div>

							<div class="input-group my-2">
								<div class="input-group-prepend">
									<label class="input-group-text" for="job">Desired Job</label>
								</div>
								<select class="custom-select" id="job" v-model="cur.job">
									<option disabled selected>Please choose...</option>
									<option value="Teacher">Teacher</option>
									<option value="Human Resource">Human Resource</option>
									<option value="Full-Stack Engineer">Full-Stack Engineer</option>
									<option value="Front-end Engineer">Front-end Engineer</option>
									<option value="Marketing">Marketing</option>
									<option value="Healthcare">Healthcare</option>
									<option value="Customer Service">Customer Service</option>
									<option value="Construction">Construction</option>
									<option value="Sales">Sales</option>
								</select>
							</div>

							<div class="form-group my-2">
								<label for="self-intro">Self-introduction</label>
								<textarea class="form-control" id="self-intro" rows="3" placeholder="Please introduce yourself briefly..." v-model="cur.selfIntro"></textarea>
							</div>

							<!-- <div class="form-group my-2">
								<label for="self-intro">Avatar</label>
								<div class="custom-file">
									<input type="file" class="custom-file-input" id="avatarFile" @change="processFile($event)">
									<label class="custom-file-label" for="avatarFile">{{fileName}}</label>
								</div>
							</div> -->
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="edit">Submit</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<div class="main">
			<div>
				<!-- <img :src="summaryData.avatar" @dblclick="changeAvatar"> -->
				<div class="my-2 userName"><b>{{summaryData.name}}</b></div>
			</div>
			<div class="my-2">{{summaryData.occupation}}</div>
			<div class="my-2">{{summaryData.school}}</div>
			<div class="my-2">{{summaryData.company}}</div>
			<div class="my-2">{{summaryData.position}}</div>
		</div>
		<div class="intro-section">
			<hr/>
		</div>
		<p class="self-intro">{{summaryData.selfIntro}}</p>

	</div>
</template>

<script>

export default {
  name: 'Summary',

  props: ['summaryData'],

  data () {
    return {

    }
  },

  created() {

  },

  computed: {
  	cur() {
  		return {
	      name: this.summaryData.name,
	      occupation: this.summaryData.occupation,
	      school: this.summaryData.school,
	      company: this.summaryData.company,
	      position: this.summaryData.position,
	      job: this.summaryData.job,
	      selfIntro: this.summaryData.selfIntro
    	}
  	}
  },

  methods: {
  	// processFile(event) {
  	// 	this.avatar = event.target.files[0];
  	// 	this.fileName = event.target.value;
  	// },

  	edit() {
  		console.log('Edit summary');
		// for (var prop in this.summaryData) {
		// 	this.summaryData[prop] = this.cur[prop];
		// }
		//this.summaryData = this.cur;
		this.trigger();
  	},

  	trigger() {
  		this.$emit('summaryChanged', this.cur);
  	}
  }
}
</script>

<style scoped>
.all {
	margin: 2%;
}

.userName {
	font-size: 200%;
}

.main {
	text-align: center;
}

.intro-section {
	margin: .5% 5%;
}

.self-intro {
	margin: 2% 25%;
}

.edit-btn {
	text-align: right;
	margin: .5%;
}

img {
	width: 10%;
}
</style>
