<template>
	<div class="all border border-primary rounded">
		<div class="edit-btn">
			<button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#add-skill"><b>+</b></button>
		</div>

		<!-- modal -->
        <div class="modal fade bd-example-modal-lg" id="add-skill" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                    	<h3>Skill</h3>
                    	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    		<span aria-hidden="true">&times;</span>
                    	</button>
                    </div>

                    <div class="modal-body">
                        <form>
                            <div class="input-group my-2">
                                <div class="input-group-prepend"><span class="input-group-text">Skill</span></div>
                                <input type="text" name="skill" placeholder="skill name" class="form-control" v-model="skill">
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="add">Add</button>
                        <button class="btn btn-outline-secondary" data-dismiss="modal" @click="clear">Cancel</button>
                    </div>

                </div>
            </div>
        </div>

		<h3 class="mx-3 my-3">Skills</h3>

		<div class="main">
			<div v-for="(item, index) in skillData" :key="index" class="skill">
				<div>
					<!-- <button class="endorse-btn">+</button> -->
					<i class="fa fa-circle-o" aria-hidden="true"></i>
					<span>{{item}}</span>
					<button type="button" class="btn btn-outline-light btn-sm" @click="remove(index)"><b>X</b></button>					
				</div>
			</div>			
		</div>

	</div>
</template>

<script>
export default {
  name: 'Skills',

  props: ['skillData'],
  
  data () {
    return {
    	skill: ''
    }
  },

  methods: {
  	add() {
  		this.skillData.push(this.skill);
  		this.trigger();
  		this.clear();
  	},

  	clear() {
  		this.skill = '';
  	},

  	remove(index) {
  		this.skillData.splice(index, 1);
  		this.trigger();
  	},

  	trigger() {
  		this.$emit('skillChanged', this.skillData);
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

.skill {
	margin: 1%;
}
</style>