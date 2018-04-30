<template>
	<div class="all border border-primary rounded">
		<div class="edit-btn">
			<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-experience"><b>+</b></button>
		</div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-experience" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Profile - Experience</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Title</span></div>
                                <input type="text" name="title" placeholder="Your Job Title" class="form-control" v-model="newExp.title">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Work Place</span></div>
                                <input type="text" name="workPlace" placeholder="School or Company" class="form-control" v-model="newExp.place">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
                                <input type="text" name="timeStart" placeholder="YYYY.MM" class="form-control" v-model="newExp.timeStart">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
                                <input type="text" name="timeEnd" placeholder="YYYY.MM" class="form-control" v-model="newExp.timeEnd">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Position</span></div>
                                <input type="text" name="position" placeholder="Country, State, City etc." class="form-control" v-model="newExp.position">
                            </div>

							<div class="form-group my-2">
								<label for="self-intro">Work</label>
								<textarea class="form-control" id="work" rows="5" v-model="newExp.work" placeholder="Your work..."></textarea>
							</div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="add">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearAddModal">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<h3 class="mx-3 my-3">Experience</h3>

		<div class="main" v-for="(item, index) in expData" :key= "index">
			<div class="school border border-info rounded mb-3 px-2 py-2">
				<div class="edit-btn">
					<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" :data-target="'#wen' + index">Edit</button>
				</div>

				<!-- modal -->
		        <div class="modal fade bd-example-modal-lg" :id="'wen' + index" role="dialog">
		            <div class="modal-dialog modal-dialog-centered modal-lg">
		                <div class="modal-content">

		                    <div class="modal-header">
		                    	<h3>Profile - Experience</h3>
		                    </div>

		                    <div class="modal-body">
		                        <form>
		                            <div class="input-group my-2">
		                                <div class="input-group-prepend"><span class="input-group-text">Title</span></div>
		                                <input type="text" name="title" placeholder="Your Job Title" class="form-control" v-model="expData[index].title">
		                            </div>

		                            <div class="input-group my-2">
		                                <div class="input-group-prepend"><span class="input-group-text">Work Place</span></div>
		                                <input type="text" name="workPlace" placeholder="School or Company" class="form-control" v-model="expData[index].place">
		                            </div>

		                            <div class="input-group my-2">
		                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
		                                <input type="text" name="timeStart" placeholder="YYYY.MM" class="form-control" v-model="expData[index].timeStart">
		                            </div>

		                            <div class="input-group my-2">
		                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
		                                <input type="text" name="timeEnd" placeholder="YYYY.MM" class="form-control" v-model="expData[index].timeEnd">
		                            </div>

		                            <div class="input-group my-2">
		                                <div class="input-group-prepend"><span class="input-group-text">Position</span></div>
		                                <input type="text" name="position" placeholder="Country, State, City etc." class="form-control" v-model="expData[index].position">
		                            </div>

									<div class="form-group my-2">
										<label for="self-intro">Work</label>
										<textarea class="form-control" id="work" rows="5" v-model="expData[index].work" placeholder="Your work..."></textarea>
									</div>
		                        </form>
		                    </div>

		                    <div class="modal-footer">
		                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="edit">Submit</button>
		                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="remove(index)">Delete</button>
		                    </div>
		                </div>
		            </div>
		        </div>

				<div class="my-1">{{item.title}}</div>
				<div class="my-1">{{item.place}}</div>
				<div class="my-1">{{item.timeStart}} - {{item.timeEnd}}</div>
				<div class="my-1">{{item.position}}</div>
				<p class="my-3">{{item.work}}</p>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  name: 'Experience',

  props: ['expData'],

  data () {
    return {
    	newExp: {
    		title: '',
			place: '',
			timeStart: '',
			timeEnd: '',
			position: '',
			work: ''
    	}
    }
  },
  methods: {
  	add() {
  		var exp = {
     		title: this.newExp.title,
			place: this.newExp.place,
			timeStart: this.newExp.timeStart,
			timeEnd: this.newExp.timeEnd,
			position: this.newExp.position,
			work: this.newExp.work
  		};
  		this.expData.push(exp);
  		this.trigger();
  		this.clearAddModal();
  	},

  	clearAddModal() {
  		for (var prop in this.newExp) {
  			this.newExp[prop] = '';
  		}
  	},

  	remove(index) {
  		this.expData.splice(index, 1);
  		this.trigger();
  	},

  	edit() {
  		this.trigger();
  		console.log('Edit experience');
  	},

  	trigger() {
  		this.$emit('expChanged', this.expData);
  	}
  }
}
</script>

<style scoped>
.all {
	margin: 2%;
}

.main {
	margin-left: 2%;
	margin-right: 2%;
}

.edit-btn {
	float: right;
	margin: .5%;
}
</style>
