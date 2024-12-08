const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeid: {
        type: String,
        required: true,
        unique:true
    },
    fullname: {
        type: String,
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    jobPost: { 
        type: String,
        required: true
    },
    dateofhire: { 
        type: Date,
        required: true
    },
    employmenttype: { 
        type: String,
        required: true
    },
    basicsalary: { 
        type: Number,
        required: true
    }

},{ timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema);