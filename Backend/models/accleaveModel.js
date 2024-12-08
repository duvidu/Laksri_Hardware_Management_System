const mongoose = require('mongoose')

const Schema = mongoose.Schema

const accleaveSchema = new Schema({
    employeeid: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: { 
        type: Date,
        required: true
    },
    endDate: { 
        type: Date,
        required: true
    },
    reason: { 
        type: String,
        required: true
    }

},{ timestamps: true })

module.exports = mongoose.model('AccLeave', accleaveSchema);