const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    employees: [{
        username: String, 
        status: String,
        date: String,
        url: String
    }],
    company: {
        type: String
    },
    name: {
        first: String,
        last: String
    }
});

module.exports = mongoose.model('Employer', EmployerSchema);