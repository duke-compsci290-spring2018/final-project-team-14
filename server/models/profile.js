const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    summary: {
    	name: String,
    	occupation: String,
    	school: String,
    	company: String,
    	position: String,
    	job: String,
    	selfIntro: String
    },
    experience: [{
    	title: String,
    	place: String,
    	timeStart: String,
    	timeEnd: String,
    	position: String,
    	work: String
    }],
    education: [{
    	name: String,
    	timeStart: String,
    	timeEnd: String,
    	degree: String,
    	major: String
    }],
    skills: [
    	String
    ],
	courses: [String],
	projects: [{
		name: String,
		timeStart: String,
		timeEnd: String,
		work: String
	}],
	languages: [{
		name: String,
		proficiency: String
	}],
	tests: [{
		name: String,
		score: String
	}]

});

module.exports = mongoose.model('Profile', ProfileSchema);