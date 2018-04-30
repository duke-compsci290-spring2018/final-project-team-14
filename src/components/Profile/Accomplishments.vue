<template>
	<div class="all border border-primary rounded">
		<div class="edit-btn">
			<button type="button" class="btn btn-outline-light btn-sm dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b> + </b></button>

			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<button class="dropdown-item" data-toggle="modal" data-target="#add-course">Add Course</button>
				<button class="dropdown-item" data-toggle="modal" data-target="#add-project">Add Project</button>
				<button class="dropdown-item" data-toggle="modal" data-target="#add-language">Add Language</button>
				<button class="dropdown-item" data-toggle="modal" data-target="#add-test">Add Test Score</button>
			</div>
		</div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-course" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Course</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Course Name</span></div>
                                <input type="text" name="course" placeholder="" class="form-control" v-model="newCourse">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="addCourse">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearCourse">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-project" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Project</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Name</span></div>
                                <input type="text" name="name" placeholder="project name" class="form-control" v-model="newProject.name">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
                                <input type="text" name="timeStart" placeholder="start time" class="form-control" v-model="newProject.timeStart">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
                                <input type="text" name="timeEnd" placeholder="End Time" class="form-control" v-model="newProject.timeEnd">
                            </div>

							<div class="form-group my-2">
								<label for="self-intro">work</label>
								<textarea class="form-control" id="work" rows="5" v-model="newProject.work" placeholder="Your work..."></textarea>
							</div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="addProject">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearProject">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-language" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Language</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Language</span></div>
                                <input type="text" name="language" placeholder="" class="form-control" v-model="newLanguage.name">
                            </div>

							<div class="input-group my-2">
								<div class="input-group-prepend">
									<label class="input-group-text" for="proficiency">Proficiency</label>
								</div>
								<select class="custom-select" id="proficiency" v-model="newLanguage.proficiency">
									<option disabled selected>Please choose...</option>
									<option value="Elementary">Elementary</option>
									<option value="Professional">Professional</option>
									<option value="Fluent">Fluent</option>
									<option value="Native">Native</option>
								</select>
							</div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="addLanguage">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearLanguage">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-test" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Test</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Test Name</span></div>
                                <input type="text" name="name" placeholder="" class="form-control" v-model="newTest.name">
                            </div>

                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Test Score</span></div>
                                <input type="text" name="score" placeholder="" class="form-control" v-model="newTest.score">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="addTest">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clearTest">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<h3 class="mx-3 my-3">Accomplishments</h3>
		<section class="module border border-info rounded  mb-3 px-2 py-2">
			<div class="edit-btn">
				<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-course"><b>+</b></button>
			</div>
			<h4>Courses</h4>
			<div v-for="(item, index) in accompData.courses" :key="index" class="course">
				<i class="fa fa-book mr-2" aria-hidden="true"></i>
				<span>{{item}}</span>
				<button type="button" class="btn btn-outline-light btn-sm" @click="removeCourse(index)"><b>X</b></button>
			</div>
		</section>

		<section class="module border border-info rounded  mb-3 px-2 py-2">
			<div class="edit-btn">
				<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-project"><b>+</b></button>
			</div>
			<h4>Projects</h4>
			<div v-for="(item, index) in accompData.projects" :key="index" class="project">
				<div class="mt-4">
					<hr/>
					<div class="edit-btn">					
						<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" :data-target="'#project' + index">Edit</button>
					</div>

					<div class="mb-2"><b>{{item.name}}</b></div>
					<div>{{item.timeStart}} - {{item.timeEnd}}</div>
					<div class="mt-2">{{item.work}}</div>

					<!-- modal -->
			        <div class="modal fade bd-example-modal-lg" :id="'project' + index" role="dialog">
			            <div class="modal-dialog modal-dialog-centered modal-lg">
			                <div class="modal-content">

			                    <div class="modal-header">
			                    	<h3>Project</h3>
			                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			                    		<span aria-hidden="true">&times;</span>
			                    	</button>
			                    </div>

			                    <div class="modal-body">
			                        <form>
			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Name</span></div>
			                                <input type="text" name="name" placeholder="project name" class="form-control" v-model="accompData.projects[index].name">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Start Time</span></div>
			                                <input type="text" name="timeStart" placeholder="start time" class="form-control" v-model="accompData.projects[index].timeStart">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">End Time</span></div>
			                                <input type="text" name="timeEnd" placeholder="End Time" class="form-control" v-model="accompData.projects[index].timeEnd">
			                            </div>

										<div class="form-group my-2">
											<label for="self-intro">work</label>
											<textarea class="form-control" id="work" rows="5" v-model="accompData.projects[index].work" placeholder="Your work..."></textarea>
										</div>
			                        </form>
			                    </div>

			                    <div class="modal-footer">
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="editProject">Submit</button>
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="removeProject(index)">Delete</button>
			                    </div>

			                </div>
			            </div>
			        </div>					
				</div>
			</div>
		</section>

		<section class="module border border-info rounded  mb-3 px-2 py-2">
			<div class="edit-btn">
				<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-language"><b>+</b></button>
			</div>
			<h4>Languages</h4>
			<div v-for="(item,index) in accompData.languages" :key="index" class="language">
				<div class="my-3">
					<div class="edit-btn">
						<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" :data-target="'#language' + index">Edit</button>
					</div>
					<div>{{item.name}}: {{item.proficiency}}</div>

					<!-- modal -->
			        <div class="modal fade bd-example-modal-lg" :id="'language' + index" role="dialog">
			            <div class="modal-dialog modal-dialog-centered modal-lg">
			                <div class="modal-content">

			                    <div class="modal-header">
			                    	<h3>Project</h3>
			                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			                    		<span aria-hidden="true">&times;</span>
			                    	</button>
			                    </div>

			                    <div class="modal-body">
			                        <form>
			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Language</span></div>
			                                <input type="text" name="language" placeholder="" class="form-control" v-model="accompData.languages[index].name">
			                            </div>

										<div class="input-group my-2">
											<div class="input-group-prepend">
												<label class="input-group-text" for="proficiency">Proficiency</label>
											</div>
											<select class="custom-select" id="proficiency" v-model="accompData.languages[index].proficiency">
												<option disabled selected>Please choose...</option>
												<option value="Elementary">Elementary</option>
												<option value="Professional">Professional</option>
												<option value="Fluent">Fluent</option>
												<option value="Native">Native</option>
											</select>
										</div>
			                        </form>
			                    </div>

			                    <div class="modal-footer">
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="editLanguage">Submit</button>
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="removeLanguage(index)">Delete</button>
			                    </div>

			                </div>
			            </div>
			        </div>					
				</div>

			</div>
		</section>

		<section class="module border border-info rounded  mb-3 px-2 py-2">
			<div class="edit-btn">
				<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-test"><b>+</b></button>
			</div>
			<h4>Test Score</h4>
			<div v-for="(item, index) in accompData.tests" :key="index" class="test">
				<div class="my-3">
					<div class="edit-btn">
						<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" :data-target="'#test' + index">Edit</button>
					</div>
					<div>{{item.name}}: {{item.score}}</div>

					<!-- modal -->
			        <div class="modal fade bd-example-modal-lg" :id="'test' + index" role="dialog">
			            <div class="modal-dialog modal-dialog-centered modal-lg">
			                <div class="modal-content">

			                    <div class="modal-header">
			                    	<h3>Test</h3>
			                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			                    		<span aria-hidden="true">&times;</span>
			                    	</button>
			                    </div>

			                    <div class="modal-body">
			                        <form>
			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Test Name</span></div>
			                                <input type="text" name="name" placeholder="" class="form-control" v-model="accompData.tests[index].name">
			                            </div>

			                            <div class="input-group my-2">
			                                <div class="input-group-prepend"><span class="input-group-text">Test Score</span></div>
			                                <input type="text" name="score" placeholder="" class="form-control" v-model="accompData.tests[index].score">
			                            </div>
			                        </form>
			                    </div>

			                    <div class="modal-footer">
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="editTest">Submit</button>
			                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="removeTest(index)">Delete</button>
			                    </div>

			                </div>
			            </div>
			        </div>					
				</div>
			</div>
		</section>

	</div>
