<template>
	<div  class="all border border-primary rounded">
		<div class="edit-btn">
			<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-education"><b>+</b></button>
		</div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-education" role="dialog">
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
                                <div class="input-group-prepend"><span class="input-group-text">School Name</span></div>
                                <input type="text" name="schoolName" placeholder="School Name" class="form-control" v-model="newEdu.name">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
                                <input type="text" name="timeStart" placeholder="YYYY" class="form-control" v-model="newEdu.timeStart">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
                                <input type="text" name="timeEnd" placeholder="YYYY" class="form-control" v-model="newEdu.timeEnd">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Degree</span></div>
                                <input type="text" name="degree" placeholder="" class="form-control" v-model="newEdu.degree">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Major</span></div>
                                <input type="text" name="major" placeholder="Your Major" class="form-control" v-model="newEdu.major">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="add">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearAddEdu">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<h3 class="mx-3 my-3">Education</h3>
		<div class="main">
			<div v-for="(item, index) in eduData" :key="index">
				<div  class="school border border-info rounded mb-3 px-2 py-2">
					<div class="edit-btn">
						<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" :data-target="'#xen' + index">Edit</button>
					</div>

					<!-- modal -->
			        <div class="modal fade bd-example-modal-lg" :id="'xen' + index" role="dialog">
			            <div class="modal-dialog modal-dialog-centered modal-lg">
			                <div class="modal-content">

			                    <div class="modal-header">
			                    	<h3>Profile - Experience</h3>
			                    </div>

			                    <div class="modal-body">
			                        <form>
			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">School Name</span></div>
			                                <input type="text" name="schoolName" placeholder="School Name" class="form-control" v-model="eduData[index].name">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
			                                <input type="text" name="timeStart" placeholder="YYYY" class="form-control" v-model="eduData[index].timeStart">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
			                                <input type="text" name="timeEnd" placeholder="YYYY" class="form-control" v-model="eduData[index].timeEnd">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Degree</span></div>
			                                <input type="text" name="degree" placeholder="" class="form-control" v-model="eduData[index].degree">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Major</span></div>
			                                <input type="text" name="major" placeholder="Your Major" class="form-control" v-model="eduData[index].major">
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

			        <div>
						<div><b>{{item.name}}</b></div>
						<div>{{item.timeStart}} - {{item.timeEnd}}</div>
						<div>{{item.major}} - {{item.degree}}</div>				
					</div>
				</div>
			</div>			
		</div>

	</div>
</template>

<script>
export default {
  name: 'Education',
  
  props: ['eduData'],

  data () {
    return {
    	newEdu: {
	    	name: '',
	    	timeStart: '',
	    	timeEnd: '',
	    	degree: '',
	    	major: ''
    	}
    }
  },

  methods: {
  	add() {
  		var edu = {
	    	name: this.newEdu.name,
	    	timeStart: this.newEdu.timeStart,
	    	timeEnd: this.newEdu.timeEnd,
	    	degree: this.newEdu.degree,
	    	major: this.newEdu.major			
  		};
  		this.eduData.push(edu);
  		this.trigger();
  		this.clearAddEdu();
  	},

  	clearAddEdu() {
  		for (var prop in this.newEdu) {
  			this.newEdu[prop] = '';
  		}
  	},

  	remove(index) {
  		this.eduData.splice(index, 1);
  		this.trigger();
  	},

  	edit() {
  		this.trigger();
  		console.log('Edit summary');
  	},

  	trigger() {
  		this.$emit('eduChanged', this.eduData);
  	}
  }
}
</script>

<style scoped>
.all {
	margin: 2%;
}

.main {
	margin-left: 1%;
	margin-right: 2%;
}

.edit-btn {
	float: right;
	margin: .5%;
}
</style>