</template>

<script>
export default {
  name: 'Accomplishments',

  props: ['accompData'],
  
  data () {
    return {
    	newCourse: '',
    	newProject: {
    		name: '',
    		timeStart: '',
    		timeEnd: '',
    		work: ''
    	},
    	newLanguage: {
    		name: '',
    		proficiency: ''
    	},
    	newTest: {
    		name: '',
    		score: ''
    	}
    }
  },

  methods: {
  	addCourse() {
  		this.accompData.courses.push(this.newCourse);
  		this.trigger();
  		this.clearCourse();
  	},

  	addProject() {
  		var project = {
     		name: this.newProject.name,
    		timeStart: this.newProject.timeStart,
    		timeEnd: this.newProject.timeEnd,
    		work: this.newProject.work			
  		};
  		this.accompData.projects.push(project);
  		this.trigger();
  		this.clearProject();
  	},

  	addLanguage() {
  		var language = {
    		name: this.newLanguage.name,
    		proficiency: this.newLanguage.proficiency		
  		};
  		this.accompData.languages.push(language);
  		this.trigger();
  		this.clearLanguage();
  	},

  	addTest() {
  		var test = {
    		name: this.newTest.name,
    		score: this.newTest.score		
  		};
  		this.accompData.tests.push(test);
  		this.trigger();
  		this.clearTest();
  	},

  	clearCourse() {
  		this.newCourse = '';
  	},

  	clearProject() {
  		for (var prop in this.newProject) {
  			this.newProject[prop] = '';
  		}
  	},

  	clearLanguage() {
  		for (var prop in this.newLanguage) {
  			this.newLanguage[prop] = '';
  		}
  	},

  	clearTest() {
  		for (var prop in this.newTest) {
  			this.newTest[prop] = '';
  		}
  	},

  	removeCourse(index) {
  		this.accompData.courses.splice(index, 1);
  		this.trigger();
  	},

  	removeProject(index) {
  		this.accompData.projects.splice(index, 1);
  		this.trigger();
  	},

  	removeLanguage(index) {
  		this.accompData.languages.splice(index, 1);
  		this.trigger();
  	},

  	removeTest(index) {
  		this.accompData.tests.splice(index, 1);
  		this.trigger();
  	},

  	editProject(index) {
  		this.trigger();
  	},

  	editLanguage(index) {
  		this.trigger();
  	},

  	editTest(index) {
  		this.trigger();
  	},

  	trigger() {
  		this.$emit('accompChanged', this.accompData);
  	}
  }
}
</script>

<style scoped>
.all {
	margin: 2%;
}

.edit-btn {
	float: right;
	margin: .3%;
}

.module {
	border-style: dotted;
	margin: 1%;
}

.course .project .language .test {
	margin: 1%;
}
</style>